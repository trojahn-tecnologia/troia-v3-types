// Conversation Types - Sistema multi-canal de conversas
export interface Conversation {
  id: string;
  appId: string;
  companyId: string;

  // Core conversation data
  subject?: string;
  status: 'waiting' | 'active' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  closeReason?: 'resolved' | 'spam' | 'duplicate' | 'no_response' | 'transferred' | 'expired' | 'other';
  closeNotes?: string;

  // Multi-channel support
  channelId: string;          // Channel where conversation happens

  // External provider integration
  providerConversationId?: string; // External conversation ID
  source: string;                  // Universal source identifier

  // Participants
  customerId?: string;

  // ✅ Denormalized contact data (single source of truth)
  contact?: {
    id: string;         // Contact ID
    name: string;       // Contact name
    picture?: string;   // Contact avatar URL
  };

  // ✅ Denormalized group data (single source of truth)
  group?: {
    id: string;         // Group ID
    name: string;       // Group name
    picture?: string;   // Group avatar URL
  };

  // Lead/Ticket integration
  leadId?: string;            // Associated lead
  ticketId?: string;          // Associated ticket

  // Assignment system integration
  assigneeId?: string;        // User responsible
  teamId?: string;           // Team responsible
  assignmentType?: string;    // Type of assignment
  assignedAt?: string;
  assignedBy?: string;

  // Conversation metrics
  messageCount: number;
  lastMessage?: string;        // ✅ Preview of last message (100 chars max)
  lastMessageAt?: string;
  lastMessageFromCustomer?: string;
  lastMessageFromAgent?: string;

  // Response time tracking
  firstResponseTime?: number;  // Minutes to first response
  averageResponseTime?: number; // Average response time

  // Tags and categories
  tags: string[];
  category?: string;

  // Metadata
  metadata?: Record<string, any>; // Channel-specific metadata

  // Dates
  startedAt: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationRequest {
  subject?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  status?: 'waiting' | 'active' | 'closed';
  channelId: string;
  providerConversationId?: string;
  source: string;
  customerId?: string;

  // ✅ Denormalized contact data (replaces contactId)
  contact?: {
    id: string;
    name: string;
    picture?: string;
  };

  // ✅ Denormalized group data (replaces groupId)
  group?: {
    id: string;
    name: string;
    picture?: string;
  };

  leadId?: string;
  ticketId?: string;
  assigneeId?: string;
  teamId?: string;
  tags?: string[];
  category?: string;
  metadata?: Record<string, any>;
}

export interface UpdateConversationRequest {
  subject?: string;
  status?: 'waiting' | 'active' | 'closed';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  closeReason?: 'resolved' | 'spam' | 'duplicate' | 'no_response' | 'transferred' | 'expired' | 'other';
  closeNotes?: string;
  customerId?: string;

  // ✅ Denormalized contact data (replaces contactId)
  contact?: {
    id: string;
    name: string;
    picture?: string;
  };

  // ✅ Denormalized group data (replaces groupId)
  group?: {
    id: string;
    name: string;
    picture?: string;
  };

  leadId?: string;
  ticketId?: string;
  assigneeId?: string;
  teamId?: string;
  tags?: string[];
  category?: string;
  metadata?: Record<string, any>;
}

export type ConversationResponse = Conversation;

export interface ConversationQuery extends PaginationQuery {
  filters?: {
    subject?: string;
    status?: 'waiting' | 'active' | 'closed';
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    channelId?: string;
    channelType?: 'whatsapp' | 'instagram' | 'email' | 'chat' | 'sms' | 'telegram' | 'facebook';
    source?: string;
    customerId?: string;
    contactId?: string;  // ✅ Filter by contact.id
    leadId?: string;
    ticketId?: string;
    groupId?: string;    // ✅ Filter by group.id
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

export interface ConversationListResponse extends ListResponse<ConversationResponse> {}

// Conversation assignment
export interface AssignConversationRequest {
  assigneeId?: string;
  teamId?: string;
  assignmentType?: string;
}

// Conversation transfer
export interface TransferConversationRequest {
  fromAssigneeId?: string;
  toAssigneeId?: string;
  fromTeamId?: string;
  toTeamId?: string;
  reason?: string;
  notes?: string;
}

// Close conversation
export interface CloseConversationRequest {
  reason?: string;
  notes?: string;
  rating?: number; // Customer satisfaction rating
}

// Conversation statistics
export interface ConversationStats {
  total: number;
  byStatus: Record<string, number>;
  byChannel: Record<string, number>;
  byPriority: Record<string, number>;
  averageResponseTime: number;
  totalUnread: number;
}

// Bulk operations
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

// Import types
import { PaginationQuery, ListResponse } from './common';