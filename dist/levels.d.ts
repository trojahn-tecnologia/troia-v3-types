import { FullTenantDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from './common';
import { ModulePermission } from './modules';
export interface Level extends FullTenantDocument {
    name: string;
    description: string;
    permissions: Record<string, ModulePermission>;
    status: ActiveStatus;
}
export interface LevelQuery extends PaginationQuery {
    status?: ActiveStatus;
    name?: string;
}
export interface LevelResponse {
    name: string;
    description: string;
    permissions: Record<string, ModulePermission>;
    companyId: string;
    appId: string;
    status: ActiveStatus;
    createdAt: string;
    updatedAt: string;
}
export interface LevelListResponse extends ListResponse<LevelResponse> {
}
export interface LevelQueryOptions extends GenericQueryOptions<LevelQuery> {
}
export interface CreateLevelRequest {
    name: string;
    description: string;
    permissions: Record<string, ModulePermission>;
}
export interface UpdateLevelRequest {
    name?: string;
    description?: string;
    permissions?: Record<string, ModulePermission>;
    status?: ActiveStatus;
}
