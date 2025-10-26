import { ObjectId } from 'mongodb';
import { FullBaseDocument } from './common';
import { PaginationQuery, ListResponse } from './common';

/**
 * Calendar Event - Complete structure compatible with Google Calendar
 * Supports multi-provider sync and activities integration
 */
export interface CalendarEvent extends FullBaseDocument {
  userId: string;                    // Event owner
  companyId: ObjectId;
  appId: ObjectId;

  // Activity relationship (optional)
  activityId?: string;               // Generated activity when event created/modified

  // Content
  summary: string;                   // Event title
  description?: string;              // Detailed description
  location?: string;                 // Physical or virtual location
  colorId?: string;                  // Event color (ID)

  // Timing - Supports timed events OR all-day events
  startTime: string;                 // ISO 8601 dateTime OR date (YYYY-MM-DD)
  endTime: string;                   // ISO 8601 dateTime OR date
  timeZone: string;                  // IANA timezone (America/Sao_Paulo)
  allDay: boolean;                   // true = all-day event

  // Recurrence (Google Calendar RRULE format)
  recurrence?: string[];             // ["RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR"]
  recurringEventId?: string;         // Parent event ID (for instances)
  originalStartTime?: string;        // Original timestamp (for exceptions)

  // Availability
  transparency: 'opaque' | 'transparent';  // Blocks calendar or not
  visibility: 'default' | 'public' | 'private' | 'confidential';
  status: 'confirmed' | 'tentative' | 'cancelled';

  // Attendees (WITH contactId for relationship)
  attendees?: Array<{
    contactId?: string;              // Contact ID from contacts collection
    userId?: string;                 // Internal user ID (if company user)
    email: string;
    displayName: string;
    responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
    optional: boolean;
    organizer: boolean;
  }>;

  // Reminders
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup' | 'notification';
      minutes: number;
    }>;
  };

  // MULTI-PROVIDER SYNC (Array instead of fixed fields)
  providerSync: Array<{
    integrationId: string;           // user-integration ID
    providerId: string;              // Provider ID (google_calendar, outlook_calendar)
    providerEventId: string;         // Event ID in provider
    syncStatus: 'pending' | 'synced' | 'failed';
    lastSyncAt: string;              // ISO 8601
    syncError?: string;              // Error message if failed
    metadata?: Record<string, any>;  // Provider-specific data
  }>;

  // Conference/Meeting Link
  conferenceData?: {
    provider: 'google_meet' | 'zoom' | 'teams' | 'custom';
    link?: string;
    meetingId?: string;
  };

  // Metadata
  iCalUID?: string;                  // RFC 5545 UID
  sequence?: number;                 // Event version
}

/**
 * Calendar Event Response Type
 * Exposes id as string instead of _id ObjectId
 */
export interface CalendarEventResponse extends Omit<CalendarEvent, '_id'> {
  id: string;
}

/**
 * Create Calendar Event Request
 */
export interface CreateCalendarEventRequest {
  summary: string;
  description?: string;
  location?: string;
  colorId?: string;
  startTime: string;
  endTime: string;
  timeZone?: string;
  allDay?: boolean;
  recurrence?: string[];
  transparency?: 'opaque' | 'transparent';
  visibility?: 'default' | 'public' | 'private' | 'confidential';

  // Attendees WITH contactId
  attendees?: Array<{
    contactId?: string;              // Link with contacts
    userId?: string;
    email: string;
    displayName?: string;
    optional?: boolean;
  }>;

  reminders?: {
    useDefault?: boolean;
    overrides?: Array<{
      method: 'email' | 'popup' | 'notification';
      minutes: number;
    }>;
  };

  conferenceData?: {
    provider: 'google_meet' | 'zoom' | 'teams' | 'custom';
    link?: string;
  };

  // Providers to sync (optional on creation)
  syncToProviders?: Array<{
    integrationId: string;
    providerId: string;
  }>;
}

/**
 * Update Calendar Event Request
 */
export interface UpdateCalendarEventRequest extends Partial<CreateCalendarEventRequest> {
  status?: 'confirmed' | 'tentative' | 'cancelled';
}

/**
 * Calendar Event Query Filters
 */
export interface CalendarEventQuery extends PaginationQuery {
  filters?: {
    userId?: string;
    startTimeFrom?: string;
    startTimeTo?: string;
    status?: 'confirmed' | 'tentative' | 'cancelled';
    transparency?: 'opaque' | 'transparent';
    visibility?: 'default' | 'public' | 'private' | 'confidential';
    hasAttendees?: boolean;
    isRecurring?: boolean;
    providerSyncStatus?: 'pending' | 'synced' | 'failed';  // Filters if ANY provider has this status
    providerId?: string;  // Filters events synced with specific provider
  };
}

/**
 * Calendar Event List Response
 */
export interface CalendarEventListResponse extends ListResponse<CalendarEventResponse> {}

/**
 * Multi-Provider Sync Request
 */
export interface SyncCalendarRequest {
  integrationIds: string[];          // Array of integrations to sync
  syncDirection: 'pull' | 'push' | 'bidirectional';
  timeMin?: string;                  // Start date for sync
  timeMax?: string;                  // End date for sync
}

/**
 * Sync Result per Provider
 */
export interface ProviderSyncResult {
  integrationId: string;
  providerId: string;
  eventsSynced: number;
  eventsCreated: number;
  eventsUpdated: number;
  eventsDeleted: number;
  errors: Array<{ eventId: string; error: string }>;
}

/**
 * Multi-Provider Sync Response
 */
export interface SyncCalendarResponse {
  success: boolean;
  syncResults: ProviderSyncResult[];
}

/**
 * Event Attendee (for frontend forms)
 */
export interface EventAttendee {
  contactId?: string;
  userId?: string;
  email: string;
  displayName: string;
  responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
  optional: boolean;
  organizer: boolean;
}

/**
 * Provider Sync Status (for UI badges)
 */
export interface ProviderSyncStatus {
  integrationId: string;
  providerId: string;
  providerEventId: string;
  syncStatus: 'pending' | 'synced' | 'failed';
  lastSyncAt: string;
  syncError?: string;
}

/**
 * Event Recurrence Types (RRULE helpers)
 */
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface RecurrenceRule {
  freq: RecurrenceFrequency;
  interval?: number;
  count?: number;
  until?: string;
  byday?: string[];      // MO, TU, WE, TH, FR, SA, SU
  bymonthday?: number[]; // 1-31
  bymonth?: number[];    // 1-12
}

/**
 * Calendar Event Statistics (for dashboard)
 */
export interface CalendarEventStats {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  recurringEvents: number;
  eventsWithAttendees: number;
  syncedEvents: number;
  pendingSyncEvents: number;
  failedSyncEvents: number;
}
