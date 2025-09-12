import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullBaseDocument, ActiveStatus } from './common';
export type ConnectionType = 'qr' | 'login_password' | 'meta' | 'secret' | 'key_secret' | 'token';
export interface IntegrationResponse extends FullBaseDocument {
    name: string;
    code: string;
    logo?: string;
    instructions?: Record<string, any>;
    connectionType: ConnectionType;
    startUrl?: string;
    stopUrl?: string;
    status: ActiveStatus;
    functions: IntegrationFunction[];
}
export interface IntegrationFunction {
    id: string;
    integrationId: string;
    code: string;
}
export interface IntegrationParams extends FullBaseDocument {
    appId: string;
    providerId: string;
    identifier?: string;
    environment: 'production' | 'sandbox' | 'development';
    instanceKey?: string;
    instanceToken?: string;
    params?: Record<string, any>;
    session?: string;
    webhook?: string;
}
export interface CreateIntegrationRequest {
    name: string;
    code: string;
    logo?: string;
    instructions?: Record<string, any>;
    connectionType: ConnectionType;
    startUrl?: string;
    stopUrl?: string;
    functions: string[];
}
export interface UpdateIntegrationRequest {
    name?: string;
    code?: string;
    logo?: string;
    instructions?: Record<string, any>;
    connectionType?: ConnectionType;
    startUrl?: string;
    stopUrl?: string;
    status?: ActiveStatus;
    functions?: string[];
}
export interface CreateIntegrationParamsRequest {
    providerId: string;
    identifier?: string;
    environment?: 'production' | 'sandbox' | 'development';
    instanceKey?: string;
    instanceToken?: string;
    params?: Record<string, any>;
    webhook?: string;
}
export interface UpdateIntegrationParamsRequest {
    identifier?: string;
    environment?: 'production' | 'sandbox' | 'development';
    instanceKey?: string;
    instanceToken?: string;
    params?: Record<string, any>;
    session?: string;
    webhook?: string;
}
export interface GetIntegrationsQuery extends PaginationQuery {
    status?: ActiveStatus;
    connectionType?: ConnectionType;
    functions?: string[];
}
export interface GetIntegrationParamsQuery extends PaginationQuery {
    providerId?: string;
    environment?: 'production' | 'sandbox' | 'development';
    instanceKey?: string;
}
export interface IntegrationApiResponse extends BaseApiResponse<IntegrationResponse> {
}
export interface IntegrationsListApiResponse extends PaginatedApiResponse<IntegrationResponse> {
}
export interface IntegrationParamsApiResponse extends BaseApiResponse<IntegrationParams> {
}
export interface IntegrationParamsListApiResponse extends PaginatedApiResponse<IntegrationParams> {
}
