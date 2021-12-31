import {Moment} from "moment";

export interface ClientsSummaryDTO {
    active?: number,
    onBoarding?: number,
    notVerified?: number,
    verified?: number,
    suspended?: number,
    inactive?: number,
    createdAt?: Moment | null,
}

export interface TicketsSummaryDTO {
    newValue?: number,
    assigned?: number,
    inProgress?: number,
    closed?: number,
    createdAt?: Moment | null,
}
