// ConversationMessage Types - Sistema de mensagens multi-canal com conteúdo rico

// Message Content Types
export interface TextContent {
  type: 'text';
  text: string;
}

export interface ImageContent {
  type: 'image';
  url: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: number; // bytes
  mimeType?: string;
  thumbnailUrl?: string;
}

export interface VideoContent {
  type: 'video';
  url: string;
  caption?: string;
  duration?: number; // seconds
  width?: number;
  height?: number;
  size?: number; // bytes
  mimeType?: string;
  thumbnailUrl?: string;
}

export interface AudioContent {
  type: 'audio';
  url: string;
  duration?: number; // seconds
  size?: number; // bytes
  mimeType?: string;
}

export interface DocumentContent {
  type: 'document';
  url: string;
  filename: string;
  size?: number; // bytes
  mimeType?: string;
}

export interface LocationContent {
  type: 'location';
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface ContactContent {
  type: 'contact';
  name: string;
  phone?: string;
  email?: string;
  organization?: string;
}

export interface LinkContent {
  type: 'link';
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface ReactionContent {
  type: 'reaction';
  emoji: string;
  messageId: string; // ID of message being reacted to
}

export interface SystemContent {
  type: 'system';
  action: 'conversation_started' | 'conversation_ended' | 'user_joined' | 'user_left' | 'assignment_changed' | 'status_changed';
  details?: Record<string, any>;
}

export type MessageContent =
  | TextContent
  | ImageContent
  | VideoContent
  | AudioContent
  | DocumentContent
  | LocationContent
  | ContactContent
  | LinkContent
  | ReactionContent
  | SystemContent;

// Sender information (unified object)
export interface Sender {
  id: string;
  name: string;
  picture?: string;
  type: 'contact' | 'user' | 'system' | 'bot' | 'ai_agent';
}

// Main ConversationMessage interface
export interface ConversationMessage {
  id: string;
  appId: string;
  companyId: string;
  conversationId: string;

  // Message content
  content: MessageContent[];
  plainText?: string; // Extracted text for search/indexing

  // Message metadata
  direction: 'inbound' | 'outbound';
  messageType: 'user' | 'system' | 'bot' | 'ai_agent';

  // ✅ NEW: Unified sender object (populated via aggregation)
  sender?: Sender;

  // DEPRECATED: Legacy fields (kept for backward compatibility, will be removed in future)
  senderId?: string; // @deprecated Use sender.id instead
  senderName?: string; // @deprecated Use sender.name instead
  senderType?: 'contact' | 'user' | 'system' | 'bot' | 'ai_agent'; // @deprecated Use sender.type instead

  // External provider integration
  providerMessageId?: string; // External message ID
  providerData?: Record<string, any>; // Provider-specific metadata

  // Message relationships
  replyToMessageId?: string; // Message this replies to
  forwardedFromMessageId?: string; // Original message if forwarded
  threadId?: string; // For threaded conversations

  // Status and delivery
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  deliveredAt?: string;
  readAt?: string;
  failedReason?: string;

  // Message actions
  isEdited: boolean;
  editedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;

  // Reactions and interactions
  reactions: MessageReaction[];

  // Internal notes (agent-only)
  internalNote?: string;
  isInternal: boolean; // True for agent-only messages

  // Timestamps
  sentAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  userName?: string;
  createdAt: string;
}

export interface CreateConversationMessageRequest {
  conversationId: string;
  content: MessageContent[];
  plainText?: string;
  direction: 'inbound' | 'outbound';
  messageType: 'user' | 'system' | 'bot' | 'ai_agent';
  senderId?: string; // Will be used to build sender object
  senderName?: string;
  senderType: 'contact' | 'user' | 'system' | 'bot' | 'ai_agent';
  providerMessageId?: string;
  providerData?: Record<string, any>;
  replyToMessageId?: string;
  forwardedFromMessageId?: string;
  threadId?: string;
  internalNote?: string;
  isInternal?: boolean;
  sentAt?: string;
}

export interface UpdateConversationMessageRequest {
  content?: MessageContent[];
  plainText?: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  deliveredAt?: string;
  readAt?: string;
  failedReason?: string;
  internalNote?: string;
}

export type ConversationMessageResponse = ConversationMessage;

export interface ConversationMessageQuery extends PaginationQuery {
  conversationId?: string;
  filters?: {
    direction?: 'inbound' | 'outbound';
    messageType?: 'user' | 'system' | 'bot' | 'ai_agent';
    senderType?: 'contact' | 'user' | 'system' | 'bot' | 'ai_agent';
    senderId?: string;
    status?: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
    contentType?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'link' | 'reaction' | 'system';
    isInternal?: boolean;
    isEdited?: boolean;
    isDeleted?: boolean;
    hasReactions?: boolean;
    threadId?: string;
    providerMessageId?: string;
    sentFrom?: string;
    sentTo?: string;
    createdFrom?: string;
    createdTo?: string;
  };
}

export interface ConversationMessageListResponse extends ListResponse<ConversationMessageResponse> {}

// Message actions
export interface SendMessageRequest {
  conversationId: string;
  content: MessageContent[];
  replyToMessageId?: string;
  internalNote?: string;
  isInternal?: boolean;
}

export interface EditMessageRequest {
  content: MessageContent[];
  plainText?: string;
}

export interface ForwardMessageRequest {
  conversationId: string; // Target conversation
  originalMessageId: string;
  additionalContent?: MessageContent[];
  internalNote?: string;
}

export interface AddReactionRequest {
  messageId: string;
  emoji: string;
}

export interface RemoveReactionRequest {
  messageId: string;
  emoji: string;
}

export interface MarkAsReadRequest {
  messageIds: string[];
}

export interface DeleteMessageRequest {
  messageId: string;
  reason?: string;
}

// Message search
export interface MessageSearchRequest {
  query: string;
  conversationId?: string;
  filters?: {
    direction?: 'inbound' | 'outbound';
    messageType?: 'user' | 'system' | 'bot' | 'ai_agent';
    senderType?: 'contact' | 'user' | 'system' | 'bot' | 'ai_agent';
    contentType?: string[];
    dateFrom?: string;
    dateTo?: string;
  };
  limit?: number;
  offset?: number;
}

export interface MessageSearchResponse {
  messages: ConversationMessageResponse[];
  total: number;
  highlights: Record<string, string[]>; // messageId -> highlighted snippets
}

// Bulk operations
export interface BulkMessageOperationRequest {
  messageIds: string[];
  operation: 'markAsRead' | 'markAsUnread' | 'delete' | 'addReaction' | 'removeReaction';
  data?: {
    emoji?: string;
    reason?: string;
  };
}

// Message statistics
export interface MessageStats {
  total: number;
  byDirection: Record<string, number>;
  byType: Record<string, number>;
  byContentType: Record<string, number>;
  byStatus: Record<string, number>;
  totalUnread: number;
  totalWithReactions: number;
}

// Import types
import { PaginationQuery, ListResponse } from './common';