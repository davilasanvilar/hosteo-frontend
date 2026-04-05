import {
    Alert,
    ApartmentState,
    AssignmentState,
    BookingSource,
    BookingState,
    CategoryEnum,
    Language,
    WorkerState
} from './enums';
import { AssignmentFormFields } from './forms';

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

export interface ApartmentWithTasks extends Apartment {
    tasks: Task[];
}

export interface Task extends BaseEntity {
    name: string;
    category: CategoryEnum;
    duration: number;
    extra: boolean;
    steps: string[];
}


export interface TaskWithApartment extends BaseEntity {
    name: string;
    category: CategoryEnum;
    duration: number;
    extra: boolean;
    steps: string[];
    apartment: Apartment;
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
    state: WorkerState;
}

export interface Assignment extends BaseEntity {
    task: TaskWithApartment;
    startDate: number;
    endDate: number;
    worker: Worker;
    state: AssignmentState;
}

export interface Booking extends BaseEntity {
    apartment: Apartment;
    startDate: number;
    endDate: number;
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
    prevBooking?: SimpleBookingSchedulerDto;
}

export interface SchedulerItem {
    type: 'booking' | 'assignment' | 'incompleteAssignment';
    item: BookingScheduler | Assignment | AssignmentInfoForScheduler;
    isStart: boolean;
    date: number
}

export interface SchedulerInfo {
    bookings: BookingScheduler[];
    redAlertBookings: BookingScheduler[];
    yellowAlertBookings: BookingScheduler[];
    assignments: AssignmentForSchedulerDto[];
    extraTasks: Task[];
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

export interface AssignmentForSchedulerDto extends Assignment {
    prevBooking?: SimpleBookingSchedulerDto;
    nextBooking?: SimpleBookingSchedulerDto;
}


export interface AssignmentInfoForScheduler {
    id?: string;
    task?: Task;
    startDate?: string;
    endDate?: string;
    worker?: Worker;
    state?: AssignmentState;
    apartment?: Apartment;
    prevBooking?: SimpleBookingSchedulerDto;
    nextBooking?: SimpleBookingSchedulerDto;
}

export interface SimpleBookingSchedulerDto {
    id: string;
    startDate: number;
    endDate: number;
    name: string;
    source: BookingSource;
    alert?: Alert;
}

export const bookingSchedulerToSimpleBookingSchedulerDto = (booking: BookingScheduler): SimpleBookingSchedulerDto => {
    return {
        id: booking.booking.id,
        alert: booking.alert,
        endDate: booking.booking.endDate,
        startDate: booking.booking.startDate,
        name: booking.booking.name,
        source: booking.booking.source
    }
}
