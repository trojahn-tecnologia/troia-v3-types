import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullTenantDocument, ActiveStatus } from './common';
export type ModelCompany = 'openai' | 'anthropic' | 'google' | 'grok' | 'deepseek';
export type AgentEvent = 'message_received' | 'webhook' | 'lead_stage_change' | 'conversation_start' | 'conversation_idle';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface AgentResponse extends FullTenantDocument {
    uuid: string;
    name: string;
    channelId?: string;
    modelId: string;
    voiceId?: string;
    delay: number;
    picture?: string;
    instructions: string;
    enableMeet: boolean;
    enableSendFiles: boolean;
    enableQualifyLeads: boolean;
    enableTransfer: boolean;
    enableProducts: boolean;
    enableOrders: boolean;
    tokens: number;
    tokensPerRequest: number;
    disableOnIntercept: boolean;
    status: ActiveStatus;
    documents: AgentDocument[];
    questions: AgentQuestion[];
    events: AgentEvent[];
    apiKeys: AgentApiKey[];
    websites: AgentWebsite[];
}
export interface AgentModel {
    id: string;
    name: string;
    company: ModelCompany;
    model: string;
    description?: string;
    tokens: number;
    inputTokenCost: number;
    outputTokenCost: number;
    supportsImages: boolean;
    supportsAudio: boolean;
    supportsVideo: boolean;
    supportsFunctions: boolean;
    maxContextLength: number;
    trainingCutoff?: Date;
    status: ActiveStatus;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AgentDocument {
    id: string;
    agentId: string;
    fileName: string;
    fileUrl?: string;
    content?: string;
    tokens: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AgentQuestion {
    id: string;
    agentId: string;
    question: string;
    answer: string;
    category?: string;
    priority: number;
    isActive: boolean;
    usage: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AgentEventConfig {
    id: string;
    agentId: string;
    event: AgentEvent;
    instructions?: string;
    successInstructions?: string;
    failInstructions?: string;
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    jsonRequest?: Record<string, any>;
    jsonSchema?: Record<string, any>;
    successResult: boolean;
    successMessage?: string;
    status: ActiveStatus;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AgentApiKey {
    id: string;
    agentId: string;
    token: string;
    name?: string;
    permissions?: string[];
    lastUsedAt?: Date;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AgentWebsite {
    id: string;
    agentId: string;
    url: string;
    title?: string;
    content?: string;
    tokens: number;
    lastScrapedAt?: Date;
    scrapingStatus: 'pending' | 'completed' | 'failed';
    errorMessage?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AgentLog {
    id: string;
    agentId: string;
    callId: string;
    role: 'system' | 'user' | 'assistant' | 'function';
    name?: string;
    message?: string;
    content?: string;
    functionCall?: Record<string, any>;
    toolCalls?: Record<string, any>[];
    toolCallId?: string;
    persistent: boolean;
    createdAt: Date;
    deletedAt?: Date;
}
export interface AgentUsage {
    id: string;
    agentId: string;
    callId: string;
    modelId: string;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cost: number;
    responseTime: number;
    createdAt: Date;
}
export interface CreateAgentRequest {
    name: string;
    channelId?: string;
    modelId: string;
    voiceId?: string;
    delay?: number;
    picture?: string;
    instructions: string;
    enableMeet?: boolean;
    enableSendFiles?: boolean;
    enableQualifyLeads?: boolean;
    enableTransfer?: boolean;
    enableProducts?: boolean;
    enableOrders?: boolean;
    disableOnIntercept?: boolean;
}
export interface UpdateAgentRequest {
    name?: string;
    channelId?: string;
    modelId?: string;
    voiceId?: string;
    delay?: number;
    picture?: string;
    instructions?: string;
    enableMeet?: boolean;
    enableSendFiles?: boolean;
    enableQualifyLeads?: boolean;
    enableTransfer?: boolean;
    enableProducts?: boolean;
    enableOrders?: boolean;
    disableOnIntercept?: boolean;
    status?: ActiveStatus;
}
export interface UploadAgentDocumentRequest {
    agentId: string;
    file: any | string;
    fileName?: string;
}
export interface CreateAgentQuestionRequest {
    agentId: string;
    question: string;
    answer: string;
    category?: string;
    priority?: number;
}
export interface CreateAgentEventRequest {
    agentId: string;
    event: AgentEvent;
    instructions?: string;
    successInstructions?: string;
    failInstructions?: string;
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    jsonRequest?: Record<string, any>;
    jsonSchema?: Record<string, any>;
    successMessage?: string;
}
export interface TrainAgentWebsiteRequest {
    agentId: string;
    url: string;
}
export interface GetAgentsQuery extends PaginationQuery {
    status?: ActiveStatus;
    channelId?: string;
    modelId?: string;
    hasDocuments?: boolean;
    hasQuestions?: boolean;
    tokensUsed?: {
        min?: number;
        max?: number;
    };
}
export interface GetAgentLogsQuery extends PaginationQuery {
    agentId: string;
    callId?: string;
    role?: 'system' | 'user' | 'assistant' | 'function';
    persistent?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
}
export interface AgentStatsResponse {
    agentId: string;
    period: 'today' | 'week' | 'month';
    totalConversations: number;
    totalMessages: number;
    tokensUsed: number;
    averageResponseTime: number;
    successfulTransfers: number;
    leadsQualified: number;
    ordersCreated: number;
    cost: number;
}
export interface AgentApiResponse extends BaseApiResponse<AgentResponse> {
}
export interface AgentsListApiResponse extends PaginatedApiResponse<AgentResponse> {
}
export interface AgentModelsApiResponse extends BaseApiResponse<AgentModel[]> {
}
export interface AgentStatsApiResponse extends BaseApiResponse<AgentStatsResponse> {
}
export interface AgentDocumentApiResponse extends BaseApiResponse<AgentDocument> {
}
export interface AgentQuestionApiResponse extends BaseApiResponse<AgentQuestion> {
}
export interface AgentEventApiResponse extends BaseApiResponse<AgentEventConfig> {
}
export interface AgentLogsListApiResponse extends PaginatedApiResponse<AgentLog> {
}
export interface AgentUsageListApiResponse extends PaginatedApiResponse<AgentUsage> {
}
