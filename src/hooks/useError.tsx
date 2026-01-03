import { useNavigate } from 'react-router-dom';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { useAuth } from './useAuth';
import { ErrorCode } from '../types/enums';
import { showNotificationError } from '../utils/notifUtils';

export const useError = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleError = (error: unknown) => {
        if (error instanceof ApiError) {
            switch (error.statusCode) {
                case StatusCode.ClientErrorUnauthorized:
                    if (
                        error.code &&
                        [
                            ErrorCode.NOT_JWT_TOKEN,
                            ErrorCode.NOT_CSR_TOKEN,
                            ErrorCode.USER_AGENT_NOT_MATCH,
                            ErrorCode.TOKEN_ALREADY_USED,
                            ErrorCode.INVALID_TOKEN
                        ].includes(error.code as ErrorCode)
                    ) {
                        logout();
                        navigate('/login');
                        showNotificationError('Your session has expired');
                        return;
                    }
                    break;
                case StatusCode.ClientErrorBadRequest:
                    showNotificationError('There are errors in the form');
                    return;
                case StatusCode.ClientErrorNotFound:
                    showNotificationError('Resource not found');
                    return;
            }
        }
        showNotificationError('An internal error occurred');
    };

    return { handleError };
};
