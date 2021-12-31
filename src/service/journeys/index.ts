import axios, { AxiosResponse } from 'axios';
import {
  JourneyDTO,
  JourneyFullDTO,
} from './types';

const baseUrl = 'http://185.185.126.15:8000/api';

export async function getJourneys(page: number, size: number) {
  return await axios.get(
      `${baseUrl}/management/journeys/list?page=${page}&size=${size}`
  );
}

export async function sortJourneys(
    page: number,
    size: number,
    key: string,
    sort: string
) {
  return await axios.get(
      `${baseUrl}/management/journeys/list?page=${page}&size=${size}&sort=${key},${sort}`
  );
}

export async function getJourney(id: string) {
  return await axios.get(`${baseUrl}/management/journeys/ticket/${id}`);
}

export async function postJourney(
    data: JourneyFullDTO
): Promise<AxiosResponse<JourneyFullDTO>> {
  return await axios.post<JourneyFullDTO>(
      `${baseUrl}/management/journeys/create`, data);
}

export async function updateJourney(
    id: string,
    data: JourneyFullDTO | undefined
): Promise<AxiosResponse<JourneyFullDTO>> {
  return await axios.post<JourneyFullDTO>(
      `${baseUrl}/management/journeys/ticket/${id}`, data);
}

export const apiUrl =
  'http://185.185.126.15:8000/api/management/journeys/delete';
