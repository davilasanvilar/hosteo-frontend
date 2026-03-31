import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Layout } from './layout/Layout';

import { useError } from '../../hooks/useError';
import {
    Assignment,
    BookingScheduler,
    SchedulerInfo,
    SchedulerItem
} from '../../types/entities';
import { ApiResponse } from '../../types/types';
import { useAuth } from '../../hooks/useAuth';
import {
    checkResponseException,
    getStartOfWeek
} from '../../utils/utilFunctions';
import dayjs from 'dayjs';
import { SchedulerDatePicker } from '../molecules/SchedulerDatePicker';
import { conf } from '../../../conf';
import { SchedulerDay } from '../molecules/SchedulerDay';

export function Scheduler() {
    const { handleError } = useError();

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { fetchWithAuth } = useAuth();

    const [date, setDate] = useState<string>(
        getStartOfWeek(new Date().toISOString())
    );
    const searchSchedulerData = async (
        date: string
    ): Promise<SchedulerInfo> => {
        console.log(date);
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

    const {
        data: itemsByDate,
        refetch: reloadSchedulerInfo,
        isLoading,
        isError,
        error
    } = useQuery<Map<string, SchedulerItem[]>>({
        queryKey: ['schedulerInfo', date],
        queryFn: async () => {
            const data = await searchSchedulerData(date);
            return groupItemsByDate(data.bookings, data.assignments);
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: !!date
    });

    const groupItemsByDate = (
        bookings: BookingScheduler[],
        assignments: Assignment[]
    ) => {
        const map = new Map<string, SchedulerItem[]>();
        Array.from({ length: 7 }).forEach((_, index) => {
            const dateToAdd = dayjs(date)
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
        for (const dayItems of map.values()) {
            dayItems.sort((a, b) => a.date - b.date);
        }
        return map;
    };

    useEffect(() => {
        if (isError) {
            handleError(error);
        }
    }, [isError, error]);

    return (
        <Layout>
            <SchedulerDatePicker date={date} setDate={setDate} />
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
                        date={dayjs(date).add(index, 'day').toISOString()}
                        items={
                            itemsByDate?.get(
                                dayjs(date)
                                    .add(index, 'day')
                                    .format(conf.dateUrlFormat)
                            ) || []
                        }
                    />
                ))}
            </div>
        </Layout>
    );
}
