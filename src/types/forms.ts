import { Address, Apartment, Booking } from './entities';
import {
    ApartmentState,
    AssignmentState,
    BookingSource,
    BookingState,
    CategoryEnum,
    Language,
    WorkerState
} from './enums';
import { Worker } from './entities';
import dayjs from 'dayjs';
import { conf } from '../../conf';

export interface LoginResponse {
    authToken: string;
    sessionId: string;
}

export interface RegisterUserForm {
    username: string;
    email: string;
    password: string;
}

export const apartmentToForm = (apartment: Apartment | undefined): ApartmentFormFields => {
    if (!apartment) {
        return {
            name: '',
            airbnbId: '',
            bookingId: '',
            street: '',
            city: '',
            zipCode: '',
            country: '',
        }
    }
    return {
        id: apartment?.id,
        name: apartment?.name,
        airbnbId: apartment?.airbnbId,
        bookingId: apartment?.bookingId,
        street: apartment?.address?.street,
        city: apartment.address?.city,
        zipCode: apartment.address?.zipCode,
        country: apartment.address?.country,
        state: apartment.state
    }
}

export const formFieldsToCreateApartmentForm = (formFields: ApartmentFormFields): ApartmentCreateForm => {
    return {
        name: formFields.name,
        airbnbId: formFields.airbnbId || undefined,
        bookingId: formFields.bookingId || undefined,
        address: formFields.street || formFields.city || formFields.zipCode || formFields.country ? {
            street: formFields.street,
            city: formFields.city,
            zipCode: formFields.zipCode,
            country: formFields.country
        } : undefined,
        visible: true
    }
}

export const formFieldsToUpdateApartmentForm = (formFields: ApartmentFormFields): ApartmentUpdateForm => {
    if (!formFields.id) {
        throw new Error('Id is required');
    }
    return {
        id: formFields.id,
        name: formFields.name,
        airbnbId: formFields.airbnbId || undefined,
        bookingId: formFields.bookingId || undefined,
        address: formFields.street || formFields.city || formFields.zipCode || formFields.country ? {
            street: formFields.street,
            city: formFields.city,
            zipCode: formFields.zipCode,
            country: formFields.country
        } : undefined,
        state: formFields.state || ApartmentState.READY,
        visible: true
    }
}

export interface ApartmentFormFields {
    id?: string;
    name: string;
    airbnbId?: string;
    bookingId?: string;
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    state?: ApartmentState
}

export interface ApartmentCreateForm {
    name: string;
    airbnbId?: string;
    bookingId?: string;
    address?: Address;
    visible: boolean;
}

export interface ApartmentUpdateForm {
    id: string;
    name: string;
    airbnbId?: string;
    bookingId?: string;
    address?: Address;
    visible: boolean;
    state: ApartmentState
}


export interface BookingCreateForm {
    apartmentId: string;
    startDate: number;
    endDate: number;
    name: string;
    state: BookingState;
    source: BookingSource;
}

export interface BookingUpdateForm {
    id: string;
    startDate: number;
    endDate: number;
    name: string;
    state: BookingState;
    source: BookingSource;
}

export interface BookingFormFields {
    id?: string;
    apartmentId?: string;
    startDate: string;
    endDate: string;
    name: string;
    state: BookingState;
    source: BookingSource;
}



export const bookingToForm = (booking: Booking | undefined): BookingFormFields => {
    if (!booking) {
        return {
            name: '',
            startDate: '',
            endDate: '',
            state: BookingState.PENDING,
            source: BookingSource.NONE,
        };
    }
    return {
        id: booking.id,
        name: booking.name,
        startDate: dayjs.unix(booking.startDate).format(conf.dateInputFormat),
        endDate: dayjs.unix(booking.endDate).format(conf.dateInputFormat),
        state: booking.state,
        source: booking.source,
    };
};

export const formFieldsToCreateBookingForm = (formFields: BookingFormFields): BookingCreateForm => {
    console.log(formFields.startDate)
    return {
        apartmentId: formFields.apartmentId!,
        startDate: dayjs(formFields.startDate, conf.dateInputFormat).unix(),
        endDate: dayjs(formFields.endDate, conf.dateInputFormat).unix(),
        name: formFields.name,
        state: formFields.state,
        source: formFields.source,
    };
};

export const formFieldsToUpdateBookingForm = (formFields: BookingFormFields): BookingUpdateForm => {
    if (!formFields.id) {
        throw new Error('Id is required');
    }
    return {
        id: formFields.id,
        name: formFields.name,
        state: formFields.state,
        source: formFields.source,
        startDate: dayjs(formFields.startDate, conf.dateInputFormat).unix(),
        endDate: dayjs(formFields.endDate, conf.dateInputFormat).unix(),
    };
};

export interface TaskCreateForm {
    apartmentId: string;
    name: string;
    category: CategoryEnum;
    duration: number;
    extra: boolean;
    steps: string[];
}

export interface TemplateCreateForm {
    name: string;
    category: CategoryEnum;
    duration: number;
    steps: string[];
}




export interface TaskUpdateForm {
    id: string;
    name: string;
    category: CategoryEnum;
    duration: number;
    steps: string[];
}

export interface TemplateUpdateForm {
    id: string;
    name: string;
    category: CategoryEnum;
    duration: number;
    extra: boolean;
    steps: string[];
}



export interface AssignmentUpdateForm {
    id: string;
    startDate: Date;
    endDate: Date;
    workerId: string;
    state: AssignmentState;
}

export interface WorkerCreateForm {
    name: string;
    language: Language;
    salary: number;
    visible: boolean;
    state: WorkerState;
}

export interface WorkerUpdateForm {
    id: string;
    name: string;
    language: Language;
    salary: number;
    visible: boolean;
    state: WorkerState;
}

export interface WorkerFormFields {
    id?: string;
    name: string;
    language: Language;
    salary: number;
    state: WorkerState;
}


export const workerToForm = (worker: Worker | undefined): WorkerFormFields => {
    if (!worker) {
        return {
            name: '',
            language: Language.EN,
            salary: 0,
            state: WorkerState.AVAILABLE
        };
    }
    return {
        id: worker.id,
        name: worker.name,
        language: worker.language,
        salary: worker.salary,
        state: worker.state
    };
};

export const formFieldsToCreateWorkerForm = (formFields: WorkerFormFields): WorkerCreateForm => {
    return {
        name: formFields.name,
        language: formFields.language,
        salary: formFields.salary,
        state: formFields.state,
        visible: true
    };
};

export const formFieldsToUpdateWorkerForm = (formFields: WorkerFormFields): WorkerUpdateForm => {
    if (!formFields.id) {
        throw new Error('Id is required');
    }
    return {
        id: formFields.id,
        name: formFields.name,
        language: formFields.language,
        salary: formFields.salary,
        state: formFields.state,
        visible: true
    };
};

