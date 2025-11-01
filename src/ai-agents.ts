import { ObjectId } from 'mongodb';
import { ActiveStatus, PaginationQuery } from './common';

/**
 * Keyword matching modes for message_received trigger
 */
export type KeywordMatchMode =
  | 'any_message'        // Trigger on any message (no keyword filtering)
  | 'contains'           // Message contains any of the keywords
  | 'starts_with'        // Message starts with any of the keywords
  | 'ends_with'          // Message ends with any of the keywords
  | 'exact_match';       // Message exactly matches any of the keywords

/**
 * Keyword matching logic (when multiple keywords are provided)
 */
export type KeywordMatchLogic =
  | 'OR'   // Match if ANY keyword matches (default)
  | 'AND'; // Match if ALL keywords match

export interface AIAgent {
  _id?: ObjectId;
  id?: string;
  name: string;
  description?: string;
  systemPrompt: string;
  instructions?: string;                    // Custom instructions for agent behavior
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
  responseStyle?: string;                   // Agent response style (professional, casual, etc.)
  tone?: string;                            // Agent tone (helpful, formal, friendly, etc.)
  language?: string;                        // Preferred language for responses
  fallbackResponse?: string;                // Default response when confidence is low
  appId: ObjectId | string;
  companyId: ObjectId | string;
  status: ActiveStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
}

export interface AIAgentTriggers {
  message_received?: {
    enabled: boolean;
    conditions?: {
      matchMode?: KeywordMatchMode;          // How to match keywords (default: 'any_message')
      keywords?: string[];                   // Keywords to match
      keywordLogic?: KeywordMatchLogic;      // AND/OR logic for multiple keywords (default: 'OR')
      channelIds?: string[];                 // Filter by specific channel IDs - trigger only fires if message channel is in this list
      customerSegments?: string[];           // Filter by customer segments
      timeWindow?: {
        start: string;
        end: string;
      };
    };
  };
  lead_stage_change?: {
    enabled: boolean;
    stages?: string[];
  };
  lead_created?: {
    enabled: boolean;
    sources?: string[];
  };
  webhook_event?: {
    enabled: boolean;
    eventTypes?: string[];
  };
}

export type AIAgentCapability =
  | 'text_generation'
  | 'sentiment_analysis'
  | 'intent_recognition'
  | 'entity_extraction'
  | 'language_translation'
  | 'conversation_summarization'
  | 'voice_interaction';

export interface AIAgentResponse extends Omit<AIAgent, '_id'> {
  id: string;
  totalInteractions?: number;
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
