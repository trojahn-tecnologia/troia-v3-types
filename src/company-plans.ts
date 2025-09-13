import { ObjectId } from 'mongodb';
import { FullTenantDocument, PaginationQuery, GenericQueryOptions, ListResponse } from './common';

export type CompanyPlanStatus = 'active' | 'suspended' | 'cancelled' | 'expired';
export type BillingCycle = 'monthly' | 'yearly';

export interface CompanyPlan extends FullTenantDocument {
  _id: ObjectId;
  planId: ObjectId; // Referência ao Plan
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
  modules: Record<string, number>; // ✅ Simplificado: { users: 45, crm: 230, chat: 1500 }
  lastUpdated: Date;
}

export interface CompanyPlanCustomizations {
  additionalLimits?: Record<string, number>; // ✅ Limits extras: { users: +10, storage: +50 }
  customModules?: string[];
}

// Generic + Specific Pattern
export interface CompanyPlanQuery extends PaginationQuery {
  status?: CompanyPlanStatus;
  planId?: string;
  billingCycle?: BillingCycle;
  expiringBefore?: Date;
}

export type CompanyPlanResponse = CompanyPlan;
export interface CompanyPlanListResponse extends ListResponse<CompanyPlanResponse> {}
export interface CompanyPlanQueryOptions extends GenericQueryOptions<CompanyPlanQuery> {}

// Request types
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