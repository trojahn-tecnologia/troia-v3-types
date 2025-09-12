import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullTenantDocument } from './common';
export type CampaignType = 'email' | 'sms' | 'whatsapp' | 'voice' | 'push';
export type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'failed';
export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'bounced';
export interface CampaignResponse extends FullTenantDocument {
    name: string;
    description?: string;
    type: CampaignType;
    status: CampaignStatus;
    scheduledAt?: Date;
    startedAt?: Date;
    completedAt?: Date;
    config: CampaignConfig;
    targetContacts: number;
    segmentRules?: CampaignSegmentRule[];
    contactLists?: string[];
    excludeLists?: string[];
    messages: CampaignMessage[];
    stats: CampaignStats;
    isRecurring: boolean;
    recurringConfig?: RecurringConfig;
    createdBy: string;
    approvedBy?: string;
    approvedAt?: Date;
}
export interface CampaignConfig {
    sendImmediately: boolean;
    respectBusinessHours: boolean;
    timezone?: string;
    maxSendsPerHour?: number;
    delayBetweenSends?: number;
    enablePersonalization: boolean;
    fallbackName?: string;
    trackOpens: boolean;
    trackClicks: boolean;
    trackUnsubscribes: boolean;
    abTestConfig?: ABTestConfig;
}
export interface ABTestConfig {
    enabled: boolean;
    testName: string;
    variants: ABTestVariant[];
    trafficSplit: number[];
    winnerCriteria: 'open_rate' | 'click_rate' | 'conversion_rate';
    testDuration: number;
    autoSelectWinner: boolean;
}
export interface ABTestVariant {
    id: string;
    name: string;
    subject?: string;
    content: string;
    weight: number;
}
export interface CampaignMessage {
    id: string;
    campaignId: string;
    name: string;
    subject?: string;
    content: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'audio' | 'document';
    variables: string[];
    isDefault: boolean;
    createdAt: Date;
    updatedAt?: Date;
}
export interface CampaignSegmentRule {
    id: string;
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'exists' | 'not_exists';
    value?: any;
    logicalOperator?: 'AND' | 'OR';
}
export interface RecurringConfig {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    daysOfWeek?: number[];
    dayOfMonth?: number;
    endDate?: Date;
    maxOccurrences?: number;
}
export interface CampaignStats {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    complained: number;
    failed: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
    bounceRate: number;
    revenue?: number;
    conversions?: number;
    conversionRate?: number;
}
export interface CampaignMessageSent {
    id: string;
    campaignId: string;
    messageId: string;
    contactId: string;
    channelId?: string;
    status: MessageStatus;
    sentAt?: Date;
    deliveredAt?: Date;
    openedAt?: Date;
    clickedAt?: Date;
    bouncedAt?: Date;
    unsubscribedAt?: Date;
    errorCode?: string;
    errorMessage?: string;
    retryCount: number;
    personalizedSubject?: string;
    personalizedContent?: string;
    opens: CampaignOpen[];
    clicks: CampaignClick[];
}
export interface CampaignOpen {
    id: string;
    messageSentId: string;
    openedAt: Date;
    ipAddress?: string;
    userAgent?: string;
    location?: string;
}
export interface CampaignClick {
    id: string;
    messageSentId: string;
    clickedAt: Date;
    url: string;
    ipAddress?: string;
    userAgent?: string;
    location?: string;
}
export interface CreateCampaignRequest {
    name: string;
    description?: string;
    type: CampaignType;
    scheduledAt?: Date;
    config: Partial<CampaignConfig>;
    segmentRules?: Omit<CampaignSegmentRule, 'id'>[];
    contactLists?: string[];
    excludeLists?: string[];
    messages: Omit<CampaignMessage, 'id' | 'campaignId' | 'createdAt' | 'updatedAt'>[];
    isRecurring?: boolean;
    recurringConfig?: RecurringConfig;
}
export interface UpdateCampaignRequest {
    name?: string;
    description?: string;
    scheduledAt?: Date;
    config?: Partial<CampaignConfig>;
    segmentRules?: CampaignSegmentRule[];
    contactLists?: string[];
    excludeLists?: string[];
    messages?: CampaignMessage[];
    isRecurring?: boolean;
    recurringConfig?: RecurringConfig;
}
export interface PreviewCampaignRequest {
    campaignId: string;
    contactId: string;
    messageId?: string;
}
export interface PreviewCampaignResponse {
    subject?: string;
    content: string;
    personalizedSubject?: string;
    personalizedContent: string;
    variables: Record<string, any>;
}
export interface TestCampaignRequest {
    campaignId: string;
    testContacts: string[];
    messageId?: string;
}
export interface LaunchCampaignRequest {
    campaignId: string;
    approvalNote?: string;
}
export interface PauseCampaignRequest {
    campaignId: string;
    reason?: string;
}
export interface ResumeCampaignRequest {
    campaignId: string;
}
export interface GetCampaignsQuery extends PaginationQuery {
    type?: CampaignType;
    status?: CampaignStatus;
    createdBy?: string;
    isRecurring?: boolean;
    scheduledFrom?: Date;
    scheduledTo?: Date;
    tags?: string[];
}
export interface GetCampaignMessagesQuery extends PaginationQuery {
    campaignId: string;
    status?: MessageStatus;
    contactId?: string;
    sentFrom?: Date;
    sentTo?: Date;
    hasOpened?: boolean;
    hasClicked?: boolean;
}
export interface CampaignReportQuery {
    campaignId: string;
    groupBy?: 'hour' | 'day' | 'week' | 'month';
    metrics?: ('sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed')[];
}
export interface CampaignApiResponse extends BaseApiResponse<CampaignResponse> {
}
export interface CampaignsListApiResponse extends PaginatedApiResponse<CampaignResponse> {
}
export interface PreviewCampaignApiResponse extends BaseApiResponse<PreviewCampaignResponse> {
}
export interface CampaignMessageSentApiResponse extends BaseApiResponse<CampaignMessageSent> {
}
export interface CampaignMessagesListApiResponse extends PaginatedApiResponse<CampaignMessageSent> {
}
export interface CampaignStatsApiResponse extends BaseApiResponse<CampaignStats> {
}
