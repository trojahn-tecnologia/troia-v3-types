import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, TenantAwareDocument } from './common';
export interface FunnelResponse extends TenantAwareDocument {
    name: string;
    description?: string;
    color: string;
    isDefault: boolean;
    stages: FunnelStage[];
    targets: FunnelTarget[];
    status: 'active' | 'inactive';
    leadCount: number;
}
export interface FunnelStage {
    id: string;
    name: string;
    description?: string;
    color: string;
    position: number;
    isWin: boolean;
    isLoss: boolean;
    probability: number;
    expectedDays?: number;
    actions?: StageAction[];
}
export interface StageAction {
    type: 'webhook' | 'email' | 'sms' | 'notification' | 'assignment';
    config: Record<string, any>;
    trigger: 'enter' | 'exit' | 'timeout';
    delay?: number;
}
export interface FunnelTarget {
    id: string;
    name: string;
    type: 'revenue' | 'leads' | 'conversion';
    value: number;
    period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}
export interface LeadResponse extends TenantAwareDocument {
    name: string;
    email?: string;
    phone?: string;
    document?: string;
    source: string;
    funnelId: string;
    stageId: string;
    assignedToId?: string;
    value?: number;
    probability: number;
    expectedCloseDate?: Date;
    lastContactAt?: Date;
    status: 'open' | 'won' | 'lost' | 'archived';
    lostReason?: string;
    customFields: Record<string, any>;
    tags: string[];
    activities: LeadActivity[];
}
export interface LeadActivity {
    id: string;
    type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'stage_change';
    title: string;
    description?: string;
    userId: string;
    scheduledAt?: Date;
    completedAt?: Date;
    status: 'pending' | 'completed' | 'cancelled';
    metadata?: Record<string, any>;
}
export interface CreateFunnelRequest {
    name: string;
    description?: string;
    color: string;
    stages: Omit<FunnelStage, 'id'>[];
    targets?: Omit<FunnelTarget, 'id'>[];
}
export interface UpdateFunnelRequest {
    name?: string;
    description?: string;
    color?: string;
    stages?: FunnelStage[];
    targets?: FunnelTarget[];
    status?: 'active' | 'inactive';
}
export interface CreateLeadRequest {
    name: string;
    email?: string;
    phone?: string;
    document?: string;
    source: string;
    funnelId: string;
    stageId: string;
    assignedToId?: string;
    value?: number;
    expectedCloseDate?: Date;
    customFields?: Record<string, any>;
    tags?: string[];
}
export interface UpdateLeadRequest {
    name?: string;
    email?: string;
    phone?: string;
    document?: string;
    source?: string;
    funnelId?: string;
    stageId?: string;
    assignedToId?: string;
    value?: number;
    probability?: number;
    expectedCloseDate?: Date;
    status?: 'open' | 'won' | 'lost' | 'archived';
    lostReason?: string;
    customFields?: Record<string, any>;
    tags?: string[];
}
export interface CreateLeadActivityRequest {
    leadId: string;
    type: 'call' | 'email' | 'meeting' | 'note' | 'task';
    title: string;
    description?: string;
    scheduledAt?: Date;
    metadata?: Record<string, any>;
}
export interface GetFunnelsQuery extends PaginationQuery {
    status?: 'active' | 'inactive';
    isDefault?: boolean;
}
export interface GetLeadsQuery extends PaginationQuery {
    funnelId?: string;
    stageId?: string;
    assignedToId?: string;
    status?: 'open' | 'won' | 'lost' | 'archived';
    source?: string;
    tags?: string[];
    minValue?: number;
    maxValue?: number;
    dateFrom?: Date;
    dateTo?: Date;
}
export interface FunnelApiResponse extends BaseApiResponse<FunnelResponse> {
}
export interface FunnelsListApiResponse extends PaginatedApiResponse<FunnelResponse> {
}
export interface LeadApiResponse extends BaseApiResponse<LeadResponse> {
}
export interface LeadsListApiResponse extends PaginatedApiResponse<LeadResponse> {
}
