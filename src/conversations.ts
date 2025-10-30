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
  conversationType?: 'individual' | 'group' | 'ai';  // ✅ Conversation type classification

  // External provider integration
  providerConversationId?: string; // External conversation ID
  source: string;                  // Universal source identifier

  // Participants
  customerId?: string;
  userId?: string;      // User associated with conversation (for AI agent context)

  // ✅ Relationship fields (ObjectIds - stored in database)
  contactId?: string;  // Contact relationship (ObjectId)
  groupId?: string;    // Group relationship (ObjectId)

  // ✅ Populated via aggregation (not stored in database)
  contact?: {
    id: string;         // Contact ID
    name: string;       // Contact name
    picture?: string;   // Contact avatar URL
    phone?: string;     // Contact primary phone
  };

  // ✅ Populated via aggregation (not stored in database)
  group?: {
    id: string;         // Group ID
    name: string;       // Group name
    picture?: string;   // Group avatar URL
  };

  // ✅ Group members (populated via aggregation, only for group conversations)
  members?: Array<{
    id: string;         // Contact ID
    name: string;       // Contact name
    picture?: string;   // Contact avatar URL
    phone?: string;     // Contact primary phone
    role: 'admin' | 'member';  // ✅ Participant role
    joinedAt: string;   // ✅ When participant joined
  }>;

  // Lead/Ticket integration
  leadId?: string;            // Associated lead
  ticketId?: string;          // Associated ticket

  // Assignment system integration
  assigneeId?: string;        // User responsible
  assignee?: {                // ✅ Populated assignee data (via aggregation, not stored)
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
  teamId?: string;           // Team responsible
  assignmentType?: string;    // Type of assignment
  assignedAt?: string;
  assignedBy?: string;

  // ✅ AI Agent integration (defines if conversation is AI-powered)
  agentId?: string;           // AI Agent ID (ObjectId) - if present, conversation is AI-powered
  agentStatus?: 'active' | 'inactive' | 'paused'; // AI Agent status in this conversation

  // Provider integration (via lookup)
  provider?: {                // ✅ Populated provider data (via lookup, not stored)
    id: string;
    name: string;
    type: string;
    logo?: string;
  };

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

  // ✅ Unread tracking per user (Arch 3.4)
  unreadTracking?: {
    [userId: string]: {
      count: number;
      lastResetAt: string;
      autoResetOnOpen: boolean;
    }
  };

  // Dates
  startedAt: string;
  endedAt?: string;
  closedAt?: string;    // Timestamp when conversation was closed
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationRequest {
  subject?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  status?: 'waiting' | 'active' | 'closed';
  channelId: string;
  conversationType?: 'individual' | 'group' | 'ai';  // ✅ Conversation type classification
  providerConversationId?: string;
  source: string;
  customerId?: string;

  // ✅ Relationship fields (ObjectIds)
  contactId?: string;  // Contact ID (ObjectId)
  groupId?: string;    // Group ID (ObjectId)

  leadId?: string;
  ticketId?: string;
  assigneeId?: string;
  teamId?: string;

  // ✅ AI Agent integration
  agentId?: string;           // AI Agent ID (ObjectId)
  agentStatus?: 'active' | 'inactive' | 'paused'; // AI Agent status

  tags?: string[];
  category?: string;
  metadata?: Record<string, any>;
}

export interface UpdateConversationRequest {
  subject?: string;
  status?: 'waiting' | 'active' | 'closed';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  conversationType?: 'individual' | 'group' | 'ai';  // ✅ Conversation type classification
  closeReason?: 'resolved' | 'spam' | 'duplicate' | 'no_response' | 'transferred' | 'expired' | 'other';
  closeNotes?: string;
  customerId?: string;

  // ✅ Relationship fields (ObjectIds)
  contactId?: string;  // Contact ID (ObjectId)
  groupId?: string;    // Group ID (ObjectId)

  leadId?: string;
  ticketId?: string;
  assigneeId?: string;
  teamId?: string;

  // ✅ AI Agent integration
  agentId?: string;           // AI Agent ID (ObjectId)
  agentStatus?: 'active' | 'inactive' | 'paused'; // AI Agent status

  tags?: string[];
  category?: string;
  metadata?: Record<string, any>;
}

export type ConversationResponse = Conversation;

export interface ConversationQuery extends PaginationQuery {
  filters?: {
    subject?: string;
    status?: 'waiting' | 'active' | 'closed' | Array<'waiting' | 'active' | 'closed'>;  // ✅ Aceita string ou array
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    channelId?: string;
    channelType?: 'whatsapp' | 'instagram' | 'email' | 'chat' | 'sms' | 'telegram' | 'facebook';
    conversationType?: 'individual' | 'group' | 'ai';  // ✅ Infinite scroll: filter by conversation type
    providerId?: string;  // ✅ Filter by provider (via channel → integration → provider)
    source?: string;
    customerId?: string;
    contactId?: string;  // ✅ Filter by contactId (ObjectId)
    leadId?: string;
    ticketId?: string;
    groupId?: string;    // ✅ Filter by groupId (ObjectId)
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
