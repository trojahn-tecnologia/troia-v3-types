import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ExtendedStatus } from './common';

// Import assignment types from dedicated assignment module
import { AssignmentConfig as CoreAssignmentConfig, LotteryConfig as CoreLotteryConfig } from './assignment';

// ============================================================================
// CHANNEL-SPECIFIC ASSIGNMENT TYPES
// ============================================================================

// Channel-specific assignment config extends core assignment config
export interface ChannelAssignmentConfig extends CoreAssignmentConfig {
  strategy: 'manual' | 'rule' | 'lottery' | 'none';
  rules?: AssignmentRule[];
  lotteryConfig?: ChannelLotteryConfig;
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

// Channel-specific lottery config extends core lottery config
export interface ChannelLotteryConfig extends CoreLotteryConfig {
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
// CHANNEL PROVIDER TYPES (CompanyIntegration defined in company-integrations.ts)
// ============================================================================

export interface ChannelProvider {
  name: string;
  categories: string[];
  capabilities: string[];
  status: ExtendedStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  name: string;
  integrationId: ObjectId;    // Reference to the automatically created integration
  identifier: string;
  providerId?: string;        // Provider ID for conditional UI rendering
  instanceKey?: string;       // For Gateway providers
  instanceToken?: string;     // For Gateway providers
  identifyUser?: boolean;     // If true, operator name is added to outgoing messages
  assignmentConfig: ChannelAssignmentConfig;
  companyId: ObjectId;
  appId: ObjectId;
  status: ExtendedStatus;     // 'active' | 'inactive' | 'pending' | 'suspended' | 'error'
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// REQUEST/RESPONSE TYPES
// ============================================================================

// Generic Query Types - CompanyIntegrationQuery defined in company-integrations.ts

export interface ChannelQuery extends PaginationQuery {
  integrationId?: string;
  identifier?: string;
  status?: ExtendedStatus;
}

// Response Types
export type ChannelProviderResponse = Omit<ChannelProvider, never>;
export type ChannelResponse = Omit<Channel, '_id' | 'createdAt' | 'updatedAt' | 'integrationId' | 'companyId' | 'appId'> & {
  id: string;
  integrationId: string;     // ObjectId → string
  companyId: string;          // ObjectId → string
  appId: string;              // ObjectId → string
  createdAt: string;          // Date → ISO string
  updatedAt: string;          // Date → ISO string
  members?: Array<{ id: string; name: string; avatar?: string }>;
  config?: Record<string, any>;  // Widget configuration (optional, for website-widget provider)
  qrCode?: string;            // QR Code for gateway providers
  qrCodeExpires?: string;     // QR Code expiration
};


// List Response Types
export interface ChannelProviderListResponse extends ListResponse<ChannelProviderResponse> {}
export interface ChannelListResponse extends ListResponse<ChannelResponse> {}

// Query Options Types
export interface ChannelQueryOptions extends GenericQueryOptions<ChannelQuery> {}

// ============================================================================
// SPECIFIC REQUEST TYPES
// ============================================================================

export interface CreateChannelRequest {
  name: string;
  identifier: string;
  assignmentConfig: ChannelAssignmentConfig;
  providerId: string;
  config: Record<string, any>;
  credentials: Record<string, any>;
  integrationName?: string;
  integrationDescription?: string;
}

export interface CreateChannelRepositoryRequest {
  name: string;
  identifier: string;
  assignmentConfig: ChannelAssignmentConfig;
  integrationId: string;
}
export interface UpdateChannelRequest {
  name?: string;
  identifier?: string;
  assignmentConfig?: ChannelAssignmentConfig;
  identifyUser?: boolean;
  status?: ExtendedStatus;
}

// Channel Assignment Result (simpler version for channels)
export interface ChannelAssignmentResult {
  teamId: string | null;
  userId: string | null;
  reason?: string;
}

// Testing and Manual Assignment
export interface TestAssignmentRequest {
  channelId: string;
  resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
  resourceId: string;
  priority?: number;
  metadata?: Record<string, any>;
}

export interface TestAssignmentResponse {
  success: boolean;
  assignedTo: ChannelAssignmentResult;
  message: string;
  executedAt: Date;
  details?: Record<string, any>;
}

export interface ManualAssignRequest {
  channelId: string;
  resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
  resourceId: string;
  userId: string;
  priority?: number;
  notes?: string;
}

export interface ManualAssignResponse {
  success: boolean;
  assignmentId: string;
  message: string;
  assignedAt: Date;
}