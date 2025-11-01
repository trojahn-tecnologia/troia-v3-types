export interface Lead {
    id: string;
    appId: string;
    companyId: string;
    contactId: string;
    score: number;
    segment: string;
    description?: string;
    source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
    origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
    channelId?: string;
    status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    temperature: 'cold' | 'warm' | 'hot';
    qualifyStatus: 'pending' | 'qualified' | 'disqualified';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    assignmentType?: string;
    assignedAt?: string;
    assignedBy?: string;
    budget?: number;
    wonValue?: number;
    businessStatus?: 'pending' | 'won' | 'lost';
    wonDate?: string;
    activityStatus?: 'no_activities' | 'overdue' | 'up_to_date';
    customerId?: string;
    lostDate?: string;
    lastInteractionAt?: string;
    lastFollowUpAt?: string;
    lastStepAt?: string;
    lostReason?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateLeadRequest {
    contactId?: string;
    score?: number;
    segment: string;
    description?: string;
    source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
    origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
    channelId?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    temperature?: 'cold' | 'warm' | 'hot';
    qualifyStatus?: 'pending' | 'qualified' | 'disqualified';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    budget?: number;
    name?: string;
    company?: string;
    position?: string;
    emails?: string[];
    phones?: string[];
}
export interface UpdateLeadRequest {
    contactId?: string;
    score?: number;
    segment?: string;
    description?: string;
    source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
    origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
    channelId?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    temperature?: 'cold' | 'warm' | 'hot';
    qualifyStatus?: 'pending' | 'qualified' | 'disqualified';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    budget?: number;
    wonValue?: number;
    businessStatus?: 'pending' | 'won' | 'lost';
    wonDate?: string;
    customerId?: string;
    lostReason?: string;
    lastInteractionAt?: string;
    lastFollowUpAt?: string;
    lastStepAt?: string;
}
export interface LeadResponse extends Lead {
    contact?: {
        id: string;
        name: string;
        identifiers?: {
            email?: string[];
            phone?: string[];
            whatsapp?: string[];
            instagram?: string[];
            facebook?: string[];
            telegram?: string[];
        };
    };
    assignee?: {
        id: string;
        name: string;
        email: string;
    };
    customer?: {
        id: string;
        name: string;
    };
    channel?: {
        id: string;
        name: string;
    };
    step?: {
        id: string;
        name: string;
    };
    funnel?: {
        id: string;
        name: string;
    };
}
export interface LeadQuery extends PaginationQuery {
    filters?: {
        contactId?: string;
        segment?: string;
        source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
        origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
        channelId?: string;
        status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
        priority?: 'low' | 'medium' | 'high' | 'urgent';
        temperature?: 'cold' | 'warm' | 'hot';
        qualifyStatus?: 'pending' | 'qualified' | 'disqualified';
        businessStatus?: 'pending' | 'won' | 'lost';
        funnelId?: string;
        stepId?: string;
        assigneeId?: string;
        teamId?: string;
        customerId?: string;
        scoreMin?: number;
        scoreMax?: number;
        budgetMin?: number;
        budgetMax?: number;
        dateFrom?: string;
        dateTo?: string;
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
