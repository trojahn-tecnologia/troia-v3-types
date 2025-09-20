import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, ExtendedStatus } from './common';
import { ProviderCredentials, CreateProviderIntegrationRequest } from './providers';
export interface CompanyIntegration {
    _id: ObjectId;
    companyId: ObjectId;
    appId: ObjectId;
    providerId: string;
    name: string;
    description?: string;
    config: IntegrationConfig;
    credentials: IntegrationCredentials;
    status: ExtendedStatus;
    lastSyncAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface IntegrationConfig {
    [key: string]: any;
}
export interface IntegrationCredentials extends ProviderCredentials {
}
export interface CompanyIntegrationQuery extends PaginationQuery {
    providerId?: string;
    status?: ExtendedStatus;
    name?: string;
}
export interface CompanyIntegrationResponse {
    id: string;
    companyId: string;
    appId: string;
    providerId: string;
    name: string;
    description?: string;
    config: IntegrationConfig;
    status: ExtendedStatus;
    capabilities: string[];
    providerName: string;
    lastSyncAt?: string;
    lastError?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CompanyIntegrationListResponse extends ListResponse<CompanyIntegrationResponse> {
}
export type CreateCompanyIntegrationTypedRequest = CreateProviderIntegrationRequest;
export interface CreateCompanyIntegrationRequest {
    providerId: string;
    name: string;
    description?: string;
    config: IntegrationConfig;
    credentials: IntegrationCredentials;
}
export interface UpdateCompanyIntegrationRequest {
    name?: string;
    description?: string;
    config?: Partial<IntegrationConfig>;
    credentials?: Partial<IntegrationCredentials>;
    status?: ExtendedStatus;
    lastError?: string;
}
export interface TestIntegrationRequest {
    integrationId: string;
    testType: 'connection' | 'send_message' | 'send_webhook';
    testData?: Record<string, any>;
}
export interface TestIntegrationResponse {
    success: boolean;
    message: string;
    details?: Record<string, any>;
    executedAt: Date;
}
export interface SyncIntegrationRequest {
    integrationId: string;
    syncType: 'full' | 'incremental' | 'contacts' | 'messages';
    options?: Record<string, any>;
}
export interface SyncIntegrationResponse {
    success: boolean;
    syncedCount: number;
    errorCount: number;
    message: string;
    syncedAt: Date;
}
export interface CompanyIntegrationQuery extends PaginationQuery {
    status?: ExtendedStatus;
    providerId?: string;
}
