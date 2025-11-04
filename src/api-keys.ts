import { PaginationQuery, ListResponse, GenericQueryOptions } from './common';

/**
 * External API Keys Types
 * Used for external API access with key-based authentication (not user JWT tokens)
 * These keys allow external platforms to integrate with the system
 */

// Generic Query Pattern
export interface ExternalApiKeyQuery extends PaginationQuery {
  status?: 'active' | 'inactive' | 'expired';
  name?: string;
}

// Response Types
export interface ExternalApiKeyResponse {
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

export interface ExternalApiKeyListResponse extends ListResponse<ExternalApiKeyResponse> {}
export interface ExternalApiKeyQueryOptions extends GenericQueryOptions<ExternalApiKeyQuery> {}

// Create Request
export interface CreateExternalApiKeyRequest {
  name: string;                       // Friendly name (e.g., "Integração RD Station")
  permissions?: string[];             // Optional permissions (e.g., ["leads:write"])
  expiresAt?: string;                 // Optional expiration (ISO 8601)
}

// Update Request
export interface UpdateExternalApiKeyRequest {
  name?: string;
  permissions?: string[];
  status?: 'active' | 'inactive';
  expiresAt?: string;                 // ISO 8601 timestamp
}

// Create Response (includes full key only on creation)
export interface CreateExternalApiKeyResponse extends ExternalApiKeyResponse {
  fullKey: string;                    // Full unhashed key (only returned once!)
}
