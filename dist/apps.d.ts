import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, BaseDocument, ActiveStatus } from './common';
export interface AppResponse extends BaseDocument {
    name: string;
    companyName: string;
    document: string;
    status: ActiveStatus;
    countryId: string;
    stateId: string;
    cityId: string;
    neighborhood?: string;
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    mobile?: string;
    iconUrl?: string;
    logoUrl?: string;
    logoHorizontalUrl?: string;
    logoDarkUrl?: string;
    logoDarkHorizontalUrl?: string;
    loginBackground?: string;
    config?: Record<string, any>;
    database: string;
    analyticsId?: string;
    template?: string;
    newCompanyOnRegister: boolean;
    enableAI: boolean;
    enableCalendar: boolean;
    enableChat: boolean;
    domains: string[];
    styles?: AppStyle[];
}
export interface AppStyle {
    id: string;
    appId: string;
    style: Record<string, any>;
    theme: number;
    version: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface AppDomain {
    id: string;
    appId: string;
    address: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface CreateAppRequest {
    name: string;
    companyName: string;
    document: string;
    countryId: string;
    stateId: string;
    cityId: string;
    neighborhood?: string;
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    mobile?: string;
    domain: string;
    newCompanyOnRegister?: boolean;
    enableAI?: boolean;
    enableCalendar?: boolean;
    enableChat?: boolean;
    config?: Record<string, any>;
    analyticsId?: string;
    template?: string;
}
export interface UpdateAppRequest {
    name?: string;
    companyName?: string;
    document?: string;
    domain?: string;
    status?: 'active' | 'inactive' | 'suspended';
    countryId?: string;
    stateId?: string;
    cityId?: string;
    address?: string;
    zipCode?: string;
    phone?: string;
    email?: string;
    website?: string;
    logo?: string;
    favicon?: string;
    primaryColor?: string;
    secondaryColor?: string;
    timezone?: string;
    language?: string;
    currency?: string;
}
export interface GetAppsQuery extends PaginationQuery {
    status?: 'active' | 'inactive' | 'suspended';
    domain?: string;
}
export interface AppApiResponse extends BaseApiResponse<AppResponse> {
}
export interface AppsListApiResponse extends PaginatedApiResponse<AppResponse> {
}
