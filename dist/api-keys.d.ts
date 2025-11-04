import { PaginationQuery, ListResponse, GenericQueryOptions } from './common';
/**
 * External API Keys Types
 * Used for external API access with key-based authentication (not user JWT tokens)
 * These keys allow external platforms to integrate with the system
 */
export interface ExternalApiKeyQuery extends PaginationQuery {
    status?: 'active' | 'inactive' | 'expired';
    name?: string;
}
export interface ExternalApiKeyResponse {
    id: string;
    appId: string;
    companyId: string;
    name: string;
    key: string;
    keyPrefix: string;
    permissions: string[];
    status: 'active' | 'inactive' | 'expired';
    expiresAt?: string;
    lastUsedAt?: string;
    usageCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface ExternalApiKeyListResponse extends ListResponse<ExternalApiKeyResponse> {
}
export interface ExternalApiKeyQueryOptions extends GenericQueryOptions<ExternalApiKeyQuery> {
}
export interface CreateExternalApiKeyRequest {
    name: string;
    permissions?: string[];
    expiresAt?: string;
}
export interface UpdateExternalApiKeyRequest {
    name?: string;
    permissions?: string[];
    status?: 'active' | 'inactive';
    expiresAt?: string;
}
export interface CreateExternalApiKeyResponse extends ExternalApiKeyResponse {
    fullKey: string;
}
