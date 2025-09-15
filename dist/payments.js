"use strict";
/**
 * Payment Provider System Types
 * Universal payment processing interfaces for TROIA V3
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionStatus = exports.PaymentStatus = exports.PaymentBillingCycle = exports.RecurringStrategy = exports.PaymentCapability = exports.PaymentMethod = void 0;
// ================================
// CORE ENUMS
// ================================
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["DEBIT_CARD"] = "DEBIT_CARD";
    PaymentMethod["PIX"] = "PIX";
    PaymentMethod["BOLETO"] = "BOLETO";
    PaymentMethod["TED"] = "TED";
    PaymentMethod["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethod["CRYPTO"] = "CRYPTO";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentCapability;
(function (PaymentCapability) {
    // Payment Methods
    PaymentCapability["CREDIT_CARD"] = "credit_card";
    PaymentCapability["DEBIT_CARD"] = "debit_card";
    PaymentCapability["PIX"] = "pix";
    PaymentCapability["BOLETO"] = "boleto";
    PaymentCapability["TED"] = "ted";
    PaymentCapability["BANK_TRANSFER"] = "bank_transfer";
    PaymentCapability["CRYPTO"] = "crypto";
    // Customer Management
    PaymentCapability["CUSTOMER_CREATION"] = "customer_creation";
    PaymentCapability["CUSTOMER_UPDATE"] = "customer_update";
    PaymentCapability["CUSTOMER_DELETION"] = "customer_deletion";
    // Tokenization
    PaymentCapability["TOKENIZATION"] = "tokenization";
    PaymentCapability["TOKEN_UPDATE"] = "token_update";
    PaymentCapability["TOKEN_DELETION"] = "token_deletion";
    // Advanced Features
    PaymentCapability["INSTALLMENTS"] = "installments";
    PaymentCapability["RECURRING_PAYMENTS"] = "recurring_payments";
    PaymentCapability["SUBSCRIPTIONS"] = "subscriptions";
    PaymentCapability["REFUNDS"] = "refunds";
    PaymentCapability["SPLIT_PAYMENTS"] = "split_payments";
    PaymentCapability["WEBHOOKS"] = "webhooks";
    PaymentCapability["ANTI_FRAUD"] = "anti_fraud";
    PaymentCapability["CHARGEBACK_PROTECTION"] = "chargeback_protection";
    // Integrations
    PaymentCapability["POS_INTEGRATION"] = "pos_integration";
    PaymentCapability["MOBILE_PAYMENTS"] = "mobile_payments";
    PaymentCapability["QR_CODE_GENERATION"] = "qr_code_generation";
})(PaymentCapability || (exports.PaymentCapability = PaymentCapability = {}));
var RecurringStrategy;
(function (RecurringStrategy) {
    RecurringStrategy["TOKENIZATION"] = "tokenization";
    RecurringStrategy["SUBSCRIPTION"] = "subscription"; // Provider native subscriptions
})(RecurringStrategy || (exports.RecurringStrategy = RecurringStrategy = {}));
var PaymentBillingCycle;
(function (PaymentBillingCycle) {
    PaymentBillingCycle["WEEKLY"] = "WEEKLY";
    PaymentBillingCycle["BIWEEKLY"] = "BIWEEKLY";
    PaymentBillingCycle["MONTHLY"] = "MONTHLY";
    PaymentBillingCycle["QUARTERLY"] = "QUARTERLY";
    PaymentBillingCycle["SEMIANNUALLY"] = "SEMIANNUALLY";
    PaymentBillingCycle["YEARLY"] = "YEARLY";
})(PaymentBillingCycle || (exports.PaymentBillingCycle = PaymentBillingCycle = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PROCESSING"] = "PROCESSING";
    PaymentStatus["CONFIRMED"] = "CONFIRMED";
    PaymentStatus["RECEIVED"] = "RECEIVED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["CANCELLED"] = "CANCELLED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["OVERDUE"] = "OVERDUE";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["PAUSED"] = "PAUSED";
    SubscriptionStatus["CANCELLED"] = "CANCELLED";
    SubscriptionStatus["EXPIRED"] = "EXPIRED";
    SubscriptionStatus["OVERDUE"] = "OVERDUE";
    SubscriptionStatus["TRIAL"] = "TRIAL";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
