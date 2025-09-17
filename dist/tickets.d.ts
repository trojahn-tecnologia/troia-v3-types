export interface Ticket {
    _id?: string;
    appId: string;
    companyId: string;
    title: string;
    description?: string;
    status: 'open' | 'pending' | 'resolved' | 'closed' | 'canceled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    tags: string[];
    customerId?: string;
    contactId?: string;
    leadId?: string;
    assigneeId?: string;
    teamId?: string;
    assignmentType?: string;
    assignedAt?: string;
    assignedBy?: string;
    slaBreachTime?: string;
    slaBreached?: boolean;
    responseTime?: number;
    resolutionTime?: number;
    conversationId?: string;
    channelId?: string;
    source?: string;
    firstResponseAt?: string;
    lastResponseAt?: string;
    resolvedAt?: string;
    closedAt?: string;
    dueDate?: string;
    internalNotes?: string;
    resolutionSummary?: string;
    customerSatisfaction?: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateTicketRequest {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    tags?: string[];
    customerId?: string;
    contactId?: string;
    leadId?: string;
    assigneeId?: string;
    teamId?: string;
    conversationId?: string;
    channelId?: string;
    source?: string;
    dueDate?: string;
    internalNotes?: string;
}
export interface UpdateTicketRequest {
    title?: string;
    description?: string;
    status?: 'open' | 'pending' | 'resolved' | 'closed' | 'canceled';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    tags?: string[];
    customerId?: string;
    contactId?: string;
    leadId?: string;
    assigneeId?: string;
    teamId?: string;
    dueDate?: string;
    internalNotes?: string;
    resolutionSummary?: string;
    customerSatisfaction?: number;
}
export interface TicketResponse extends Omit<Ticket, '_id'> {
    id: string;
}
export interface TicketQuery extends PaginationQuery {
    filters?: {
        title?: string;
        status?: 'open' | 'pending' | 'resolved' | 'closed' | 'canceled';
        priority?: 'low' | 'medium' | 'high' | 'urgent';
        category?: string;
        tags?: string[];
        customerId?: string;
        contactId?: string;
        leadId?: string;
        assigneeId?: string;
        teamId?: string;
        channelId?: string;
        source?: string;
        slaBreached?: boolean;
        createdFrom?: string;
        createdTo?: string;
        dueFrom?: string;
        dueTo?: string;
        resolvedFrom?: string;
        resolvedTo?: string;
    };
}
export interface TicketListResponse extends ListResponse<TicketResponse> {
}
export interface AssignTicketRequest {
    assigneeId?: string;
    teamId?: string;
    assignmentType?: string;
    reason?: string;
}
export interface ResolveTicketRequest {
    resolutionSummary: string;
    internalNotes?: string;
    customerSatisfaction?: number;
}
export interface TicketSLA {
    ticketId: string;
    responseTimeSLA: number;
    resolutionTimeSLA: number;
    breachTime: string;
    breached: boolean;
    actualResponseTime?: number;
    actualResolutionTime?: number;
}
import { PaginationQuery, ListResponse } from './common';
