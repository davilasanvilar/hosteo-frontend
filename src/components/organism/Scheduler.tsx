import { useQuery } from '@tanstack/react-query';
import { createContext, SetStateAction, useEffect, useState } from 'react';

import { useError } from '../../hooks/useError';
import {
    Assignment,
    BookingScheduler,
    SchedulerInfo,
    SchedulerItem,
    Task,
    Worker
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

export interface SchedulerContextType {
    handleCreateNewAssignment: (booking: BookingScheduler, task: Task) => void;
    handleUpdateAssignment: (assignment: Assignment) => void;
    bookingToAssign: BookingScheduler | undefined;
    taskToAssign: Task | undefined;
    assignmentToUpdate: Assignment | undefined;
    assignedWorker: Worker | undefined;
    setAssignedWorker: React.Dispatch<SetStateAction<Worker | undefined>>;
}

export const SchedulerContext = createContext<SchedulerContextType>(
    {} as SchedulerContextType
);

export function Scheduler() {
    const { handleError } = useError();

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { fetchWithAuth } = useAuth();

    const [startOfWeek, setStartOfWeek] = useState<string>(
        getStartOfWeek(new Date().toISOString())
    );
    const [openedDrawer, setOpenedDrawer] = useState<boolean>(false);
    const [openedAssignmentScheduler, setOpenedAssignmentScheduler] =
        useState<boolean>(false);

    const [bookingToAssign, setBookingToAssign] = useState<
        BookingScheduler | undefined
    >(undefined);
    const [taskToAssign, setTaskToAssign] = useState<Task | undefined>(
        undefined
    );
    const [assignmentToUpdate, setAssignmentToUpdate] = useState<
        Assignment | undefined
    >(undefined);
    const [assignedWorker, setAssignedWorker] = useState<Worker | undefined>(
        undefined
    );

    const handleCreateNewAssignment = (
        booking: BookingScheduler,
        task: Task
    ) => {
        setBookingToAssign(booking);
        setTaskToAssign(task);
        setOpenedAssignmentScheduler(true);
    };

    const handleUpdateAssignment = (assignment: Assignment) => {
        setAssignmentToUpdate(assignment);
        setOpenedAssignmentScheduler(true);
    };

    const onCloseAssignmentScheduler = () => {
        setOpenedAssignmentScheduler(false);
        setBookingToAssign(undefined);
        setTaskToAssign(undefined);
        setAssignmentToUpdate(undefined);
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
        <SchedulerContext.Provider
            value={{
                handleCreateNewAssignment,
                handleUpdateAssignment,
                bookingToAssign,
                taskToAssign,
                assignmentToUpdate,
                assignedWorker,
                setAssignedWorker
            }}
        >
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
            />
            <AssignmentScheduler
                opened={openedAssignmentScheduler}
                onClose={onCloseAssignmentScheduler}
            />
        </SchedulerContext.Provider>
    );
}
