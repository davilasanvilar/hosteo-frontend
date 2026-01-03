import { Address } from '../types/entities';
import { ApiError, ApiResponse } from '../types/types';

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
