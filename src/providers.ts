import { ObjectId } from 'mongodb';

// ============================================================================
// PROVIDER-SPECIFIC CONFIGURATIONS (Shared across app & company integrations)
// ============================================================================

export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
  from: string;
}

export interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
  fromName?: string;
}

export interface WhatsAppConfig {
  whatsappBusinessAccountId: string;
  phoneNumberId: string;
  webhookToken?: string;
}

export interface FacebookMessengerConfig {
  pageId: string;
  appSecret: string;
  webhookToken?: string;
}

export interface TelegramConfig {
  botToken: string;
  webhookUrl?: string;
}

export interface TwilioSmsConfig {
  authToken: string;
  fromNumber: string;
}

export interface WebhookConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  authentication?: {
    type: 'bearer' | 'basic' | 'api_key';
    token: string;
  };
}

export interface InstagramConfig {
  instagramBusinessAccountId: string;
  pageId: string;
  webhookToken?: string;
}

export interface LinkedInConfig {
  organizationId: string;
  clientId: string;
  clientSecret: string;
}

export interface TikTokConfig {
  businessAccountId: string;
  appId: string;
  appSecret: string;
}

export interface GmailConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  fromEmail: string;
}

export interface GatewayConfig {
  // ✅ CONFIGURAÇÕES OPCIONAIS (gatewayUrl vem do .env, credenciais geradas pelo backend)
  webhookPath?: string;         // Path customizado para webhook
  timeout?: number;             // Timeout para requests (padrão: 10000ms)
}

export interface GoogleCalendarConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;         // OAuth redirect URI (auto-generated if not provided)
}


// ============================================================================
// UNION TYPE FOR ALL PROVIDER CONFIGS
// ============================================================================

export type ProviderConfig =
  | SmtpConfig
  | SendGridConfig
  | WhatsAppConfig
  | FacebookMessengerConfig
  | TelegramConfig
  | TwilioSmsConfig
  | WebhookConfig
  | InstagramConfig
  | LinkedInConfig
  | TikTokConfig
  | GmailConfig
  | GatewayConfig
  | GoogleCalendarConfig;

// ============================================================================
// PROVIDER CREDENTIALS (OAuth tokens, etc.)
// ============================================================================

export interface ProviderCredentials {
  // Common OAuth fields
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;

  // API Key authentication
  apiKey?: string;
  apiSecret?: string;

  // Basic authentication
  username?: string;
  password?: string;

  // Custom authentication
  customAuth?: Record<string, any>;
}

// ============================================================================
// PROVIDER ENUM (Centralized)
// ============================================================================

export enum ProviderId {
  // Email Providers
  EMAIL_SMTP = 'email-smtp',
  EMAIL_SENDGRID = 'email-sendgrid',
  EMAIL_SES = 'email-ses',
  GMAIL_API = 'gmail-api',

  // Messaging Providers
  WHATSAPP_BUSINESS = 'whatsapp-business',
  FACEBOOK_MESSENGER = 'facebook-messenger',
  INSTAGRAM_DIRECT = 'instagram-direct',
  TELEGRAM_BOT = 'telegram-bot',
  SMS_TWILIO = 'sms-twilio',
  GATEWAY_WHATSAPP = 'gateway-whatsapp',

  // Social Media Providers
  INSTAGRAM_MESSAGING = 'instagram-messaging',
  LINKEDIN_MESSAGING = 'linkedin-messaging',
  TIKTOK_MESSAGING = 'tiktok-messaging',
  TIKTOK_BUSINESS = 'tiktok-business',

  // Payment Providers
  PAYMENT_ASAAS = 'payment-asaas',
  PAYMENT_STRIPE = 'payment-stripe',
  PAYMENT_PAYPAL = 'payment-paypal',
  PAYMENT_MERCADOPAGO = 'payment-mercadopago',

  // Calendar Providers
  GOOGLE_CALENDAR = 'google-calendar',
  OUTLOOK_CALENDAR = 'outlook-calendar',
  ICLOUD_CALENDAR = 'icloud-calendar',

  // Web/API Providers
  WEBSITE_CHAT = 'website-chat',
  WEBSITE_WIDGET = 'website-widget',
  API_WEBHOOK = 'api-webhook',

  // AI Providers
  AI_OPENAI = 'ai-openai'
}

// ============================================================================
// PROVIDER CAPABILITIES (Centralized)
// ============================================================================

export enum ProviderCapability {
  // Email capabilities
  SEND_EMAIL = 'send_email',
  RECEIVE_EMAIL = 'receive_email',

  // Messaging capabilities
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
  SEND_MEDIA = 'send_media',
  RECEIVE_MEDIA = 'receive_media',
  SEND_LOCATION = 'send_location',
  SEND_CONTACT = 'send_contact',
  SEND_REACTION = 'send_reaction',
  SEND_ATTACHMENT = 'send_attachment',
  RECEIVE_ATTACHMENT = 'receive_attachment',

  // Social media capabilities
  CREATE_POST = 'create_post',
  CREATE_STORY = 'create_story',
  CREATE_CAMPAIGN = 'create_campaign',

  // Advanced capabilities
  CREATE_EVENT = 'create_event',
  CREATE_TEMPLATE = 'create_template',
  TRACK_DELIVERY = 'track_delivery',
  TRACK_OPENS = 'track_opens',
  TRACK_CLICKS = 'track_clicks',
  SCHEDULE_MESSAGE = 'schedule_message',

  // Calendar capabilities
  CALENDAR_SYNC = 'calendar_sync',
  CALENDAR_READ = 'calendar_read',
  CALENDAR_WRITE = 'calendar_write',

  // Sync capabilities
  SYNC_DATA = 'sync_data',          // ✅ Provider supports data synchronization

  // Payment capabilities
  PROCESS_PAYMENT = 'process_payment',
  PROCESS_SUBSCRIPTION = 'process_subscription',
  TOKENIZE_CARD = 'tokenize_card',
  REFUND_PAYMENT = 'refund_payment',
  CANCEL_SUBSCRIPTION = 'cancel_subscription',

  // CRM capabilities
  CREATE_CONTACT = 'create_contact',
  UPDATE_CONTACT = 'update_contact',
  CREATE_LIST = 'create_list',
  SEND_BULK = 'send_bulk',
  BULK_SEND = 'bulk_send',

  // Webhook capabilities
  CREATE_WEBHOOK = 'create_webhook',
  RECEIVE_WEBHOOK = 'receive_webhook',
  VERIFY_WEBHOOK = 'verify_webhook',
  SEND_WEBHOOK = 'send_webhook',

  // Form capabilities
  CREATE_FORM = 'create_form',
  SUBMIT_FORM = 'submit_form',
  CREATE_SURVEY = 'create_survey',
  RECEIVE_FORM = 'receive_form',

  // Widget capabilities
  CREATE_WIDGET = 'create_widget',
  TRACK_VISITOR = 'track_visitor',
  LIVE_CHAT = 'live_chat',

  // API capabilities
  REST_API = 'rest_api',
  GRAPHQL = 'graphql',

  // Analytics capabilities
  GET_INSIGHTS = 'get_insights',
  TRACK_OPEN = 'track_open',

  // Bot capabilities
  CREATE_BOT = 'create_bot',

  // Page management
  MANAGE_PAGE = 'manage_page',

  // Account management
  MANAGE_ACCOUNT = 'manage_account',

  // AI Capabilities
  GENERATE_EMBEDDING = 'generate_embedding',

  // Template Management
  TEMPLATE_MANAGEMENT = 'template_management'  // Submit, approve, manage templates
}

// ============================================================================
// TYPED INTEGRATION REQUESTS (Generic - usable by both app & company)
// ============================================================================

export interface BaseIntegrationRequest {
  name: string;
  description?: string;
}

export interface CreateSmtpIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.EMAIL_SMTP;
  config: SmtpConfig;
  credentials?: ProviderCredentials;
}

export interface CreateSendGridIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.EMAIL_SENDGRID;
  config: SendGridConfig;
  credentials?: ProviderCredentials;
}

export interface CreateWhatsAppIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.WHATSAPP_BUSINESS;
  config: WhatsAppConfig;
  credentials: ProviderCredentials;
}

export interface CreateFacebookMessengerIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.FACEBOOK_MESSENGER;
  config: FacebookMessengerConfig;
  credentials: ProviderCredentials;
}

export interface CreateTelegramIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.TELEGRAM_BOT;
  config: TelegramConfig;
  credentials?: ProviderCredentials;
}

export interface CreateWebhookIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.API_WEBHOOK;
  config: WebhookConfig;
  credentials?: ProviderCredentials;
}

export interface CreateGatewayIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.GATEWAY_WHATSAPP;
  config: GatewayConfig;
  credentials?: ProviderCredentials;
}

export interface CreateGoogleCalendarIntegrationRequest extends BaseIntegrationRequest {
  providerId: ProviderId.GOOGLE_CALENDAR;
  config: GoogleCalendarConfig;
  credentials?: ProviderCredentials;
}

// ============================================================================
// UNION TYPE FOR TYPED INTEGRATION REQUESTS
// ============================================================================

export type CreateProviderIntegrationRequest =
  | CreateSmtpIntegrationRequest
  | CreateSendGridIntegrationRequest
  | CreateWhatsAppIntegrationRequest
  | CreateFacebookMessengerIntegrationRequest
  | CreateTelegramIntegrationRequest
  | CreateWebhookIntegrationRequest
  | CreateGatewayIntegrationRequest
  | CreateGoogleCalendarIntegrationRequest;

// ============================================================================
// PROVIDER ENTITY (Database schema)
// ============================================================================

export interface Provider {
  _id?: ObjectId;
  name: string;                     // Ex: "Google Calendar", "Outlook Calendar"
  type: string;                     // Ex: "google_calendar", "outlook_calendar"
  category: 'messaging' | 'payment' | 'email' | 'calendar' | 'storage' | 'social';
  capabilities: ProviderCapability[];
  syncInterval?: number;            // ✅ Sync interval in minutes (for SYNC_DATA capability)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ProviderResponse extends Omit<Provider, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  id: string;
  syncInterval?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// ============================================================================
// LEGACY GENERIC CONFIG (For non-typed providers)
// ============================================================================

export interface GenericProviderConfig {
  [key: string]: any;
}