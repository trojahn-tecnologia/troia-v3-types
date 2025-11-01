import { TenantAwareDocument, PaginationQuery, ListResponse } from './common';

/**
 * Campaign - Campanha de marketing multi-canal
 */
export interface Campaign extends TenantAwareDocument {
  name: string;
  description: string;
  channelId: string;               // Channel de comunicação
  templateId: string;              // Template vinculado
  audienceType: AudienceType;      // leads, customers, groups, manual
  audienceFilter?: AudienceFilter; // Filtros de seleção
  recipientIds?: string[];         // IDs manuais (se audienceType = manual)
  variableMapping: VariableMapping; // Mapeia variáveis do template
  schedulingType: SchedulingType;  // immediate, scheduled, recurring
  scheduledFor?: string;           // Data/hora agendada (ISO string)
  recurringConfig?: RecurringConfig; // Config de recorrência
  status: CampaignStatus;
  stats: CampaignStats;
}

/**
 * Campaign Status
 */
export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

/**
 * Audience Type - Tipo de audiência da campanha
 */
export enum AudienceType {
  LEADS = 'leads',           // Leads collection
  CUSTOMERS = 'customers',   // Customers collection
  GROUPS = 'groups',         // Groups collection
  MANUAL = 'manual'          // Lista manual de IDs
}

/**
 * Audience Filter - Filtros para seleção de audiência
 */
export interface AudienceFilter {
  status?: string[];         // Filter by status
  tags?: string[];          // Filter by tags
  createdAfter?: string;    // Created after date (ISO string)
  createdBefore?: string;   // Created before date (ISO string)
  search?: string;          // Search by name/email/phone
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
  fieldName?: string;        // Ex: "name", "email", "phone"
  staticValue?: string;      // Valor fixo
}

/**
 * Scheduling Type - Tipo de agendamento
 */
export enum SchedulingType {
  IMMEDIATE = 'immediate',   // Enviar imediatamente
  SCHEDULED = 'scheduled',   // Enviar em data/hora específica
  RECURRING = 'recurring'    // Enviar periodicamente
}

/**
 * Recurring Config - Configuração de recorrência
 */
export interface RecurringConfig {
  frequency: 'daily' | 'weekly' | 'monthly';
  dayOfWeek?: number;        // 0-6 (se weekly)
  dayOfMonth?: number;       // 1-31 (se monthly)
  hour: number;              // 0-23
  minute: number;            // 0-59
  timezone: string;          // Ex: "America/Sao_Paulo"
  endDate?: string;          // Data final de recorrência (ISO string)
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
  startedAt?: string;      // ISO string
  completedAt?: string;    // ISO string
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
export interface CampaignListResponse extends ListResponse<CampaignResponse> {}

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
  scheduledFor?: string;           // ISO string
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
  scheduledFor?: string;           // ISO string
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
  deliveryRate: number;       // (messagesDelivered / messagesSent) * 100
  readRate: number;           // (messagesRead / messagesDelivered) * 100
  failureRate: number;        // (messagesFailed / messagesSent) * 100
  startedAt?: string;
  completedAt?: string;
  duration?: number;          // ms
}

/**
 * Test Campaign Request
 */
export interface TestCampaignRequest {
  testRecipients: string[];   // Array de IDs para teste
  variableMapping: VariableMapping;
}
