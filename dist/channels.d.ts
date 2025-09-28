import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';
import { AssignmentConfig as CoreAssignmentConfig, LotteryConfig as CoreLotteryConfig } from './assignment';
export interface ChannelAssignmentConfig extends CoreAssignmentConfig {
    strategy: 'manual' | 'rule' | 'lottery' | 'none';
    rules?: AssignmentRule[];
    lotteryConfig?: ChannelLotteryConfig;
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
export interface ChannelLotteryConfig extends CoreLotteryConfig {
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
    name: string;
    categories: string[];
    capabilities: string[];
    status: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface Channel {
    name: string;
    integrationId: ObjectId;
    identifier: string;
    assignmentConfig: ChannelAssignmentConfig;
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
export type ChannelResponse = Omit<Channel, '_id'> & {
    id: string;
};
export interface ProviderListResponse extends ListResponse<ProviderResponse> {
}
export interface ChannelListResponse extends ListResponse<ChannelResponse> {
}
export interface ChannelQueryOptions extends GenericQueryOptions<ChannelQuery> {
}
export interface CreateChannelRequest {
    name: string;
    identifier: string;
    assignmentConfig: ChannelAssignmentConfig;
    providerId: string;
    config: Record<string, any>;
    credentials: Record<string, any>;
    integrationName?: string;
    integrationDescription?: string;
}
export interface CreateChannelRepositoryRequest {
    name: string;
    identifier: string;
    assignmentConfig: ChannelAssignmentConfig;
    integrationId: string;
}
export interface UpdateChannelRequest {
    name?: string;
    identifier?: string;
    assignmentConfig?: ChannelAssignmentConfig;
    status?: ActiveStatus;
}
export interface ChannelAssignmentResult {
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
    assignedTo: ChannelAssignmentResult;
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
