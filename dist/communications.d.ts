/**
 * Communication Types
 * Types for email, messaging, and webhook communications
 */
import { MediaData } from './gateway';
import { Contact } from './contacts';
import { Group } from './groups';
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
    contact?: Contact;
    group?: Group;
    message?: string;
    messageId?: string;
    replyToMessageId?: string;
    type?: 'text' | 'media' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'contacts' | 'reaction';
    media?: MediaData;
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
    contactData?: {
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
