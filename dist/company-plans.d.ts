import { ObjectId } from 'mongodb';
import { FullTenantDocument, PaginationQuery, GenericQueryOptions, ListResponse } from './common';
export type CompanyPlanStatus = 'active' | 'suspended' | 'cancelled' | 'expired';
export type BillingCycle = 'monthly' | 'yearly';
export interface CompanyPlan extends FullTenantDocument {
    _id: ObjectId;
    planId: ObjectId;
    startDate: Date;
    endDate?: Date;
    status: CompanyPlanStatus;
    billing: CompanyPlanBilling;
    usage: CompanyPlanUsage;
    customizations?: CompanyPlanCustomizations;
}
export interface CompanyPlanBilling {
    cycle: BillingCycle;
    amount: number;
    currency: string;
    nextBilling: Date;
    lastBilling?: Date;
    paymentMethod?: string;
}
export interface CompanyPlanUsage {
    modules: Record<string, number>;
    lastUpdated: Date;
}
export interface CompanyPlanCustomizations {
    additionalLimits?: Record<string, number>;
    customModules?: string[];
}
export interface CompanyPlanQuery extends PaginationQuery {
    status?: CompanyPlanStatus;
    planId?: string;
    billingCycle?: BillingCycle;
    expiringBefore?: Date;
}
export type CompanyPlanResponse = CompanyPlan;
export interface CompanyPlanListResponse extends ListResponse<CompanyPlanResponse> {
}
export interface CompanyPlanQueryOptions extends GenericQueryOptions<CompanyPlanQuery> {
}
export interface CreateCompanyPlanRequest {
    planId: ObjectId;
    billing: {
        cycle: BillingCycle;
        paymentMethod?: string;
    };
    customizations?: CompanyPlanCustomizations;
}
export interface UpdateCompanyPlanRequest {
    status?: CompanyPlanStatus;
    endDate?: Date;
    billing?: Partial<CompanyPlanBilling>;
    customizations?: CompanyPlanCustomizations;
}
