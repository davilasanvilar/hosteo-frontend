export interface SelectOption {
    label: string;
    value: string;
}

export interface Page<T> {
    page: number;
    totalPages: number;
    data: T[];
}

export interface ApiResponse<T> {
    data: T;
    errorMessage: string;
    errorCode: ErrorCode;
}

export class ApiError extends Error {
    statusCode: number;
    message: string;
    code?: string;

    constructor({
        message,
        statusCode,
        code
    }: {
        message: string;
        statusCode: number;
        code?: string;
    }) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.code = code;
    }
}

export enum ErrorCode {
    NOT_JWT_TOKEN = 'NOT_JWT_TOKEN',
    NOT_CSR_TOKEN = 'NOT_CSR_TOKEN',
    INVALID_TOKEN = 'INVALID_TOKEN',
    NOT_VALIDATED_ACCOUNT = 'NOT_VALIDATED_ACCOUNT',
    USERNAME_IN_USE = 'USERNAME_IN_USE',
    EMAIL_IN_USE = 'EMAIL_IN_USE',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    USER_AGENT_NOT_MATCH = 'USER_AGENT_NOT_MATCH',
    TOKEN_ALREADY_USED = 'TOKEN_ALREADY_USED'
}
