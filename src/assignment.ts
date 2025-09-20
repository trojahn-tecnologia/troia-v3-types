import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse } from './common';

// ============================================================================
// ASSIGNMENT CORE INTERFACES
// ============================================================================

export type AssignmentResourceType = 'ticket' | 'conversation' | 'call' | 'chat' | 'lead' | 'contact' | 'customer';

export interface Assignment {
  id: string;
  resourceType: AssignmentResourceType;
  resourceId: string;
  assignedTo: ObjectId; // userId
  assignedBy?: ObjectId; // userId who made the assignment
  teamId?: ObjectId; // team context if applicable
  channelId?: ObjectId; // channel context if applicable
  shiftId?: ObjectId; // shift context if applicable
  assignmentType: AssignmentType;
  assignmentStrategy: AssignmentStrategy;
  priority?: 'low' | 'medium' | 'high' | 'urgent'; // String priority following project standard
  status: AssignmentStatus;
  assignedAt: Date;
  completedAt?: Date;
  metadata?: Record<string, any>; // Additional context
  companyId: ObjectId;
  appId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type AssignmentType = 'manual' | 'automatic' | 'lottery' | 'rule_based';

export type AssignmentStrategy =
  | 'round_robin'
  | 'least_busy'
  | 'priority_based'
  | 'random'
  | 'shift_lottery'
  | 'availability_based'
  | 'skill_based'
  | 'geographic'
  | 'manual_override';

export type AssignmentStatus = 'pending' | 'assigned' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

// ============================================================================
// ASSIGNMENT CONFIGURATION
// ============================================================================

export interface AssignmentConfig {
  enabled: boolean;
  defaultStrategy: AssignmentStrategy;
  fallbackStrategy?: AssignmentStrategy;
  maxRetries?: number;
  retryDelay?: number; // seconds
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
  priority?: 'low' | 'medium' | 'high' | 'urgent'; // Higher priority assignments bypass limits
}

// ============================================================================
// ASSIGNMENT REQUESTS
// ============================================================================

export interface CreateAssignmentRequest {
  resourceType: AssignmentResourceType;
  resourceId: string;
  assignmentType?: AssignmentType;
  assignmentStrategy?: AssignmentStrategy;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  teamId?: string;
  channelId?: string;
  shiftId?: string;
  specificUserId?: string; // For manual assignments
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
  maintainBalance?: boolean; // Distribute evenly across users
}

// ============================================================================
// ASSIGNMENT RESPONSES
// ============================================================================

export interface AssignmentResponse extends Omit<Assignment, '_id' | 'metadata'> {
  id: string;
  assignedToUser?: {
    id: string;
    name: string;
    email: string;
  };
  assignedByUser?: {
    id: string;
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

// ============================================================================
// ASSIGNMENT QUERIES
// ============================================================================

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

export interface AssignmentListResponse extends ListResponse<AssignmentResponse> {}

// ============================================================================
// ASSIGNMENT ANALYTICS
// ============================================================================

export interface AssignmentStats {
  totalAssignments: number;
  completedAssignments: number;
  pendingAssignments: number;
  averageCompletionTime: number; // minutes
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

// ============================================================================
// LOTTERY SPECIFIC TYPES
// ============================================================================

export interface LotteryConfig {
  enabled: boolean;
  algorithm: LotteryAlgorithm;
  weights?: LotteryWeights;
  exclusions?: LotteryExclusions;
  maxParticipants?: number;
  cooldownMinutes?: number; // Time before user can be selected again
}

export type LotteryAlgorithm =
  | 'pure_random'
  | 'weighted_random'
  | 'least_recent'
  | 'priority_weighted'
  | 'skill_weighted'
  | 'availability_weighted';

export interface LotteryWeights {
  priority?: number; // 0-1 (priority weight in lottery)
  skill?: number; // 0-1
  availability?: number; // 0-1
  lastAssignment?: number; // 0-1 (weight for time since last assignment)
  performance?: number; // 0-1 (historical completion rate)
}

export interface LotteryExclusions {
  recentlyAssigned?: number; // Minutes since last assignment
  maxConcurrent?: number; // Max concurrent assignments
  unavailableStatus?: boolean; // Exclude users marked as unavailable
  outsideShift?: boolean; // Exclude users outside their shift hours
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