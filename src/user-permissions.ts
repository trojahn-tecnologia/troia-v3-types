import { ObjectId } from 'mongodb';
import { FullTenantDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from './common';
import { ModulePermission } from './modules';

/**
 * User Permission - Individual permissions for specific users
 * This is additive to level permissions
 */
export interface UserPermission extends FullTenantDocument {
  userId: ObjectId; // Reference to User
  permissions: Record<string, ModulePermission>; // moduleId -> permissions
  status: ActiveStatus;
}

// Generic + Specific Pattern
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

export interface UserPermissionListResponse extends ListResponse<UserPermissionResponse> {}
export interface UserPermissionQueryOptions extends GenericQueryOptions<UserPermissionQuery> {}

// Request types
export interface CreateUserPermissionRequest {
  userId: string;
  permissions: Record<string, ModulePermission>;
}

export interface UpdateUserPermissionRequest {
  permissions?: Record<string, ModulePermission>;
  status?: ActiveStatus;
}

// Estrutura simplificada de permissões do usuário (DEPRECATED - mantido para compatibilidade)
export interface UserModulePermissions {
  level: ObjectId; // Referência ao Level
  permissions: Record<string, ModulePermission>; // Permissões individuais por módulo
}

// Permissões efetivas calculadas (para cache)
export interface UserEffectivePermissions {
  modules: Record<string, ModulePermission>; // Resultado final (level + individual)
  calculatedAt: Date;
  expiresAt: Date; // Cache expira para recalcular
}

// Para verificações de permissão
export interface PermissionCheck {
  moduleId: string;
  action: string;
  scope?: string;
  resourceId?: string; // Para verificações específicas (ex: "own")
}

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
  effectiveScope: string;
  matchedRule?: string;
}
