import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, TenantAwareDocument } from './common';
export type ProviderFunction = 'payment' | 'delivery' | 'calendar' | 'chat' | 'email' | 'sms' | 'voip' | 'ai' | 'storage';
export type ProviderType = 'asaas' | 'pagarme' | 'telegram' | 'whatsapp' | 'whatsapp_business' | 'instagram' | 'facebook_messenger' | 'google_calendar' | 'dwv' | 'jetimob' | 'apresentame' | 'workmail' | 'troia' | 'firebase' | 'smtp' | 'elevenlabs' | 'anthropic' | 'grok' | 'deepseek';
export interface ProviderResponse extends TenantAwareDocument {
    name: string;
    type: ProviderType;
    functions: ProviderFunction[];
    status: 'active' | 'inactive' | 'error' | 'testing';
    credentials: Record<string, any>;
    parameters: Record<string, any>;
    webhookUrl?: string;
    lastSyncAt?: Date;
    lastErrorAt?: Date;
    lastErrorMessage?: string;
    config: ProviderConfig;
}
export interface ProviderConfig {
    rateLimit?: {
        requests: number;
        period: number;
    };
    timeout?: number;
    retryAttempts?: number;
    retryDelay?: number;
    sandbox?: boolean;
    features?: string[];
}
export interface CreateProviderRequest {
    name: string;
    type: ProviderType;
    functions: ProviderFunction[];
    credentials: Record<string, any>;
    parameters?: Record<string, any>;
    webhookUrl?: string;
    config?: ProviderConfig;
}
export interface UpdateProviderRequest {
    name?: string;
    functions?: ProviderFunction[];
    status?: 'active' | 'inactive' | 'error' | 'testing';
    credentials?: Record<string, any>;
    parameters?: Record<string, any>;
    webhookUrl?: string;
    config?: ProviderConfig;
}
export interface TestProviderRequest {
    providerId: string;
    testType: 'connection' | 'send_message' | 'payment' | 'calendar_event';
    testData?: Record<string, any>;
}
export interface TestProviderResponse {
    success: boolean;
    message: string;
    response?: any;
    latency?: number;
}
export interface GetProvidersQuery extends PaginationQuery {
    status?: 'active' | 'inactive' | 'error' | 'testing';
    type?: ProviderType;
    functions?: ProviderFunction[];
}
export interface ProviderApiResponse extends BaseApiResponse<ProviderResponse> {
}
export interface ProvidersListApiResponse extends PaginatedApiResponse<ProviderResponse> {
}
export interface TestProviderApiResponse extends BaseApiResponse<TestProviderResponse> {
}
