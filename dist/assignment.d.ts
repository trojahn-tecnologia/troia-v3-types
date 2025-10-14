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
export type AssignmentStrategy = 'round_robin' | 'least_busy' | 'priority_based' | 'random' | 'shift_lottery' | 'availability_based' | 'skill_based' | 'geographic' | 'manual_override';
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
    timeSlot?: {
        startTime: Date;
        endTime: Date;
    };
    geographic?: {
        region?: string;
        timezone?: string;
    };
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
