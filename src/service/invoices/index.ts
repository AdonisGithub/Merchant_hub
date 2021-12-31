import axios, { AxiosResponse } from "axios";
import {
  InvoiceDTO,
  InvoiceFullDTO,
  InvoicesCurrenciesListDTO,
  InvoicesLanguagesListDTO,
  InvoiceStatusTypesDTO,
} from "./types";

const baseUrl = "http://185.185.126.15:8000/api";

export async function getInvoices(page: number, size: number) {
  return await axios.get(
    `${baseUrl}/management/invoices/list?page=${page}&size=${size}`
  );
}

export async function sortInvoices(
  page: number,
  size: number,
  key: string,
  sort: string
) {
  return await axios.get(
    `${baseUrl}/management/invoices/list?page=${page}&size=${size}&sort=${key},${sort}`
  );
}

export async function getInvoice(id: string) {
  return await axios.get(`${baseUrl}/management/invoices/invoice/${id}`);
}

export function getInvoicePdf(id: number) {
  return `${baseUrl}/management/invoices/export/pdf/${id}`;
}

export async function postInvoice(data: {
  alternativeBankName: string;
  notes: string;
  swiftBic: string;
  signature: string;
  clientCompany: string;
  companyName: string;
  submitDate: moment.Moment | null;
  bankName: string;
  language: string;
  delayTax: string;
  alternativeBankAccount: string;
  clientCompanyAddress: string;
  alternativeBankAddress: string;
  companyNumber: string;
  referenceNumber: string;
  invoiceNumber: string;
  currency: string;
  sendAt: moment.Moment | null;
  clientCompanyNumber: string;
  bankAccount: string;
  address: string;
  clientEmail: string;
  vatTax: string;
  invoiceDate: moment.Moment | null;
  bankAddress: string;
  clientCompanyPostCode: string;
  phone: string;
  iban: string;
  recipient: string;
  postCode: string;
  clientCompanyVatNumber: string;
  vatNumber: string;
  status: string;
}): Promise<AxiosResponse<InvoiceFullDTO>> {
  return await axios.post<InvoiceFullDTO>(
    `${baseUrl}/management/invoices/create`,
    data
  );
}

export async function updateInvoice(
  id: string,
  data: InvoiceFullDTO
): Promise<AxiosResponse<InvoiceFullDTO>> {
  return await axios.post<InvoiceFullDTO>(
    `${baseUrl}/management/invoices/${id}`,
    data
  );
}

export async function getInvoiceStatusTypes(): Promise<
  AxiosResponse<InvoiceStatusTypesDTO[]>
> {
  return await axios.get<InvoiceStatusTypesDTO[]>(
    `${baseUrl}/management/invoices/status_types`
  );
}

export async function getInvoiceCurrenciesList(): Promise<
  AxiosResponse<InvoicesCurrenciesListDTO[]>
> {
  return await axios.get<InvoicesCurrenciesListDTO[]>(
    `${baseUrl}/management/invoices/currencies`
  );
}

export async function getInvoiceLanguagesList(): Promise<
  AxiosResponse<InvoicesLanguagesListDTO[]>
> {
  return await axios.get<InvoicesCurrenciesListDTO[]>(
    `${baseUrl}/management/invoices/languages`
  );
}

export const apiUrl =
  "http://185.185.126.15:8000/api/management/invoices/delete";
