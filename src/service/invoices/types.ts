import {Moment} from "moment";

export interface InvoiceDTO {
    invoiceNumber?: string,
    status?: string,
    clientCompany?: string,
    invoiceDate?: Moment | null,
    recipient?: string,
    currency?: string,
    createdAt?: Moment | null
}

export interface InvoiceFullDTO {
    id?: number,
    invoiceNumber?: string,
    companyName?: string,
    phone?: string,
    address?: string,
    postCode?: string,
    companyNumber?: string,
    bankAccount?: string,
    submitDate?: Moment | null;
    bankName?: string,
    bankAddress?: string,
    alternativeBankAccount?: string,
    alternativeBankName?: string,
    alternativeBankAddress?: string,
    vatNumber?: string,
    swiftBic?: string,
    iban?: string,
    vatTax?: number,
    currency?: string,
    signature?: string,
    invoiceDate?: Moment | null,
    delayTax?: number,
    referenceNumber?: string,
    notes?: string,
    sendAt?: Moment | null,
    status?: string,
    clientEmail?: string,
    clientCompany?: string,
    clientCompanyNumber?: string,
    clientCompanyVatNumber?: string,
    clientCompanyAddress?: string,
    clientCompanyPostCode?: string,
    language?: string,
    recipient?: string
}

export interface InvoiceStatusTypesDTO {
    shortName?: string,
    fullName: string,
}

export interface InvoicesCurrenciesListDTO {
    shortName?: string,
    fullName: string,
}

export interface InvoicesLanguagesListDTO {
    shortName?: string,
    fullName: string,
}