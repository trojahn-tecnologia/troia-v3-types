import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse } from './common';
/**
 * Assignment Resource Types
 *
 * Tipos de recursos que podem ser atribuídos a usuários/equipes:
 * - ticket: Tickets de suporte/atendimento
 * - conversation: Conversas de chat (WhatsApp, Instagram, etc.)
 * - call: Chamadas telefônicas
 * - lead: Leads de vendas
 * - contact: Contatos gerais
 * - customer: Clientes cadastrados
 *
 * NOTA: 'chat' foi removido pois é redundante com 'conversation'
 * NOTA: 'lead' foi adicionado para suportar módulo de leads futuro
 */
export type AssignmentResourceType = 'ticket' | 'conversation' | 'call' | 'lead' | 'contact' | 'customer';
export interface Assignment {
    resourceType: AssignmentResourceType;
    resourceId: string;
    assignedTo: ObjectId;
    assignedBy?: ObjectId;
    teamId?: ObjectId;
    channelId?: ObjectId;
    shiftId?: ObjectId;
    assignmentType: AssignmentType;
    assignmentStrategy: AssignmentStrategy;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    status: AssignmentStatus;
    assignedAt: Date;
    completedAt?: Date;
    metadata?: Record<string, any>;
    companyId: ObjectId;
    appId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export type AssignmentType = 'manual' | 'automatic' | 'lottery' | 'rule_based';
export type AssignmentStrategy = 'round_robin' | 'least_busy' | 'priority_based' | 'random' | 'lottery' | 'shift_lottery' | 'availability_based' | 'skill_based' | 'geographic' | 'manual_override';
export type AssignmentStatus = 'pending' | 'assigned' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
export interface AssignmentConfig {
    enabled: boolean;
    defaultStrategy: AssignmentStrategy;
    fallbackStrategy?: AssignmentStrategy;
    maxRetries?: number;
    retryDelay?: number;
    timeoutMinutes?: number;
    autoAccept?: boolean;
    requireConfirmation?: boolean;
    notifyOnAssignment?: boolean;
    escalationRules?: EscalationRule[];
    workloadLimits?: WorkloadLimit[];
}
export interface EscalationRule {
    condition: 'timeout' | 'rejection' | 'no_available_users';
    action: 'reassign' | 'notify_manager' | 'queue' | 'escalate_priority';
    targetStrategy?: AssignmentStrategy;
    delayMinutes?: number;
    maxEscalations?: number;
}
export interface WorkloadLimit {
    resourceType: AssignmentResourceType;
    maxConcurrent?: number;
    maxDaily?: number;
    maxWeekly?: number;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
}
export interface CreateAssignmentRequest {
    resourceType: AssignmentResourceType;
    resourceId: string;
    assignmentType?: AssignmentType;
    assignmentStrategy?: AssignmentStrategy;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    teamId?: string;
    channelId?: string;
    shiftId?: string;
    specificUserId?: string;
    metadata?: Record<string, any>;
    requireConfirmation?: boolean;
    timeoutMinutes?: number;
}
export interface AssignmentCriteria {
    resourceType: AssignmentResourceType;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    requiredSkills?: string[];
    preferredUsers?: string[];
    excludeUsers?: string[];
    teamIds?: string[];
    shiftIds?: string[];
    channelIds?: string[];
}
export interface BulkAssignmentRequest {
    assignments: CreateAssignmentRequest[];
    globalStrategy?: AssignmentStrategy;
    maintainBalance?: boolean;
}
export interface AssignmentResponse extends Omit<Assignment, '_id' | 'metadata'> {
    id: string;
    assignedToUser?: {
        name: string;
        email: string;
    };
    assignedByUser?: {
        name: string;
        email: string;
    };
}
export interface AssignmentResult {
    success: boolean;
    assignment?: AssignmentResponse;
    assignedUserId?: string;
    message: string;
    fallbackUsed?: boolean;
    escalated?: boolean;
    retryCount?: number;
}
export interface BulkAssignmentResult {
    success: boolean;
    successCount: number;
    failureCount: number;
    results: AssignmentResult[];
    errors: string[];
}
export interface AssignmentQuery extends PaginationQuery {
    status?: AssignmentStatus;
    assignmentType?: AssignmentType;
    assignmentStrategy?: AssignmentStrategy;
    resourceType?: AssignmentResourceType;
    resourceId?: string;
    assignedTo?: string;
    assignedBy?: string;
    teamId?: string;
    channelId?: string;
    shiftId?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    dateFrom?: string;
    dateTo?: string;
}
export interface AssignmentListResponse extends ListResponse<AssignmentResponse> {
}
export interface AssignmentStats {
    totalAssignments: number;
    completedAssignments: number;
    pendingAssignments: number;
    averageCompletionTime: number;
    assignmentsByStrategy: Record<AssignmentStrategy, number>;
    assignmentsByStatus: Record<AssignmentStatus, number>;
    topPerformers: {
        userId: ObjectId;
        userName: string;
        completedCount: number;
        averageTime: number;
    }[];
}
export interface UserWorkload {
    userId: ObjectId;
    currentAssignments: number;
    dailyAssignments: number;
    weeklyAssignments: number;
    averageCompletionTime: number;
    lastAssignmentAt?: Date;
}
export interface LotteryConfig {
    enabled: boolean;
    algorithm: LotteryAlgorithm;
    weights?: LotteryWeights;
    exclusions?: LotteryExclusions;
    maxParticipants?: number;
    cooldownMinutes?: number;
}
export type LotteryAlgorithm = 'pure_random' | 'weighted_random' | 'least_recent' | 'priority_weighted' | 'skill_weighted' | 'availability_weighted';
export interface LotteryWeights {
    priority?: number;
    skill?: number;
    availability?: number;
    lastAssignment?: number;
    performance?: number;
}
export interface LotteryExclusions {
    recentlyAssigned?: number;
    maxConcurrent?: number;
    unavailableStatus?: boolean;
    outsideShift?: boolean;
}
export interface LotteryResult {
    selectedUserId: string;
    participants: LotteryParticipant[];
    algorithm: LotteryAlgorithm;
    metadata: Record<string, any>;
}
export interface LotteryParticipant {
    userId: string;
    weight: number;
    score: number;
    selected: boolean;
    exclusionReason?: string;
}
/**
 * Tipos de lottery unificados para todo o sistema.
 * Usado por Channels, Funnels, e AssignmentsService.
 *
 * - random: Seleção aleatória simples entre usuários elegíveis
 * - shift: Baseado em turno ativo - seleciona apenas usuários do turno
 * - availability: Considera status online/offline
 * - fixed_operator: Operador fixo com fallback opcional
 * - last_interaction: Seleciona quem interagiu por último com o contato
 * - none: Sem lottery automático (assignment manual)
 */
export type LotteryType = 'random' | 'shift' | 'availability' | 'fixed_operator' | 'last_interaction' | 'workload' | 'none';
/**
 * Configuração de fixed operator.
 * Usado quando type = 'fixed_operator'
 */
export interface FixedOperatorConfig {
    /** ID do usuário fixo que receberá os assignments */
    userId: string;
    /** Se true, faz fallback para random quando fixed operator não disponível */
    fallbackToRandom: boolean;
}
/**
 * Configuração de lottery por turno.
 * Usado quando type = 'shift'
 *
 * NOTA: Todos os campos são opcionais. O sistema usa turno ativo automaticamente.
 */
export interface ShiftLotteryConfig {
    /** ID do turno específico. Se não definido, usa turno ativo no momento */
    shiftId?: string;
    /** Se true, seleciona apenas membros primários do turno. Default: false */
    onlyPrimary?: boolean;
}
/**
 * Configuração de lottery por disponibilidade.
 * Usado quando type = 'availability'
 *
 * NOTA: Campo opcional. O sistema considera status online por padrão.
 */
export interface AvailabilityLotteryConfig {
    /** Considera status online/offline do usuário. Default: true */
    considerOnlineStatus?: boolean;
}
/**
 * Configuração de lottery por última interação.
 * Usado quando type = 'last_interaction'
 */
export interface LastInteractionLotteryConfig {
    /** Quantos dias olhar para trás para encontrar interação */
    lookbackDays: number;
    /** Se true, faz fallback para random quando não encontrar interação */
    fallbackToRandom: boolean;
}
/**
 * Configuração de lottery unificada.
 * Esta interface é usada por Channels, Funnels, e qualquer outro módulo
 * que precise de configuração de lottery/assignment automático.
 *
 * IMPORTANTE: O campo 'enabled' NÃO existe aqui propositalmente.
 * O controle de habilitação é feito no nível do ChannelAssignmentConfig:
 * - assignmentConfig.enabled = controla se auto-assignment está ativo
 * - assignmentConfig.strategy = 'lottery' determina que lottery será usado
 * - assignmentConfig.lotteryConfig = contém apenas a configuração do tipo de lottery
 *
 * @example
 * // Random lottery (enabled via parent assignmentConfig.enabled)
 * { type: 'random', eligibleUsers: ['user1', 'user2'] }
 *
 * @example
 * // Shift lottery
 * { type: 'shift', shiftConfig: { onlyPrimary: true } }
 *
 * @example
 * // Fixed operator
 * { type: 'fixed_operator', fixedOperatorConfig: { userId: 'user1', fallbackToRandom: true } }
 */
export interface CoreLotteryConfig {
    /** Tipo de lottery a ser usado */
    type: LotteryType;
    /** IDs de usuários elegíveis para o lottery. Se vazio, usa todos os disponíveis */
    eligibleUsers?: string[];
    /** IDs de equipes elegíveis. Lottery será feito entre membros das equipes */
    eligibleTeams?: string[];
    /** Config para type='fixed_operator' */
    fixedOperatorConfig?: FixedOperatorConfig;
    /** Config para type='shift' */
    shiftConfig?: ShiftLotteryConfig;
    /** Config para type='availability' */
    availabilityConfig?: AvailabilityLotteryConfig;
    /** Config para type='last_interaction' */
    lastInteractionConfig?: LastInteractionLotteryConfig;
}
/**
 * Opções para métodos de assignment de recursos.
 * Usado por assignConversation, assignLead, etc.
 */
export interface AssignResourceOptions {
    /** ID do usuário para assignment direto (pula lottery) */
    specificUserId?: string;
    /** ID da equipe para lottery dentro do team */
    specificTeamId?: string;
    /** Se true, pula lottery e deixa sem assignee */
    skipLottery?: boolean;
    /** Prioridade do assignment */
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    /** Motivo do assignment (para auditoria) */
    reason?: string;
}
/**
 * Opções para métodos de transferência.
 * Usado por transferConversation, transferLead, etc.
 */
export interface TransferResourceOptions {
    /** ID do usuário destino (transferência direta) */
    toUserId?: string;
    /** ID da equipe destino (lottery dentro do team) */
    toTeamId?: string;
    /** Motivo da transferência (obrigatório) */
    reason: string;
}
/**
 * Resultado de uma operação de lottery.
 * Retornado pelo LotteryEngine.selectUser()
 */
export interface CoreLotteryResult {
    /** Se a seleção foi bem sucedida */
    success: boolean;
    /** ID do usuário selecionado (null se falhou) */
    selectedUserId: string | null;
    /** ID da equipe do usuário selecionado (se aplicável) */
    selectedTeamId?: string | null;
    /** Algoritmo/tipo usado na seleção */
    algorithm: LotteryType;
    /** Quantidade de participantes no pool */
    participantsCount: number;
    /** Metadados adicionais da seleção */
    metadata?: {
        /** ID do turno usado (se type='shift') */
        shiftId?: string;
        /** Se fallback foi usado */
        fallbackUsed?: boolean;
        /** Motivo da falha (se success=false) */
        reason?: string;
    };
}
/**
 * Contexto passado para o LotteryEngine.
 * Contém informações necessárias para executar o lottery.
 */
export interface LotteryContext {
    appId: string;
    companyId: string;
    resourceType: AssignmentResourceType;
    resourceId: string;
    channelId?: string;
    funnelId?: string;
    contactId?: string;
}
