import axios, { AxiosResponse } from 'axios';
import {
  BusinessCustomerDTO, BusinessCustomersStatusDTO, BusinessCustomersTypesDTO,
} from './types';

const baseUrl = 'http://185.185.126.15:8000/api';

export async function getBusinessCustomers(page: number, size: number) {
  return await axios.get(
      `${baseUrl}/management/business_customers/list?page=${page}&size=${size}`
  );
}

export async function sortBusinessCustomers(
    page: number,
    size: number,
    key: string,
    sort: string
) {
  return await axios.get(
      `${baseUrl}/management/business_customers/list?page=${page}&size=${size}&sort=${key},${sort}`
  );
}

export async function getBusinessCustomerTypesList(): Promise<
    AxiosResponse<BusinessCustomersTypesDTO[]>
    > {
  return await axios.get<BusinessCustomersTypesDTO[]>(
      `${baseUrl}/management/business_customers/customer_types`
  );
}

export async function getBusinessCustomerStatusList(): Promise<
    AxiosResponse<BusinessCustomersStatusDTO[]>
    > {
  return await axios.get<BusinessCustomersStatusDTO[]>(
      `${baseUrl}/management/business_customers/status_types`
  );
}

export async function getBusinessCustomer(id: string) {
  return await axios.get(`${baseUrl}/management/business_customers/customer/${id}`);
}

export async function postBusinessCustomer(
    data: BusinessCustomerDTO
): Promise<AxiosResponse<BusinessCustomerDTO>> {
  return await axios.post<BusinessCustomerDTO>(
      `${baseUrl}/management/business_customers/create`, data);
}

export async function updateBusinessCustomer(
    id: string,
    data: BusinessCustomerDTO
): Promise<AxiosResponse<BusinessCustomerDTO>> {
  return await axios.post<BusinessCustomerDTO>(
      `${baseUrl}/management/business_customers/customers/${id}`, data);
}

export const apiUrl =
    'http://185.185.126.15:8000/api/management/business_customers/delete';
