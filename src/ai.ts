// ============================================================================
// AI PROVIDER CONFIGURATIONS
// ============================================================================

/**
 * OpenAI Provider Config - APENAS API Key necessário
 * Modelo e dimensions são fixados dentro do OpenAIProvider
 */
export interface OpenAIConfig {
  apiKey: string;
}

/**
 * Cohere Provider Config
 * Future AI provider for embeddings
 */
export interface CohereConfig {
  apiKey: string;
  model?: string;
}

/**
 * HuggingFace Provider Config
 * Future AI provider for embeddings
 */
export interface HuggingFaceConfig {
  apiKey: string;
  model: string;
}

/**
 * Union type for all AI Provider Configs
 */
export type AIProviderConfig =
  | OpenAIConfig
  | CohereConfig
  | HuggingFaceConfig;
