import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ExtendedStatus } from './common';
import { AssignmentConfig as BaseAssignmentConfig, CoreLotteryConfig } from './assignment';
/**
 * Channel assignment config extends base assignment config.
 * Usado para configurar como conversas são atribuídas automaticamente.
 */
export interface ChannelAssignmentConfig extends BaseAssignmentConfig {
    /** Estratégia de assignment: manual, rule-based, lottery, ou none */
    strategy: 'manual' | 'rule' | 'lottery' | 'none';
    /** Regras de assignment condicional */
    rules?: AssignmentRule[];
    /** Configuração de lottery (se strategy='lottery') */
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
/**
 * Channel lottery config extends CoreLotteryConfig.
 * Adiciona campos específicos de channel.
 *
 * @see CoreLotteryConfig - Tipos base unificados
 */
export interface ChannelLotteryConfig extends CoreLotteryConfig {
    /** Escopo do lottery: apenas usuários, apenas equipes, ou ambos */
    scope?: 'team' | 'user' | 'both';
}
export interface ChannelProvider {
    name: string;
    categories: string[];
    capabilities: string[];
    status: ExtendedStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface Channel {
    name: string;
    integrationId: ObjectId;
    identifier: string;
    providerId?: string;
    instanceKey?: string;
    instanceToken?: string;
    identifyUser?: boolean;
    assignmentConfig: ChannelAssignmentConfig;
    companyId: ObjectId;
    appId: ObjectId;
    status: ExtendedStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface ChannelQuery extends PaginationQuery {
    integrationId?: string;
    identifier?: string;
    status?: ExtendedStatus;
}
export type ChannelProviderResponse = Omit<ChannelProvider, never>;
export type ChannelResponse = Omit<Channel, '_id' | 'createdAt' | 'updatedAt' | 'integrationId' | 'companyId' | 'appId'> & {
    id: string;
    integrationId: string;
    companyId: string;
    appId: string;
    createdAt: string;
    updatedAt: string;
    capabilities?: string[];
    members?: Array<{
        id: string;
        name: string;
        avatar?: string;
    }>;
    config?: Record<string, any>;
    qrCode?: string;
    qrCodeExpires?: number;
};
export interface ChannelProviderListResponse extends ListResponse<ChannelProviderResponse> {
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
    identifyUser?: boolean;
    status?: ExtendedStatus;
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
