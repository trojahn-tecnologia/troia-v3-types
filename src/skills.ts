import { PaginationQuery, ListResponse, ActiveStatus } from './common';

// ============================================================================
// SKILL LEVEL TYPES
// ============================================================================

export type SkillLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

// ============================================================================
// SKILLS ENTITY TYPES
// ============================================================================

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

// ============================================================================
// SKILLS REQUEST TYPES
// ============================================================================

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

// ============================================================================
// SKILLS QUERY TYPES
// ============================================================================

export interface SkillQuery extends PaginationQuery {
  category?: string;
  level?: SkillLevel;
  isActive?: boolean;
}

export interface SkillListResponse extends ListResponse<SkillResponse> {}

// ============================================================================
// USER-SKILLS ENTITY TYPES
// ============================================================================

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

// ============================================================================
// USER-SKILLS REQUEST TYPES
// ============================================================================

export interface CreateUserSkillRequest {
  userId: string;
  skillId: string;
  level?: SkillLevel;
  certifiedAt?: string; // ISO date string
  expiresAt?: string; // ISO date string
  notes?: string;
}

export interface UpdateUserSkillRequest {
  level?: SkillLevel;
  certifiedAt?: string; // ISO date string
  expiresAt?: string; // ISO date string
  notes?: string;
}

// ============================================================================
// USER-SKILLS QUERY TYPES
// ============================================================================

export interface UserSkillQuery extends PaginationQuery {
  level?: SkillLevel;
  category?: string;
  isActive?: boolean;
}

export interface UserSkillListResponse extends ListResponse<UserSkillResponse> {}

// ============================================================================
// BULK OPERATIONS
// ============================================================================

export interface BulkAssignSkillsRequest {
  userAssignments: Array<{
    userId: string;
    level?: SkillLevel;
    certifiedAt?: string; // ISO date string
    expiresAt?: string; // ISO date string
    notes?: string;
  }>;
}

// ============================================================================
// SKILL FILTERING FOR ASSIGNMENT SYSTEM
// ============================================================================

export interface SkillRequirement {
  skillId: string;
  minLevel: SkillLevel;
}

export interface SkillFilter {
  requiredSkills?: SkillRequirement[];
  preferredSkills?: SkillRequirement[];
}