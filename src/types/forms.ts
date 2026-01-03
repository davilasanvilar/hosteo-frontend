import { Address, Apartment } from './entities';
import {
    ApartmentState,
    AssignmentState,
    BookingSource,
    BookingState,
    CategoryEnum,
    Language
} from './enums';

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

export const formFieldsToCreateForm = (formFields: ApartmentFormFields): ApartmentCreateForm => {
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

export const formFieldsToUpdateForm = (formFields: ApartmentFormFields): ApartmentUpdateForm => {
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
    startDate: Date;
    endDate: Date;
    name: string;
    state: BookingState;
    source: BookingSource;
}

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

export interface WorkerCreateForm {
    name: string;
    language: Language;
    salary: number;
    visible: boolean;
}


export interface BookingUpdateForm {
    id: string;
    startDate: Date;
    endDate: Date;
    name: string;
    state: BookingState;
    source: BookingSource;
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

export interface WorkerUpdateForm {
    id: string;
    name: string;
    language: Language;
    salary: number;
    visible: boolean;
}

export interface AssignmentUpdateForm {
    id: string;
    startDate: Date;
    endDate: Date;
    workerId: string;
    state: AssignmentState;
}
