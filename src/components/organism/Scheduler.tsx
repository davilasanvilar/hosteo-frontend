import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useError } from '../../hooks/useError';
import {
    AssignmentForSchedulerDto,
    BookingScheduler,
    bookingSchedulerToSimpleBookingSchedulerDto,
    SchedulerInfo,
    SchedulerItem,
    Task
} from '../../types/entities';
import { ApiResponse } from '../../types/types';
import { useAuth } from '../../hooks/useAuth';
import {
    checkResponseException,
    getStartOfWeek,
    groupItemsByDate
} from '../../utils/utilFunctions';
import dayjs from 'dayjs';
import { SchedulerDatePicker } from '../molecules/SchedulerDatePicker';
import { conf } from '../../../conf';
import { SchedulerDay } from '../molecules/SchedulerDay';
import { AlertsIndicator } from '../atoms/AlertsIndicator';
import { AlertsDrawer } from './AlertsDrawer';
import { AssignmentScheduler } from './AssignmentScheduler';
import { AssignmentFormFieldsWithObjects } from '../../types/forms';
import { AssignmentState } from '../../types/enums';
import { TaskWithApartment } from '../../types/entities';

export function Scheduler() {
    const { handleError } = useError();

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { fetchWithAuth } = useAuth();

    const [startOfWeek, setStartOfWeek] = useState<string>(
        getStartOfWeek(new Date().toISOString())
    );

    const [openedAssignmentScheduler, setOpenedAssignmentScheduler] =
        useState<boolean>(false);
    const [openedDrawer, setOpenedDrawer] = useState<boolean>(false);

    const [assignmentToModify, setAssignmentToModify] = useState<
        AssignmentFormFieldsWithObjects | undefined
    >(undefined);

    const handleCreateNewAssignment = (
        booking: BookingScheduler,
        task?: Task
    ) => {
        const assignmentToModify: AssignmentFormFieldsWithObjects = {
            id: undefined,
            task: task,
            apartment: booking.booking.apartment,
            worker: undefined,
            startDate: undefined,
            endDate: undefined,
            state: AssignmentState.PENDING,
            prevBooking: booking.prevBooking,
            nextBooking: bookingSchedulerToSimpleBookingSchedulerDto(booking)
        };
        setAssignmentToModify(assignmentToModify);
        setOpenedAssignmentScheduler(true);
    };

    const handleUpdateAssignment = (assignment: AssignmentForSchedulerDto) => {
        const assignmentToModify: AssignmentFormFieldsWithObjects = {
            id: assignment.id,
            task: assignment.task,
            apartment: assignment.task.apartment,
            worker: assignment.worker,
            startDate: dayjs.unix(assignment.startDate).toISOString(),
            endDate: dayjs.unix(assignment.endDate).toISOString(),
            state: assignment.state,
            prevBooking: assignment.prevBooking,
            nextBooking: assignment.nextBooking
        };
        setAssignmentToModify(assignmentToModify);
        setOpenedAssignmentScheduler(true);
    };

    const searchSchedulerData = async (
        date: string
    ): Promise<SchedulerInfo> => {
        const url = `${apiUrl}scheduler/${dayjs(date).format(conf.dateUrlFormat)}`;
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetchWithAuth(url, options);
        const resObject: ApiResponse<SchedulerInfo> = await res.json();
        checkResponseException(res, resObject);
        return resObject.data;
    };
    const [itemsByDate, setItemsByDate] =
        useState<Map<string, SchedulerItem[]>>();
    const {
        data: schedulerInfo,
        refetch: reloadSchedulerInfo,
        isLoading,
        isError,
        error
    } = useQuery<SchedulerInfo>({
        queryKey: ['schedulerInfo', startOfWeek],
        queryFn: async () => {
            const data = await searchSchedulerData(startOfWeek);
            setItemsByDate(
                groupItemsByDate(startOfWeek, data.bookings, data.assignments)
            );
            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: !!startOfWeek
    });

    useEffect(() => {
        if (isError) {
            handleError(error);
        }
    }, [isError, error]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <SchedulerDatePicker
                    date={startOfWeek}
                    setDate={setStartOfWeek}
                />
                <AlertsIndicator
                    onClick={() => setOpenedDrawer(true)}
                    redAlertCount={schedulerInfo?.redAlertBookings?.length}
                    yellowAlertCount={
                        schedulerInfo?.yellowAlertBookings?.length
                    }
                />
            </div>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto'
                }}
            >
                {Array.from({ length: 7 }).map((_, index) => (
                    <SchedulerDay
                        key={index}
                        date={dayjs(startOfWeek)
                            .add(index, 'day')
                            .toISOString()}
                        items={
                            itemsByDate?.get(
                                dayjs(startOfWeek)
                                    .add(index, 'day')
                                    .format(conf.dateUrlFormat)
                            ) || []
                        }
                        onAssignmentClick={handleUpdateAssignment}
                    />
                ))}
            </div>
            <AlertsDrawer
                opened={openedDrawer}
                onClose={() => setOpenedDrawer(false)}
                redAlertBookings={schedulerInfo?.redAlertBookings || []}
                yellowAlertBookings={schedulerInfo?.yellowAlertBookings || []}
                handleCreateNewAssignment={handleCreateNewAssignment}
            />
            <AssignmentScheduler
                opened={openedAssignmentScheduler}
                onClose={() => setOpenedAssignmentScheduler(false)}
                assignmentToModify={assignmentToModify}
            />
        </>
    );
}
