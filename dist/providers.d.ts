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
    accountSid: string;
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
export type ProviderConfig = SmtpConfig | SendGridConfig | WhatsAppConfig | FacebookMessengerConfig | TelegramConfig | TwilioSmsConfig | WebhookConfig | InstagramConfig | LinkedInConfig | TikTokConfig | GmailConfig;
export interface ProviderCredentials {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
    apiKey?: string;
    apiSecret?: string;
    username?: string;
    password?: string;
    customAuth?: Record<string, any>;
}
export declare enum ProviderId {
    EMAIL_SMTP = "email-smtp",
    EMAIL_SENDGRID = "email-sendgrid",
    EMAIL_SES = "email-ses",
    GMAIL_API = "gmail-api",
    WHATSAPP_BUSINESS = "whatsapp-business",
    FACEBOOK_MESSENGER = "facebook-messenger",
    INSTAGRAM_DIRECT = "instagram-direct",
    TELEGRAM_BOT = "telegram-bot",
    SMS_TWILIO = "sms-twilio",
    INSTAGRAM_MESSAGING = "instagram-messaging",
    LINKEDIN_MESSAGING = "linkedin-messaging",
    TIKTOK_MESSAGING = "tiktok-messaging",
    TIKTOK_BUSINESS = "tiktok-business",
    PAYMENT_ASAAS = "payment-asaas",
    PAYMENT_STRIPE = "payment-stripe",
    PAYMENT_PAYPAL = "payment-paypal",
    PAYMENT_MERCADOPAGO = "payment-mercadopago",
    WEBSITE_CHAT = "website-chat",
    WEBSITE_WIDGET = "website-widget",
    API_WEBHOOK = "api-webhook"
}
export declare enum ProviderCapability {
    SEND_EMAIL = "send_email",
    RECEIVE_EMAIL = "receive_email",
    SEND_MESSAGE = "send_message",
    RECEIVE_MESSAGE = "receive_message",
    SEND_ATTACHMENT = "send_attachment",
    RECEIVE_ATTACHMENT = "receive_attachment",
    CREATE_POST = "create_post",
    CREATE_STORY = "create_story",
    CREATE_CAMPAIGN = "create_campaign",
    CREATE_EVENT = "create_event",
    CREATE_TEMPLATE = "create_template",
    TRACK_DELIVERY = "track_delivery",
    TRACK_OPENS = "track_opens",
    TRACK_CLICKS = "track_clicks",
    SCHEDULE_MESSAGE = "schedule_message",
    PROCESS_PAYMENT = "process_payment",
    PROCESS_SUBSCRIPTION = "process_subscription",
    TOKENIZE_CARD = "tokenize_card",
    REFUND_PAYMENT = "refund_payment",
    CANCEL_SUBSCRIPTION = "cancel_subscription",
    CREATE_CONTACT = "create_contact",
    UPDATE_CONTACT = "update_contact",
    CREATE_LIST = "create_list",
    SEND_BULK = "send_bulk",
    BULK_SEND = "bulk_send",
    CREATE_WEBHOOK = "create_webhook",
    RECEIVE_WEBHOOK = "receive_webhook",
    VERIFY_WEBHOOK = "verify_webhook",
    SEND_WEBHOOK = "send_webhook",
    CREATE_FORM = "create_form",
    SUBMIT_FORM = "submit_form",
    CREATE_SURVEY = "create_survey",
    RECEIVE_FORM = "receive_form",
    CREATE_WIDGET = "create_widget",
    TRACK_VISITOR = "track_visitor",
    LIVE_CHAT = "live_chat",
    REST_API = "rest_api",
    GRAPHQL = "graphql",
    SEND_MEDIA = "send_media",
    RECEIVE_MEDIA = "receive_media",
    GET_INSIGHTS = "get_insights",
    TRACK_OPEN = "track_open",
    CREATE_BOT = "create_bot",
    MANAGE_PAGE = "manage_page",
    MANAGE_ACCOUNT = "manage_account"
}
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
export type CreateProviderIntegrationRequest = CreateSmtpIntegrationRequest | CreateSendGridIntegrationRequest | CreateWhatsAppIntegrationRequest | CreateFacebookMessengerIntegrationRequest | CreateTelegramIntegrationRequest | CreateWebhookIntegrationRequest;
export interface GenericProviderConfig {
    [key: string]: any;
}
