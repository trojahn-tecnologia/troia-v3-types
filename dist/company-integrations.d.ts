import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, ExtendedStatus } from './common';
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
    whatsappBusinessAccountId?: string;
    phoneNumberId?: string;
    webhookToken?: string;
    pageId?: string;
    appSecret?: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpSecure?: boolean;
    imapHost?: string;
    imapPort?: number;
    botToken?: string;
    instagramBusinessAccountId?: string;
    customFields?: Record<string, any>;
}
export interface IntegrationCredentials {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
    apiKey?: string;
    apiSecret?: string;
    username?: string;
    password?: string;
    customAuth?: Record<string, any>;
}
export interface CompanyIntegrationQuery extends PaginationQuery {
    providerId?: string;
    status?: ExtendedStatus;
    name?: string;
}
export interface CompanyIntegrationResponse {
    _id: string;
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
    createdAt: string;
    updatedAt: string;
}
export interface CompanyIntegrationListResponse extends ListResponse<CompanyIntegrationResponse> {
}
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
}
export interface TestIntegrationRequest {
    integrationId: string;
    testType: 'connection' | 'send_message' | 'webhook';
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
