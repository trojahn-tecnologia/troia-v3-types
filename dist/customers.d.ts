export interface CustomerAddress {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
export interface Customer {
    _id?: string;
    appId: string;
    companyId: string;
    name: string;
    document?: string;
    type: 'PF' | 'PJ';
    picture?: string;
    tags: string[];
    domains: string[];
    segment: string;
    contacts: string[];
    assigneeId?: string;
    teamId?: string;
    address?: CustomerAddress;
    website?: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}
export interface CreateCustomerRequest {
    name: string;
    document?: string;
    type: 'PF' | 'PJ';
    picture?: string;
    tags?: string[];
    domains?: string[];
    segment: string;
    contacts?: string[];
    assigneeId?: string;
    teamId?: string;
    address?: CustomerAddress;
    website?: string;
    status?: 'active' | 'inactive';
}
export interface UpdateCustomerRequest {
    name?: string;
    document?: string;
    type?: 'PF' | 'PJ';
    picture?: string;
    tags?: string[];
    domains?: string[];
    segment?: string;
    contacts?: string[];
    assigneeId?: string;
    teamId?: string;
    address?: CustomerAddress;
    website?: string;
    status?: 'active' | 'inactive';
}
export interface CustomerServiceResponse extends Omit<Customer, '_id'> {
    id: string;
}
export interface CustomerServiceQuery extends PaginationQuery {
    filters?: {
        name?: string;
        document?: string;
        type?: 'PF' | 'PJ';
        domains?: string[];
        segment?: string;
        status?: 'active' | 'inactive';
        tags?: string[];
        assigneeId?: string;
        teamId?: string;
    };
}
export interface CustomerServiceListResponse extends ListResponse<CustomerServiceResponse> {
}
import { PaginationQuery, ListResponse } from './common';
