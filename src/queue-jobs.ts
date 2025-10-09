/**
 * Queue Job Types
 * Type definitions for background job processing between Backend and Gateway
 *
 * Queue Flow:
 * Backend → Queue → Gateway Workers → Queue → Backend
 */

// ============================================================================
// QUEUE JOB TYPES
// ============================================================================

/**
 * Queue Job Types Enum
 * Defines all available background job types in the system
 */
export enum QueueJobType {
  // Contact Operations
  SYNC_CONTACT_IDENTIFIERS = 'sync-contact-identifiers',

  // Future job types can be added here
  // SEND_BULK_MESSAGE = 'send-bulk-message',
  // IMPORT_CONTACTS = 'import-contacts',
  // etc.
}

// ============================================================================
// CONTACT IDENTIFIER SYNC JOB
// ============================================================================

/**
 * Sync Contact Identifiers Job Data
 * Backend → Queue → Gateway: Request to sync WhatsApp identifiers for a contact
 *
 * Flow:
 * 1. Backend creates job when contact is added
 * 2. Job queued with BullMQ
 * 3. Gateway worker picks up job
 * 4. Worker uses Baileys to check WhatsApp number existence
 * 5. Worker downloads avatar if available
 * 6. Worker responds with results via response queue
 */
export interface SyncContactIdentifiersJobData {
  /** Contact ID to update after sync */
  contactId: string;

  /** Phone number to check (E.164 format preferred) */
  phone: string;

  /** App ID for security validation */
  appId: string;

  /** Company ID for security validation */
  companyId: string;
}

/**
 * Contact Identifiers Response Data
 * Gateway → Queue → Backend: Response with sync results
 *
 * Flow:
 * 1. Gateway completes WhatsApp check
 * 2. Gateway downloads avatar (if available)
 * 3. Gateway uploads avatar to S3
 * 4. Gateway responds with identifiers and avatar URL
 * 5. Backend receives response and updates contact
 */
export interface ContactIdentifiersResponseData {
  /** Contact ID that was synced */
  contactId: string;

  /** App ID for security validation */
  appId: string;

  /** Company ID for security validation */
  companyId: string;

  /** Whether sync operation succeeded */
  success: boolean;

  /** WhatsApp identifiers found (JID strings like '5511999999999@s.whatsapp.net' or '@lid') */
  identifiers?: string[];

  /** S3 URL of uploaded avatar (if downloaded) */
  avatarUrl?: string;

  /** Error message if sync failed */
  error?: string;
}

// ============================================================================
// QUEUE JOB PAYLOAD UNION
// ============================================================================

/**
 * Queue Job Payload
 * Union type of all possible job data types
 */
export type QueueJobPayload = SyncContactIdentifiersJobData;

/**
 * Queue Response Payload
 * Union type of all possible response data types
 */
export type QueueResponsePayload = ContactIdentifiersResponseData;
