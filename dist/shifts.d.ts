import { ObjectId } from 'mongodb';
import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';
import { AssignmentConfig } from './channels';
export interface Shift {
    _id: ObjectId;
    name: string;
    description?: string;
    schedule: ShiftSchedule;
    assignments: ShiftAssignment[];
    assignmentConfig: AssignmentConfig;
    companyId: ObjectId;
    appId: ObjectId;
    status: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface ShiftSchedule {
    type: 'fixed' | 'rotating' | 'on_demand';
    overlapMinutes: number;
    transitionStrategy: 'immediate' | 'finish_current' | 'overlap';
    fixedSchedule?: {
        weekdays: number[];
        startTime: string;
        endTime: string;
        timezone: string;
    };
    rotatingSchedule?: {
        rotationDays: number;
        shifts: Array<{
            weekdays: number[];
            startTime: string;
            endTime: string;
        }>;
    };
    onDemandSchedule?: {
        minUsers: number;
        maxUsers: number;
    };
}
export interface ShiftAssignment {
    userId: ObjectId;
    role: 'primary' | 'backup';
    priority: number;
    customSchedule?: {
        startDate: Date;
        endDate?: Date;
        weekdays?: number[];
        startTime?: string;
        endTime?: string;
    };
    status: 'active' | 'inactive' | 'vacation' | 'sick_leave';
    assignedAt: Date;
}
export interface UserAvailability {
    _id: ObjectId;
    userId: ObjectId;
    currentStatus: 'available' | 'busy' | 'away' | 'offline';
    currentShift?: {
        shiftId: ObjectId;
        startedAt: Date;
        expectedEndAt: Date;
    };
    currentWorkload: {
        activeChats: number;
        activeLeads: number;
        activeTickets: number;
        totalScore: number;
    };
    lastActivity: Date;
    lastAssignment: Date;
    companyId: ObjectId;
    appId: ObjectId;
    updatedAt: Date;
}
export interface ShiftQuery extends PaginationQuery {
    status?: ActiveStatus;
    name?: string;
    scheduleType?: 'fixed' | 'rotating' | 'on_demand';
}
export interface UserAvailabilityQuery extends PaginationQuery {
    userId?: string;
    currentStatus?: 'available' | 'busy' | 'away' | 'offline';
    hasCurrentShift?: boolean;
}
export type ShiftResponse = Omit<Shift, never>;
export type UserAvailabilityResponse = Omit<UserAvailability, never>;
export interface ShiftListResponse extends ListResponse<ShiftResponse> {
}
export interface UserAvailabilityListResponse extends ListResponse<UserAvailabilityResponse> {
}
export interface ShiftQueryOptions extends GenericQueryOptions<ShiftQuery> {
}
export interface UserAvailabilityQueryOptions extends GenericQueryOptions<UserAvailabilityQuery> {
}
export interface CreateShiftRequest {
    name: string;
    description?: string;
    schedule: ShiftSchedule;
    assignmentConfig: AssignmentConfig;
}
export interface UpdateShiftRequest {
    name?: string;
    description?: string;
    schedule?: ShiftSchedule;
    assignmentConfig?: AssignmentConfig;
    status?: ActiveStatus;
}
export interface CreateShiftAssignmentRequest {
    userId: string;
    role: 'primary' | 'backup';
    priority?: number;
    customSchedule?: {
        startDate: Date;
        endDate?: Date;
        weekdays?: number[];
        startTime?: string;
        endTime?: string;
    };
}
export interface UpdateShiftAssignmentRequest {
    role?: 'primary' | 'backup';
    priority?: number;
    customSchedule?: {
        startDate: Date;
        endDate?: Date;
        weekdays?: number[];
        startTime?: string;
        endTime?: string;
    };
    status?: 'active' | 'inactive' | 'vacation' | 'sick_leave';
}
export interface UpdateUserAvailabilityRequest {
    currentStatus: 'available' | 'busy' | 'away' | 'offline';
    currentWorkload?: {
        activeChats: number;
        activeLeads: number;
        activeTickets: number;
        totalScore: number;
    };
}
export interface BulkAssignUsersToShiftRequest {
    shiftId: string;
    userAssignments: Array<{
        userId: string;
        role: 'primary' | 'backup';
        priority?: number;
    }>;
}
