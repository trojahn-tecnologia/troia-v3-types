import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullTenantDocument, ActiveStatus } from './common';
export type ChannelType = 'whatsapp' | 'telegram' | 'instagram' | 'facebook' | 'email' | 'widget' | 'intranet' | 'sms' | 'voip';
export type AssignmentType = 'random' | 'availability' | 'idle_time' | 'round_robin' | 'fixed' | 'relationship';
export interface ChannelResponse extends FullTenantDocument {
    name: string;
    type: ChannelType;
    providerId: string;
    status: ActiveStatus;
    config: ChannelConfig;
    businessHours?: BusinessHours;
    autoAssignment: AutoAssignmentConfig;
    assignedUsers: string[];
    assignedTeams: string[];
    webhookUrl?: string;
    apiToken?: string;
    instanceKey?: string;
    instanceToken?: string;
    totalConversations: number;
    openConversations: number;
    lastMessageAt?: Date;
}
export interface ChannelConfig {
    showOperatorName: boolean;
    autoCloseTimeout?: number;
    waitTimeout?: number;
    maxConcurrentConversations?: number;
    welcomeMessage?: string;
    awayMessage?: string;
    closedMessage?: string;
    transferMessage?: string;
    allowFileUpload: boolean;
    allowVoiceMessages: boolean;
    allowVideoMessages: boolean;
    enableSatisfactionSurvey: boolean;
    enableReadReceipts: boolean;
    enableTypingIndicator: boolean;
    enableAI: boolean;
    aiAgentId?: string;
    aiTriggerDelay?: number;
    customFields: Record<string, any>;
}
export interface BusinessHours {
    enabled: boolean;
    timezone: string;
    schedule: DaySchedule[];
    holidays: Holiday[];
    awayMessage?: string;
}
export interface DaySchedule {
    dayOfWeek: number;
    isActive: boolean;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
}
export interface Holiday {
    id: string;
    date: Date;
    name: string;
    isActive: boolean;
    awayMessage?: string;
}
export interface AutoAssignmentConfig {
    type: AssignmentType;
    maxConcurrent?: number;
    considerWorkload: boolean;
    fallbackToTeam: boolean;
    excludeOfflineUsers: boolean;
    priorityUserIds?: string[];
    maintainRelationships: boolean;
    relationshipDays?: number;
}
export interface TeamsMessage {
    id: string;
    channelId: string;
    teamIds: string[];
    message: string;
    triggerWords?: string[];
    priority: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface CreateChannelRequest {
    name: string;
    type: ChannelType;
    providerId: string;
    config: Partial<ChannelConfig>;
    businessHours?: Partial<BusinessHours>;
    autoAssignment: Partial<AutoAssignmentConfig>;
    assignedUsers?: string[];
    assignedTeams?: string[];
    webhookUrl?: string;
}
export interface UpdateChannelRequest {
    name?: string;
    status?: ActiveStatus;
    config?: Partial<ChannelConfig>;
    businessHours?: Partial<BusinessHours>;
    autoAssignment?: Partial<AutoAssignmentConfig>;
    assignedUsers?: string[];
    assignedTeams?: string[];
    webhookUrl?: string;
}
export interface TestChannelRequest {
    channelId: string;
    testType: 'connection' | 'send_message' | 'webhook';
    testData?: {
        recipientPhone?: string;
        message?: string;
    };
}
export interface TestChannelResponse {
    success: boolean;
    message: string;
    response?: any;
    latency?: number;
}
export interface GetChannelsQuery extends PaginationQuery {
    type?: ChannelType;
    status?: ActiveStatus;
    providerId?: string;
    assignedUserId?: string;
    assignedTeamId?: string;
    hasOpenConversations?: boolean;
}
export interface ChannelStatsResponse {
    channelId: string;
    period: 'today' | 'week' | 'month';
    totalConversations: number;
    openConversations: number;
    closedConversations: number;
    avgResponseTime: number;
    avgSatisfaction: number;
    messagesReceived: number;
    messagesSent: number;
    uniqueContacts: number;
}
export interface ChannelApiResponse extends BaseApiResponse<ChannelResponse> {
}
export interface ChannelsListApiResponse extends PaginatedApiResponse<ChannelResponse> {
}
export interface TestChannelApiResponse extends BaseApiResponse<TestChannelResponse> {
}
export interface ChannelStatsApiResponse extends BaseApiResponse<ChannelStatsResponse> {
}
export interface TeamsMessageApiResponse extends BaseApiResponse<TeamsMessage> {
}
export interface TeamsMessagesListApiResponse extends PaginatedApiResponse<TeamsMessage> {
}
