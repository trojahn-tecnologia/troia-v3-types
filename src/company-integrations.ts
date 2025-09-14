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

// Integration configuration per provider
export interface IntegrationConfig {
  // WhatsApp Business API
  whatsappBusinessAccountId?: string;
  phoneNumberId?: string;
  webhookToken?: string;

  // Facebook/Meta
  pageId?: string;
  appSecret?: string;

  // Email
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;
  imapHost?: string;
  imapPort?: number;

  // Telegram
  botToken?: string;

  // Instagram
  instagramBusinessAccountId?: string;

  // Custom integrations
  customFields?: Record<string, any>;
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

// Specific request types
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
  testType: 'connection' | 'send_message' | 'webhook';
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