export interface Lead {
    id: string;
    appId: string;
    companyId: string;
    contactId: string;
    score: number;
    segment: string;
    description?: string;
    source?: string;
    channelId?: string;
    status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    temperature: 'cold' | 'warm' | 'hot';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    assignmentType?: string;
    assignedAt?: string;
    assignedBy?: string;
    budget?: number;
    wonValue?: number;
    customerId?: string;
    convertedAt?: string;
    lostDate?: string;
    lastInteractionAt?: string;
    lastFollowUpAt?: string;
    lastStepAt?: string;
    lostReason?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateLeadRequest {
    contactId: string;
    score?: number;
    segment: string;
    description?: string;
    source?: string;
    channelId?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    temperature?: 'cold' | 'warm' | 'hot';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    budget?: number;
}
export interface UpdateLeadRequest {
    contactId?: string;
    score?: number;
    segment?: string;
    description?: string;
    source?: string;
    channelId?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    temperature?: 'cold' | 'warm' | 'hot';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    budget?: number;
    wonValue?: number;
    customerId?: string;
    lostReason?: string;
    lastInteractionAt?: string;
    lastFollowUpAt?: string;
    lastStepAt?: string;
}
export type LeadResponse = Lead;
export interface LeadQuery extends PaginationQuery {
    filters?: {
        contactId?: string;
        segment?: string;
        source?: string;
        channelId?: string;
        status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
        priority?: 'low' | 'medium' | 'high' | 'urgent';
        temperature?: 'cold' | 'warm' | 'hot';
        funnelId?: string;
        stepId?: string;
        assigneeId?: string;
        teamId?: string;
        customerId?: string;
        scoreMin?: number;
        scoreMax?: number;
        budgetMin?: number;
        budgetMax?: number;
    };
}
export interface LeadListResponse extends ListResponse<LeadResponse> {
}
export interface ConvertLeadRequest {
    customerId: string;
    wonValue?: number;
    conversionNotes?: string;
}
export interface AssignLeadRequest {
    assigneeId?: string;
    teamId?: string;
    assignmentType?: string;
}
import { PaginationQuery, ListResponse } from './common';
