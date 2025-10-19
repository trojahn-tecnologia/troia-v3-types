"use strict";
/**
 * Socket.IO Event Types - Shared between Frontend and Backend
 *
 * Prevents event name mismatches and ensures type safety for socket events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET_ROOMS = exports.SOCKET_EVENTS = void 0;
// ============================================================================
// EVENT NAMES (String Literals for Type Safety)
// ============================================================================
exports.SOCKET_EVENTS = {
    // Conversation Events
    CONVERSATION_MESSAGE: 'conversation:message',
    CONVERSATION_UPDATED: 'conversation:updated',
    CONVERSATION_DELETED: 'conversation:deleted',
    CONVERSATION_OPEN: 'conversation:open', // ✅ Arch 3.4: User opens conversation
    CONVERSATION_UNREAD_RESET: 'conversation:unread-reset', // ✅ Arch 3.4: Unread counter reset
    CONVERSATION_ERROR: 'conversation:error', // ✅ Arch 3.4: Error in conversation operations
    // Message Events
    MESSAGE_STATUS: 'message:status', // ✅ Generic status update (sent, delivered, read, failed)
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
};
// ============================================================================
// ROOM PATTERNS
// ============================================================================
exports.SOCKET_ROOMS = {
    /**
     * Company room - all users of a company
     * Pattern: company:{companyId}
     */
    company: (companyId) => `company:${companyId}`,
    /**
     * Conversation room - users in a specific conversation
     * Pattern: conversation:{conversationId}
     */
    conversation: (conversationId) => `conversation:${conversationId}`,
    /**
     * User room - specific user
     * Pattern: user:{userId}
     */
    user: (userId) => `user:${userId}`,
    /**
     * Channel room - specific channel
     * Pattern: channel:{channelId}
     */
    channel: (channelId) => `channel:${channelId}`,
};
