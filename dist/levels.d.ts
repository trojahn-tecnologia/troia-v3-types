import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, TenantAwareDocument } from './common';
export interface LevelResponse extends TenantAwareDocument {
    name: string;
    description?: string;
    isDefault: boolean;
    isSystem: boolean;
    permissions: LevelPermission[];
    maxUsers?: number;
    features: string[];
    status: 'active' | 'inactive';
}
export interface LevelPermission {
    resource: string;
    actions: ('create' | 'read' | 'update' | 'delete' | 'export' | 'import')[];
    scope: 'all' | 'own' | 'selected';
    conditions?: Record<string, any>;
}
export interface CreateLevelRequest {
    name: string;
    description?: string;
    permissions: LevelPermission[];
    maxUsers?: number;
    features?: string[];
}
export interface UpdateLevelRequest {
    name?: string;
    description?: string;
    permissions?: LevelPermission[];
    maxUsers?: number;
    features?: string[];
    status?: 'active' | 'inactive';
}
export interface GetLevelsQuery extends PaginationQuery {
    status?: 'active' | 'inactive';
    isDefault?: boolean;
    isSystem?: boolean;
}
export interface LevelApiResponse extends BaseApiResponse<LevelResponse> {
}
export interface LevelsListApiResponse extends PaginatedApiResponse<LevelResponse> {
}
