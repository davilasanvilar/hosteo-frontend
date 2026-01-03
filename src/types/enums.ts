export enum BookingState {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    CANCELLED = 'CANCELLED'
}

export enum BookingSource {
    AIRBNB = 'AIRBNB',
    BOOKING = 'BOOKING',
    NONE = 'NONE'
}

export enum CategoryEnum {
    CLEANING = 'CLEANING',
    MAINTENANCE = 'MAINTENANCE',
    REPAIR = 'REPAIR',
    INSPECTION = 'INSPECTION',
    OTHER = 'OTHER'
}

export enum Language {
    EN = 'EN',
    ES = 'ES',
    FR = 'FR',
    DE = 'DE',
    IT = 'IT',
    PT = 'PT',
    NL = 'NL',
    PL = 'PL',
    SV = 'SV',
    NO = 'NO',
    DA = 'DA',
    FI = 'FI',
    CS = 'CS',
    HU = 'HU',
    RO = 'RO',
    BG = 'BG',
    HR = 'HR',
    SL = 'SL',
    EL = 'EL',
    TR = 'TR',
    UK = 'UK',
    RU = 'RU'
}

export enum AssignmentState {
    PENDING = 'PENDING',
    FINISHED = 'FINISHED'
}

export enum ApartmentState {
    READY = 'READY',
    OCCUPIED = 'OCCUPIED',
    USED = 'USED'
}

export enum Alert {
    DAYS_LEFT_2_UNASSIGNED = 'DAYS_LEFT_2_UNASSIGNED',
    DAYS_LEFT_5_UNASSIGNED = 'DAYS_LEFT_5_UNASSIGNED',
    DAYS_LEFT_2_NOT_COMPLETED = 'DAYS_LEFT_2_NOT_COMPLETED'
}

export enum ConflictType {
    ASSIGNMENT_CONFLICT = 'ASSIGNMENT_CONFLICT',
    BOOKING_CONFLICT = 'BOOKING_CONFLICT',
    IMPORT_BOOKING_CONFLICT = 'IMPORT_BOOKING_CONFLICT'
}

export enum ValidationCodeType {
    ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT',
    RESET_PASSWORD = 'RESET_PASSWORD'
}

export enum ErrorCode {
    NOT_JWT_TOKEN = 'NOT_JWT_TOKEN',
    NOT_CSR_TOKEN = 'NOT_CSR_TOKEN',
    INVALID_TOKEN = 'INVALID_TOKEN',
    USERNAME_IN_USE = 'USERNAME_IN_USE',
    EMAIL_IN_USE = 'EMAIL_IN_USE',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    USER_AGENT_NOT_MATCH = 'USER_AGENT_NOT_MATCH',
    TOKEN_ALREADY_USED = 'TOKEN_ALREADY_USED'
}