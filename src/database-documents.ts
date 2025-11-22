import { ObjectId } from 'mongodb';
import { CompanyAwareDocument } from './common';

/**
 * Database Document Types
 *
 * Tipos de documentos que podem ser sincronizados de providers externos
 */
export type DatabaseDocumentType =
  | 'property';      // Jetimob - Propriedades imobiliárias
  // | 'lead'        // Future: Vista - Leads
  // | 'contract'    // Future: SuperLogica - Contratos
  // | 'client'      // Future: Clientes
  // | 'product';    // Future: Produtos

/**
 * Provider Sync Status
 *
 * Estados possíveis de sincronização com provider externo
 */
export type ProviderSyncStatus =
  | 'pending'   // Aguardando sincronização
  | 'synced'    // Sincronizado com sucesso
  | 'failed';   // Falha na sincronização

/**
 * Provider Sync Entry
 *
 * Registro de sincronização com um provider específico
 * Permite múltiplos providers sincronizando o mesmo documento
 */
export interface ProviderSyncEntry {
  integrationId: string;           // ID da company-integration
  providerId: string;              // ID do provider (database-jetimob, database-vista, etc.)
  providerDocumentId: string;      // ID do documento no sistema externo
  syncStatus: ProviderSyncStatus;
  lastSyncAt: string;              // ISO date string
  syncError?: string;              // Mensagem de erro se syncStatus === 'failed'
}

/**
 * Database Document
 *
 * Documento genérico sincronizado de providers externos
 * Schema flexível baseado no campo 'type'
 */
export interface DatabaseDocument extends CompanyAwareDocument {
  type: DatabaseDocumentType;      // Tipo define o schema do campo 'data'
  data: Record<string, any>;       // Dados específicos do tipo (schema dinâmico)
  providerSync: ProviderSyncEntry[]; // Array de sincronizações (multi-provider support)
}

/**
 * Database Document Response
 *
 * Response type para APIs (ObjectId → string)
 */
export interface DatabaseDocumentResponse extends Omit<DatabaseDocument, '_id' | 'companyId' | 'appId' | 'createdAt' | 'updatedAt'> {
  id: string;
  companyId: string;
  appId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// ============================================================================
// QUERY TYPES
// ============================================================================

/**
 * Database Document Query
 *
 * Parâmetros de busca para documentos do banco de dados
 */
export interface DatabaseDocumentQuery {
  page?: number;
  limit?: number;
  search?: string;                 // Busca em data.title, data.name, etc.
  type?: DatabaseDocumentType;     // Filtrar por tipo específico
  syncStatus?: ProviderSyncStatus; // Filtrar por status de sync
  providerId?: string;             // Filtrar por provider específico
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Database Document List Response
 */
export interface DatabaseDocumentListResponse {
  items: DatabaseDocumentResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// CREATE/UPDATE REQUEST TYPES
// ============================================================================

/**
 * Create Database Document Request
 *
 * Request para criar novo documento manualmente (não via sync)
 */
export interface CreateDatabaseDocumentRequest {
  type: DatabaseDocumentType;
  data: Record<string, any>;
  providerSync?: ProviderSyncEntry[]; // Opcional: pode ser adicionado depois via sync
}

/**
 * Update Database Document Request
 *
 * Request para atualizar documento existente
 */
export interface UpdateDatabaseDocumentRequest {
  data?: Record<string, any>;      // Atualização parcial dos dados
  providerSync?: ProviderSyncEntry[]; // Atualização do array de sync
}

// ============================================================================
// SYNC RESULT TYPES
// ============================================================================

/**
 * Database Sync Result
 *
 * Resultado de operação de sincronização com provider
 */
export interface DatabaseSyncResult {
  documentsCreated: number;
  documentsUpdated: number;
  documentsDeleted: number;
  errors: Array<{
    providerDocumentId: string;
    error: string;
  }>;
  summary: {
    totalProcessed: number;
    successCount: number;
    errorCount: number;
  };
}

/**
 * Provider Sync Result (Generic)
 *
 * Resultado genérico de operações de sincronização
 */
export interface ProviderSyncResult {
  success: boolean;
  message: string;
  syncResult?: DatabaseSyncResult;
  error?: string;
}
