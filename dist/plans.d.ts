import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullBaseDocument, ActiveStatus } from './common';
export type PlanType = 'basic' | 'pro' | 'enterprise' | 'custom';
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';
export type LimitType = 'users' | 'contacts' | 'messages' | 'storage' | 'ai_tokens' | 'campaigns';
export interface PlanResponse extends FullBaseDocument {
    name: string;
    description?: string;
    type: PlanType;
    price: number;
    currency: string;
    billingCycle: BillingCycle;
    isDefault: boolean;
    isPublic: boolean;
    isMostPopular: boolean;
    sortOrder: number;
    features: string[];
    limits: PlanLimit[];
    permissions: PlanPermission[];
    trialDays?: number;
    coupons: PlanCoupon[];
    status: ActiveStatus;
}
export interface PlanLimit {
    id: string;
    planId: string;
    type: LimitType;
    value: number;
    overage?: {
        allowed: boolean;
        pricePerUnit: number;
    };
}
export interface PlanPermission {
    id: string;
    planId: string;
    module: string;
    permissions: string[];
}
export interface PlanCoupon {
    id: string;
    planId: string;
    code: string;
    name: string;
    description?: string;
    type: 'percentage' | 'fixed_amount';
    value: number;
    maxUses?: number;
    currentUses: number;
    maxUsesPerCustomer?: number;
    validFrom?: Date;
    validUntil?: Date;
    minimumAmount?: number;
    plans?: string[];
    status: ActiveStatus;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface CompanyPlan {
    id: string;
    companyId: string;
    planId: string;
    startDate: Date;
    endDate?: Date;
    nextBillingDate: Date;
    status: 'active' | 'canceled' | 'expired' | 'suspended';
    price: number;
    currency: string;
    billingCycle: BillingCycle;
    currentUsage: PlanUsage[];
    paymentMethodId?: string;
    lastInvoiceId?: string;
    couponCode?: string;
    discountAmount?: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface PlanUsage {
    id: string;
    companyPlanId: string;
    type: LimitType;
    currentValue: number;
    limitValue: number;
    overageValue?: number;
    resetDate: Date;
    lastUpdatedAt: Date;
}
export interface CreatePlanRequest {
    name: string;
    description?: string;
    type: PlanType;
    price: number;
    currency: string;
    billingCycle: BillingCycle;
    isDefault?: boolean;
    isPublic?: boolean;
    isMostPopular?: boolean;
    sortOrder?: number;
    features: string[];
    limits: Omit<PlanLimit, 'id' | 'planId'>[];
    permissions: Omit<PlanPermission, 'id' | 'planId'>[];
    trialDays?: number;
}
export interface UpdatePlanRequest {
    name?: string;
    description?: string;
    type?: PlanType;
    price?: number;
    currency?: string;
    billingCycle?: BillingCycle;
    isDefault?: boolean;
    isPublic?: boolean;
    isMostPopular?: boolean;
    sortOrder?: number;
    features?: string[];
    limits?: PlanLimit[];
    permissions?: PlanPermission[];
    trialDays?: number;
    status?: ActiveStatus;
}
export interface CreatePlanCouponRequest {
    planId: string;
    code: string;
    name: string;
    description?: string;
    type: 'percentage' | 'fixed_amount';
    value: number;
    maxUses?: number;
    maxUsesPerCustomer?: number;
    validFrom?: Date;
    validUntil?: Date;
    minimumAmount?: number;
    plans?: string[];
}
export interface UpdatePlanCouponRequest {
    code?: string;
    name?: string;
    description?: string;
    type?: 'percentage' | 'fixed_amount';
    value?: number;
    maxUses?: number;
    maxUsesPerCustomer?: number;
    validFrom?: Date;
    validUntil?: Date;
    minimumAmount?: number;
    plans?: string[];
    status?: ActiveStatus;
}
export interface ValidateCouponRequest {
    couponCode: string;
    planId: string;
    companyId?: string;
    amount?: number;
}
export interface ValidateCouponResponse {
    valid: boolean;
    coupon?: PlanCoupon;
    discountAmount?: number;
    finalAmount?: number;
    errors?: string[];
}
export interface SubscribeToPlanRequest {
    companyId: string;
    planId: string;
    billingCycle?: BillingCycle;
    couponCode?: string;
    paymentMethodId?: string;
    startDate?: Date;
}
export interface GetPlansQuery extends PaginationQuery {
    type?: PlanType;
    isPublic?: boolean;
    isDefault?: boolean;
    currency?: string;
    billingCycle?: BillingCycle;
    minPrice?: number;
    maxPrice?: number;
    features?: string[];
}
export interface GetCompanyPlansQuery extends PaginationQuery {
    companyId?: string;
    planId?: string;
    status?: 'active' | 'canceled' | 'expired' | 'suspended';
    billingCycle?: BillingCycle;
    expiringBefore?: Date;
}
export interface PlanApiResponse extends BaseApiResponse<PlanResponse> {
}
export interface PlansListApiResponse extends PaginatedApiResponse<PlanResponse> {
}
export interface PlanCouponApiResponse extends BaseApiResponse<PlanCoupon> {
}
export interface PlanCouponsListApiResponse extends PaginatedApiResponse<PlanCoupon> {
}
export interface ValidateCouponApiResponse extends BaseApiResponse<ValidateCouponResponse> {
}
export interface CompanyPlanApiResponse extends BaseApiResponse<CompanyPlan> {
}
export interface CompanyPlansListApiResponse extends PaginatedApiResponse<CompanyPlan> {
}
export interface PlanUsageListApiResponse extends BaseApiResponse<PlanUsage[]> {
}
