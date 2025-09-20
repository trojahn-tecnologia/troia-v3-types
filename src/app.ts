import { ObjectId } from 'mongodb';
import { FullBaseDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from "./common";

export interface App extends FullBaseDocument {
  name: string;
  logo: string;
  status: ActiveStatus;
  themes: AppTheme[];
  domains: string[];
  modules: string[];
}

export interface AppTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  darkMode: boolean;
}

export interface CreateAppRequest {
  name: string;
  logo: string;
  themes: AppTheme[];
  domains: string[];
  modules: string[];
}

export interface UpdateAppRequest {
  name?: string;
  logo?: string;
  status?: ActiveStatus;
  themes?: AppTheme[];
  domains?: string[];
  modules?: string[];
}

export type AppStatus = ActiveStatus;
// ============================================================
// APP SPECIFIC QUERY & RESPONSE TYPES
// ============================================================

// App query with specific filters
export interface AppQuery extends PaginationQuery {
  status?: ActiveStatus;
  name?: string;
  domains?: string[];
}

// App response (same as App for now, but prepared for future changes)
export interface AppResponse {
  id: string;
  name: string;
  logo: string;
  status: ActiveStatus;
  themes: AppTheme[];
  domains: string[];
  modules: string[];
  createdAt: string;
  updatedAt: string;
}

// App list response using generic
export interface AppListResponse extends ListResponse<AppResponse> {}

// App query options using generic
export interface AppQueryOptions extends GenericQueryOptions<AppQuery> {}
