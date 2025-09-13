import { ObjectId } from 'mongodb';
import { AppAwareDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from './common';
export type ModuleCategory = 'core' | 'business' | 'integration' | 'analytics';
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'export' | 'import' | 'attend' | 'assign';
export type PermissionScope = 'all' | 'own' | 'team';
export interface Module extends AppAwareDocument {
    _id: ObjectId;
    name: string;
    displayName: string;
    description: string;
    icon?: string;
    availableActions: PermissionAction[];
    requiresScope: boolean;
    defaultScope: PermissionScope;
    category: ModuleCategory;
    status: ActiveStatus;
}
export interface ModulePermission {
    actions: PermissionAction[];
    scope: PermissionScope;
}
export interface ModuleQuery extends PaginationQuery {
    status?: ActiveStatus;
    category?: ModuleCategory;
    name?: string;
    requiresScope?: boolean;
}
export type ModuleResponse = Module;
export interface ModuleListResponse extends ListResponse<ModuleResponse> {
}
export interface ModuleQueryOptions extends GenericQueryOptions<ModuleQuery> {
}
export interface CreateModuleRequest {
    name: string;
    displayName: string;
    description: string;
    icon?: string;
    availableActions: PermissionAction[];
    requiresScope: boolean;
    defaultScope: PermissionScope;
    category: ModuleCategory;
}
export interface UpdateModuleRequest {
    displayName?: string;
    description?: string;
    icon?: string;
    availableActions?: PermissionAction[];
    requiresScope?: boolean;
    defaultScope?: PermissionScope;
    category?: ModuleCategory;
    status?: ActiveStatus;
}
