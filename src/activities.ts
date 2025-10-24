// Activity Types - Sistema de atividades e logs do sistema

export interface Activity {
  id: string;
  appId: string;
  companyId: string;

  // Activity classification
  type: ActivityType;
  category: ActivityCategory;
  action: string; // Specific action performed

  // Subject of the activity (what was affected)
  entityType: EntityType;
  entityId: string;
  entityName?: string; // For display purposes

  // Actor (who performed the action)
  actorType: ActorType;
  actorId?: string; // User ID if performed by user
  actor?: {
    id: string;
    firstName: string;
    lastName?: string;
    picture?: string;
    email: string;
  }; // Populated via aggregation when actorType is 'user'

  // Activity details
  title: string;
  description?: string;
  summary?: string; // Short description for lists

  // Activity data and changes
  beforeData?: Record<string, any>; // State before change
  afterData?: Record<string, any>;  // State after change
  metadata?: Record<string, any>;   // Additional activity data

  // Related entities
  relatedEntities?: RelatedEntity[];

  // Status and visibility
  status: 'completed' | 'in_progress' | 'failed' | 'cancelled' | 'pending';
  isVisible: boolean; // Show in activity feeds
  isInternal: boolean; // Internal activity (not visible to customers)

  // Timestamps
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType =
  | 'creation'      // Entity was created
  | 'modification'  // Entity was modified
  | 'deletion'      // Entity was deleted
  | 'assignment'    // Assignment changed
  | 'status_change' // Status changed
  | 'communication'// Message sent/received
  | 'interaction'   // User interaction
  | 'system'        // System action
  | 'integration'   // External integration action
  | 'workflow';     // Workflow/automation action

export type ActivityCategory =
  | 'contact'
  | 'customer'
  | 'lead'
  | 'ticket'
  | 'conversation'
  | 'message'
  | 'user'
  | 'assignment'
  | 'payment'
  | 'integration'
  | 'system'
  | 'workflow'
  | 'report';

export type EntityType =
  | 'contact'
  | 'customer'
  | 'lead'
  | 'ticket'
  | 'conversation'
  | 'message'
  | 'user'
  | 'team'
  | 'assignment'
  | 'plan'
  | 'integration'
  | 'workflow'
  | 'report';

export type ActorType =
  | 'user'      // Human user
  | 'system'    // System action
  | 'bot'       // Bot action
  | 'webhook'   // Webhook triggered
  | 'cron'      // Scheduled task
  | 'api'       // API call
  | 'integration'; // External integration

export interface RelatedEntity {
  id: string;
  type: EntityType;
  name?: string;
  picture?: string;  // User avatar quando type='user'
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
  title: string;
  description?: string;
  summary?: string;
  beforeData?: Record<string, any>;
  afterData?: Record<string, any>;
  metadata?: Record<string, any>;
  relatedEntities?: RelatedEntity[];
  status?: 'completed' | 'in_progress' | 'failed' | 'cancelled' | 'pending';
  isVisible?: boolean;
  isInternal?: boolean;
  occurredAt?: string;
}

export interface UpdateActivityRequest {
  title?: string;
  description?: string;
  summary?: string;
  status?: 'completed' | 'in_progress' | 'failed' | 'cancelled' | 'pending';
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

export interface ActivityListResponse extends ListResponse<ActivityResponse> {}

// Activity feed (timeline)
export interface ActivityFeedQuery {
  entityType?: EntityType;
  entityId?: string;
  limit?: number;
  offset?: number;
  sinceId?: string; // For pagination
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

// Activity aggregations
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

// Bulk operations
export interface BulkActivityOperationRequest {
  activityIds: string[];
  operation: 'markAsInternal' | 'markAsVisible' | 'updateStatus' | 'delete';
  data?: {
    status?: 'completed' | 'in_progress' | 'failed' | 'cancelled';
    isVisible?: boolean;
    isInternal?: boolean;
  };
}

// Activity notifications
export interface ActivityNotificationRequest {
  activityId: string;
  recipientIds: string[];
  notificationType: 'email' | 'push' | 'sms' | 'webhook';
  template?: string;
  data?: Record<string, any>;
}

// Activity search
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
  highlights: Record<string, string[]>; // activityId -> highlighted snippets
}

// Predefined activity templates
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

// Common activity creators (helper functions)
export interface ContactActivityData {
  contactId: string;
  contactName?: string;
  action: 'created' | 'updated' | 'deleted' | 'merged';
  changes?: Record<string, any>;
  actorId?: string;
}

export interface LeadActivityData {
  leadId: string;
  leadName?: string;
  action: 'created' | 'updated' | 'deleted' | 'assigned' | 'converted' | 'lost';
  changes?: Record<string, any>;
  actorId?: string;
}

export interface TicketActivityData {
  ticketId: string;
  ticketTitle?: string;
  action: 'created' | 'updated' | 'assigned' | 'resolved' | 'closed' | 'reopened';
  changes?: Record<string, any>;
  actorId?: string;
}

export interface ConversationActivityData {
  conversationId: string;
  conversationSubject?: string;
  action: 'started' | 'assigned' | 'transferred' | 'closed' | 'reopened';
  changes?: Record<string, any>;
  actorId?: string;
}

export interface MessageActivityData {
  messageId: string;
  conversationId: string;
  action: 'sent' | 'received' | 'read' | 'edited' | 'deleted' | 'reacted';
  content?: string;
  actorId?: string;
}

// Import types
import { PaginationQuery, ListResponse } from './common';