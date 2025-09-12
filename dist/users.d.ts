import { BaseApiResponse, PaginatedApiResponse, PaginationQuery, TenantAwareDocument } from './common';
export interface UserResponse extends TenantAwareDocument {
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
    status: 'active' | 'inactive' | 'suspended';
    levelId: string;
    officeId?: string;
    roles: string[];
    permissions: UserPermission[];
    lastLoginAt?: Date;
    emailVerifiedAt?: Date;
    phoneVerifiedAt?: Date;
    twoFactorEnabled: boolean;
    timezone?: string;
    language?: string;
    deviceTokens: string[];
}
export interface UserPermission {
    resource: string;
    actions: ('create' | 'read' | 'update' | 'delete' | 'export' | 'import')[];
    scope: 'all' | 'own' | 'selected';
    selectedIds?: string[];
}
export interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
    phone?: string;
    levelId: string;
    officeId?: string;
    roles?: string[];
    timezone?: string;
    language?: string;
}
export interface UpdateUserRequest {
    name?: string;
    phone?: string;
    avatar?: string;
    status?: 'active' | 'inactive' | 'suspended';
    levelId?: string;
    officeId?: string;
    roles?: string[];
    permissions?: UserPermission[];
    timezone?: string;
    language?: string;
}
export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface LoginRequest {
    email: string;
    password: string;
    deviceToken?: string;
}
export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: UserResponse;
    expiresIn: number;
}
export interface RefreshTokenRequest {
    refreshToken: string;
}
export interface GetUsersQuery extends PaginationQuery {
    status?: 'active' | 'inactive' | 'suspended';
    levelId?: string;
    officeId?: string;
    roles?: string[];
}
export interface UserApiResponse extends BaseApiResponse<UserResponse> {
}
export interface UsersListApiResponse extends PaginatedApiResponse<UserResponse> {
}
export interface LoginApiResponse extends BaseApiResponse<LoginResponse> {
}
