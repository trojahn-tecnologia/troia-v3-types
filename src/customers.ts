// Customer Types - Multi-domain support
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

  // Identification
  name: string;
  document?: string;
  type: 'PF' | 'PJ';
  picture?: string;
  tags: string[];

  // Auto-association (multiple domains)
  domains: string[];
  segment: string;

  // Relationships
  contacts: string[];

  // Additional information
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
  };
}

export interface CustomerServiceListResponse extends ListResponse<CustomerServiceResponse> {}

// Import types
import { PaginationQuery, ListResponse } from './common';