import { Moment } from 'moment';

export interface TicketDTO {
    id?: number,
    title?: string,
    status?: "NEW" | "ASSIGNED" | "IN_PROGRESS" | "CLOSED",
    description?: string,
}

export interface TicketFullDTO {
    id?: number,
    title?: string,
    description?: string,
    category?: string,
    severity?: string,
    status?: string,
    submitDate?: Moment | null
}

export interface TicketStatusTypesDTO {
    shortName?: string,
    fullName: string,
}

export interface TicketSeverityLevelsDTO {
    shortName?: string,
    fullName: string,
}

export interface TicketCategoryTypesDTO {
    shortName?: string,
    fullName: string,
}