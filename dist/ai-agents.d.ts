import { ObjectId } from 'mongodb';
import { ActiveStatus, PaginationQuery } from './common';
export interface AIAgent {
    _id?: ObjectId;
    id?: string;
    name: string;
    description?: string;
    systemPrompt: string;
    instructions?: string;
    model: string;
    temperature: number;
    maxTokens: number;
    triggers: AIAgentTriggers;
    customActionIds: string[];
    escalationRuleIds: string[];
    voiceEnabled: boolean;
    voiceConfig?: {
        aiProviderId: string;
    };
    confidenceThresholds: {
        autoResponse: number;
        escalation: number;
        fallback: number;
    };
    enabledCapabilities: AIAgentCapability[];
    responseStyle?: string;
    tone?: string;
    language?: string;
    fallbackResponse?: string;
    appId: ObjectId | string;
    companyId: ObjectId | string;
    status: ActiveStatus;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string;
}
export interface AIAgentTriggers {
    message_received: {
        enabled: boolean;
        conditions?: {
            channelTypes?: string[];
            keywords?: string[];
            customerSegments?: string[];
            timeWindow?: {
                start: string;
                end: string;
            };
        };
    };
    lead_stage_change: {
        enabled: boolean;
        stages?: string[];
    };
    lead_created: {
        enabled: boolean;
        sources?: string[];
    };
    webhook_event: {
        enabled: boolean;
        eventTypes?: string[];
    };
}
export type AIAgentCapability = 'text_generation' | 'sentiment_analysis' | 'intent_recognition' | 'entity_extraction' | 'language_translation' | 'conversation_summarization' | 'voice_interaction';
export interface AIAgentResponse extends Omit<AIAgent, '_id'> {
    id: string;
}
export interface CreateAIAgentRequest {
    name: string;
    description?: string;
    systemPrompt: string;
    model: string;
    temperature: number;
    maxTokens: number;
    triggers: AIAgentTriggers;
    customActionIds?: string[];
    escalationRuleIds?: string[];
    voiceEnabled?: boolean;
    voiceConfig?: {
        aiProviderId: string;
    };
    confidenceThresholds?: {
        autoResponse: number;
        escalation: number;
        fallback: number;
    };
    enabledCapabilities?: AIAgentCapability[];
}
export interface UpdateAIAgentRequest {
    name?: string;
    description?: string;
    systemPrompt?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    triggers?: AIAgentTriggers;
    customActionIds?: string[];
    escalationRuleIds?: string[];
    voiceEnabled?: boolean;
    voiceConfig?: {
        aiProviderId: string;
    };
    confidenceThresholds?: {
        autoResponse: number;
        escalation: number;
        fallback: number;
    };
    enabledCapabilities?: AIAgentCapability[];
}
export interface AIAgentQuery extends PaginationQuery {
    status?: ActiveStatus;
    voiceEnabled?: boolean;
}
