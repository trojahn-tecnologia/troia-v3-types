import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, FullTenantDocument, ActiveStatus } from './common';
export interface TeamResponse extends FullTenantDocument {
    name: string;
    description?: string;
    color: string;
    isDefault: boolean;
    maxMembers?: number;
    permissions: TeamPermission[];
    members: TeamMember[];
    leaders: string[];
    channels: string[];
    totalMembers: number;
    activeMembers: number;
    totalConversations: number;
    avgResponseTime: number;
    status: ActiveStatus;
}
export interface TeamMember {
    id: string;
    teamId: string;
    userId: string;
    role: 'member' | 'leader';
    joinedAt: Date;
    leftAt?: Date;
    isActive: boolean;
    conversationsHandled: number;
    avgResponseTime: number;
    satisfactionScore: number;
    permissions?: string[];
}
export interface TeamPermission {
    id: string;
    teamId: string;
    resource: string;
    actions: string[];
    conditions?: Record<string, any>;
}
export interface TeamSchedule {
    id: string;
    teamId: string;
    name: string;
    timezone: string;
    schedule: TeamScheduleDay[];
    isDefault: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface TeamScheduleDay {
    dayOfWeek: number;
    isActive: boolean;
    shifts: TeamShift[];
}
export interface TeamShift {
    id: string;
    startTime: string;
    endTime: string;
    userIds: string[];
    maxConcurrentConversations?: number;
    breakDuration?: number;
}
export interface TeamStats {
    teamId: string;
    period: 'today' | 'week' | 'month' | 'quarter';
    totalConversations: number;
    openConversations: number;
    closedConversations: number;
    avgConversationDuration: number;
    avgFirstResponseTime: number;
    avgResponseTime: number;
    responseTimeByHour: {
        hour: number;
        avgTime: number;
    }[];
    satisfactionSurveys: number;
    avgSatisfactionScore: number;
    satisfactionByMember: {
        userId: string;
        score: number;
    }[];
    conversationsPerMember: {
        userId: string;
        count: number;
    }[];
    busyHours: {
        hour: number;
        conversationCount: number;
    }[];
    activeMembersCount: number;
    onlineMembersCount: number;
    memberUtilization: {
        userId: string;
        utilization: number;
    }[];
}
export interface CreateTeamRequest {
    name: string;
    description?: string;
    color: string;
    isDefault?: boolean;
    maxMembers?: number;
    permissions?: Omit<TeamPermission, 'id' | 'teamId'>[];
    channels?: string[];
}
export interface UpdateTeamRequest {
    name?: string;
    description?: string;
    color?: string;
    isDefault?: boolean;
    maxMembers?: number;
    permissions?: TeamPermission[];
    channels?: string[];
    status?: ActiveStatus;
}
export interface AddTeamMemberRequest {
    teamId: string;
    userId: string;
    role?: 'member' | 'leader';
    permissions?: string[];
}
export interface UpdateTeamMemberRequest {
    role?: 'member' | 'leader';
    permissions?: string[];
    isActive?: boolean;
}
export interface RemoveTeamMemberRequest {
    teamId: string;
    userId: string;
    reason?: string;
}
export interface BulkTeamMemberRequest {
    teamId: string;
    action: 'add' | 'remove' | 'update_role';
    userIds: string[];
    role?: 'member' | 'leader';
    permissions?: string[];
}
export interface CreateTeamScheduleRequest {
    teamId: string;
    name: string;
    timezone: string;
    schedule: Omit<TeamScheduleDay, 'id'>[];
    isDefault?: boolean;
}
export interface UpdateTeamScheduleRequest {
    name?: string;
    timezone?: string;
    schedule?: TeamScheduleDay[];
    isDefault?: boolean;
    isActive?: boolean;
}
export interface GetTeamsQuery extends PaginationQuery {
    status?: ActiveStatus;
    isDefault?: boolean;
    hasMembers?: boolean;
    channelId?: string;
    userId?: string;
    minMembers?: number;
    maxMembers?: number;
}
export interface GetTeamMembersQuery extends PaginationQuery {
    teamId: string;
    role?: 'member' | 'leader';
    isActive?: boolean;
    userId?: string;
}
export interface GetTeamStatsQuery {
    teamId: string;
    period: 'today' | 'week' | 'month' | 'quarter';
    userId?: string;
}
export interface TeamApiResponse extends BaseApiResponse<TeamResponse> {
}
export interface TeamsListApiResponse extends PaginatedApiResponse<TeamResponse> {
}
export interface TeamMemberApiResponse extends BaseApiResponse<TeamMember> {
}
export interface TeamMembersListApiResponse extends PaginatedApiResponse<TeamMember> {
}
export interface TeamStatsApiResponse extends BaseApiResponse<TeamStats> {
}
export interface TeamScheduleApiResponse extends BaseApiResponse<TeamSchedule> {
}
export interface TeamSchedulesListApiResponse extends PaginatedApiResponse<TeamSchedule> {
}
export interface BulkTeamMemberApiResponse extends BaseApiResponse<{
    successful: string[];
    failed: {
        userId: string;
        error: string;
    }[];
}> {
}
