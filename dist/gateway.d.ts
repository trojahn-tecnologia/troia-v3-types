/**
 * Structured Media Data Object
 * Enhanced media object with comprehensive metadata
 *
 * @since v2.1.0 - Replaces simple mediaUrl/mediaType pattern
 */
export interface MediaData {
    /** Final URL of the media (S3, CDN, or other permanent storage) */
    url: string;
    /** Type of media content */
    type: 'image' | 'video' | 'audio' | 'document' | 'sticker';
    /** Original filename or generated name */
    filename?: string;
    /** File size in bytes */
    size?: number;
    /** MIME type (image/jpeg, video/mp4, etc.) */
    mimeType?: string;
    /** Width in pixels (for images/videos) */
    width?: number;
    /** Height in pixels (for images/videos) */
    height?: number;
    /** Duration in seconds (for audio/video) */
    duration?: number;
    /** Caption or description */
    caption?: string;
    /** Whether content is animated (for stickers) */
    isAnimated?: boolean;
}
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
    messageId?: string;
    from?: string;
    to?: string;
    message?: string;
    messageType?: 'text' | 'image' | 'audio' | 'video' | 'document' | 'sticker' | 'location' | 'contact' | 'reaction' | 'poll' | 'buttons' | 'list' | 'unknown';
    media?: MediaData;
    /** @deprecated Use media.url instead */
    mediaUrl?: string;
    /** @deprecated Use media.type instead */
    mediaType?: 'image' | 'video' | 'audio' | 'document' | 'sticker';
    location?: {
        latitude: number;
        longitude: number;
        name?: string;
        address?: string;
        url?: string;
        comment?: string;
    };
    contact?: {
        displayName: string;
        vcard: string;
    };
    reaction?: {
        emoji: string;
        targetMessageId: string;
        targetRemoteJid?: string;
    };
    quoted?: {
        messageId: string;
        participant: string;
        content: string;
    };
    status?: 'sent' | 'delivered' | 'read' | 'failed';
    phoneNumber?: string;
    clientId?: string;
    error?: string;
    errorCode?: string;
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
export declare enum GatewayErrorType {
    INSTANCE_NOT_FOUND = "INSTANCE_NOT_FOUND",
    INSTANCE_NOT_CONNECTED = "INSTANCE_NOT_CONNECTED",
    INVALID_TOKEN = "INVALID_TOKEN",
    GATEWAY_UNREACHABLE = "GATEWAY_UNREACHABLE",
    WEBHOOK_FAILED = "WEBHOOK_FAILED",
    MESSAGE_SEND_FAILED = "MESSAGE_SEND_FAILED",
    TIMEOUT = "TIMEOUT"
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
