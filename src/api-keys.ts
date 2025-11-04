import { PaginationQuery, ListResponse, GenericQueryOptions } from './common';

/**
 * API Keys Types
 * Used for external API access with key-based authentication
 */

// Generic Query Pattern
export interface ApiKeyQuery extends PaginationQuery {
  status?: 'active' | 'inactive' | 'expired';
  name?: string;
}

// Response Types
export interface ApiKeyResponse {
  id: string;
  appId: string;
  companyId: string;
  name: string;
  key: string;                        // Masked key (sk_live_***xyz789)
  keyPrefix: string;                  // First 8 chars (sk_live_)
  permissions: string[];              // Optional granular permissions
  status: 'active' | 'inactive' | 'expired';
  expiresAt?: string;                 // ISO 8601 timestamp
  lastUsedAt?: string;                // ISO 8601 timestamp
  usageCount: number;                 // Track API calls
  createdAt: string;
  updatedAt: string;
}

export interface ApiKeyListResponse extends ListResponse<ApiKeyResponse> {}
export interface ApiKeyQueryOptions extends GenericQueryOptions<ApiKeyQuery> {}

// Create Request
export interface CreateApiKeyRequest {
  name: string;                       // Friendly name (e.g., "Integração RD Station")
  permissions?: string[];             // Optional permissions (e.g., ["leads:write"])
  expiresAt?: string;                 // Optional expiration (ISO 8601)
}

// Update Request
export interface UpdateApiKeyRequest {
  name?: string;
  permissions?: string[];
  status?: 'active' | 'inactive';
  expiresAt?: string;                 // ISO 8601 timestamp
}

// Create Response (includes full key only on creation)
export interface CreateApiKeyResponse extends ApiKeyResponse {
  fullKey: string;                    // Full unhashed key (only returned once!)
}
