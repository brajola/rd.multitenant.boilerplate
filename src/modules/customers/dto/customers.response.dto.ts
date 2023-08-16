export class CustomerAddressesResponse {
    id: number;
    type: string;
    CompanyId: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city_id: number;
    city_name: string;
    uf: string;
    zipcode: string;
    country_id: number;
    country_name: string;
    statusId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CustomersResponse {
    id: number;
    type: string;
    name: string;
    cnpj: string;
    email: string;
    phone_number: string;
    ie: string;
    im: string;
    accept_terms: number;
    statusId: number;
    createdAt: Date;
    updatedAt: Date;
    addresses?: Array<CustomerAddressesResponse>;
}