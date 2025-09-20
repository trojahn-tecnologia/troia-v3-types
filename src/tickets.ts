// Ticket Types - Sistema de atendimento com SLA
export interface Ticket {
  appId: string;
  companyId: string;

  // Core ticket data
  ticketNumber: string;  // Auto-generated: TCK-YYYY-NNNNNN
  title: string;
  description?: string;
  status: 'open' | 'pending' | 'resolved' | 'closed' | 'canceled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  tags: string[];

  // Customer/Contact relationship
  customerId?: string;
  contactId?: string;

  // Lead relationship (if ticket came from lead)
  leadId?: string;

  // Assignment system integration
  assigneeId?: string;
  teamId?: string;
  assignmentType?: string;
  assignedAt?: string;
  assignedBy?: string;

  // SLA Management
  slaBreachTime?: string;  // When SLA will be breached
  slaBreached?: boolean;   // If SLA was breached
  responseTime?: number;   // Response time in minutes
  resolutionTime?: number; // Resolution time in minutes

  // Communication
  conversationId?: string; // Associated conversation
  channelId?: string;      // Channel where ticket originated
  source?: string;         // Universal source (email, whatsapp, etc.)

  // Dates and timeline
  firstResponseAt?: string;
  lastResponseAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  dueDate?: string;

  // Internal notes and resolution
  internalNotes?: string;
  resolutionSummary?: string;
  customerSatisfaction?: number; // 1-5 rating

  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  tags?: string[];
  customerId?: string;
  contactId?: string;
  leadId?: string;
  assigneeId?: string;
  teamId?: string;
  conversationId?: string;
  channelId?: string;
  source?: string;
  dueDate?: string;
  internalNotes?: string;
}

export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  status?: 'open' | 'pending' | 'resolved' | 'closed' | 'canceled';
  statusReason?: string;
  resolution?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  tags?: string[];
  customerId?: string;
  contactId?: string;
  leadId?: string;
  assigneeId?: string;
  teamId?: string;
  dueDate?: string;
  internalNotes?: string;
  resolutionSummary?: string;
  customerSatisfaction?: number;
}

export type TicketResponse = Ticket;

export interface TicketQuery extends PaginationQuery {
  filters?: {
    title?: string;
    status?: 'open' | 'pending' | 'resolved' | 'closed' | 'canceled';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    tags?: string[];
    customerId?: string;
    contactId?: string;
    leadId?: string;
    assigneeId?: string;
    teamId?: string;
    channelId?: string;
    source?: string;
    slaBreached?: boolean;
    createdFrom?: string;
    createdTo?: string;
    dueFrom?: string;
    dueTo?: string;
    resolvedFrom?: string;
    resolvedTo?: string;
  };
}

export interface TicketListResponse extends ListResponse<TicketResponse> {}

// Ticket assignment
export interface AssignTicketRequest {
  assigneeId?: string;
  teamId?: string;
  assignmentType?: string;
  reason?: string;
}

// Ticket resolution
export interface ResolveTicketRequest {
  resolutionSummary: string;
  internalNotes?: string;
  customerSatisfaction?: number;
}

// Ticket SLA tracking
export interface TicketSLA {
  ticketId: string;
  responseTimeSLA: number;    // Minutes
  resolutionTimeSLA: number;  // Minutes
  breachTime: string;         // When breach will occur
  breached: boolean;
  actualResponseTime?: number;
  actualResolutionTime?: number;
}

// Import types
import { PaginationQuery, ListResponse } from './common';