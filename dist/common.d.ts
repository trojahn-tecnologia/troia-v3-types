import { ObjectId } from 'mongodb';
export interface BaseDocument {
    _id?: ObjectId;
    createdAt: Date;
    updatedAt?: Date;
}
export interface TenantAwareDocument extends BaseDocument {
    appId: ObjectId;
    companyId: ObjectId;
}
export interface FullBaseDocument extends BaseDocument, SoftDeletable {
}
export interface FullTenantDocument extends TenantAwareDocument, SoftDeletable {
}
export interface SoftDeletable {
    deletedAt?: Date;
}
export interface Auditable {
    createdAt: Date;
    updatedAt?: Date;
}
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
export type EntityStatus = 'active' | 'inactive' | 'blocked';
export type ActiveStatus = 'active' | 'inactive';
export type ExtendedStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'error';
export interface EntityParams {
    id: string;
}
export interface RequestContext {
    appId: ObjectId;
    companyId?: ObjectId;
    userId?: ObjectId;
}
