import { AppAwareDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from './common';
export interface Plan extends AppAwareDocument {
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
        currency: string;
    };
    modules: PlanModule[];
    limits: PlanLimits;
    status: ActiveStatus;
}
export interface PlanModule {
    moduleId: string;
    limit: number;
}
export type PlanLimits = Record<string, number>;
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
export interface PlanListResponse extends ListResponse<PlanResponse> {
}
export interface PlanQueryOptions extends GenericQueryOptions<PlanQuery> {
}
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
