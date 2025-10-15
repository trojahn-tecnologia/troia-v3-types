import { ObjectId } from 'mongodb';
import { FullTenantDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from './common';
import { ModulePermission } from './modules';
/**
 * User Permission - Individual permissions for specific users
 * This is additive to level permissions
 */
export interface UserPermission extends FullTenantDocument {
    userId: ObjectId;
    permissions: Record<string, ModulePermission>;
    status: ActiveStatus;
}
export interface UserPermissionQuery extends PaginationQuery {
    status?: ActiveStatus;
    userId?: string;
}
export interface UserPermissionResponse {
    id: string;
    userId: string;
    permissions: Record<string, ModulePermission>;
    companyId: string;
    appId: string;
    status: ActiveStatus;
    createdAt: string;
    updatedAt: string;
}
export interface UserPermissionListResponse extends ListResponse<UserPermissionResponse> {
}
export interface UserPermissionQueryOptions extends GenericQueryOptions<UserPermissionQuery> {
}
export interface CreateUserPermissionRequest {
    userId: string;
    permissions: Record<string, ModulePermission>;
}
export interface UpdateUserPermissionRequest {
    permissions?: Record<string, ModulePermission>;
    status?: ActiveStatus;
}
export interface UserModulePermissions {
    level: ObjectId;
    permissions: Record<string, ModulePermission>;
}
export interface UserEffectivePermissions {
    modules: Record<string, ModulePermission>;
    calculatedAt: Date;
    expiresAt: Date;
}
export interface PermissionCheck {
    moduleId: string;
    action: string;
    scope?: string;
    resourceId?: string;
}
export interface PermissionCheckResult {
    allowed: boolean;
    reason?: string;
    effectiveScope: string;
    matchedRule?: string;
}
