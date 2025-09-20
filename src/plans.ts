import { ObjectId } from 'mongodb';
import { AppAwareDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from './common';

export interface Plan extends AppAwareDocument {
  name: string; // "Básico", "Pro", "Enterprise"
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  modules: PlanModule[]; // Módulos liberados neste plano
  limits: PlanLimits; // ✅ Simplificado
  status: ActiveStatus;
}

export interface PlanModule {
  moduleId: string; // Nome do módulo: "users", "crm", "chat", etc.
  limit: number; // ✅ Apenas um número simples
}

// ✅ Limits como Record simples
export type PlanLimits = Record<string, number>; // { users: 100, crm: 100, channels: 50, chat: 1000 }

// Generic + Specific Pattern
export interface PlanQuery extends PaginationQuery {
  status?: ActiveStatus;
  name?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export interface PlanResponse {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  modules: PlanModule[];
  limits: PlanLimits;
  appId: string;
  status: ActiveStatus;
  createdAt: string;
  updatedAt: string;
}
export interface PlanListResponse extends ListResponse<PlanResponse> {}
export interface PlanQueryOptions extends GenericQueryOptions<PlanQuery> {}

// Request types
export interface CreatePlanRequest {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  modules: PlanModule[];
  limits: PlanLimits;
}

export interface UpdatePlanRequest {
  name?: string;
  description?: string;
  price?: {
    monthly?: number;
    yearly?: number;
    currency?: string;
  };
  modules?: PlanModule[];
  limits?: PlanLimits;
  status?: ActiveStatus;
}