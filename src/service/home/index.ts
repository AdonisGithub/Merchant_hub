import axios, {AxiosResponse} from "axios";
import {ClientsSummaryDTO, TicketsSummaryDTO} from "./types";

const baseUrl = 'http://185.185.126.15:8000/api';

export async function getClientsSummary(): Promise<AxiosResponse<ClientsSummaryDTO[]>> {
  return await axios.get<ClientsSummaryDTO[]>(
      `${baseUrl}/management/home/clients/summary`
  );
}

export async function getTicketsSummary(): Promise<AxiosResponse<TicketsSummaryDTO[]>> {
  return await axios.get<TicketsSummaryDTO[]>(
      `${baseUrl}/management/home/tickets/summary`
  );
}


