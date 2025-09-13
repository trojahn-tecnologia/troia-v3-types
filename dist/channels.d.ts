import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';
export interface AssignmentConfig {
    strategy: 'manual' | 'rule' | 'lottery' | 'none';
    rules?: AssignmentRule[];
    lotteryConfig?: LotteryConfig;
}
export interface AssignmentRule {
    condition: RuleCondition;
    action: RuleAction;
    priority: number;
    active: boolean;
}
export interface RuleCondition {
    field: string;
    operator: 'equals' | 'contains' | 'in' | 'not_in';
    value: any;
}
export interface RuleAction {
    type: 'assign_team' | 'assign_user' | 'assign_both';
    teamId?: string;
    userId?: string;
}
export interface LotteryConfig {
    type: 'random' | 'availability' | 'workload' | 'last_interaction' | 'fixed_operator' | 'shift' | 'none';
    scope: 'team' | 'user' | 'both';
    eligibleTeams?: string[];
    eligibleUsers?: string[];
    shiftConfig?: {
        shiftId: string;
        fallbackToAvailable: boolean;
        considerWorkload: boolean;
        onlyPrimary: boolean;
    };
    workloadConfig?: {
        resourceType: 'lead' | 'customer' | 'ticket';
        maxAssignments: number;
        timeWindow: number;
    };
    availabilityConfig?: {
        considerWorkingHours: boolean;
        considerStatus: boolean;
        workingHours: {
            start: string;
            end: string;
        };
    };
    fixedOperatorConfig?: {
        userId: string;
        fallbackToRandom: boolean;
    };
    lastInteractionConfig?: {
        resourceType: 'lead' | 'customer';
        fallbackToRandom: boolean;
    };
}
export interface Provider {
    _id: ObjectId;
    name: string;
    categories: string[];
    capabilities: string[];
    status: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface Channel {
    _id: ObjectId;
    name: string;
    integrationId: ObjectId;
    identifier: string;
    assignmentConfig: AssignmentConfig;
    companyId: ObjectId;
    appId: ObjectId;
    status: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface ChannelQuery extends PaginationQuery {
    integrationId?: string;
    identifier?: string;
    status?: ActiveStatus;
}
export type ProviderResponse = Omit<Provider, never>;
export type ChannelResponse = Omit<Channel, never>;
export interface ProviderListResponse extends ListResponse<ProviderResponse> {
}
export interface ChannelListResponse extends ListResponse<ChannelResponse> {
}
export interface ChannelQueryOptions extends GenericQueryOptions<ChannelQuery> {
}
export interface CreateChannelRequest {
    name: string;
    integrationId: string;
    identifier: string;
    assignmentConfig: AssignmentConfig;
}
export interface UpdateChannelRequest {
    name?: string;
    identifier?: string;
    assignmentConfig?: AssignmentConfig;
    status?: ActiveStatus;
}
export interface AssignmentResult {
    teamId: string | null;
    userId: string | null;
    reason?: string;
}
export interface TestAssignmentRequest {
    channelId: string;
    resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
    resourceId: string;
    priority?: number;
    metadata?: Record<string, any>;
}
export interface TestAssignmentResponse {
    success: boolean;
    assignedTo: AssignmentResult;
    message: string;
    executedAt: Date;
    details?: Record<string, any>;
}
export interface ManualAssignRequest {
    channelId: string;
    resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
    resourceId: string;
    userId: string;
    priority?: number;
    notes?: string;
}
export interface ManualAssignResponse {
    success: boolean;
    assignmentId: string;
    message: string;
    assignedAt: Date;
}
