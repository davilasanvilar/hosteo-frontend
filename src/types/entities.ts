import {
    Alert,
    ApartmentState,
    AssignmentState,
    BookingSource,
    BookingState,
    CategoryEnum,
    Language
} from './enums';

export interface Address {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
}

export interface BaseEntity {
    id: string;
    createdAt: Date;
    createdBy?: User;
}

export interface LoginResponse {
    authToken: string;
    sessionId: string;
}


export interface User extends BaseEntity {
    username: string;
    email: string;
    validated: boolean;
}

export interface Conflict {
    message: string;
}

export interface Apartment extends BaseEntity {
    name: string;
    airbnbId?: string;
    bookingId?: string;
    address?: Address;
    state: ApartmentState;
    visible: boolean;
}

export interface Task extends BaseEntity {
    name: string;
    category: CategoryEnum;
    duration: number;
    extra: boolean;
    steps: string[];
}

export interface Template extends BaseEntity {
    name: string;
    category: CategoryEnum;
    duration: number;
    steps: string[];
}

export interface ApartmentWithTasks extends Apartment {
    tasks: Task[];
}

export interface Worker extends BaseEntity {
    name: string;
    language: Language;
    salary: number;
    visible: boolean;
}

export interface Assignment extends BaseEntity {
    task: Task;
    startDate: Date;
    endDate: Date;
    worker: Worker;
    state: AssignmentState;
}

export interface Booking extends BaseEntity {
    apartment: Apartment;
    startDate: Date;
    endDate: Date;
    name: string;
    state: BookingState;
    source: BookingSource;
}

export interface BookingWithAssignments extends Omit<Booking, 'apartment'> {
    apartment: ApartmentWithTasks;
    assignments: Assignment[];
}

export interface BookingScheduler {
    booking: Booking;
    alert: Alert;
    assignedTasks: Task[];
    unassignedTasks: Task[];
    hasUnfinishedTasks: boolean;
    apartmentReady: boolean;
}

export interface ImpBooking {
    apartment: Apartment;
    startDate: Date;
    endDate: Date;
    name: string;
    state: BookingState;
    source: BookingSource;
    conflict: Conflict;
    creationError: string;
}

export interface ImportResult {
    successCount: number;
    failureCount: number;
}
