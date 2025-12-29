import { useContext } from 'react';
import { ApiContext } from '../providers/ApiProvider';

export const useApi = () => {
    const ctx = useContext(ApiContext);
    if (ctx === null) {
        throw new Error(
            'useApi() can only be used on the descendants of ApiProvider'
        );
    } else {
        return ctx;
    }
};
