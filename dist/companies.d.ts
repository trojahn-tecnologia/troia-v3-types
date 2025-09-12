import { FullTenantDocument, ActiveStatus, Address } from './common';
export interface Company extends FullTenantDocument {
    name: string;
    email: string;
    phone?: string;
    website?: string;
    logo?: string;
    status: ActiveStatus;
    address: Address;
}
export interface CreateCompanyRequest {
    name: string;
    email: string;
    phone?: string;
    website?: string;
    address: Address;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
}
export interface UpdateCompanyRequest {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    logo?: string;
    status?: ActiveStatus;
    address?: Partial<Address>;
}
export type CompanyStatus = ActiveStatus;
