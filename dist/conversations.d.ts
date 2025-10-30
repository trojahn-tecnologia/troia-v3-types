export interface Conversation {
    id: string;
    appId: string;
    companyId: string;
    subject?: string;
    status: 'waiting' | 'active' | 'closed';
    priority: 'low' | 'normal' | 'high' | 'urgent';
    closeReason?: 'resolved' | 'spam' | 'duplicate' | 'no_response' | 'transferred' | 'expired' | 'other';
    closeNotes?: string;
    channelId: string;
    conversationType?: 'individual' | 'group' | 'ai';
    providerConversationId?: string;
    source: string;
    customerId?: string;
    userId?: string;
    contactId?: string;
    groupId?: string;
    contact?: {
        id: string;
        name: string;
        picture?: string;
        phone?: string;
    };
    group?: {
        id: string;
        name: string;
        picture?: string;
    };
    members?: Array<{
        id: string;
        name: string;
        picture?: string;
        phone?: string;
    }>;
    leadId?: string;
    ticketId?: string;
    assigneeId?: string;
    assignee?: {
        id: string;
        name: string;
        email: string;
        picture?: string;
    };
    teamId?: string;
    assignmentType?: string;
    assignedAt?: string;
    assignedBy?: string;
    agentId?: string;
    agentStatus?: 'active' | 'inactive' | 'paused';
    provider?: {
        id: string;
        name: string;
        type: string;
        logo?: string;
    };
    messageCount: number;
    lastMessage?: string;
    lastMessageAt?: string;
    lastMessageFromCustomer?: string;
    lastMessageFromAgent?: string;
    firstResponseTime?: number;
    averageResponseTime?: number;
    tags: string[];
    category?: string;
    metadata?: Record<string, any>;
    unreadTracking?: {
        [userId: string]: {
            count: number;
            lastResetAt: string;
            autoResetOnOpen: boolean;
        };
    };
    startedAt: string;
    endedAt?: string;
    closedAt?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateConversationRequest {
    subject?: string;
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    status?: 'waiting' | 'active' | 'closed';
    channelId: string;
    conversationType?: 'individual' | 'group' | 'ai';
    providerConversationId?: string;
    source: string;
    customerId?: string;
    contactId?: string;
    groupId?: string;
    leadId?: string;
    ticketId?: string;
    assigneeId?: string;
    teamId?: string;
    agentId?: string;
    agentStatus?: 'active' | 'inactive' | 'paused';
    tags?: string[];
    category?: string;
    metadata?: Record<string, any>;
}
export interface UpdateConversationRequest {
    subject?: string;
    status?: 'waiting' | 'active' | 'closed';
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    conversationType?: 'individual' | 'group' | 'ai';
    closeReason?: 'resolved' | 'spam' | 'duplicate' | 'no_response' | 'transferred' | 'expired' | 'other';
    closeNotes?: string;
    customerId?: string;
    contactId?: string;
    groupId?: string;
    leadId?: string;
    ticketId?: string;
    assigneeId?: string;
    teamId?: string;
    agentId?: string;
    agentStatus?: 'active' | 'inactive' | 'paused';
    tags?: string[];
    category?: string;
    metadata?: Record<string, any>;
}
export type ConversationResponse = Conversation;
export interface ConversationQuery extends PaginationQuery {
    filters?: {
        subject?: string;
        status?: 'waiting' | 'active' | 'closed' | Array<'waiting' | 'active' | 'closed'>;
        priority?: 'low' | 'normal' | 'high' | 'urgent';
        channelId?: string;
        channelType?: 'whatsapp' | 'instagram' | 'email' | 'chat' | 'sms' | 'telegram' | 'facebook';
        conversationType?: 'individual' | 'group' | 'ai';
        providerId?: string;
        source?: string;
        customerId?: string;
        contactId?: string;
        leadId?: string;
        ticketId?: string;
        groupId?: string;
        assigneeId?: string;
        teamId?: string;
        category?: string;
        tags?: string[];
        hasUnreadMessages?: boolean;
        createdFrom?: string;
        createdTo?: string;
        lastMessageFrom?: string;
        lastMessageTo?: string;
    };
}
export interface ConversationListResponse extends ListResponse<ConversationResponse> {
}
export interface AssignConversationRequest {
    assigneeId?: string;
    teamId?: string;
    assignmentType?: string;
}
export interface TransferConversationRequest {
    fromAssigneeId?: string;
    toAssigneeId?: string;
    fromTeamId?: string;
    toTeamId?: string;
    reason?: string;
    notes?: string;
}
export interface CloseConversationRequest {
    reason?: string;
    notes?: string;
    rating?: number;
}
export interface ConversationStats {
    total: number;
    byStatus: Record<string, number>;
    byChannel: Record<string, number>;
    byPriority: Record<string, number>;
    averageResponseTime: number;
    totalUnread: number;
}
export interface BulkConversationOperationRequest {
    conversationIds: string[];
    operation: 'assign' | 'transfer' | 'close' | 'addTag' | 'removeTag' | 'changeStatus' | 'changePriority';
    data?: {
        assigneeId?: string;
        teamId?: string;
        status?: 'waiting' | 'active' | 'closed';
        priority?: 'low' | 'normal' | 'high' | 'urgent';
        tag?: string;
        reason?: string;
        notes?: string;
    };
}
import { PaginationQuery, ListResponse } from './common';
