import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';
/**
 * App Integrations Types (Core System Level)
 * Used for system-level integrations like password reset email, system notifications, etc.
 */
export interface AppIntegrationQuery extends PaginationQuery {
    status?: ActiveStatus;
    providerId?: string;
    isDefault?: boolean;
}
export interface AppIntegrationResponse {
    _id: string;
    appId: string;
    providerId: string;
    name: string;
    status: 'active' | 'inactive' | 'error' | 'pending';
    isDefault: boolean;
    capabilities: string[];
    providerName: string;
    lastSync?: string;
    lastError?: string;
    createdAt: string;
    updatedAt: string;
}
export interface AppIntegrationListResponse extends ListResponse<AppIntegrationResponse> {
}
export interface AppIntegrationQueryOptions extends GenericQueryOptions<AppIntegrationQuery> {
}
export interface CreateAppIntegrationRequest {
    providerId: string;
    name: string;
    config: Record<string, any>;
    isDefault?: boolean;
}
export interface UpdateAppIntegrationRequest {
    name?: string;
    config?: Record<string, any>;
    status?: 'active' | 'inactive' | 'error' | 'pending';
    isDefault?: boolean;
}
export interface TestAppIntegrationRequest {
    testType: 'send_email' | 'send_message' | 'send_webhook';
    testData: Record<string, any>;
}
export interface ProviderDefinitionResponse {
    id: string;
    name: string;
    capabilities: string[];
    categories: string[];
    status: 'active' | 'inactive';
    configSchema: Record<string, any>;
}
