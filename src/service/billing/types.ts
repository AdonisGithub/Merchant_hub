import {Moment} from "moment";

export interface BillingSummaryDTO {
    paid?: number,
    outstanding?: number,
    pastDue?: number,
    cancelled?: number,
    createdAt?: Moment | null,
}
