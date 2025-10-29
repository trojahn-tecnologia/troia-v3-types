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
 * Anthropic Provider Config
 * For Claude models (Claude 3, Claude 3.5, etc.)
 */
export interface AnthropicConfig {
    apiKey: string;
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
export type AIProviderConfig = OpenAIConfig | AnthropicConfig | CohereConfig | HuggingFaceConfig;
