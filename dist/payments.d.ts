/**
 * Payment Provider System Types
 * Universal payment processing interfaces for TROIA V3
 */
import { PaginationQuery, ListResponse } from './common';
export declare enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    PIX = "PIX",
    BOLETO = "BOLETO",
    TED = "TED",
    BANK_TRANSFER = "BANK_TRANSFER",
    CRYPTO = "CRYPTO"
}
export declare enum PaymentCapability {
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    PIX = "pix",
    BOLETO = "boleto",
    TED = "ted",
    BANK_TRANSFER = "bank_transfer",
    CRYPTO = "crypto",
    CUSTOMER_CREATION = "customer_creation",
    CUSTOMER_UPDATE = "customer_update",
    CUSTOMER_DELETION = "customer_deletion",
    TOKENIZATION = "tokenization",
    TOKEN_UPDATE = "token_update",
    TOKEN_DELETION = "token_deletion",
    INSTALLMENTS = "installments",
    RECURRING_PAYMENTS = "recurring_payments",
    SUBSCRIPTIONS = "subscriptions",
    REFUNDS = "refunds",
    SPLIT_PAYMENTS = "split_payments",
    WEBHOOKS = "webhooks",
    ANTI_FRAUD = "anti_fraud",
    CHARGEBACK_PROTECTION = "chargeback_protection",
    POS_INTEGRATION = "pos_integration",
    MOBILE_PAYMENTS = "mobile_payments",
    QR_CODE_GENERATION = "qr_code_generation"
}
export declare enum RecurringStrategy {
    TOKENIZATION = "tokenization",// Internal cron jobs
    SUBSCRIPTION = "subscription"
}
export declare enum PaymentBillingCycle {
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
    SEMIANNUALLY = "SEMIANNUALLY",
    YEARLY = "YEARLY"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    CONFIRMED = "CONFIRMED",
    RECEIVED = "RECEIVED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    OVERDUE = "OVERDUE"
}
export declare enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED",
    OVERDUE = "OVERDUE",
    TRIAL = "TRIAL"
}
export interface AddressData {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
export interface CustomerData {
    name: string;
    email: string;
    document: string;
    documentType: 'CPF' | 'CNPJ';
    phone?: string;
    birthDate?: string;
    address?: AddressData;
    company?: string;
    providerCustomerId?: string;
    externalReference?: string;
    metadata?: Record<string, any>;
}
export interface CardData {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
    holderDocument?: string;
    address?: AddressData;
    phone?: string;
    email?: string;
}
export interface UniversalPaymentData {
    amount: number;
    currency: string;
    description: string;
    paymentMethod: PaymentMethod;
    dueDate?: string;
    externalReference?: string;
    metadata?: Record<string, any>;
    customer: CustomerData;
    creditCard?: CreditCardData;
    pix?: PIXSpecificData;
    boleto?: BoletoSpecificData;
    installments?: number;
}
export interface CreditCardData {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
    holderDocument?: string;
}
export interface PIXSpecificData {
    expirationMinutes?: number;
    pixKey?: string;
}
export interface BoletoSpecificData {
    dueDate: string;
    fine?: FineData;
    interest?: InterestData;
    discount?: DiscountData;
}
export interface FineData {
    value: number;
    type: 'FIXED' | 'PERCENTAGE';
}
export interface InterestData {
    value: number;
    type: 'PERCENTAGE';
}
export interface DiscountData {
    value: number;
    type: 'FIXED' | 'PERCENTAGE';
    dueDateLimitDays: number;
}
export interface PaymentResponse {
    paymentId: string;
    customerId?: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    pix?: PIXResponse;
    boleto?: BoletoResponse;
    creditCard?: CreditCardResponse;
    externalReference?: string;
    createdAt: string;
    metadata?: Record<string, any>;
    providerData?: any;
}
export interface PIXResponse {
    qrCodeBase64?: string;
    qrCodeText?: string;
    pixKey?: string;
    expirationDate?: string;
}
export interface BoletoResponse {
    boletoUrl?: string;
    digitableLine?: string;
    barcode?: string;
    expirationDate?: string;
}
export interface CreditCardResponse {
    authorizationCode?: string;
    installments?: number;
    maskedNumber?: string;
    transactionId?: string;
}
export interface CustomerResponse {
    id: string;
    externalReference?: string;
    name: string;
    email: string;
    phone?: string;
    document: string;
    documentType: 'CPF' | 'CNPJ';
    status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
    createdAt: string;
    updatedAt: string;
    providerData?: any;
}
export interface CustomerListResponse extends ListResponse<CustomerResponse> {
}
export interface CustomerFilters {
    name?: string;
    email?: string;
    document?: string;
    status?: string;
}
export interface CustomerQuery extends PaginationQuery {
    filters?: CustomerFilters;
}
export interface TokenResponse {
    tokenId: string;
    customerId: string;
    maskedNumber: string;
    brand: string;
    holderName: string;
    expiryMonth: string;
    expiryYear: string;
    status: 'ACTIVE' | 'EXPIRED' | 'BLOCKED';
    createdAt: string;
    providerData?: any;
}
export interface TokenListResponse {
    tokens: TokenResponse[];
    totalCount: number;
}
export interface TokenPaymentData {
    amount: number;
    currency: string;
    description: string;
    installments?: number;
    dueDate?: string;
    externalReference?: string;
    metadata?: Record<string, any>;
}
export interface SubscriptionData {
    customerId: string;
    paymentMethod: PaymentMethod;
    amount: number;
    currency: string;
    cycle: PaymentBillingCycle;
    description: string;
    startDate?: string;
    nextDueDate?: string;
    endDate?: string;
    maxPayments?: number;
    trialPeriodDays?: number;
    tokenId?: string;
    externalReference?: string;
    metadata?: Record<string, any>;
}
export interface SubscriptionResponse {
    subscriptionId: string;
    customerId: string;
    amount: number;
    currency: string;
    cycle: PaymentBillingCycle;
    status: SubscriptionStatus;
    paymentMethod: PaymentMethod;
    createdAt: string;
    startDate: string;
    nextDueDate: string;
    endDate?: string;
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    trialPeriodDays?: number;
    isInTrial: boolean;
    externalReference?: string;
    providerData?: any;
}
export interface SubscriptionPaymentListResponse {
    subscriptionId: string;
    payments: {
        paymentId: string;
        amount: number;
        status: PaymentStatus;
        dueDate: string;
        paymentDate?: string;
        cycle: PaymentBillingCycle;
        createdAt: string;
    }[];
    totalCount: number;
    hasMore: boolean;
}
export interface RecurringPaymentSetup {
    strategy: RecurringStrategy;
    customerId: string;
    paymentMethod: PaymentMethod;
    amount: number;
    currency: string;
    cycle: PaymentBillingCycle;
    description: string;
    tokenization?: {
        tokenId: string;
        cronExpression: string;
        maxRetries: number;
    };
    subscription?: {
        trialPeriodDays?: number;
        maxPayments?: number;
        endDate?: string;
    };
    externalReference?: string;
    metadata?: Record<string, any>;
}
export interface RecurringSetupResponse {
    setupId: string;
    strategy: RecurringStrategy;
    status: 'ACTIVE' | 'SCHEDULED' | 'PAUSED' | 'FAILED';
    managedBy: 'INTERNAL_CRON' | 'PROVIDER_NATIVE';
    nextExecutionDate?: string;
    providerData?: any;
}
export interface TokenizationSetupResponse {
    setupId: string;
    customerId: string;
    tokenId: string;
    strategy: RecurringStrategy;
    cronExpression: string;
    nextExecutionDate: string;
    managedBy: 'INTERNAL_CRON';
    providerData: any;
}
export interface WebhookResponse {
    eventType: string;
    paymentId?: string;
    subscriptionId?: string;
    customerId?: string;
    status?: PaymentStatus;
    amount?: number;
    metadata?: Record<string, any>;
    providerData?: any;
}
export interface CancelResponse {
    success: boolean;
    paymentId: string;
    status: PaymentStatus;
    cancelledAt: string;
    reason?: string;
}
export interface RefundResponse {
    refundId: string;
    paymentId: string;
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    refundedAt: string;
    reason?: string;
}
export interface CancelSubscriptionResponse {
    subscriptionId: string;
    status: SubscriptionStatus;
    cancelledAt: string;
    reason?: string;
}
export interface PaymentFilters {
    status?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    customerId?: string;
    dateFrom?: string;
    dateTo?: string;
    amountFrom?: number;
    amountTo?: number;
}
export interface PaymentQuery extends PaginationQuery {
    filters?: PaymentFilters;
}
export interface PaymentListResponse extends ListResponse<PaymentResponse> {
}
export interface PaymentDetails extends PaymentResponse {
    events: {
        eventType: string;
        timestamp: string;
        description: string;
        metadata?: Record<string, any>;
    }[];
}
export interface PaymentProviderConfig {
    apiKey: string;
    baseUrl: string;
    webhookSecret?: string;
    environment: 'sandbox' | 'production';
    merchantId?: string;
    publicKey?: string;
    secretKey?: string;
    customSettings?: Record<string, any>;
    configSource?: 'app' | 'company';
    appId?: string;
    companyId?: string;
    accountStatus?: 'pending' | 'approved' | 'rejected';
}
export interface RecurringPaymentConfig {
    enabled: boolean;
    strategy: RecurringStrategy;
    tokenization?: {
        enableAutoBilling: boolean;
        cronSchedule: string;
        retryAttempts: number;
        retryIntervalHours: number;
        failureNotifications: NotificationConfig;
    };
    subscription?: {
        enableNativeSubscriptions: boolean;
        defaultCycle: PaymentBillingCycle;
        supportedCycles: PaymentBillingCycle[];
        allowTrialPeriods: boolean;
        trialPeriodDays?: number;
        failureNotifications: NotificationConfig;
    };
    webhooks: {
        enabled: boolean;
        notificationEmails: string[];
        slackWebhook?: string;
    };
}
export interface NotificationConfig {
    enableEmailAlerts: boolean;
    enableSlackAlerts: boolean;
    escalationEmails: string[];
    maxFailuresBeforeEscalation: number;
}
export interface TokenizedSubscription {
    id: string;
    appId: string;
    companyId: string;
    customerId: string;
    tokenId: string;
    providerId: string;
    amount: number;
    currency: string;
    cycle: PaymentBillingCycle;
    description: string;
    nextChargeDate: Date;
    cronExpression: string;
    status: 'ACTIVE' | 'PAUSED' | 'FAILED' | 'CANCELLED';
    failureCount: number;
    maxFailures: number;
    lastAttemptAt?: Date;
    lastSuccessAt?: Date;
    retryIntervalHours: number;
    externalReference?: string;
    metadata?: Record<string, any>;
}
export interface PaymentContext {
    type: 'APP_SUBSCRIPTION' | 'COMPANY_SUBSCRIPTION' | 'ORDER_PAYMENT' | 'CUSTOM';
    entityId: string;
    customerId: string;
    providerId: string;
    metadata: Record<string, any>;
}
export interface PaymentError {
    code: string;
    message: string;
    details?: Record<string, any>;
    provider?: string;
    paymentId?: string;
}
export interface ValidationResult {
    isValid: boolean;
    issues: string[];
    currentEnvironment?: 'sandbox' | 'production';
}
