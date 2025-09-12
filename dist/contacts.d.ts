import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullTenantDocument } from './common';
export interface ContactResponse extends FullTenantDocument {
    name: string;
    phone?: string;
    email?: string;
    document?: string;
    avatar?: string;
    isBlocked: boolean;
    isVip: boolean;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    address?: string;
    zipCode?: string;
    lastSeenAt?: Date;
    firstContactAt: Date;
    totalMessages: number;
    totalCalls: number;
    tags: string[];
    source?: string;
    customFields: Record<string, any>;
    leadId?: string;
    channels: string[];
    preferredChannel?: string;
    timezone?: string;
    language?: string;
    allowMarketing: boolean;
    allowNotifications: boolean;
}
export interface CreateContactRequest {
    name: string;
    phone?: string;
    email?: string;
    document?: string;
    avatar?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    address?: string;
    zipCode?: string;
    tags?: string[];
    source?: string;
    customFields?: Record<string, any>;
    preferredChannel?: string;
    timezone?: string;
    language?: string;
    allowMarketing?: boolean;
    allowNotifications?: boolean;
}
export interface UpdateContactRequest {
    name?: string;
    phone?: string;
    email?: string;
    document?: string;
    avatar?: string;
    isBlocked?: boolean;
    isVip?: boolean;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    address?: string;
    zipCode?: string;
    tags?: string[];
    source?: string;
    customFields?: Record<string, any>;
    preferredChannel?: string;
    timezone?: string;
    language?: string;
    allowMarketing?: boolean;
    allowNotifications?: boolean;
}
export interface ImportContactsRequest {
    format: 'csv' | 'xlsx' | 'json';
    data: ContactImportRow[];
    options?: {
        updateExisting?: boolean;
        defaultTags?: string[];
        defaultSource?: string;
    };
}
export interface ContactImportRow {
    name: string;
    phone?: string;
    email?: string;
    document?: string;
    tags?: string;
    source?: string;
    customFields?: Record<string, any>;
}
export interface ExportContactsRequest {
    format: 'csv' | 'xlsx' | 'json';
    filters?: GetContactsQuery;
    fields?: string[];
}
export interface BulkUpdateContactsRequest {
    contactIds: string[];
    updates: {
        tags?: {
            action: 'add' | 'remove' | 'replace';
            values: string[];
        };
        isBlocked?: boolean;
        isVip?: boolean;
        customFields?: Record<string, any>;
    };
}
export interface GetContactsQuery extends PaginationQuery {
    isBlocked?: boolean;
    isVip?: boolean;
    tags?: string[];
    source?: string;
    channels?: string[];
    hasPhone?: boolean;
    hasEmail?: boolean;
    lastSeenFrom?: Date;
    lastSeenTo?: Date;
    createdFrom?: Date;
    createdTo?: Date;
    countryId?: string;
    stateId?: string;
    cityId?: string;
}
export interface ContactApiResponse extends BaseApiResponse<ContactResponse> {
}
export interface ContactsListApiResponse extends PaginatedApiResponse<ContactResponse> {
}
export interface ImportContactsApiResponse extends BaseApiResponse<{
    imported: number;
    updated: number;
    errors: string[];
}> {
}
export interface ExportContactsApiResponse extends BaseApiResponse<{
    downloadUrl: string;
    expiresAt: Date;
}> {
}
