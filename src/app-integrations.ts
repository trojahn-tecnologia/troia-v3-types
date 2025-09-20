import { PaginationQuery, ListResponse, GenericQueryOptions, ExtendedStatus } from './common';
import { ProviderConfig, CreateProviderIntegrationRequest, ProviderId } from './providers';

/**
 * App Integrations Types (Core System Level)
 * Used for system-level integrations like password reset email, system notifications, etc.
 */

// Generic Query Pattern
export interface AppIntegrationQuery extends PaginationQuery {
  status?: ExtendedStatus;
  providerId?: string;
  isDefault?: boolean;
}

// Response Types
export interface AppIntegrationResponse {
  id: string;
  appId: string;
  providerId: string;
  name: string;
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'error' | 'pending';
  isDefault: boolean;
  capabilities: string[];
  providerName: string;
  lastSync?: string;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppIntegrationListResponse extends ListResponse<AppIntegrationResponse> {}
export interface AppIntegrationQueryOptions extends GenericQueryOptions<AppIntegrationQuery> {}

// ============================================================================
// APP-SPECIFIC TYPED REQUESTS (Using shared provider types)
// ============================================================================

// Type-safe requests using shared provider configurations
export type CreateAppIntegrationTypedRequest = CreateProviderIntegrationRequest & {
  isDefault?: boolean;
};

// Legacy generic request for backward compatibility
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
  lastSync?: string;
  lastError?: string;
}

// Test Integration Request
export interface TestAppIntegrationRequest {
  testType: 'send_email' | 'send_message' | 'send_webhook';
  testData: Record<string, any>;
}

// Available Providers Response
export interface ProviderDefinitionResponse {
  id: string;
  name: string;
  capabilities: string[];
  categories: string[];
  status: 'active' | 'inactive';
  configSchema: Record<string, any>;
}