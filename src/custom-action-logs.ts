import { ObjectId } from 'mongodb';
import { PaginationQuery } from './common';

/**
 * Custom Action Log - Records each execution of a custom action
 */
export interface CustomActionLog {
  _id?: ObjectId;
  id?: string;
  customActionId: string;
  customActionName: string;
  conversationId?: string;
  agentId?: string;

  request: {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: unknown;
    parameters?: Record<string, unknown>;
  };

  response?: {
    statusCode: number;
    body?: unknown;
    headers?: Record<string, string>;
  };

  aiProcessing?: {
    enabled: boolean;
    prompt?: string;
    result?: unknown;
    error?: string;
  };

  success: boolean;
  error?: string;
  executionTime: number;

  source: 'ai_agent' | 'test' | 'api';

  appId: ObjectId | string;
  companyId: ObjectId | string;
  createdAt: Date | string;
}

export interface CustomActionLogResponse extends Omit<CustomActionLog, '_id'> {
  id: string;
}

export interface CustomActionLogQuery extends PaginationQuery {
  customActionId?: string;
  conversationId?: string;
  agentId?: string;
  success?: string;
  source?: 'ai_agent' | 'test' | 'api';
  dateFrom?: string;
  dateTo?: string;
}

export interface CustomActionLogStats {
  totalExecutions: number;
  successCount: number;
  failureCount: number;
  successRate: number;
  avgExecutionTime: number;
  lastExecutionAt: string | null;
  errorBreakdown: Record<string, number>;
}
