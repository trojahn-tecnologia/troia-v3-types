import { ObjectId } from 'mongodb';
import { FullBaseDocument } from './common';
import { PaginationQuery, ListResponse } from './common';
/**
 * Calendar Event - Complete structure compatible with Google Calendar
 * Supports multi-provider sync and activities integration
 */
export interface CalendarEvent extends FullBaseDocument {
    userId: string;
    companyId: ObjectId;
    appId: ObjectId;
    activityId?: string;
    summary: string;
    description?: string;
    location?: string;
    colorId?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';
    startTime: string;
    endTime: string;
    timeZone: string;
    allDay: boolean;
    recurrence?: string[];
    recurringEventId?: string;
    originalStartTime?: string;
    transparency: 'opaque' | 'transparent';
    visibility: 'default' | 'public' | 'private' | 'confidential';
    status: 'confirmed' | 'tentative' | 'cancelled';
    attendees?: Array<{
        contactId?: string;
        userId?: string;
        email: string;
        displayName: string;
        responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
        optional: boolean;
        organizer: boolean;
    }>;
    reminders?: {
        useDefault: boolean;
        overrides?: Array<{
            method: 'email' | 'popup' | 'notification';
            minutes: number;
        }>;
    };
    providerSync: Array<{
        integrationId: string;
        providerId: string;
        providerEventId: string;
        syncStatus: 'pending' | 'synced' | 'failed';
        lastSyncAt: string;
        syncError?: string;
        metadata?: Record<string, any>;
    }>;
    conferenceData?: {
        provider: 'google_meet' | 'zoom' | 'teams' | 'custom';
        link?: string;
        meetingId?: string;
    };
    iCalUID?: string;
    sequence?: number;
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
    userId?: string;
    summary: string;
    description?: string;
    location?: string;
    colorId?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';
    startTime: string;
    endTime: string;
    timeZone?: string;
    allDay?: boolean;
    recurrence?: string[];
    transparency?: 'opaque' | 'transparent';
    visibility?: 'default' | 'public' | 'private' | 'confidential';
    status?: 'confirmed' | 'tentative' | 'cancelled';
    attendees?: Array<{
        contactId?: string;
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
    createConference?: boolean;
    conferenceProviderId?: string;
    conferenceData?: {
        provider: 'google_meet' | 'zoom' | 'teams' | 'custom';
        link?: string;
        meetingId?: string;
    };
    providerSync?: Array<{
        integrationId: string;
        providerId: string;
        providerEventId?: string;
        syncStatus: 'pending' | 'synced' | 'failed';
        lastSyncAt?: string;
        syncError?: string;
        metadata?: Record<string, any>;
    }>;
}
/**
 * Update Calendar Event Request
 * ⚠️ conferenceData, createConference, conferenceProviderId are NOT editable (only on create)
 */
export interface UpdateCalendarEventRequest extends Omit<Partial<CreateCalendarEventRequest>, 'conferenceData' | 'createConference' | 'conferenceProviderId'> {
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
        providerSyncStatus?: 'pending' | 'synced' | 'failed';
        providerId?: string;
    };
}
/**
 * Calendar Event List Response
 */
export interface CalendarEventListResponse extends ListResponse<CalendarEventResponse> {
}
/**
 * Multi-Provider Sync Request
 */
export interface SyncCalendarRequest {
    integrationIds: string[];
    syncDirection: 'pull' | 'push' | 'bidirectional';
    timeMin?: string;
    timeMax?: string;
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
    errors: Array<{
        eventId: string;
        error: string;
    }>;
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
    byday?: string[];
    bymonthday?: number[];
    bymonth?: number[];
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
