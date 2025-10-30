import { FullBaseDocument, ActiveStatus, PaginationQuery, GenericQueryOptions, ListResponse } from "./common";
export interface App extends FullBaseDocument {
    name: string;
    logo: string;
    status: ActiveStatus;
    themes: AppTheme[];
    domains: string[];
    modules: string[];
    backendUrl: string;
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
    backendUrl: string;
}
export interface UpdateAppRequest {
    name?: string;
    logo?: string;
    status?: ActiveStatus;
    themes?: AppTheme[];
    domains?: string[];
    modules?: string[];
    backendUrl?: string;
}
export type AppStatus = ActiveStatus;
export interface AppQuery extends PaginationQuery {
    status?: ActiveStatus;
    name?: string;
    domains?: string[];
}
export interface AppResponse {
    id: string;
    name: string;
    logo: string;
    status: ActiveStatus;
    themes: AppTheme[];
    domains: string[];
    modules: string[];
    backendUrl: string;
    createdAt: string;
    updatedAt: string;
}
export interface AppListResponse extends ListResponse<AppResponse> {
}
export interface AppQueryOptions extends GenericQueryOptions<AppQuery> {
}
