import { PaginationQuery, ListResponse, AppAwareDocument, ActiveStatus } from './common';

/**
 * Funnel - Sales funnel structure
 * Each funnel has its own independent steps
 */
export interface Funnel extends AppAwareDocument {
  name: string;
  description?: string;
  color: string;              // Hex color (e.g., "#8b5cf6")
  order: number;              // Display order (customizable)
  status: ActiveStatus;
}

export interface CreateFunnelRequest {
  name: string;
  description?: string;
  color: string;
  order?: number;
}

export interface UpdateFunnelRequest {
  name?: string;
  description?: string;
  color?: string;
  order?: number;
  status?: ActiveStatus;
}

export type FunnelResponse = Omit<Funnel, '_id'> & { id: string };

export interface FunnelQuery extends PaginationQuery {
  filters?: {
    status?: ActiveStatus;
    name?: string;
  };
}

export interface FunnelListResponse extends ListResponse<FunnelResponse> {}

/**
 * FunnelStep - Individual stages within a funnel
 * Each step has its own color and order within the funnel
 */
export interface FunnelStep extends AppAwareDocument {
  funnelId: string;           // Parent funnel
  name: string;
  description?: string;
  color: string;              // Hex color (e.g., "#10b981")
  order: number;              // Display order within funnel (customizable)
  status: ActiveStatus;
}

export interface CreateFunnelStepRequest {
  funnelId: string;
  name: string;
  description?: string;
  color: string;
  order?: number;
}

export interface UpdateFunnelStepRequest {
  name?: string;
  description?: string;
  color?: string;
  order?: number;
  status?: ActiveStatus;
}

export type FunnelStepResponse = Omit<FunnelStep, '_id'> & { id: string };

export interface FunnelStepQuery extends PaginationQuery {
  filters?: {
    funnelId?: string;
    status?: ActiveStatus;
    name?: string;
  };
}

export interface FunnelStepListResponse extends ListResponse<FunnelStepResponse> {}

/**
 * Bulk operations
 */
export interface ReorderFunnelsRequest {
  funnelIds: string[];        // Array of funnel IDs in new order
}

export interface ReorderFunnelStepsRequest {
  stepIds: string[];          // Array of step IDs in new order
}

/**
 * Validation responses
 */
export interface FunnelDeleteValidation {
  canDelete: boolean;
  linkedLeadsCount: number;
  message: string;
}

export interface FunnelStepDeleteValidation {
  canDelete: boolean;
  linkedLeadsCount: number;
  message: string;
}
