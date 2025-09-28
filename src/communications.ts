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

export interface MessageData {
  to: string;
  message?: string;
  type?: 'text' | 'media' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'contacts' | 'reaction';
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'sticker';
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

