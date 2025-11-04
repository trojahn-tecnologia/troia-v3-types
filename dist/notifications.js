"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCategory = exports.NotificationPriority = exports.NotificationType = void 0;
// ============================================================================
// NOTIFICATION TYPES AND ENUMS
// ============================================================================
/**
 * Tipos de notificação disponíveis no sistema
 */
var NotificationType;
(function (NotificationType) {
    // System notifications
    NotificationType["SYSTEM_MAINTENANCE"] = "system_maintenance";
    NotificationType["SYSTEM_UPDATE"] = "system_update";
    NotificationType["SYSTEM_ALERT"] = "system_alert";
    // Authentication and security
    NotificationType["AUTH_FAILURE"] = "auth_failure";
    NotificationType["AUTH_SUCCESS"] = "auth_success";
    NotificationType["PASSWORD_RESET"] = "password_reset";
    NotificationType["TWO_FACTOR_ENABLED"] = "two_factor_enabled";
    // Integration events
    NotificationType["INTEGRATION_CONNECTED"] = "integration_connected";
    NotificationType["INTEGRATION_DISCONNECTED"] = "integration_disconnected";
    NotificationType["INTEGRATION_ERROR"] = "integration_error";
    NotificationType["CALENDAR_SYNC_COMPLETE"] = "calendar_sync_complete";
    NotificationType["CALENDAR_SYNC_FAILED"] = "calendar_sync_failed";
    // Ticket and conversation events
    NotificationType["TICKET_ASSIGNED"] = "ticket_assigned";
    NotificationType["TICKET_STATUS_CHANGED"] = "ticket_status_changed";
    NotificationType["TICKET_COMMENT_ADDED"] = "ticket_comment_added";
    NotificationType["CONVERSATION_ASSIGNED"] = "conversation_assigned";
    NotificationType["CONVERSATION_MESSAGE_RECEIVED"] = "conversation_message_received";
    // Lead events
    NotificationType["LEAD_ASSIGNED"] = "lead_assigned";
    NotificationType["LEAD_STATUS_CHANGED"] = "lead_status_changed";
    // Escalation events
    NotificationType["ESCALATION_TRIGGERED"] = "escalation_triggered";
    NotificationType["ESCALATION_REASSIGNED"] = "escalation_reassigned";
    // Payment events
    NotificationType["PAYMENT_RECEIVED"] = "payment_received";
    NotificationType["PAYMENT_FAILED"] = "payment_failed";
    NotificationType["SUBSCRIPTION_RENEWED"] = "subscription_renewed";
    NotificationType["SUBSCRIPTION_EXPIRED"] = "subscription_expired";
    NotificationType["SUBSCRIPTION_CANCELED"] = "subscription_canceled";
    // Team events
    NotificationType["TEAM_MEMBER_ADDED"] = "team_member_added";
    NotificationType["TEAM_MEMBER_REMOVED"] = "team_member_removed";
    NotificationType["SHIFT_REMINDER"] = "shift_reminder";
    // Custom notifications
    NotificationType["CUSTOM_NOTIFICATION"] = "custom_notification";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
/**
 * Prioridade da notificação
 */
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "low";
    NotificationPriority["NORMAL"] = "normal";
    NotificationPriority["HIGH"] = "high";
    NotificationPriority["URGENT"] = "urgent";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
/**
 * Categoria da notificação para organização
 */
var NotificationCategory;
(function (NotificationCategory) {
    NotificationCategory["SYSTEM"] = "system";
    NotificationCategory["SECURITY"] = "security";
    NotificationCategory["INTEGRATION"] = "integration";
    NotificationCategory["TICKETS"] = "tickets";
    NotificationCategory["CONVERSATIONS"] = "conversations";
    NotificationCategory["LEADS"] = "leads";
    NotificationCategory["PAYMENT"] = "payment";
    NotificationCategory["TEAM"] = "team";
    NotificationCategory["CUSTOM"] = "custom";
})(NotificationCategory || (exports.NotificationCategory = NotificationCategory = {}));
