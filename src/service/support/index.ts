import axios, { AxiosResponse } from 'axios';
import {
  TicketCategoryTypesDTO,
  TicketFullDTO,
  TicketSeverityLevelsDTO,
  TicketStatusTypesDTO,
} from './types';

const baseUrl = 'http://185.185.126.15:8000/api';

export async function getTickets(page: number, size: number) {
  return await axios.get(
      `${baseUrl}/management/support/tickets/list?page=${page}&size=${size}`
  );
}

// TODO
export async function getOpenTickets(page: number, size: number) {
  return await axios.get(
      `${baseUrl}/management/support/tickets/list?page=${page}&size=${size}&status=new`
  );
}

// TODO
export async function getClosedTickets(page: number, size: number) {
  return await axios.get(
      `${baseUrl}/management/support/tickets/list?page=${page}&size=${size}&status=closed`
  );
}

export async function sortTickets(
    page: number,
    size: number,
    key: string,
    sort: string
) {
  return await axios.get(
      `${baseUrl}/management/support/tickets/list?page=${page}&size=${size}&sort=${key},${sort}`
  );
}

export async function getTicket(id: string) {
  return await axios.get(`${baseUrl}/management/support/tickets/ticket/${id}`);
}

export async function postTicket(
    data: TicketFullDTO
): Promise<AxiosResponse<TicketFullDTO>> {
  return await axios.post<TicketFullDTO>(
      `${baseUrl}/management/support/tickets/create`, data);
}

export async function updateTicket(
    id: string,
    data: TicketFullDTO | undefined
): Promise<AxiosResponse<TicketFullDTO>> {
  return await axios.post<TicketFullDTO>(
      `${baseUrl}/management/support/tickets/ticket/${id}`, data);
}

export async function getTicketSeverityTypes(): Promise<
    AxiosResponse<TicketSeverityLevelsDTO[]>
    > {
  return await axios.get<TicketSeverityLevelsDTO[]>(
      `${baseUrl}/management/support/tickets/severity_levels`
  );
}

export async function getTicketStatusTypes(): Promise<
    AxiosResponse<TicketStatusTypesDTO[]>
    > {
  return await axios.get<TicketStatusTypesDTO[]>(
      `${baseUrl}/management/support/tickets/status_types`
  );
}

export async function getTicketCategories(): Promise<
    AxiosResponse<TicketCategoryTypesDTO[]>
    > {
  return await axios.get<TicketCategoryTypesDTO[]>(
      `${baseUrl}/management/support/tickets/categories`
  );
}

export const apiUrl =
  'http://185.185.126.15:8000/api/management/support/tickets/delete';
