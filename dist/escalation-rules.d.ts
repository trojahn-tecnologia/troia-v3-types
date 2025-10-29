import { ObjectId } from 'mongodb';
import { ActiveStatus, PaginationQuery } from './common';
export interface AgentEscalationRule {
    _id?: ObjectId;
    id?: string;
    name: string;
    description?: string;
    assigneeType: 'team' | 'user';
    assigneeId: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    escalationDelay?: number;
    notifyAssignee: boolean;
    notificationChannels?: ('email' | 'sms' | 'push')[];
    appId: ObjectId | string;
    companyId: ObjectId | string;
    status: ActiveStatus;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string;
}
export interface AgentEscalationRuleResponse extends Omit<AgentEscalationRule, '_id'> {
    id: string;
}
export interface CreateAgentEscalationRuleRequest {
    name: string;
    description?: string;
    assigneeType: 'team' | 'user';
    assigneeId: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    escalationDelay?: number;
    notifyAssignee?: boolean;
    notificationChannels?: ('email' | 'sms' | 'push')[];
}
export interface UpdateAgentEscalationRuleRequest {
    name?: string;
    description?: string;
    assigneeType?: 'team' | 'user';
    assigneeId?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    escalationDelay?: number;
    notifyAssignee?: boolean;
    notificationChannels?: ('email' | 'sms' | 'push')[];
}
export interface AgentEscalationRuleQuery extends PaginationQuery {
    status?: ActiveStatus;
    assigneeType?: 'team' | 'user';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
}
