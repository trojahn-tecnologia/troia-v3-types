// ============================================================================
// GATEWAY PROVIDER TYPES
// Types specific to Gateway WhatsApp integration
// ============================================================================

/**
 * Gateway Webhook Payload structure
 * This is the payload format that the Gateway sends to the Backend
 */
export interface GatewayWebhookPayload {
  instanceKey: string;
  event: 'message' | 'status' | 'connect' | 'disconnect' | 'error';
  data: GatewayEventData;
}

/**
 * Gateway Event Data
 * Data structure for different types of events from Gateway
 */
export interface GatewayEventData {
  // Message data (when event = 'message')
  messageId?: string;
  from?: string;
  to?: string;
  message?: string;
  messageType?: 'text' | 'image' | 'audio' | 'video' | 'document' | 'location' | 'contact' | 'reaction' | 'unknown';

  // Media data
  mediaUrl?: string;
  mediaType?: string;

  // Location data
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };

  // Contact data
  contact?: {
    displayName: string;
    vcard: string;
  };

  // Reaction data
  reaction?: {
    emoji: string;
    targetMessageId: string;
  };

  // Status data (when event = 'status')
  status?: 'sent' | 'delivered' | 'read' | 'failed';

  // Connection data (when event = 'connect' | 'disconnect')
  phoneNumber?: string;
  clientId?: string;

  // Error data (when event = 'error')
  error?: string;
  errorCode?: string;

  // Common fields
  timestamp: string;
  metadata?: {
    originalPayload?: any;
    [key: string]: any;
  };
}

/**
 * Gateway Send Message Request
 * Structure for sending messages via Gateway API
 */
export interface GatewaySendMessageRequest {
  instanceKey: string;
  instanceToken: string;
  to: string;
  message: string;
  mediaUrl?: string;
  messageId?: string;
}

/**
 * Gateway Send Message Response
 * Response structure from Gateway when sending messages
 */
export interface GatewaySendMessageResponse {
  success: boolean;
  messageId?: string;
  instanceKey: string;
  error?: string;
}

/**
 * Gateway Instance Status
 * Status information about a Gateway instance
 */
export interface GatewayInstanceStatus {
  instanceKey: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  phoneNumber?: string;
  clientId?: string;
  lastSeen?: string;
  uptime?: number;
  memory?: number;
  cpu?: number;
  pm2Status?: string;
}

/**
 * Gateway Connection Response
 * Response when connecting to Gateway instance
 */
export interface GatewayConnectionResponse {
  success: boolean;
  qrCode?: string;
  expires?: number;
  fresh?: boolean;
  instanceKey: string;
  error?: string;
}

/**
 * Gateway Provider Error Types
 * Specific error types for Gateway provider
 */
export enum GatewayErrorType {
  INSTANCE_NOT_FOUND = 'INSTANCE_NOT_FOUND',
  INSTANCE_NOT_CONNECTED = 'INSTANCE_NOT_CONNECTED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  GATEWAY_UNREACHABLE = 'GATEWAY_UNREACHABLE',
  WEBHOOK_FAILED = 'WEBHOOK_FAILED',
  MESSAGE_SEND_FAILED = 'MESSAGE_SEND_FAILED',
  TIMEOUT = 'TIMEOUT'
}

/**
 * Gateway Provider Configuration Validation
 * Helper interface for validating Gateway configurations
 */
export interface GatewayConfigValidation {
  gatewayUrl: {
    isValid: boolean;
    isReachable?: boolean;
    responseTime?: number;
  };
  instanceKey: {
    isValid: boolean;
    exists?: boolean;
  };
  instanceToken: {
    isValid: boolean;
    isAuthenticated?: boolean;
  };
  webhookPath: {
    isValid: boolean;
    isRegistered?: boolean;
  };
}