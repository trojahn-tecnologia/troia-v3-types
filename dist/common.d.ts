import { ObjectId } from 'mongodb';
export interface BaseApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    position?: 'center-top' | 'center-bottom' | 'top-right' | 'bottom-right';
    action?: 'reload' | 'logout' | 'redirect' | 'refresh';
}
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
export type ActiveStatus = 'active' | 'inactive';
export type ExtendedStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'error';
export type CallStatus = 'open' | 'waiting' | 'closed' | 'transferred';
export interface SoftDeletable {
    deletedAt?: Date;
}
export interface Auditable {
    createdAt: Date;
    updatedAt?: Date;
}
export interface FullBaseDocument extends BaseDocument, SoftDeletable {
}
export interface FullTenantDocument extends TenantAwareDocument, SoftDeletable {
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
export interface RequestContext {
    appId: ObjectId;
    companyId?: ObjectId;
    userId?: ObjectId;
}
