import { ObjectId } from 'mongodb';

// Common types used across all modules

// Legacy-compatible API response format
export interface BaseApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'center-top' | 'center-bottom' | 'top-right' | 'bottom-right';
  action?: 'reload' | 'logout' | 'redirect' | 'refresh';
}

// Legacy exception format for error handling
export interface ApiException {
  error: string;
  message?: string;
  code: number;
  params?: Record<string, any> | any[] | string;
  type: 'error' | 'warning' | 'info';
  position: string;
  action?: string;
}

export interface PaginatedApiResponse<T = any> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BaseDocument {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TenantAwareDocument extends BaseDocument {
  appId: ObjectId;
  companyId: ObjectId;
}

export interface EntityParams {
  id: string;
}

export interface SearchQuery extends PaginationQuery {
  filters?: Record<string, any>;
}

// Status types used across modules
export type ActiveStatus = 'active' | 'inactive';
export type ExtendedStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'error';
export type CallStatus = 'open' | 'waiting' | 'closed' | 'transferred';

// Soft delete pattern
export interface SoftDeletable {
  deletedAt?: Date;
}

// Audit pattern
export interface Auditable {
  createdAt: Date;
  updatedAt?: Date;
}

// Complete base document with all patterns
export interface FullBaseDocument extends BaseDocument, SoftDeletable {}

// Multi-tenant aware document with full audit trail
export interface FullTenantDocument extends TenantAwareDocument, SoftDeletable {}

// Address type used across modules
export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Request context
export interface RequestContext {
  appId: ObjectId;
  companyId?: ObjectId;
  userId?: ObjectId;
}