import { ObjectId } from 'mongodb';

// ============================================================================
// NOTIFICATION TYPES AND ENUMS
// ============================================================================

/**
 * Tipos de notificação disponíveis no sistema
 */
export enum NotificationType {
  // System notifications
  SYSTEM_MAINTENANCE = 'system_maintenance',
  SYSTEM_UPDATE = 'system_update',
  SYSTEM_ALERT = 'system_alert',

  // Authentication and security
  AUTH_FAILURE = 'auth_failure',
  AUTH_SUCCESS = 'auth_success',
  PASSWORD_RESET = 'password_reset',
  TWO_FACTOR_ENABLED = 'two_factor_enabled',

  // Integration events
  INTEGRATION_CONNECTED = 'integration_connected',
  INTEGRATION_DISCONNECTED = 'integration_disconnected',
  INTEGRATION_ERROR = 'integration_error',
  CALENDAR_SYNC_COMPLETE = 'calendar_sync_complete',
  CALENDAR_SYNC_FAILED = 'calendar_sync_failed',

  // Ticket and conversation events
  TICKET_ASSIGNED = 'ticket_assigned',
  TICKET_STATUS_CHANGED = 'ticket_status_changed',
  TICKET_COMMENT_ADDED = 'ticket_comment_added',
  CONVERSATION_ASSIGNED = 'conversation_assigned',
  CONVERSATION_MESSAGE_RECEIVED = 'conversation_message_received',

  // Escalation events
  ESCALATION_TRIGGERED = 'escalation_triggered',
  ESCALATION_REASSIGNED = 'escalation_reassigned',

  // Payment events
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
  SUBSCRIPTION_RENEWED = 'subscription_renewed',
  SUBSCRIPTION_EXPIRED = 'subscription_expired',
  SUBSCRIPTION_CANCELED = 'subscription_canceled',

  // Team events
  TEAM_MEMBER_ADDED = 'team_member_added',
  TEAM_MEMBER_REMOVED = 'team_member_removed',
  SHIFT_REMINDER = 'shift_reminder',

  // Custom notifications
  CUSTOM_NOTIFICATION = 'custom_notification',
}

/**
 * Prioridade da notificação
 */
export enum NotificationPriority {
  LOW = 'low',          // Informacional, não urgente
  NORMAL = 'normal',    // Notificação padrão
  HIGH = 'high',        // Requer atenção
  URGENT = 'urgent',    // Requer ação imediata
}

/**
 * Categoria da notificação para organização
 */
export enum NotificationCategory {
  SYSTEM = 'system',
  SECURITY = 'security',
  INTEGRATION = 'integration',
  TICKETS = 'tickets',
  CONVERSATIONS = 'conversations',
  PAYMENT = 'payment',
  TEAM = 'team',
  CUSTOM = 'custom',
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
  providerId?: string;        // ID do provider usado (ex: 'email-smtp', 'sms-twilio')
  providerResponse?: any;     // Resposta do provider (MessageID, etc.)
}

// ============================================================================
// NOTIFICATION ENTITY
// ============================================================================

/**
 * Entidade de notificação (Database schema)
 */
export interface Notification {
  _id?: ObjectId;
  appId: ObjectId;
  companyId: ObjectId;
  userId: string;                           // Destinatário da notificação

  // Conteúdo da notificação
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>;               // Dados adicionais (IDs de recursos, metadados)

  // Canais e status de entrega
  channels: NotificationChannel[];          // Canais solicitados para envio
  deliveryStatus: ChannelDeliveryStatus[];  // Status por canal

  // Estado da notificação
  read: boolean;                            // Lida pelo usuário (inApp)
  readAt?: Date;                            // Data de leitura (inApp)
  archived: boolean;                        // Arquivada pelo usuário
  archivedAt?: Date;

  // Action link (opcional)
  actionUrl?: string;                       // URL para ação (ex: /tickets/123)
  actionLabel?: string;                     // Label do botão (ex: "Ver Ticket")

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;                         // Data de expiração (auto-delete)
}

// ============================================================================
// REQUEST/RESPONSE TYPES
// ============================================================================

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
  channels?: NotificationChannel[];         // Se não informado, usa preferências do user
  actionUrl?: string;
  actionLabel?: string;
  expiresAt?: Date;
}

/**
 * Response de notificação (API)
 */
export interface NotificationResponse extends Omit<Notification, '_id' | 'appId' | 'companyId' | 'createdAt' | 'updatedAt' | 'readAt' | 'archivedAt' | 'expiresAt'> {
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
  read?: boolean;                           // Filtrar por lidas/não lidas
  archived?: boolean;                       // Filtrar por arquivadas
  type?: NotificationType;                  // Filtrar por tipo
  category?: NotificationCategory;          // Filtrar por categoria
  priority?: NotificationPriority;          // Filtrar por prioridade
  dateFrom?: string;                        // Data de criação (ISO string)
  dateTo?: string;
}

/**
 * Request para marcar notificação como lida
 */
export interface MarkAsReadRequest {
  notificationIds: string[];                // Array de IDs para bulk update
}

/**
 * Request para arquivar notificação
 */
export interface ArchiveNotificationRequest {
  notificationIds: string[];                // Array de IDs para bulk update
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

// ============================================================================
// SOCKET.IO EVENTS (InApp Channel)
// ============================================================================

/**
 * Payload do evento Socket.IO para nova notificação
 */
export interface InAppNotificationEvent {
  notification: NotificationResponse;
  unreadCount: number;                      // Contador atualizado de não lidas
}

/**
 * Payload do evento Socket.IO para marcar como lida
 */
export interface NotificationReadEvent {
  notificationIds: string[];
  unreadCount: number;
}
