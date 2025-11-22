import { CompanyAwareDocument } from './common';
/**
 * Database Document Types
 *
 * Tipos de documentos que podem ser sincronizados de providers externos
 */
export type DatabaseDocumentType = 'property';
/**
 * Provider Sync Status
 *
 * Estados possíveis de sincronização com provider externo
 */
export type ProviderSyncStatus = 'pending' | 'synced' | 'failed';
/**
 * Provider Sync Entry
 *
 * Registro de sincronização com um provider específico
 * Permite múltiplos providers sincronizando o mesmo documento
 */
export interface ProviderSyncEntry {
    integrationId: string;
    providerId: string;
    providerDocumentId: string;
    syncStatus: ProviderSyncStatus;
    lastSyncAt: string;
    syncError?: string;
}
/**
 * Database Document
 *
 * Documento genérico sincronizado de providers externos
 * Schema flexível baseado no campo 'type'
 */
export interface DatabaseDocument extends CompanyAwareDocument {
    type: DatabaseDocumentType;
    data: Record<string, any>;
    providerSync: ProviderSyncEntry[];
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
/**
 * Database Document Query
 *
 * Parâmetros de busca para documentos do banco de dados
 */
export interface DatabaseDocumentQuery {
    page?: number;
    limit?: number;
    search?: string;
    type?: DatabaseDocumentType;
    syncStatus?: ProviderSyncStatus;
    providerId?: string;
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
/**
 * Create Database Document Request
 *
 * Request para criar novo documento manualmente (não via sync)
 */
export interface CreateDatabaseDocumentRequest {
    type: DatabaseDocumentType;
    data: Record<string, any>;
    providerSync?: ProviderSyncEntry[];
}
/**
 * Update Database Document Request
 *
 * Request para atualizar documento existente
 */
export interface UpdateDatabaseDocumentRequest {
    data?: Record<string, any>;
    providerSync?: ProviderSyncEntry[];
}
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
