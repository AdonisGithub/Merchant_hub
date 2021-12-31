export interface BusinessCustomerDTO {
    id?: number;
    name: string;
    businessType: string;
    type: string;
    status: string;
    description: string;
}

export interface BusinessCustomerFullDTO {
    id?: number;
    name: string;
    businessType: string;
    type: string;
    status: string;
    description: string;
}

export interface BusinessCustomersTypesDTO {
    shortName?: string,
    fullName: string,
}

export interface BusinessCustomersStatusDTO {
    shortName?: string,
    fullName: string,
}