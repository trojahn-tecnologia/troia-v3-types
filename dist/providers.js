"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderCapability = exports.ProviderId = void 0;
// ============================================================================
// PROVIDER ENUM (Centralized)
// ============================================================================
var ProviderId;
(function (ProviderId) {
    // Email Providers
    ProviderId["EMAIL_SMTP"] = "email-smtp";
    ProviderId["EMAIL_SENDGRID"] = "email-sendgrid";
    ProviderId["EMAIL_SES"] = "email-ses";
    ProviderId["GMAIL_API"] = "gmail-api";
    // Messaging Providers
    ProviderId["WHATSAPP_BUSINESS"] = "whatsapp-business";
    ProviderId["FACEBOOK_MESSENGER"] = "facebook-messenger";
    ProviderId["INSTAGRAM_DIRECT"] = "instagram-direct";
    ProviderId["TELEGRAM_BOT"] = "telegram-bot";
    ProviderId["SMS_TWILIO"] = "sms-twilio";
    ProviderId["GATEWAY_WHATSAPP"] = "gateway-whatsapp";
    // Social Media Providers
    ProviderId["INSTAGRAM_MESSAGING"] = "instagram-messaging";
    ProviderId["LINKEDIN_MESSAGING"] = "linkedin-messaging";
    ProviderId["TIKTOK_MESSAGING"] = "tiktok-messaging";
    ProviderId["TIKTOK_BUSINESS"] = "tiktok-business";
    // Payment Providers
    ProviderId["PAYMENT_ASAAS"] = "payment-asaas";
    ProviderId["PAYMENT_STRIPE"] = "payment-stripe";
    ProviderId["PAYMENT_PAYPAL"] = "payment-paypal";
    ProviderId["PAYMENT_MERCADOPAGO"] = "payment-mercadopago";
    // Calendar Providers
    ProviderId["GOOGLE_CALENDAR"] = "google-calendar";
    ProviderId["OUTLOOK_CALENDAR"] = "outlook-calendar";
    ProviderId["ICLOUD_CALENDAR"] = "icloud-calendar";
    // Web/API Providers
    ProviderId["WEBSITE_CHAT"] = "website-chat";
    ProviderId["WEBSITE_WIDGET"] = "website-widget";
    ProviderId["API_WEBHOOK"] = "api-webhook";
})(ProviderId || (exports.ProviderId = ProviderId = {}));
// ============================================================================
// PROVIDER CAPABILITIES (Centralized)
// ============================================================================
var ProviderCapability;
(function (ProviderCapability) {
    // Email capabilities
    ProviderCapability["SEND_EMAIL"] = "send_email";
    ProviderCapability["RECEIVE_EMAIL"] = "receive_email";
    // Messaging capabilities
    ProviderCapability["SEND_MESSAGE"] = "send_message";
    ProviderCapability["RECEIVE_MESSAGE"] = "receive_message";
    ProviderCapability["SEND_MEDIA"] = "send_media";
    ProviderCapability["RECEIVE_MEDIA"] = "receive_media";
    ProviderCapability["SEND_LOCATION"] = "send_location";
    ProviderCapability["SEND_CONTACT"] = "send_contact";
    ProviderCapability["SEND_REACTION"] = "send_reaction";
    ProviderCapability["SEND_ATTACHMENT"] = "send_attachment";
    ProviderCapability["RECEIVE_ATTACHMENT"] = "receive_attachment";
    // Social media capabilities
    ProviderCapability["CREATE_POST"] = "create_post";
    ProviderCapability["CREATE_STORY"] = "create_story";
    ProviderCapability["CREATE_CAMPAIGN"] = "create_campaign";
    // Advanced capabilities
    ProviderCapability["CREATE_EVENT"] = "create_event";
    ProviderCapability["CREATE_TEMPLATE"] = "create_template";
    ProviderCapability["TRACK_DELIVERY"] = "track_delivery";
    ProviderCapability["TRACK_OPENS"] = "track_opens";
    ProviderCapability["TRACK_CLICKS"] = "track_clicks";
    ProviderCapability["SCHEDULE_MESSAGE"] = "schedule_message";
    // Calendar capabilities
    ProviderCapability["CALENDAR_SYNC"] = "calendar_sync";
    ProviderCapability["CALENDAR_READ"] = "calendar_read";
    ProviderCapability["CALENDAR_WRITE"] = "calendar_write";
    // Sync capabilities
    ProviderCapability["SYNC_DATA"] = "sync_data";
    // Payment capabilities
    ProviderCapability["PROCESS_PAYMENT"] = "process_payment";
    ProviderCapability["PROCESS_SUBSCRIPTION"] = "process_subscription";
    ProviderCapability["TOKENIZE_CARD"] = "tokenize_card";
    ProviderCapability["REFUND_PAYMENT"] = "refund_payment";
    ProviderCapability["CANCEL_SUBSCRIPTION"] = "cancel_subscription";
    // CRM capabilities
    ProviderCapability["CREATE_CONTACT"] = "create_contact";
    ProviderCapability["UPDATE_CONTACT"] = "update_contact";
    ProviderCapability["CREATE_LIST"] = "create_list";
    ProviderCapability["SEND_BULK"] = "send_bulk";
    ProviderCapability["BULK_SEND"] = "bulk_send";
    // Webhook capabilities
    ProviderCapability["CREATE_WEBHOOK"] = "create_webhook";
    ProviderCapability["RECEIVE_WEBHOOK"] = "receive_webhook";
    ProviderCapability["VERIFY_WEBHOOK"] = "verify_webhook";
    ProviderCapability["SEND_WEBHOOK"] = "send_webhook";
    // Form capabilities
    ProviderCapability["CREATE_FORM"] = "create_form";
    ProviderCapability["SUBMIT_FORM"] = "submit_form";
    ProviderCapability["CREATE_SURVEY"] = "create_survey";
    ProviderCapability["RECEIVE_FORM"] = "receive_form";
    // Widget capabilities
    ProviderCapability["CREATE_WIDGET"] = "create_widget";
    ProviderCapability["TRACK_VISITOR"] = "track_visitor";
    ProviderCapability["LIVE_CHAT"] = "live_chat";
    // API capabilities
    ProviderCapability["REST_API"] = "rest_api";
    ProviderCapability["GRAPHQL"] = "graphql";
    // Analytics capabilities
    ProviderCapability["GET_INSIGHTS"] = "get_insights";
    ProviderCapability["TRACK_OPEN"] = "track_open";
    // Bot capabilities
    ProviderCapability["CREATE_BOT"] = "create_bot";
    // Page management
    ProviderCapability["MANAGE_PAGE"] = "manage_page";
    // Account management
    ProviderCapability["MANAGE_ACCOUNT"] = "manage_account";
})(ProviderCapability || (exports.ProviderCapability = ProviderCapability = {}));
