import dayjs from 'dayjs';
import { Address, Assignment, AssignmentInfoForScheduler, BookingScheduler, SchedulerItem } from '../types/entities';
import { ApiError, ApiResponse } from '../types/types';
import { conf } from '../../conf';
import { AssignmentFormFields } from '../types/forms';

export const checkResponseException = (
    res: Response,
    resObject: ApiResponse<unknown>
) => {
    if (!res.ok) {
        throw new ApiError({
            statusCode: res.status,
            message: resObject.errorMessage,
            code: resObject.errorCode
        });
    }
};

export const addressToString = (address: Address | undefined) => {
    if (!address) {
        return '';
    }
    return `${address.street ? address.street + ',' : ''} ${address.zipCode ? address.zipCode : ''} ${address.city ? address.city : ''} ${address.country ? `(${address.country})` : ''}`;
};

export function getStartOfWeek(date: string | null) {
    return dayjs(date).startOf('week').toISOString();
}

export function getEndOfWeek(date: string | null) {
    return dayjs(date).endOf('week').toISOString();
}

export const groupItemsByDate = (
    startOfWeek: string,
    bookings: BookingScheduler[],
    assignments: Assignment[],
    assignmentBeingModified?: AssignmentInfoForScheduler,
) => {
    const map = new Map<string, SchedulerItem[]>();
    Array.from({ length: 7 }).forEach((_, index) => {
        const dateToAdd = dayjs(startOfWeek)
            .add(index, 'day')
            .format(conf.dateUrlFormat);
        map.set(dateToAdd, []);
    });
    bookings.forEach((booking) => {
        const startDate = dayjs
            .unix(booking.booking.startDate)
            .format(conf.dateUrlFormat);
        const endDate = dayjs
            .unix(booking.booking.endDate)
            .format(conf.dateUrlFormat);
        map.get(startDate)?.push({
            type: 'booking',
            item: booking,
            isStart: true,
            date: booking.booking.startDate
        });
        map.get(endDate)?.push({
            type: 'booking',
            item: booking,
            isStart: false,
            date: booking.booking.endDate
        });
    });
    assignments.forEach((assignment) => {
        if (assignment.id === assignmentBeingModified?.id) return;
        const startDate = dayjs
            .unix(assignment.startDate)
            .format(conf.dateUrlFormat);
        map.get(startDate)?.push({
            type: 'assignment',
            item: assignment,
            isStart: true,
            date: assignment.startDate
        });
    });
    if (assignmentBeingModified?.startDate) {
        map.get(dayjs(assignmentBeingModified.startDate).format(conf.dateUrlFormat))?.push({
            type: 'incompleteAssignment',
            item: assignmentBeingModified,
            isStart: true,
            date: dayjs(assignmentBeingModified.startDate).unix()
        });
    }
    for (const dayItems of map.values()) {
        dayItems.sort((a, b) => a.date - b.date);
    }
    return map;
}; 