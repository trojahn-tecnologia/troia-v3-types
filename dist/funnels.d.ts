import { PaginationQuery, ListResponse, AppAwareDocument, ActiveStatus } from './common';
import { AssignmentConfig as CoreAssignmentConfig } from './assignment';
export interface FunnelAssignmentConfig extends CoreAssignmentConfig {
    strategy: 'manual' | 'rule' | 'lottery' | 'none';
    rules?: FunnelAssignmentRule[];
    lotteryConfig?: FunnelLotteryConfig;
}
export interface FunnelAssignmentRule {
    condition: FunnelRuleCondition;
    action: FunnelRuleAction;
    priority: number;
    active: boolean;
}
export interface FunnelRuleCondition {
    type: 'source' | 'value' | 'priority' | 'tags' | 'customField';
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
    value: string | number | string[];
}
export interface FunnelRuleAction {
    type: 'assign_to_user' | 'assign_to_team' | 'trigger_lottery';
    userId?: string;
    teamId?: string;
    lotteryConfig?: FunnelLotteryConfig;
}
export interface FunnelLotteryConfig {
    enabled: boolean;
    algorithm: 'random' | 'weighted' | 'priority_based';
    type: 'random' | 'workload' | 'availability' | 'last_interaction' | 'fixed_operator' | 'shift' | 'none';
    eligibleUsers?: string[];
    fixedOperatorConfig?: {
        userId: string;
        fallbackToRandom: boolean;
    };
}
/**
 * Funnel - Sales funnel structure
 * Each funnel has its own independent steps
 */
export interface Funnel extends AppAwareDocument {
    name: string;
    description?: string;
    color: string;
    order: number;
    status: ActiveStatus;
    assignmentConfig?: FunnelAssignmentConfig;
}
export interface CreateFunnelRequest {
    name: string;
    description?: string;
    color: string;
    order?: number;
    assignmentConfig?: FunnelAssignmentConfig;
}
export interface UpdateFunnelRequest {
    name?: string;
    description?: string;
    color?: string;
    order?: number;
    status?: ActiveStatus;
    assignmentConfig?: FunnelAssignmentConfig;
}
export type FunnelResponse = Omit<Funnel, '_id'> & {
    id: string;
};
export interface FunnelQuery extends PaginationQuery {
    filters?: {
        status?: ActiveStatus;
        name?: string;
    };
}
export interface FunnelListResponse extends ListResponse<FunnelResponse> {
}
/**
 * FunnelStep - Individual stages within a funnel
 * Each step has its own color and order within the funnel
 */
export interface FunnelStep extends AppAwareDocument {
    funnelId: string;
    name: string;
    description?: string;
    color: string;
    order: number;
    status: ActiveStatus;
}
export interface CreateFunnelStepRequest {
    funnelId: string;
    name: string;
    description?: string;
    color: string;
    order?: number;
}
export interface UpdateFunnelStepRequest {
    name?: string;
    description?: string;
    color?: string;
    order?: number;
    status?: ActiveStatus;
}
export type FunnelStepResponse = Omit<FunnelStep, '_id'> & {
    id: string;
};
export interface FunnelStepQuery extends PaginationQuery {
    filters?: {
        funnelId?: string;
        status?: ActiveStatus;
        name?: string;
    };
}
export interface FunnelStepListResponse extends ListResponse<FunnelStepResponse> {
}
/**
 * Bulk operations
 */
export interface ReorderFunnelsRequest {
    funnelIds: string[];
}
export interface ReorderFunnelStepsRequest {
    stepIds: string[];
}
/**
 * Validation responses
 */
export interface FunnelDeleteValidation {
    canDelete: boolean;
    linkedLeadsCount: number;
    message: string;
}
export interface FunnelStepDeleteValidation {
    canDelete: boolean;
    linkedLeadsCount: number;
    message: string;
}
