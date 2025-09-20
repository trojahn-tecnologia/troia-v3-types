import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, ExtendedStatus } from './common';
import {
  SmtpConfig,
  SendGridConfig,
  WhatsAppConfig,
  FacebookMessengerConfig,
  TelegramConfig,
  TwilioSmsConfig,
  WebhookConfig,
  ProviderConfig,
  ProviderCredentials,
  ProviderId,
  CreateSmtpIntegrationRequest,
  CreateSendGridIntegrationRequest,
  CreateWhatsAppIntegrationRequest,
  CreateFacebookMessengerIntegrationRequest,
  CreateTelegramIntegrationRequest,
  CreateWebhookIntegrationRequest,
  CreateProviderIntegrationRequest
} from './providers';

// Base CompanyIntegration interface
export interface CompanyIntegration {
  id: string;
  companyId: ObjectId;
  appId: ObjectId;
  providerId: string; // Reference to provider in utils/providers.ts
  name: string;
  description?: string;
  config: IntegrationConfig;
  credentials: IntegrationCredentials;
  status: ExtendedStatus;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// LEGACY GENERIC CONFIG (For backward compatibility)
// ============================================================================

export interface IntegrationConfig {
  // Generic fields for providers not yet specifically typed
  [key: string]: any;
}

// Integration credentials (encrypted in database) - using shared type from providers
export interface IntegrationCredentials extends ProviderCredentials {}

// Request/Response types following Generic + Specific pattern
export interface CompanyIntegrationQuery extends PaginationQuery {
  providerId?: string;
  status?: ExtendedStatus;
  name?: string;
}

// Company Integration Response (without credentials, with provider info)
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

export interface CompanyIntegrationListResponse extends ListResponse<CompanyIntegrationResponse> {}

// ============================================================================
// COMPANY-SPECIFIC TYPED REQUESTS (Using shared provider types)
// ============================================================================

// Re-export shared typed requests for company integrations
export type CreateCompanyIntegrationTypedRequest = CreateProviderIntegrationRequest;

// ============================================================================
// LEGACY GENERIC REQUEST (For backward compatibility)
// ============================================================================

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

// Integration test types
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

// Sync operation types
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

// Query and list types
export interface CompanyIntegrationQuery extends PaginationQuery {
  status?: ExtendedStatus;
  providerId?: string;
}