import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';

// ============================================================================
// ASSIGNMENT CONFIGURATION TYPES
// ============================================================================

export interface AssignmentConfig {
  strategy: 'manual' | 'rule' | 'lottery' | 'none';
  rules?: AssignmentRule[];
  lotteryConfig?: LotteryConfig;
}

export interface AssignmentRule {
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
  active: boolean;
}

export interface RuleCondition {
  field: string; // 'lead.source', 'customer.city', 'ticket.priority'
  operator: 'equals' | 'contains' | 'in' | 'not_in';
  value: any;
}

export interface RuleAction {
  type: 'assign_team' | 'assign_user' | 'assign_both';
  teamId?: string;
  userId?: string;
}

export interface LotteryConfig {
  type: 'random' | 'availability' | 'workload' | 'last_interaction' | 'fixed_operator' | 'shift' | 'none';
  scope: 'team' | 'user' | 'both';
  eligibleTeams?: string[];
  eligibleUsers?: string[];

  // Shift-specific config:
  shiftConfig?: {
    shiftId: string;
    fallbackToAvailable: boolean;
    considerWorkload: boolean;
    onlyPrimary: boolean;
  };

  // Workload-specific config:
  workloadConfig?: {
    resourceType: 'lead' | 'customer' | 'ticket';
    maxAssignments: number;
    timeWindow: number; // Hours
  };

  // Availability-specific config:
  availabilityConfig?: {
    considerWorkingHours: boolean;
    considerStatus: boolean;
    workingHours: { start: string; end: string; };
  };

  // Fixed operator config:
  fixedOperatorConfig?: {
    userId: string;
    fallbackToRandom: boolean;
  };

  // Last interaction config:
  lastInteractionConfig?: {
    resourceType: 'lead' | 'customer';
    fallbackToRandom: boolean;
  };
}

// ============================================================================
// PROVIDER & INTEGRATION TYPES
// ============================================================================

export interface Provider {
  _id: ObjectId;
  name: string;
  categories: string[];
  capabilities: string[];
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyIntegration {
  _id: ObjectId;
  companyId: ObjectId;
  appId: ObjectId;
  providerId: ObjectId;
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastSync?: Date;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  _id: ObjectId;
  name: string;
  integrationId: ObjectId;
  identifier: string;
  assignmentConfig: AssignmentConfig;
  companyId: ObjectId;
  appId: ObjectId;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// REQUEST/RESPONSE TYPES
// ============================================================================

// Generic Query Types
export interface CompanyIntegrationQuery extends PaginationQuery {
  providerId?: string;
  status?: 'active' | 'inactive' | 'error' | 'pending';
}

export interface ChannelQuery extends PaginationQuery {
  integrationId?: string;
  identifier?: string;
  status?: ActiveStatus;
}

// Response Types
export type ProviderResponse = Omit<Provider, never>;
export type CompanyIntegrationResponse = Omit<CompanyIntegration, never>;
export type ChannelResponse = Omit<Channel, never>;

// List Response Types
export interface ProviderListResponse extends ListResponse<ProviderResponse> {}
export interface CompanyIntegrationListResponse extends ListResponse<CompanyIntegrationResponse> {}
export interface ChannelListResponse extends ListResponse<ChannelResponse> {}

// Query Options Types
export interface CompanyIntegrationQueryOptions extends GenericQueryOptions<CompanyIntegrationQuery> {}
export interface ChannelQueryOptions extends GenericQueryOptions<ChannelQuery> {}

// ============================================================================
// SPECIFIC REQUEST TYPES
// ============================================================================

// Company Integration Requests
export interface CreateCompanyIntegrationRequest {
  providerId: string;
  config: Record<string, any>;
}

export interface UpdateCompanyIntegrationRequest {
  config?: Record<string, any>;
  status?: 'active' | 'inactive' | 'error' | 'pending';
}

// Channel Requests
export interface CreateChannelRequest {
  name: string;
  integrationId: string;
  identifier: string;
  assignmentConfig: AssignmentConfig;
}

export interface UpdateChannelRequest {
  name?: string;
  identifier?: string;
  assignmentConfig?: AssignmentConfig;
  status?: ActiveStatus;
}

// Assignment Result
export interface AssignmentResult {
  teamId: string | null;
  userId: string | null;
  reason?: string;
}