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

  // Universal source + channel + origin
  source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual' | 'api';
  origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
  channelId?: string;

  // Status and temperature
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  temperature: 'cold' | 'warm' | 'hot';
  qualifyStatus: 'pending' | 'qualified' | 'disqualified';

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

  // Activity tracking (calculated by backend based on activities)
  // no_activities: No activities registered (red/problem)
  // overdue: Has pending activities past their occurredAt date (orange/warning)
  // up_to_date: All activities completed or pending with future dates (green/success)
  activityStatus?: 'no_activities' | 'overdue' | 'up_to_date';

  // Control dates
  customerId?: string;        // Renamed from convertedToCustomerId
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
  contactId?: string;  // ✅ OPTIONAL: will be created from name/emails/phones if not provided
  score?: number;
  segment: string;
  description?: string;
  source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
  origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
  channelId?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  temperature?: 'cold' | 'warm' | 'hot';
  qualifyStatus?: 'pending' | 'qualified' | 'disqualified';
  funnelId?: string;
  stepId?: string;
  assigneeId?: string;
  teamId?: string;
  budget?: number;

  // ✅ NEW: Contact data for automatic contact creation (if contactId not provided)
  name?: string;
  company?: string;
  position?: string;
  emails?: string[];
  phones?: string[];
}

export interface UpdateLeadRequest {
  contactId?: string;
  score?: number;
  segment?: string;
  description?: string;
  source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
  origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
  channelId?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  temperature?: 'cold' | 'warm' | 'hot';
  qualifyStatus?: 'pending' | 'qualified' | 'disqualified';
  funnelId?: string;
  stepId?: string;
  assigneeId?: string;
  teamId?: string;
  budget?: number;
  wonValue?: number;
  businessStatus?: 'pending' | 'won' | 'lost';
  wonDate?: string;
  // activityStatus is calculated automatically by backend - not updatable
  customerId?: string;
  lostReason?: string;
  lastInteractionAt?: string;
  lastFollowUpAt?: string;
  lastStepAt?: string;
}

export interface LeadResponse extends Lead {
  // Populated relationships (from aggregation lookups)
  contact?: {
    id: string;
    name: string;
    identifiers?: {
      email?: string[];
      phone?: string[];
      whatsapp?: string[];
      instagram?: string[];
      facebook?: string[];
      telegram?: string[];
    };
  };
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  customer?: {
    id: string;
    name: string;
  };
  channel?: {
    id: string;
    name: string;
  };
  step?: {
    id: string;
    name: string;
  };
  funnel?: {
    id: string;
    name: string;
  };
}

export interface LeadQuery extends PaginationQuery {
  filters?: {
    contactId?: string;
    segment?: string;
    source?: 'webhook' | 'conversation' | 'ai-conversation' | 'manual';
    origin?: 'Facebook' | 'Instagram' | 'Google' | 'Youtube' | 'LinkedIn' | 'Twitter' | 'TikTok' | 'Website' | 'Email' | 'Phone' | 'Referral' | 'Other';
    channelId?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted' | 'lost';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    temperature?: 'cold' | 'warm' | 'hot';
    qualifyStatus?: 'pending' | 'qualified' | 'disqualified';
    businessStatus?: 'pending' | 'won' | 'lost';
    funnelId?: string;
    stepId?: string;
    assigneeId?: string;
    teamId?: string;
    customerId?: string;
    scoreMin?: number;
    scoreMax?: number;
    budgetMin?: number;
    budgetMax?: number;
    dateFrom?: string;
    dateTo?: string;
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