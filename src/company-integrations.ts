import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, ExtendedStatus } from './common';

// Base CompanyIntegration interface
export interface CompanyIntegration {
  _id: ObjectId;
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
// PROVIDER-SPECIFIC CONFIGURATIONS (Type-Safe)
// ============================================================================

export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
  from: string;
}

export interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
  fromName?: string;
}

export interface WhatsAppConfig {
  whatsappBusinessAccountId: string;
  phoneNumberId: string;
  webhookToken?: string;
}

export interface FacebookMessengerConfig {
  pageId: string;
  appSecret: string;
  webhookToken?: string;
}

export interface TelegramConfig {
  botToken: string;
  webhookUrl?: string;
}

export interface TwilioSmsConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

export interface WebhookConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  authentication?: {
    type: 'bearer' | 'basic' | 'api_key';
    token: string;
  };
}

// ============================================================================
// UNION TYPE FOR TYPE-SAFE PROVIDER CONFIGS
// ============================================================================

export type ProviderConfig =
  | SmtpConfig
  | SendGridConfig
  | WhatsAppConfig
  | FacebookMessengerConfig
  | TelegramConfig
  | TwilioSmsConfig
  | WebhookConfig;

// ============================================================================
// LEGACY GENERIC CONFIG (For backward compatibility)
// ============================================================================

export interface IntegrationConfig {
  // Generic fields for providers not yet specifically typed
  [key: string]: any;
}

// Integration credentials (encrypted in database)
export interface IntegrationCredentials {
  // Common OAuth fields
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;

  // API Key authentication
  apiKey?: string;
  apiSecret?: string;

  // Basic authentication
  username?: string;
  password?: string;

  // Custom authentication
  customAuth?: Record<string, any>;
}

// Request/Response types following Generic + Specific pattern
export interface CompanyIntegrationQuery extends PaginationQuery {
  providerId?: string;
  status?: ExtendedStatus;
  name?: string;
}

// Company Integration Response (without credentials, with provider info)
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
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyIntegrationListResponse extends ListResponse<CompanyIntegrationResponse> {}

// ============================================================================
// PROVIDER-SPECIFIC REQUEST TYPES (Type-Safe)
// ============================================================================

export interface CreateSmtpIntegrationRequest {
  providerId: 'email-smtp';
  name: string;
  description?: string;
  config: SmtpConfig;
  credentials?: IntegrationCredentials;
}

export interface CreateSendGridIntegrationRequest {
  providerId: 'email-sendgrid';
  name: string;
  description?: string;
  config: SendGridConfig;
  credentials?: IntegrationCredentials;
}

export interface CreateWhatsAppIntegrationRequest {
  providerId: 'whatsapp-business';
  name: string;
  description?: string;
  config: WhatsAppConfig;
  credentials: IntegrationCredentials;
}

export interface CreateFacebookMessengerIntegrationRequest {
  providerId: 'facebook-messenger';
  name: string;
  description?: string;
  config: FacebookMessengerConfig;
  credentials: IntegrationCredentials;
}

export interface CreateTelegramIntegrationRequest {
  providerId: 'telegram-bot';
  name: string;
  description?: string;
  config: TelegramConfig;
  credentials?: IntegrationCredentials;
}

export interface CreateWebhookIntegrationRequest {
  providerId: 'api-webhook';
  name: string;
  description?: string;
  config: WebhookConfig;
  credentials?: IntegrationCredentials;
}

// ============================================================================
// UNION TYPE FOR TYPE-SAFE CREATE REQUESTS
// ============================================================================

export type CreateCompanyIntegrationTypedRequest =
  | CreateSmtpIntegrationRequest
  | CreateSendGridIntegrationRequest
  | CreateWhatsAppIntegrationRequest
  | CreateFacebookMessengerIntegrationRequest
  | CreateTelegramIntegrationRequest
  | CreateWebhookIntegrationRequest;

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