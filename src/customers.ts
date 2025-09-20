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
  id: string;
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

  // Assignment system integration
  assigneeId?: string;
  teamId?: string;

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

export type CustomerResponse = Customer;

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

export interface CustomerListResponse extends ListResponse<CustomerResponse> {}

// Import types
import { PaginationQuery, ListResponse } from './common';