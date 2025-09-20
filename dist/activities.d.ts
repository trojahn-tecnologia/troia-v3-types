export interface Activity {
    id: string;
    appId: string;
    companyId: string;
    type: ActivityType;
    category: ActivityCategory;
    action: string;
    entityType: EntityType;
    entityId: string;
    entityName?: string;
    actorType: ActorType;
    actorId?: string;
    actorName?: string;
    title: string;
    description?: string;
    summary?: string;
    beforeData?: Record<string, any>;
    afterData?: Record<string, any>;
    metadata?: Record<string, any>;
    relatedEntities?: RelatedEntity[];
    status: 'completed' | 'in_progress' | 'failed' | 'cancelled';
    isVisible: boolean;
    isInternal: boolean;
    occurredAt: string;
    createdAt: string;
    updatedAt: string;
}
export type ActivityType = 'creation' | 'modification' | 'deletion' | 'assignment' | 'status_change' | 'communication' | 'interaction' | 'system' | 'integration' | 'workflow';
export type ActivityCategory = 'contact' | 'customer' | 'lead' | 'ticket' | 'conversation' | 'message' | 'user' | 'assignment' | 'payment' | 'integration' | 'system' | 'workflow' | 'report';
export type EntityType = 'contact' | 'customer' | 'lead' | 'ticket' | 'conversation' | 'message' | 'user' | 'team' | 'assignment' | 'plan' | 'integration' | 'workflow' | 'report';
export type ActorType = 'user' | 'system' | 'bot' | 'webhook' | 'cron' | 'api' | 'integration';
export interface RelatedEntity {
    id: string;
    type: EntityType;
    name?: string;
}
export interface CreateActivityRequest {
    type: ActivityType;
    category: ActivityCategory;
    action: string;
    entityType: EntityType;
    entityId: string;
    entityName?: string;
    actorType: ActorType;
    actorId?: string;
    actorName?: string;
    title: string;
    description?: string;
    summary?: string;
    beforeData?: Record<string, any>;
    afterData?: Record<string, any>;
    metadata?: Record<string, any>;
    relatedEntities?: RelatedEntity[];
    isVisible?: boolean;
    isInternal?: boolean;
    occurredAt?: string;
}
export interface UpdateActivityRequest {
    title?: string;
    description?: string;
    summary?: string;
    status?: 'completed' | 'in_progress' | 'failed' | 'cancelled';
    afterData?: Record<string, any>;
    metadata?: Record<string, any>;
    isVisible?: boolean;
    isInternal?: boolean;
}
export type ActivityResponse = Activity;
export interface ActivityQuery extends PaginationQuery {
    filters?: {
        type?: ActivityType[];
        category?: ActivityCategory[];
        action?: string;
        entityType?: EntityType[];
        entityId?: string;
        actorType?: ActorType[];
        actorId?: string;
        status?: 'completed' | 'in_progress' | 'failed' | 'cancelled'[];
        isVisible?: boolean;
        isInternal?: boolean;
        occurredFrom?: string;
        occurredTo?: string;
        createdFrom?: string;
        createdTo?: string;
    };
}
export interface ActivityListResponse extends ListResponse<ActivityResponse> {
}
export interface ActivityFeedQuery {
    entityType?: EntityType;
    entityId?: string;
    limit?: number;
    offset?: number;
    sinceId?: string;
    includeInternal?: boolean;
    categories?: ActivityCategory[];
    types?: ActivityType[];
}
export interface ActivityFeedResponse {
    activities: ActivityResponse[];
    total: number;
    hasMore: boolean;
    nextCursor?: string;
}
export interface ActivityStatsRequest {
    entityType?: EntityType;
    entityId?: string;
    dateFrom?: string;
    dateTo?: string;
    groupBy: 'type' | 'category' | 'actor' | 'date' | 'hour';
}
export interface ActivityStats {
    total: number;
    byType: Record<ActivityType, number>;
    byCategory: Record<ActivityCategory, number>;
    byActor: Record<ActorType, number>;
    byStatus: Record<string, number>;
    timeline: ActivityTimelinePoint[];
}
export interface ActivityTimelinePoint {
    date: string;
    count: number;
    details?: Record<string, number>;
}
export interface BulkActivityOperationRequest {
    activityIds: string[];
    operation: 'markAsInternal' | 'markAsVisible' | 'updateStatus' | 'delete';
    data?: {
        status?: 'completed' | 'in_progress' | 'failed' | 'cancelled';
        isVisible?: boolean;
        isInternal?: boolean;
    };
}
export interface ActivityNotificationRequest {
    activityId: string;
    recipientIds: string[];
    notificationType: 'email' | 'push' | 'sms' | 'webhook';
    template?: string;
    data?: Record<string, any>;
}
export interface ActivitySearchRequest {
    query: string;
    entityType?: EntityType;
    entityId?: string;
    filters?: {
        type?: ActivityType[];
        category?: ActivityCategory[];
        actorType?: ActorType[];
        dateFrom?: string;
        dateTo?: string;
    };
    limit?: number;
    offset?: number;
}
export interface ActivitySearchResponse {
    activities: ActivityResponse[];
    total: number;
    highlights: Record<string, string[]>;
}
export interface ActivityTemplate {
    type: ActivityType;
    category: ActivityCategory;
    action: string;
    titleTemplate: string;
    descriptionTemplate?: string;
    summaryTemplate?: string;
    isVisible: boolean;
    isInternal: boolean;
}
export interface ContactActivityData {
    contactId: string;
    contactName?: string;
    action: 'created' | 'updated' | 'deleted' | 'merged';
    changes?: Record<string, any>;
    actorId?: string;
    actorName?: string;
}
export interface LeadActivityData {
    leadId: string;
    leadName?: string;
    action: 'created' | 'updated' | 'deleted' | 'assigned' | 'converted' | 'lost';
    changes?: Record<string, any>;
    actorId?: string;
    actorName?: string;
}
export interface TicketActivityData {
    ticketId: string;
    ticketTitle?: string;
    action: 'created' | 'updated' | 'assigned' | 'resolved' | 'closed' | 'reopened';
    changes?: Record<string, any>;
    actorId?: string;
    actorName?: string;
}
export interface ConversationActivityData {
    conversationId: string;
    conversationSubject?: string;
    action: 'started' | 'assigned' | 'transferred' | 'closed' | 'reopened';
    changes?: Record<string, any>;
    actorId?: string;
    actorName?: string;
}
export interface MessageActivityData {
    messageId: string;
    conversationId: string;
    action: 'sent' | 'received' | 'read' | 'edited' | 'deleted' | 'reacted';
    content?: string;
    actorId?: string;
    actorName?: string;
}
import { PaginationQuery, ListResponse } from './common';
