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
    size?: number;
    mimeType?: string;
    thumbnailUrl?: string;
}
export interface VideoContent {
    type: 'video';
    url: string;
    caption?: string;
    duration?: number;
    width?: number;
    height?: number;
    size?: number;
    mimeType?: string;
    thumbnailUrl?: string;
}
export interface AudioContent {
    type: 'audio';
    url: string;
    duration?: number;
    size?: number;
    mimeType?: string;
}
export interface DocumentContent {
    type: 'document';
    url: string;
    filename: string;
    size?: number;
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
    messageId: string;
}
export interface SystemContent {
    type: 'system';
    action: 'conversation_started' | 'conversation_ended' | 'user_joined' | 'user_left' | 'assignment_changed' | 'status_changed';
    details?: Record<string, any>;
}
export type MessageContent = TextContent | ImageContent | VideoContent | AudioContent | DocumentContent | LocationContent | ContactContent | LinkContent | ReactionContent | SystemContent;
export interface Sender {
    id: string;
    name: string;
    picture?: string;
    type: 'contact' | 'user' | 'system' | 'bot' | 'ai';
}
export interface ConversationMessage {
    id: string;
    appId: string;
    companyId: string;
    conversationId: string;
    content: MessageContent[];
    plainText?: string;
    direction: 'inbound' | 'outbound';
    messageType: 'user' | 'system' | 'bot' | 'ai';
    sender?: Sender;
    senderId?: string;
    senderName?: string;
    senderType?: 'contact' | 'user' | 'system' | 'bot' | 'ai';
    providerMessageId?: string;
    providerData?: Record<string, any>;
    replyToMessageId?: string;
    reply?: Partial<ConversationMessage>;
    forwardedFromMessageId?: string;
    threadId?: string;
    status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
    deliveredAt?: string;
    readAt?: string;
    failedReason?: string;
    isEdited: boolean;
    editedAt?: string;
    isDeleted: boolean;
    deletedAt?: string;
    deletedBy?: string;
    reactions: MessageReaction[];
    internalNote?: string;
    isInternal: boolean;
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
    messageType: 'user' | 'system' | 'bot' | 'ai';
    senderId?: string;
    senderName?: string;
    senderType: 'contact' | 'user' | 'system' | 'bot' | 'ai';
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
        messageType?: 'user' | 'system' | 'bot' | 'ai';
        senderType?: 'contact' | 'user' | 'system' | 'bot' | 'ai';
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
export interface ConversationMessageListResponse extends ListResponse<ConversationMessageResponse> {
}
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
    conversationId: string;
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
export interface MessageSearchRequest {
    query: string;
    conversationId?: string;
    filters?: {
        direction?: 'inbound' | 'outbound';
        messageType?: 'user' | 'system' | 'bot' | 'ai';
        senderType?: 'contact' | 'user' | 'system' | 'bot' | 'ai';
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
    highlights: Record<string, string[]>;
}
export interface BulkMessageOperationRequest {
    messageIds: string[];
    operation: 'markAsRead' | 'markAsUnread' | 'delete' | 'addReaction' | 'removeReaction';
    data?: {
        emoji?: string;
        reason?: string;
    };
}
export interface MessageStats {
    total: number;
    byDirection: Record<string, number>;
    byType: Record<string, number>;
    byContentType: Record<string, number>;
    byStatus: Record<string, number>;
    totalUnread: number;
    totalWithReactions: number;
}
import { PaginationQuery, ListResponse } from './common';
