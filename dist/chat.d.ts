import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, TenantAwareDocument } from './common';
export type MessageType = 'text' | 'audio' | 'video' | 'image' | 'document' | 'location' | 'contact' | 'sticker';
export type ChatMessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export type ConversationStatus = 'open' | 'pending' | 'closed' | 'transferred' | 'bot';
export interface ConversationResponse extends TenantAwareDocument {
    contactId: string;
    channelId: string;
    assignedToId?: string;
    teamId?: string;
    status: ConversationStatus;
    lastMessageAt: Date;
    lastMessagePreview: string;
    unreadCount: number;
    tags: string[];
    isMuted: boolean;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    customFields: Record<string, any>;
    transferHistory: ConversationTransfer[];
}
export interface ConversationTransfer {
    id: string;
    fromUserId?: string;
    toUserId?: string;
    toTeamId?: string;
    reason?: string;
    timestamp: Date;
}
export interface MessageResponse extends TenantAwareDocument {
    conversationId: string;
    contactId: string;
    userId?: string;
    type: MessageType;
    content: MessageContent;
    status: ChatMessageStatus;
    direction: 'inbound' | 'outbound';
    isFromBot: boolean;
    metadata: MessageMetadata;
    replyToMessageId?: string;
    forwardedFromMessageId?: string;
    reactions: MessageReaction[];
    editedAt?: Date;
}
export interface MessageContent {
    text?: string;
    mediaUrl?: string;
    mediaType?: string;
    mediaSize?: number;
    mediaDuration?: number;
    thumbnail?: string;
    caption?: string;
    fileName?: string;
    location?: {
        latitude: number;
        longitude: number;
        name?: string;
        address?: string;
    };
    contact?: {
        name: string;
        phone?: string;
        email?: string;
    };
}
export interface MessageMetadata {
    externalId?: string;
    externalTimestamp?: Date;
    channelData?: Record<string, any>;
    readByUsers?: string[];
    deliveredToUsers?: string[];
    aiGenerated?: boolean;
    aiConfidence?: number;
    ragSources?: string[];
}
export interface MessageReaction {
    emoji: string;
    userId: string;
    timestamp: Date;
}
export interface ChatContactResponse extends TenantAwareDocument {
    name: string;
    phone?: string;
    email?: string;
    avatar?: string;
    isBlocked: boolean;
    tags: string[];
    customFields: Record<string, any>;
    lastSeenAt?: Date;
    firstContactAt: Date;
    totalMessages: number;
    channels: string[];
    leadId?: string;
}
export interface ChatChannelResponse extends TenantAwareDocument {
    name: string;
    type: 'whatsapp' | 'telegram' | 'instagram' | 'facebook' | 'email' | 'widget' | 'intranet';
    providerId: string;
    isActive: boolean;
    config: ChatChannelConfig;
    assignedUsers: string[];
    assignedTeams: string[];
    businessHours?: ChatBusinessHours;
    autoAssignment: ChatAutoAssignmentConfig;
    webhookUrl?: string;
    apiToken?: string;
}
export interface ChatChannelConfig {
    showOperatorName: boolean;
    autoCloseTimeout?: number;
    waitTimeout?: number;
    welcomeMessage?: string;
    awayMessage?: string;
    features: string[];
}
export interface ChatBusinessHours {
    enabled: boolean;
    timezone: string;
    schedule: ChatDaySchedule[];
    holidays: ChatHoliday[];
}
export interface ChatDaySchedule {
    dayOfWeek: number;
    isActive: boolean;
    startTime: string;
    endTime: string;
}
export interface ChatHoliday {
    date: Date;
    name: string;
    isActive: boolean;
}
export interface ChatAutoAssignmentConfig {
    type: 'random' | 'availability' | 'idle_time' | 'round_robin' | 'fixed';
    maxConcurrent?: number;
    considerWorkload: boolean;
    fallbackToTeam: boolean;
}
export interface SendMessageRequest {
    conversationId: string;
    type: MessageType;
    content: MessageContent;
    replyToMessageId?: string;
}
export interface StartConversationRequest {
    channelId: string;
    contactPhone?: string;
    contactEmail?: string;
    contactName?: string;
    initialMessage?: SendMessageRequest;
}
export interface TransferConversationRequest {
    conversationId: string;
    toUserId?: string;
    toTeamId?: string;
    reason?: string;
}
export interface GetConversationsQuery extends PaginationQuery {
    status?: ConversationStatus;
    assignedToId?: string;
    teamId?: string;
    channelId?: string;
    tags?: string[];
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    hasUnread?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
}
export interface GetMessagesQuery extends PaginationQuery {
    conversationId: string;
    type?: MessageType;
    direction?: 'inbound' | 'outbound';
    isFromBot?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
}
export interface ConversationApiResponse extends BaseApiResponse<ConversationResponse> {
}
export interface ConversationsListApiResponse extends PaginatedApiResponse<ConversationResponse> {
}
export interface MessageApiResponse extends BaseApiResponse<MessageResponse> {
}
export interface MessagesListApiResponse extends PaginatedApiResponse<MessageResponse> {
}
export interface ChatContactApiResponse extends BaseApiResponse<ChatContactResponse> {
}
export interface ChatContactsListApiResponse extends PaginatedApiResponse<ChatContactResponse> {
}
export interface ChatChannelApiResponse extends BaseApiResponse<ChatChannelResponse> {
}
export interface ChatChannelsListApiResponse extends PaginatedApiResponse<ChatChannelResponse> {
}
