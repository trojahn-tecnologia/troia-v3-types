import { ObjectId } from 'mongodb';

// ============================================================================
// MESSAGE CHUNKS - RAG/Vector Search Support
// ============================================================================

/**
 * MessageChunk - Fragmento de mensagem para vector search
 *
 * Mensagens longas são divididas em chunks para:
 * - Respeitar limite de tokens do modelo de embedding
 * - Melhorar precisão da busca semântica (chunks menores = mais específicos)
 * - Permitir overlap entre chunks para manter contexto
 */
export interface MessageChunk {
  _id?: ObjectId;
  messageId: ObjectId;              // Referência para conversation_messages
  conversationId: ObjectId;         // Conversação original (para filtros)
  chunkIndex: number;               // Ordem do chunk (0, 1, 2...)
  content: string;                  // Conteúdo do chunk (200-500 palavras)

  // Vector embedding
  embedding: number[];              // Array de 1536 números (OpenAI text-embedding-3-small)
  embeddingsModel: string;          // Ex: "text-embedding-3-small"

  // Metadata para contexto
  hasOverlap: boolean;              // Se chunk tem overlap com anterior/próximo
  overlapSize?: number;             // Tamanho do overlap em palavras

  // Multi-tenant
  appId: ObjectId;
  companyId: ObjectId;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Response type para API
 */
export interface MessageChunkResponse extends Omit<MessageChunk, '_id' | 'messageId' | 'conversationId' | 'appId' | 'companyId' | 'createdAt' | 'updatedAt'> {
  id: string;
  messageId: string;
  conversationId: string;
  appId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request para criar chunk
 */
export interface CreateMessageChunkRequest {
  messageId: string;
  conversationId: string;
  chunkIndex: number;
  content: string;
  hasOverlap: boolean;
  overlapSize?: number;
}

/**
 * Configuração de chunking
 */
export interface ChunkingConfig {
  maxWordsPerChunk: number;         // Máximo de palavras por chunk (padrão: 400)
  overlapWords: number;             // Palavras de overlap entre chunks (padrão: 50)
  minWordsForChunking: number;      // Mínimo de palavras para fazer chunking (padrão: 500)
}

/**
 * Resultado de busca semântica
 */
export interface SemanticSearchResult {
  chunkId: string;
  messageId: string;
  conversationId: string;
  content: string;
  score: number;                    // Similarity score (0-1, quanto maior melhor)
  chunkIndex: number;
  metadata?: Record<string, any>;
}

/**
 * Parâmetros para busca semântica
 */
export interface SemanticSearchQuery {
  query: string;                    // Texto da busca
  appId: string;
  companyId: string;
  limit?: number;                   // Número de resultados (padrão: 10)
  minScore?: number;                // Score mínimo para retornar (padrão: 0.7)
  conversationId?: string;          // Filtrar por conversa específica
}
