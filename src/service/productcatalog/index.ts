import axios, { AxiosResponse } from 'axios';
import {
  ProductCatalogDTO,
} from './types';

const baseUrl = 'http://185.185.126.15:8000/api';

export async function getProductCatalog(page: number, size: number) {
  return await axios.get(
      `${baseUrl}/management/product_catalog/list?page=${page}&size=${size}`
  );
}

export async function sortProductCatalog(
    page: number,
    size: number,
    key: string,
    sort: string
) {
  return await axios.get(
      `${baseUrl}/management/product_catalog/list?page=${page}&size=${size}&sort=${key},${sort}`
  );
}

export async function getProduct(id: string) {
  return await axios.get(`${baseUrl}/management/product_catalog/product/${id}`);
}

export async function postProduct(
    data: ProductCatalogDTO
): Promise<AxiosResponse<ProductCatalogDTO>> {
  return await axios.post<ProductCatalogDTO>(
      `${baseUrl}/management/product_catalog/create`, data);
}

export async function updateProduct(
    id: string,
    data: ProductCatalogDTO
): Promise<AxiosResponse<ProductCatalogDTO>> {
  return await axios.post<ProductCatalogDTO>(
      `${baseUrl}/management/product_catalog/product/${id}`, data);
}

export const apiUrl =
    'http://185.185.126.15:8000/api/management/product_catalog/delete';
