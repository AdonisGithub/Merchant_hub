import { Moment } from 'moment';

export interface JourneyDTO {
    id?: number,
    title?: string,
    createdAt?: Moment | null,
    updatedAt?: Moment | null,
}

export interface JourneyFullDTO {
    id?: number,
    title?: string,
    createdAt?: Moment | null,
    updatedAt?: Moment | null,
}
