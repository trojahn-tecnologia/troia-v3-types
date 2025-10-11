/**
 * Socket.IO Event Types - Shared between Frontend and Backend
 *
 * Prevents event name mismatches and ensures type safety for socket events
 */

// ============================================================================
// EVENT NAMES (String Literals for Type Safety)
// ============================================================================

export const SOCKET_EVENTS = {
  // Conversation Events
  CONVERSATION_MESSAGE: 'conversation:message',
  CONVERSATION_UPDATED: 'conversation:updated',
  CONVERSATION_DELETED: 'conversation:deleted',
  CONVERSATION_OPEN: 'conversation:open',               // ✅ Arch 3.4: User opens conversation
  CONVERSATION_UNREAD_RESET: 'conversation:unread-reset', // ✅ Arch 3.4: Unread counter reset
  CONVERSATION_ERROR: 'conversation:error',             // ✅ Arch 3.4: Error in conversation operations

  // Message Events
  MESSAGE_DELIVERED: 'message:delivered',
  MESSAGE_READ: 'message:read',
  MESSAGE_DELETED: 'message:deleted',

  // Channel Events
  CHANNEL_QR: 'channel:qr',
  CHANNEL_CONNECTED: 'channel:connected',
  CHANNEL_DISCONNECTED: 'channel:disconnected',

  // User Events
  USER_TYPING: 'user:typing',
  USER_ONLINE: 'user:online',
  USER_OFFLINE: 'user:offline',

  // Assignment Events
  ASSIGNMENT_CREATED: 'assignment:created',
  ASSIGNMENT_UPDATED: 'assignment:updated',
  ASSIGNMENT_COMPLETED: 'assignment:completed',

  // Contact Events
  CONTACT_IDENTIFIERS_SYNCED: 'contact:identifiers:synced',
  CONTACT_SYNC_FAILED: 'contact:sync:failed',
} as const;

// Type for event names
export type SocketEventName = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

// ============================================================================
// EVENT PAYLOAD INTERFACES
// ============================================================================

/**
 * Conversation Message Event
 * Emitted when a new message is received in a conversation
 */
export interface ConversationMessageEvent {
  conversationId: string;
  messageId: string;
  direction: 'inbound' | 'outbound';  // ✅ CRITICAL: Diferencia mensagens recebidas vs enviadas
  from?: {
    id: string;
    name: string;
    picture?: string;
    isBusinessAccount?: boolean;
  };
  content?: string;
  messageType?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'sticker';
  timestamp?: string;
  contactId?: string;
  channelId?: string;

  // ✅ Media metadata for real-time display
  mediaUrl?: string;
  mediaType?: string;
  metadata?: {
    width?: number;
    height?: number;
    size?: number;
    mimeType?: string;
    thumbnailUrl?: string;
    duration?: number;
    filename?: string;
  };

  // ✅ Location data
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
    name?: string;
  };

  // ✅ Contact data
  contact?: {
    name: string;
    phone?: string;
    email?: string;
    vcard?: string;
  };

  // ✅ Reaction data
  reaction?: {
    emoji: string;
    targetMessageId: string;
  };
}

/**
 * Conversation Updated Event
 * Emitted when conversation metadata is updated
 */
export interface ConversationUpdatedEvent {
  conversationId: string;
  updates: {
    status?: string;
    subject?: string;
    priority?: string;
    lastMessage?: string;
    lastMessageAt?: string;
  };
}

/**
 * Conversation Deleted Event
 */
export interface ConversationDeletedEvent {
  conversationId: string;
  deletedAt: string;
}

/**
 * Message Delivered Event
 */
export interface MessageDeliveredEvent {
  messageId: string;
  conversationId: string;
  deliveredAt: string;
}

/**
 * Message Read Event
 */
export interface MessageReadEvent {
  messageId: string;
  conversationId: string;
  readAt: string;
}

/**
 * Channel QR Code Event
 */
export interface ChannelQREvent {
  instanceKey: string;
  qrCode: string;
  channelId: string;
}

/**
 * Channel Connected Event
 */
export interface ChannelConnectedEvent {
  instanceKey: string;
  channelId: string;
  connectedAt: string;
}

/**
 * User Typing Event
 */
export interface UserTypingEvent {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

/**
 * Assignment Created Event
 */
export interface AssignmentCreatedEvent {
  assignmentId: string;
  resourceType: 'ticket' | 'conversation';
  resourceId: string;
  assignedTo: string;
  assignedBy: string;
  priority?: string;
}

/**
 * Assignment Updated Event
 */
export interface AssignmentUpdatedEvent {
  assignmentId: string;
  updates: {
    status?: 'pending' | 'assigned' | 'completed';
    assignedTo?: string;
    priority?: string;
  };
}

/**
 * Conversation Open Event (Arch 3.4)
 * Client-to-Server: User opens a conversation
 */
export interface ConversationOpenEvent {
  conversationId: string;
}

/**
 * Conversation Unread Reset Event (Arch 3.4)
 * Server-to-Client: Confirms unread counter has been reset
 */
export interface ConversationUnreadResetEvent {
  conversationId: string;
  unreadCount: number;
}

/**
 * Conversation Error Event (Arch 3.4)
 * Server-to-Client: Error during conversation operations
 */
export interface ConversationErrorEvent {
  message: string;
  error?: string;
}

/**
 * Contact Identifiers Synced Event
 * Server-to-Client: WhatsApp identifiers successfully synchronized
 */
export interface ContactIdentifiersSyncedPayload {
  contactId: string;
  identifiers: string[];
  avatarUrl?: string;
}

/**
 * Contact Sync Failed Event
 * Server-to-Client: Failed to synchronize WhatsApp identifiers
 */
export interface ContactSyncFailedPayload {
  contactId: string;
  error: string;
}

// ============================================================================
// SOCKET EVENT MAP (For Type-Safe Emit/On)
// ============================================================================

export interface SocketEventMap {
  // Conversation Events
  [SOCKET_EVENTS.CONVERSATION_MESSAGE]: ConversationMessageEvent;
  [SOCKET_EVENTS.CONVERSATION_UPDATED]: ConversationUpdatedEvent;
  [SOCKET_EVENTS.CONVERSATION_DELETED]: ConversationDeletedEvent;
  [SOCKET_EVENTS.CONVERSATION_OPEN]: ConversationOpenEvent;               // ✅ Arch 3.4
  [SOCKET_EVENTS.CONVERSATION_UNREAD_RESET]: ConversationUnreadResetEvent; // ✅ Arch 3.4
  [SOCKET_EVENTS.CONVERSATION_ERROR]: ConversationErrorEvent;             // ✅ Arch 3.4

  // Message Events
  [SOCKET_EVENTS.MESSAGE_DELIVERED]: MessageDeliveredEvent;
  [SOCKET_EVENTS.MESSAGE_READ]: MessageReadEvent;

  // Channel Events
  [SOCKET_EVENTS.CHANNEL_QR]: ChannelQREvent;
  [SOCKET_EVENTS.CHANNEL_CONNECTED]: ChannelConnectedEvent;

  // User Events
  [SOCKET_EVENTS.USER_TYPING]: UserTypingEvent;

  // Assignment Events
  [SOCKET_EVENTS.ASSIGNMENT_CREATED]: AssignmentCreatedEvent;
  [SOCKET_EVENTS.ASSIGNMENT_UPDATED]: AssignmentUpdatedEvent;

  // Contact Events
  [SOCKET_EVENTS.CONTACT_IDENTIFIERS_SYNCED]: ContactIdentifiersSyncedPayload;
  [SOCKET_EVENTS.CONTACT_SYNC_FAILED]: ContactSyncFailedPayload;
}

// ============================================================================
// ROOM PATTERNS
// ============================================================================

export const SOCKET_ROOMS = {
  /**
   * Company room - all users of a company
   * Pattern: company:{companyId}
   */
  company: (companyId: string) => `company:${companyId}`,

  /**
   * Conversation room - users in a specific conversation
   * Pattern: conversation:{conversationId}
   */
  conversation: (conversationId: string) => `conversation:${conversationId}`,

  /**
   * User room - specific user
   * Pattern: user:{userId}
   */
  user: (userId: string) => `user:${userId}`,

  /**
   * Channel room - specific channel
   * Pattern: channel:{channelId}
   */
  channel: (channelId: string) => `channel:${channelId}`,
} as const;

// ============================================================================
// TYPE-SAFE HELPERS
// ============================================================================

/**
 * Type-safe event emitter helper
 *
 * @example
 * emitEvent(io, SOCKET_EVENTS.CONVERSATION_MESSAGE, {
 *   conversationId: '123',
 *   messageId: 'msg-456',
 *   content: 'Hello'
 * });
 */
export type EmitEvent = <K extends keyof SocketEventMap>(
  eventName: K,
  payload: SocketEventMap[K]
) => void;

/**
 * Type-safe event listener helper
 *
 * @example
 * onEvent(socket, SOCKET_EVENTS.CONVERSATION_MESSAGE, (data) => {
 *   console.log(data.conversationId); // TypeScript knows the structure
 * });
 */
export type OnEvent = <K extends keyof SocketEventMap>(
  eventName: K,
  handler: (payload: SocketEventMap[K]) => void
) => void;
