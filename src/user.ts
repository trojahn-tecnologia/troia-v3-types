import { ObjectId } from 'mongodb';
import { TenantAwareDocument, FullTenantDocument, ActiveStatus } from './common';

export interface User extends FullTenantDocument {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  status: ActiveStatus;
  role: UserRole;
  preferences: UserPreferences;
  security: UserSecurity;
  permissions: UserPermissions;
  lastLoginAt?: Date;
  lastActivityAt?: Date;
}

export interface UserRole {
  _id?: ObjectId;
  name: string;
  level: number;
  permissions: string[];
  isSystem: boolean;
  isDefault: boolean;
}



export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: UserNotificationPreferences;
}

export interface UserNotificationPreferences {
  email: {
    enabled: boolean;
    frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
    types: string[];
  };
  sms: {
    enabled: boolean;
    types: string[];
  };
  push: {
    enabled: boolean;
    types: string[];
  };
  inApp: {
    enabled: boolean;
    types: string[];
  };
}


export interface UserSecurity {
  password: UserPassword;
  twoFactor: UserTwoFactor;
  sessions: UserSession[];
  loginAttempts: UserLoginAttempt[];
  passwordResets: UserPasswordReset[];
}

export interface UserPassword {
  hashedPassword: string;
  lastChangedAt: Date;
  expiresAt?: Date;
  requiresChange: boolean;
  history: string[];
}

export interface UserTwoFactor {
  enabled: boolean;
  method?: 'totp' | 'sms' | 'email';
  secret?: string;
  backupCodes?: string[];
  lastUsedAt?: Date;
}

export interface UserSession {
  id: string;
  token: string;
  userAgent: string;
  ipAddress: string;
  location?: string;
  device?: string;
  createdAt: Date;
  lastAccessAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

export interface UserLoginAttempt {
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
  location?: string;
}

export interface UserPasswordReset {
  token: string;
  requestedAt: Date;
  expiresAt: Date;
  usedAt?: Date;
  ipAddress: string;
  userAgent: string;
}

export interface UserPermissions {
  system: string[];
  company: string[];
  custom: Record<string, string[]>;
}

export interface UserInvitation extends TenantAwareDocument {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  invitedBy: ObjectId;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  message?: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  phone?: string;
  role: string;
  preferences?: Partial<UserPreferences>;
  sendInvite?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  status?: ActiveStatus;
  role?: string;
  preferences?: Partial<UserPreferences>;
}

export interface CreateUserInvitationRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  message?: string;
  expiresIn?: number;
}

export interface AcceptInvitationRequest {
  token: string;
  password: string;
  firstName?: string;
  lastName?: string;
  preferences?: Partial<UserPreferences>;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface LoginResponse {
  user: Omit<User, 'security'>;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  permissions: string[];
  requiresTwoFactor?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface Enable2FARequest {
  method: 'totp' | 'sms' | 'email';
  code: string;
}

export interface Verify2FARequest {
  code: string;
}

export interface CreateApiKeyRequest {
  name: string;
  permissions: string[];
  expiresAt?: Date;
}

export interface UserActivity extends TenantAwareDocument {
  userId: ObjectId;
  action: string;
  resource?: string;
  resourceId?: ObjectId;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface UserMetrics {
  totalLogins: number;
  lastLogin?: Date;
  activeDevices: number;
  totalSessions: number;
  failedLoginAttempts: number;
  passwordAge: number;
  twoFactorEnabled: boolean;
  apiKeysCount: number;
  lastActivity?: Date;
}

export interface UserAnalytics {
  period: 'day' | 'week' | 'month' | 'year';
  data: {
    date: string;
    logins: number;
    sessions: number;
    activity: number;
    devices: number;
  }[];
}

export type UserStatus = ActiveStatus;