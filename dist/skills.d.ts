import { PaginationQuery, ListResponse, ActiveStatus } from './common';
export type SkillLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';
export interface Skill {
    _id: string;
    name: string;
    description?: string;
    category: string;
    level: SkillLevel;
    isActive: boolean;
    companyId: string;
    appId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface SkillResponse extends Omit<Skill, '_id'> {
    id: string;
}
export interface CreateSkillRequest {
    name: string;
    description?: string;
    category: string;
    level?: SkillLevel;
    isActive?: boolean;
}
export interface UpdateSkillRequest {
    name?: string;
    description?: string;
    category?: string;
    level?: SkillLevel;
    isActive?: boolean;
}
export interface SkillQuery extends PaginationQuery {
    category?: string;
    level?: SkillLevel;
    isActive?: boolean;
}
export interface SkillListResponse extends ListResponse<SkillResponse> {
}
export interface UserSkill {
    _id: string;
    userId: string;
    skillId: string;
    level: SkillLevel;
    certifiedAt?: Date;
    expiresAt?: Date;
    notes?: string;
    companyId: string;
    appId: string;
    status: ActiveStatus;
    assignedAt: Date;
}
export interface UserSkillResponse extends Omit<UserSkill, '_id'> {
    id: string;
}
export interface CreateUserSkillRequest {
    userId: string;
    skillId: string;
    level?: SkillLevel;
    certifiedAt?: string;
    expiresAt?: string;
    notes?: string;
}
export interface UpdateUserSkillRequest {
    level?: SkillLevel;
    certifiedAt?: string;
    expiresAt?: string;
    notes?: string;
}
export interface UserSkillQuery extends PaginationQuery {
    level?: SkillLevel;
    category?: string;
    isActive?: boolean;
}
export interface UserSkillListResponse extends ListResponse<UserSkillResponse> {
}
export interface BulkAssignSkillsRequest {
    userAssignments: Array<{
        userId: string;
        level?: SkillLevel;
        certifiedAt?: string;
        expiresAt?: string;
        notes?: string;
    }>;
}
export interface SkillRequirement {
    skillId: string;
    minLevel: SkillLevel;
}
export interface SkillFilter {
    requiredSkills?: SkillRequirement[];
    preferredSkills?: SkillRequirement[];
}
