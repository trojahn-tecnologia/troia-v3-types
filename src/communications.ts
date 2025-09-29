/**
 * Communication Types
 * Types for email, messaging, and webhook communications
 */

export interface EmailData {
  to: string | string[];
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content?: string | ArrayBuffer;
  path?: string;
  contentType?: string;
  encoding?: string;
}

/**
 * Structured Media Data Object
 * Enhanced media object with comprehensive metadata
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

export interface MessageData {
  to: string;
  message?: string;
  type?: 'text' | 'media' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'contacts' | 'reaction';

  // ✅ Structured media object
  media?: MediaData;

  // Legacy fields for backward compatibility (deprecated - use media object instead)
  /** @deprecated Use media.url instead */
  mediaUrl?: string;
  /** @deprecated Use media.type instead */
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'sticker';
  /** @deprecated Use media.filename instead */
  filename?: string;

  location?: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  contact?: {
    name: string;
    phone?: string;
    email?: string;
    vcard?: string;
  };
  reaction?: {
    emoji: string;
    targetMessageId: string;
  };
}

export interface WebhookData {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  body: any;
  timeout?: number;
}

