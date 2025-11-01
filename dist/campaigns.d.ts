import { TenantAwareDocument, PaginationQuery, ListResponse } from './common';
/**
 * Campaign - Campanha de marketing multi-canal
 */
export interface Campaign extends TenantAwareDocument {
    name: string;
    description: string;
    channelId: string;
    templateId: string;
    audienceType: AudienceType;
    audienceFilter?: AudienceFilter;
    recipientIds?: string[];
    variableMapping: VariableMapping;
    schedulingType: SchedulingType;
    scheduledFor?: string;
    recurringConfig?: RecurringConfig;
    status: CampaignStatus;
    stats: CampaignStats;
}
/**
 * Campaign Status
 */
export declare enum CampaignStatus {
    DRAFT = "draft",
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    PAUSED = "paused",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
/**
 * Audience Type - Tipo de audiência da campanha
 */
export declare enum AudienceType {
    LEADS = "leads",// Leads collection
    CUSTOMERS = "customers",// Customers collection
    GROUPS = "groups",// Groups collection
    MANUAL = "manual"
}
/**
 * Audience Filter - Filtros para seleção de audiência
 */
export interface AudienceFilter {
    status?: string[];
    tags?: string[];
    createdAfter?: string;
    createdBefore?: string;
    search?: string;
}
/**
 * Variable Mapping - Mapeamento de variáveis do template
 */
export interface VariableMapping {
    [position: number]: FieldMapping;
}
/**
 * Field Mapping - Mapeamento de um campo específico
 */
export interface FieldMapping {
    source: 'field' | 'static';
    fieldName?: string;
    staticValue?: string;
}
/**
 * Scheduling Type - Tipo de agendamento
 */
export declare enum SchedulingType {
    IMMEDIATE = "immediate",// Enviar imediatamente
    SCHEDULED = "scheduled",// Enviar em data/hora específica
    RECURRING = "recurring"
}
/**
 * Recurring Config - Configuração de recorrência
 */
export interface RecurringConfig {
    frequency: 'daily' | 'weekly' | 'monthly';
    dayOfWeek?: number;
    dayOfMonth?: number;
    hour: number;
    minute: number;
    timezone: string;
    endDate?: string;
}
/**
 * Campaign Stats - Estatísticas da campanha
 */
export interface CampaignStats {
    totalRecipients: number;
    messagesSent: number;
    messagesDelivered: number;
    messagesFailed: number;
    messagesRead: number;
    startedAt?: string;
    completedAt?: string;
}
/**
 * Campaign Response - Response type sem _id
 */
export interface CampaignResponse extends Omit<Campaign, '_id'> {
    id: string;
}
/**
 * Campaign List Response
 */
export interface CampaignListResponse extends ListResponse<CampaignResponse> {
}
/**
 * Create Campaign Request
 */
export interface CreateCampaignRequest {
    name: string;
    description: string;
    channelId: string;
    templateId: string;
    audienceType: AudienceType;
    audienceFilter?: AudienceFilter;
    recipientIds?: string[];
    variableMapping: VariableMapping;
    schedulingType: SchedulingType;
    scheduledFor?: string;
    recurringConfig?: RecurringConfig;
}
/**
 * Update Campaign Request
 */
export interface UpdateCampaignRequest {
    name?: string;
    description?: string;
    channelId?: string;
    templateId?: string;
    audienceType?: AudienceType;
    audienceFilter?: AudienceFilter;
    recipientIds?: string[];
    variableMapping?: VariableMapping;
    schedulingType?: SchedulingType;
    scheduledFor?: string;
    recurringConfig?: RecurringConfig;
    status?: CampaignStatus;
}
/**
 * Campaign Query
 */
export interface CampaignQuery extends PaginationQuery {
    status?: CampaignStatus | CampaignStatus[];
    templateId?: string;
    audienceType?: AudienceType;
    schedulingType?: SchedulingType;
    search?: string;
}
/**
 * Campaign Stats Response
 */
export interface CampaignStatsResponse {
    totalRecipients: number;
    messagesSent: number;
    messagesDelivered: number;
    messagesFailed: number;
    messagesRead: number;
    deliveryRate: number;
    readRate: number;
    failureRate: number;
    startedAt?: string;
    completedAt?: string;
    duration?: number;
}
/**
 * Test Campaign Request
 */
export interface TestCampaignRequest {
    testRecipients: string[];
    variableMapping: VariableMapping;
}
