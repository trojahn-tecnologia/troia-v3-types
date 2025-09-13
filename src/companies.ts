import { ObjectId } from 'mongodb';
import { TenantAwareDocument, FullTenantDocument, ActiveStatus, Address, PaginationQuery, GenericQueryOptions, ListResponse } from "./common";
import { AssignmentConfig } from './assignment';

export interface Company extends FullTenantDocument {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  logo?: string;
  status: ActiveStatus;
  address: Address;
  defaultAssignmentConfig?: AssignmentConfig;
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
  defaultAssignmentConfig?: AssignmentConfig;
}

// Assignment configuration specific request
export interface UpdateCompanyAssignmentConfigRequest {
  defaultAssignmentConfig: AssignmentConfig;
}

export type CompanyStatus = ActiveStatus;
// ============================================================
// COMPANY SPECIFIC QUERY & RESPONSE TYPES
// ============================================================

// Company query with specific filters
export interface CompanyQuery extends PaginationQuery {
  status?: ActiveStatus;
  name?: string;
  email?: string;
}

// Company response (same as Company for now, but prepared for future changes)
export type CompanyResponse = Company;

// Company list response using generic
export interface CompanyListResponse extends ListResponse<CompanyResponse> {}

// Company query options using generic
export interface CompanyQueryOptions extends GenericQueryOptions<CompanyQuery> {}

// Special response for company registration (company + user)
export interface CompanyRegistrationResponse {
  company: CompanyResponse;
  user: any; // Will be UserResponse when we import it
}
