"use strict";
/**
 * Queue Job Types
 * Type definitions for background job processing between Backend and Gateway
 *
 * Queue Flow:
 * Backend → Queue → Gateway Workers → Queue → Backend
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueJobType = void 0;
// ============================================================================
// QUEUE JOB TYPES
// ============================================================================
/**
 * Queue Job Types Enum
 * Defines all available background job types in the system
 */
var QueueJobType;
(function (QueueJobType) {
    // Contact Operations
    QueueJobType["SYNC_CONTACT_IDENTIFIERS"] = "sync-contact-identifiers";
    // Future job types can be added here
    // SEND_BULK_MESSAGE = 'send-bulk-message',
    // IMPORT_CONTACTS = 'import-contacts',
    // etc.
})(QueueJobType || (exports.QueueJobType = QueueJobType = {}));
