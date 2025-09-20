import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';
export interface Team {
    name: string;
    description: string;
    companyId: ObjectId;
    appId: ObjectId;
    status: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface TeamUser {
    teamId: ObjectId;
    userId: ObjectId;
    role: 'member' | 'leader' | 'manager';
    priority: number;
    companyId: ObjectId;
    appId: ObjectId;
    status: ActiveStatus;
    joinedAt: Date;
}
export interface TeamResource {
    teamId: ObjectId;
    resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
    resourceId: ObjectId;
    assignedAt: Date;
    assignedBy: ObjectId;
    companyId: ObjectId;
    appId: ObjectId;
    status: ActiveStatus;
}
export interface TeamQuery extends PaginationQuery {
    status?: ActiveStatus;
    name?: string;
}
export interface TeamUserQuery extends PaginationQuery {
    teamId?: string;
    userId?: string;
    role?: 'member' | 'leader' | 'manager';
    status?: ActiveStatus;
}
export interface TeamResourceQuery extends PaginationQuery {
    teamId?: string;
    resourceType?: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
    assignedBy?: string;
    status?: ActiveStatus;
}
export interface TeamResponse extends Omit<Team, '_id'> {
    id: string;
}
export interface TeamUserResponse extends Omit<TeamUser, '_id'> {
    id: string;
}
export interface TeamResourceResponse extends Omit<TeamResource, '_id'> {
    id: string;
}
export interface TeamListResponse extends ListResponse<TeamResponse> {
}
export interface TeamUserListResponse extends ListResponse<TeamUserResponse> {
}
export interface TeamResourceListResponse extends ListResponse<TeamResourceResponse> {
}
export interface TeamQueryOptions extends GenericQueryOptions<TeamQuery> {
}
export interface TeamUserQueryOptions extends GenericQueryOptions<TeamUserQuery> {
}
export interface TeamResourceQueryOptions extends GenericQueryOptions<TeamResourceQuery> {
}
export interface CreateTeamRequest {
    name: string;
    description: string;
}
export interface UpdateTeamRequest {
    name?: string;
    description?: string;
    status?: ActiveStatus;
}
export interface CreateTeamUserRequest {
    teamId: string;
    userId: string;
    role: 'member' | 'leader' | 'manager';
    priority?: number;
}
export interface UpdateTeamUserRequest {
    role?: 'member' | 'leader' | 'manager';
    priority?: number;
    status?: ActiveStatus;
}
export interface CreateTeamResourceRequest {
    teamId: string;
    resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
    resourceId: string;
}
export interface UpdateTeamResourceRequest {
    status?: ActiveStatus;
}
export interface BulkAssignUsersToTeamRequest {
    teamId: string;
    userAssignments: Array<{
        userId: string;
        role: 'member' | 'leader' | 'manager';
        priority?: number;
    }>;
}
export interface BulkAssignResourcesToTeamRequest {
    teamId: string;
    resourceAssignments: Array<{
        resourceType: 'customer' | 'lead' | 'project' | 'document' | 'ticket';
        resourceId: string;
    }>;
}
