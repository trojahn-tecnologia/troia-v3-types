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
    ProviderId["GMAIL_API"] = "gmail-api";
    // Messaging Providers
    ProviderId["WHATSAPP_BUSINESS"] = "whatsapp-business";
    ProviderId["FACEBOOK_MESSENGER"] = "facebook-messenger";
    ProviderId["TELEGRAM_BOT"] = "telegram-bot";
    ProviderId["SMS_TWILIO"] = "sms-twilio";
    // Social Media Providers
    ProviderId["INSTAGRAM_MESSAGING"] = "instagram-messaging";
    ProviderId["LINKEDIN_MESSAGING"] = "linkedin-messaging";
    ProviderId["TIKTOK_MESSAGING"] = "tiktok-messaging";
    // Payment Providers
    ProviderId["PAYMENT_ASAAS"] = "payment-asaas";
    ProviderId["PAYMENT_STRIPE"] = "payment-stripe";
    ProviderId["PAYMENT_PAYPAL"] = "payment-paypal";
    // Web/API Providers
    ProviderId["WEBSITE_CHAT"] = "website-chat";
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
    // Webhook capabilities
    ProviderCapability["CREATE_WEBHOOK"] = "create_webhook";
    ProviderCapability["RECEIVE_WEBHOOK"] = "receive_webhook";
    ProviderCapability["VERIFY_WEBHOOK"] = "verify_webhook";
    // Form capabilities
    ProviderCapability["CREATE_FORM"] = "create_form";
    ProviderCapability["SUBMIT_FORM"] = "submit_form";
    ProviderCapability["CREATE_SURVEY"] = "create_survey";
    // Account management
    ProviderCapability["MANAGE_ACCOUNT"] = "manage_account";
})(ProviderCapability || (exports.ProviderCapability = ProviderCapability = {}));
