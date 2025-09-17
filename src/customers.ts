// Customer Types - Multi-domain support
export interface Address {
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
  address?: Address;
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
  address?: Address;
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
  address?: Address;
  website?: string;
  status?: 'active' | 'inactive';
}

export interface CustomerResponse extends Omit<Customer, '_id'> {
  id: string;
}

export interface CustomerQuery extends PaginationQuery {
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

export interface CustomerListResponse extends ListResponse<CustomerResponse> {}

// Import types
import { PaginationQuery, ListResponse } from './common';