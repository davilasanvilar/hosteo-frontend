import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Layout } from '../components/organism/layout/Layout';

import { useError } from '../hooks/useError';
import { SchedulerInfo } from '../types/entities';
import { ApiResponse } from '../types/types';
import { useAuth } from '../hooks/useAuth';
import { checkResponseException, getStartOfWeek } from '../utils/utilFunctions';
import dayjs from 'dayjs';
import { conf } from '../../conf';
import { SchedulerDatePicker } from '../components/molecules/SchedulerDatePicker';

export function SchedulerScreen() {
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
        data: schedulerInfo,
        refetch: reloadSchedulerInfo,
        isLoading,
        isError,
        error
    } = useQuery<SchedulerInfo>({
        queryKey: ['schedulerInfo', date],
        queryFn: () => searchSchedulerData(date),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: !!date
    });

    useEffect(() => {
        if (isError) {
            handleError(error);
        }
    }, [isError, error]);

    return (
        <Layout>
            <SchedulerDatePicker date={date} setDate={setDate} />
        </Layout>
    );
}
