import { ObjectId } from 'mongodb';
import { ModulePermission } from './modules';
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
