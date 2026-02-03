import { ObjectId } from 'mongodb';
import { ActiveStatus, PaginationQuery } from './common';

export interface CustomAction {
  _id?: ObjectId;
  id?: string;
  name: string;
  displayName: string;
  description?: string;
  parameters: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
    }>;
    required?: string[];
  };
  endpoint: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
  };
  credentials?: Record<string, string>;
  responseMapping?: {
    successPath?: string;
    errorPath?: string;
    transform?: string;
  };
  aiProcessing?: {
    enabled: boolean;
    prompt: string;
    parameters: {
      type: 'object';
      properties: Record<string, {
        type: string;
        description: string;
      }>;
      required?: string[];
    };
  };
  appId: ObjectId | string;
  companyId: ObjectId | string;
  status: ActiveStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
}

export interface CustomActionResponse extends Omit<CustomAction, '_id'> {
  id: string;
}

export interface CreateCustomActionRequest {
  name: string;
  displayName: string;
  description?: string;
  parameters: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
    }>;
    required?: string[];
  };
  endpoint: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
  };
  credentials?: Record<string, string>;
  responseMapping?: {
    successPath?: string;
    errorPath?: string;
    transform?: string;
  };
  aiProcessing?: {
    enabled: boolean;
    prompt: string;
    parameters: {
      type: 'object';
      properties: Record<string, {
        type: string;
        description: string;
      }>;
      required?: string[];
    };
  };
}

export interface UpdateCustomActionRequest {
  name?: string;
  displayName?: string;
  description?: string;
  parameters?: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
    }>;
    required?: string[];
  };
  endpoint?: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
  };
  credentials?: Record<string, string>;
  responseMapping?: {
    successPath?: string;
    errorPath?: string;
    transform?: string;
  };
  aiProcessing?: {
    enabled: boolean;
    prompt: string;
    parameters: {
      type: 'object';
      properties: Record<string, {
        type: string;
        description: string;
      }>;
      required?: string[];
    };
  };
}

export interface CustomActionQuery extends PaginationQuery {
  status?: ActiveStatus;
}

// Additional type exports for frontend use
export type CustomActionParameter = {
  type: string;
  description: string;
};

export type CustomActionEndpoint = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
};

export type CustomActionCredentials = Record<string, string>;

export type CustomActionResponseMapping = {
  successPath?: string;
  errorPath?: string;
  transform?: string;
};
