/**
 * Socket.IO Event Types - Shared between Frontend and Backend
 *
 * Prevents event name mismatches and ensures type safety for socket events
 */
export declare const SOCKET_EVENTS: {
    readonly CONVERSATION_MESSAGE: "conversation:message";
    readonly CONVERSATION_UPDATED: "conversation:updated";
    readonly CONVERSATION_DELETED: "conversation:deleted";
    readonly CONVERSATION_OPEN: "conversation:open";
    readonly CONVERSATION_UNREAD_RESET: "conversation:unread-reset";
    readonly CONVERSATION_ERROR: "conversation:error";
    readonly MESSAGE_STATUS: "message:status";
    readonly MESSAGE_DELIVERED: "message:delivered";
    readonly MESSAGE_READ: "message:read";
    readonly MESSAGE_DELETED: "message:deleted";
    readonly CHANNEL_QR: "channel:qr";
    readonly CHANNEL_CONNECTED: "channel:connected";
    readonly CHANNEL_DISCONNECTED: "channel:disconnected";
    readonly USER_TYPING: "user:typing";
    readonly USER_ONLINE: "user:online";
    readonly USER_OFFLINE: "user:offline";
    readonly ASSIGNMENT_CREATED: "assignment:created";
    readonly ASSIGNMENT_UPDATED: "assignment:updated";
    readonly ASSIGNMENT_COMPLETED: "assignment:completed";
    readonly CONTACT_IDENTIFIERS_SYNCED: "contact:identifiers:synced";
    readonly CONTACT_SYNC_FAILED: "contact:sync:failed";
    readonly INTEGRATION_SYNC_STARTED: "integration:sync-started";
    readonly INTEGRATION_SYNC_PROGRESS: "integration:sync-progress";
    readonly INTEGRATION_SYNC_COMPLETED: "integration:sync-completed";
    readonly INTEGRATION_SYNC_FAILED: "integration:sync-failed";
    readonly NOTIFICATION_NEW: "notification:new";
    readonly NOTIFICATION_READ: "notification:read";
    readonly TEMPLATE_STATUS_UPDATED: "template:status-updated";
};
export type SocketEventName = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];
/**
 * Conversation Message Event
 * Emitted when a new message is received in a conversation
 */
export interface ConversationMessageEvent {
    conversationId: string;
    messageId: string;
    direction: 'inbound' | 'outbound';
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
    location?: {
        latitude: number;
        longitude: number;
        address?: string;
        name?: string;
    };
    contact?: {
        name: string;
        phone?: string;
        email?: string;
        vcard?: string;
    };
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
 * Message Status Event
 * Generic status update for messages (sent, delivered, read, failed)
 */
export interface MessageStatusEvent {
    messageId: string;
    providerMessageId?: string;
    conversationId?: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    timestamp: Date;
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
/**
 * Integration Sync Started Event
 * Server-to-Client: Integration sync process has started
 */
export interface IntegrationSyncStartedEvent {
    integrationId: string;
    integrationType: 'app' | 'company' | 'user';
    providerType: string;
    syncType: 'full' | 'incremental';
    totalItems?: number;
    timestamp: string;
}
/**
 * Integration Sync Progress Event
 * Server-to-Client: Progress update during sync
 */
export interface IntegrationSyncProgressEvent {
    integrationId: string;
    integrationType: 'app' | 'company' | 'user';
    currentItem: number;
    totalItems: number;
    itemType: 'event' | 'contact' | 'email' | 'task';
    message?: string;
    timestamp: string;
}
/**
 * Integration Sync Completed Event
 * Server-to-Client: Sync process completed successfully
 */
export interface IntegrationSyncCompletedEvent {
    integrationId: string;
    integrationType: 'app' | 'company' | 'user';
    itemsSynced: number;
    duration: number;
    success: boolean;
    timestamp: string;
}
/**
 * Integration Sync Failed Event
 * Server-to-Client: Sync process failed with error
 */
export interface IntegrationSyncFailedEvent {
    integrationId: string;
    integrationType: 'app' | 'company' | 'user';
    error: string;
    itemsProcessed: number;
    timestamp: string;
}
/**
 * Template Status Updated Event
 * Server-to-Client: Template approval status changed (APPROVED/REJECTED)
 */
export interface TemplateStatusUpdatedEvent {
    templateId: string;
    name: string;
    status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'archived';
    previousStatus?: string;
    reason?: string;
    timestamp: string;
}
export interface SocketEventMap {
    [SOCKET_EVENTS.CONVERSATION_MESSAGE]: ConversationMessageEvent;
    [SOCKET_EVENTS.CONVERSATION_UPDATED]: ConversationUpdatedEvent;
    [SOCKET_EVENTS.CONVERSATION_DELETED]: ConversationDeletedEvent;
    [SOCKET_EVENTS.CONVERSATION_OPEN]: ConversationOpenEvent;
    [SOCKET_EVENTS.CONVERSATION_UNREAD_RESET]: ConversationUnreadResetEvent;
    [SOCKET_EVENTS.CONVERSATION_ERROR]: ConversationErrorEvent;
    [SOCKET_EVENTS.MESSAGE_STATUS]: MessageStatusEvent;
    [SOCKET_EVENTS.MESSAGE_DELIVERED]: MessageDeliveredEvent;
    [SOCKET_EVENTS.MESSAGE_READ]: MessageReadEvent;
    [SOCKET_EVENTS.CHANNEL_QR]: ChannelQREvent;
    [SOCKET_EVENTS.CHANNEL_CONNECTED]: ChannelConnectedEvent;
    [SOCKET_EVENTS.USER_TYPING]: UserTypingEvent;
    [SOCKET_EVENTS.ASSIGNMENT_CREATED]: AssignmentCreatedEvent;
    [SOCKET_EVENTS.ASSIGNMENT_UPDATED]: AssignmentUpdatedEvent;
    [SOCKET_EVENTS.CONTACT_IDENTIFIERS_SYNCED]: ContactIdentifiersSyncedPayload;
    [SOCKET_EVENTS.CONTACT_SYNC_FAILED]: ContactSyncFailedPayload;
    [SOCKET_EVENTS.INTEGRATION_SYNC_STARTED]: IntegrationSyncStartedEvent;
    [SOCKET_EVENTS.INTEGRATION_SYNC_PROGRESS]: IntegrationSyncProgressEvent;
    [SOCKET_EVENTS.INTEGRATION_SYNC_COMPLETED]: IntegrationSyncCompletedEvent;
    [SOCKET_EVENTS.INTEGRATION_SYNC_FAILED]: IntegrationSyncFailedEvent;
    [SOCKET_EVENTS.TEMPLATE_STATUS_UPDATED]: TemplateStatusUpdatedEvent;
}
export declare const SOCKET_ROOMS: {
    /**
     * Company room - all users of a company
     * Pattern: company:{companyId}
     */
    readonly company: (companyId: string) => string;
    /**
     * Conversation room - users in a specific conversation
     * Pattern: conversation:{conversationId}
     */
    readonly conversation: (conversationId: string) => string;
    /**
     * User room - specific user
     * Pattern: user:{userId}
     */
    readonly user: (userId: string) => string;
    /**
     * Channel room - specific channel
     * Pattern: channel:{channelId}
     */
    readonly channel: (channelId: string) => string;
};
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
export type EmitEvent = <K extends keyof SocketEventMap>(eventName: K, payload: SocketEventMap[K]) => void;
/**
 * Type-safe event listener helper
 *
 * @example
 * onEvent(socket, SOCKET_EVENTS.CONVERSATION_MESSAGE, (data) => {
 *   console.log(data.conversationId); // TypeScript knows the structure
 * });
 */
export type OnEvent = <K extends keyof SocketEventMap>(eventName: K, handler: (payload: SocketEventMap[K]) => void) => void;
