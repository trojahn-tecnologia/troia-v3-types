// Lead Types - Sales system with universal source
export interface Lead {
  id: string;
  appId: string;
  companyId: string;

  // Base relationship
  contactId: string;

  // Basic data
  score: number;
  segment: string;
  description?: string;

  // Universal source + channel
  source?: string;
  channelId?: string;

  // Status and temperature
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  temperature: 'cold' | 'warm' | 'hot';

  // Sales funnel
  funnelId?: string;
  stepId?: string;

  // Assignment (standard assignments pattern)
  assigneeId?: string;
  teamId?: string;
  assignmentType?: string;
  assignedAt?: string;
  assignedBy?: string;

  // Financial
  budget?: number;
  wonValue?: number;

  // Business outcome
  businessStatus?: 'pending' | 'won' | 'lost';
  wonDate?: string;

  // Activity tracking (calculated by backend)
  activityStatus?: 'none' | 'scheduled' | 'overdue' | 'completed';

  // Control dates
  customerId?: string;        // Renamed from convertedToCustomerId
  convertedAt?: string;
  lostDate?: string;
  lastInteractionAt?: string;
  lastFollowUpAt?: string;
  lastStepAt?: string;

  // Loss/disqualification reasons
  lostReason?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadRequest {
  contactId: string;
  score?: number;
  segment: string;
  description?: string;
  source?: string;
  channelId?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  temperature?: 'cold' | 'warm' | 'hot';
  funnelId?: string;
  stepId?: string;
  assigneeId?: string;
  teamId?: string;
  budget?: number;
}

export interface UpdateLeadRequest {
  contactId?: string;
  score?: number;
  segment?: string;
  description?: string;
  source?: string;
  channelId?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  temperature?: 'cold' | 'warm' | 'hot';
  funnelId?: string;
  stepId?: string;
  assigneeId?: string;
  teamId?: string;
  budget?: number;
  wonValue?: number;
  businessStatus?: 'pending' | 'won' | 'lost';
  wonDate?: string;
  activityStatus?: 'none' | 'scheduled' | 'overdue' | 'completed';
  customerId?: string;
  lostReason?: string;
  lastInteractionAt?: string;
  lastFollowUpAt?: string;
  lastStepAt?: string;
}

export type LeadResponse = Lead;

export interface LeadQuery extends PaginationQuery {
  filters?: {
    contactId?: string;
    segment?: string;
    source?: string;
    channelId?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    temperature?: 'cold' | 'warm' | 'hot';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    customerId?: string;
    scoreMin?: number;
    scoreMax?: number;
    budgetMin?: number;
    budgetMax?: number;
  };
}

export interface LeadListResponse extends ListResponse<LeadResponse> {}

// Lead conversion
export interface ConvertLeadRequest {
  customerId: string;
  wonValue?: number;
  conversionNotes?: string;
}

// Lead assignment
export interface AssignLeadRequest {
  assigneeId?: string;
  teamId?: string;
  assignmentType?: string;
}

// Import types
import { PaginationQuery, ListResponse } from './common';