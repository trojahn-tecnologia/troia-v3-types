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
    message: string;
    type?: 'text' | 'media';
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'audio' | 'document';
}
export interface WebhookData {
    url: string;
    method?: 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
    body: any;
    timeout?: number;
}
