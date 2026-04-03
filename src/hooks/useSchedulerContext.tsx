import { useContext } from 'react';
import { SchedulerContext } from '../components/organism/Scheduler';

export const useSchedulerContext = () => {
    const ctx = useContext(SchedulerContext);
    if (ctx === null) {
        throw new Error(
            'useSchedulerContext() can only be used on the descendants of SchedulerProvider'
        );
    } else {
        return ctx;
    }
};
