import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullTenantDocument } from './common';
export interface TagResponse extends FullTenantDocument {
    name: string;
    color: string;
    description?: string;
    icon?: string;
    usageCount: number;
    isSystem: boolean;
    isPublic: boolean;
    createdBy: string;
    autoTagRules?: TagRule[];
}
export interface TagRule {
    id: string;
    tagId: string;
    name: string;
    conditions: TagCondition[];
    isActive: boolean;
    priority: number;
    createdAt: Date;
    updatedAt?: Date;
}
export interface TagCondition {
    field: string;
    operator: 'contains' | 'equals' | 'starts_with' | 'ends_with' | 'regex' | 'not_empty' | 'empty';
    value?: string;
    caseSensitive?: boolean;
}
export interface TagUsage {
    id: string;
    tagId: string;
    entityType: 'contact' | 'lead' | 'conversation' | 'campaign' | 'ticket';
    entityId: string;
    appliedBy?: string;
    appliedAt: Date;
    removedBy?: string;
    removedAt?: Date;
}
export interface CreateTagRequest {
    name: string;
    color: string;
    description?: string;
    icon?: string;
    isPublic?: boolean;
    autoTagRules?: Omit<TagRule, 'id' | 'tagId' | 'createdAt' | 'updatedAt'>[];
}
export interface UpdateTagRequest {
    name?: string;
    color?: string;
    description?: string;
    icon?: string;
    isPublic?: boolean;
    autoTagRules?: TagRule[];
}
export interface BulkCreateTagsRequest {
    tags: CreateTagRequest[];
}
export interface ApplyTagsRequest {
    entityType: 'contact' | 'lead' | 'conversation' | 'campaign' | 'ticket';
    entityIds: string[];
    tagIds: string[];
}
export interface RemoveTagsRequest {
    entityType: 'contact' | 'lead' | 'conversation' | 'campaign' | 'ticket';
    entityIds: string[];
    tagIds: string[];
}
export interface GetTagsQuery extends PaginationQuery {
    isSystem?: boolean;
    isPublic?: boolean;
    createdBy?: string;
    color?: string;
    minUsage?: number;
    maxUsage?: number;
}
export interface GetTagUsageQuery extends PaginationQuery {
    tagId?: string;
    entityType?: 'contact' | 'lead' | 'conversation' | 'campaign' | 'ticket';
    entityId?: string;
    appliedBy?: string;
    dateFrom?: Date;
    dateTo?: Date;
}
export interface TagStatsResponse {
    tagId: string;
    name: string;
    color: string;
    totalUsage: number;
    usageByType: {
        contacts: number;
        leads: number;
        conversations: number;
        campaigns: number;
        tickets: number;
    };
    trending: 'up' | 'down' | 'stable';
    recentUsage: number;
}
export interface TagApiResponse extends BaseApiResponse<TagResponse> {
}
export interface TagsListApiResponse extends PaginatedApiResponse<TagResponse> {
}
export interface TagStatsApiResponse extends BaseApiResponse<TagStatsResponse> {
}
export interface TagUsageListApiResponse extends PaginatedApiResponse<TagUsage> {
}
export interface BulkCreateTagsApiResponse extends BaseApiResponse<{
    created: TagResponse[];
    errors: string[];
}> {
}
