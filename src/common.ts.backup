import { ObjectId } from 'mongodb';

// ============================================================
// BASE DOCUMENT TYPES
// ============================================================

export interface BaseDocument {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TenantAwareDocument extends BaseDocument {
  appId: ObjectId;
  companyId: ObjectId;
}

// Complete base document with all patterns
export interface FullBaseDocument extends BaseDocument, SoftDeletable {}

// Multi-tenant aware document with full audit trail
export interface FullTenantDocument extends TenantAwareDocument, SoftDeletable {}

// ============================================================
// COMMON PATTERNS
// ============================================================

// Soft delete pattern
export interface SoftDeletable {
  deletedAt?: Date;
}

// Audit pattern
export interface Auditable {
  createdAt: Date;
  updatedAt?: Date;
}

// ============================================================
// ADDRESS TYPE (GLOBAL)
// ============================================================

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

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  errors?: any[];
}

// ============================================================
// QUERY & PAGINATION TYPES
// ============================================================

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

export interface QueryOptions {
  filters?: FilterOptions;
  sort?: SortOptions;
  pagination?: PaginationOptions;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchQuery extends PaginationQuery {
  filters?: Record<string, any>;
}

// ============================================================
// FORM TYPES
// ============================================================

export interface FormFieldError {
  message: string;
}

export interface FormErrors {
  [key: string]: FormFieldError | undefined;
}

export interface FormState {
  isSubmitting: boolean;
  isDirty: boolean;
  errors: FormErrors;
}

// ============================================================
// NOTIFICATION TYPES
// ============================================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

// ============================================================
// STATUS TYPES
// ============================================================

export type EntityStatus = 'active' | 'inactive' | 'blocked';
export type ActiveStatus = 'active' | 'inactive';
export type ExtendedStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'error';

// ============================================================
// UTILITY TYPES
// ============================================================

export interface EntityParams {
  id: string;
}

export interface RequestContext {
  appId: ObjectId;
  companyId?: ObjectId;
  userId?: ObjectId;
}