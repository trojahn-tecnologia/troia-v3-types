import { ObjectId } from 'mongodb';
import { ModulePermission } from './modules';

// Estrutura simplificada de permissões do usuário
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