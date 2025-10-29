import { ObjectId } from 'mongodb';
/**
 * Tipos de notificação disponíveis no sistema
 */
export declare enum NotificationType {
    SYSTEM_MAINTENANCE = "system_maintenance",
    SYSTEM_UPDATE = "system_update",
    SYSTEM_ALERT = "system_alert",
    AUTH_FAILURE = "auth_failure",
    AUTH_SUCCESS = "auth_success",
    PASSWORD_RESET = "password_reset",
    TWO_FACTOR_ENABLED = "two_factor_enabled",
    INTEGRATION_CONNECTED = "integration_connected",
    INTEGRATION_DISCONNECTED = "integration_disconnected",
    INTEGRATION_ERROR = "integration_error",
    CALENDAR_SYNC_COMPLETE = "calendar_sync_complete",
    CALENDAR_SYNC_FAILED = "calendar_sync_failed",
    TICKET_ASSIGNED = "ticket_assigned",
    TICKET_STATUS_CHANGED = "ticket_status_changed",
    TICKET_COMMENT_ADDED = "ticket_comment_added",
    CONVERSATION_ASSIGNED = "conversation_assigned",
    CONVERSATION_MESSAGE_RECEIVED = "conversation_message_received",
    ESCALATION_TRIGGERED = "escalation_triggered",
    ESCALATION_REASSIGNED = "escalation_reassigned",
    PAYMENT_RECEIVED = "payment_received",
    PAYMENT_FAILED = "payment_failed",
    SUBSCRIPTION_RENEWED = "subscription_renewed",
    SUBSCRIPTION_EXPIRED = "subscription_expired",
    SUBSCRIPTION_CANCELED = "subscription_canceled",
    TEAM_MEMBER_ADDED = "team_member_added",
    TEAM_MEMBER_REMOVED = "team_member_removed",
    SHIFT_REMINDER = "shift_reminder",
    CUSTOM_NOTIFICATION = "custom_notification"
}
/**
 * Prioridade da notificação
 */
export declare enum NotificationPriority {
    LOW = "low",// Informacional, não urgente
    NORMAL = "normal",// Notificação padrão
    HIGH = "high",// Requer atenção
    URGENT = "urgent"
}
/**
 * Categoria da notificação para organização
 */
export declare enum NotificationCategory {
    SYSTEM = "system",
    SECURITY = "security",
    INTEGRATION = "integration",
    TICKETS = "tickets",
    CONVERSATIONS = "conversations",
    PAYMENT = "payment",
    TEAM = "team",
    CUSTOM = "custom"
}
/**
 * Canais de entrega disponíveis
 */
export type NotificationChannel = 'email' | 'sms' | 'push' | 'inApp';
/**
 * Status de entrega por canal
 */
export interface ChannelDeliveryStatus {
    channel: NotificationChannel;
    status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
    sentAt?: Date;
    deliveredAt?: Date;
    readAt?: Date;
    error?: string;
    providerId?: string;
    providerResponse?: any;
}
/**
 * Entidade de notificação (Database schema)
 */
export interface SystemNotification {
    _id?: ObjectId;
    appId: ObjectId;
    companyId: ObjectId;
    userId: string;
    type: NotificationType;
    category: NotificationCategory;
    priority: NotificationPriority;
    title: string;
    message: string;
    data?: Record<string, any>;
    channels: NotificationChannel[];
    deliveryStatus: ChannelDeliveryStatus[];
    read: boolean;
    readAt?: Date;
    archived: boolean;
    archivedAt?: Date;
    actionUrl?: string;
    actionLabel?: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt?: Date;
}
/**
 * Request para criar notificação
 */
export interface CreateNotificationRequest {
    userId: string;
    type: NotificationType;
    category: NotificationCategory;
    priority: NotificationPriority;
    title: string;
    message: string;
    data?: Record<string, any>;
    channels?: NotificationChannel[];
    actionUrl?: string;
    actionLabel?: string;
    expiresAt?: string;
}
/**
 * Response de notificação (API)
 */
export interface NotificationResponse extends Omit<SystemNotification, '_id' | 'appId' | 'companyId' | 'createdAt' | 'updatedAt' | 'readAt' | 'archivedAt' | 'expiresAt'> {
    id: string;
    appId: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    readAt?: string;
    archivedAt?: string;
    expiresAt?: string;
}
/**
 * Response de listagem de notificações
 */
export interface NotificationListResponse {
    notifications: NotificationResponse[];
    total: number;
    unreadCount: number;
    page: number;
    limit: number;
}
/**
 * Query parameters para listagem de notificações
 */
export interface NotificationQuery {
    page?: number;
    limit?: number;
    read?: boolean;
    archived?: boolean;
    type?: NotificationType;
    category?: NotificationCategory;
    priority?: NotificationPriority;
    dateFrom?: string;
    dateTo?: string;
}
/**
 * Request para marcar notificação como lida
 */
export interface MarkNotificationsAsReadRequest {
    notificationIds: string[];
}
/**
 * Request para arquivar notificação
 */
export interface ArchiveNotificationRequest {
    notificationIds: string[];
}
/**
 * Estatísticas de notificações (Dashboard)
 */
export interface NotificationStats {
    total: number;
    unread: number;
    byCategory: Record<NotificationCategory, number>;
    byPriority: Record<NotificationPriority, number>;
    recentNotifications: NotificationResponse[];
}
/**
 * Payload do evento Socket.IO para nova notificação
 */
export interface InAppNotificationEvent {
    notification: NotificationResponse;
    unreadCount: number;
}
/**
 * Payload do evento Socket.IO para marcar como lida
 */
export interface NotificationReadEvent {
    notificationIds: string[];
    unreadCount: number;
}
