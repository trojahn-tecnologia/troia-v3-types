import { PaginationQuery, ListResponse } from './common';
export interface GroupParticipant {
    id: string;
    appId: string;
    companyId: string;
    groupId: string;
    participantType: 'customer' | 'contact' | 'user';
    participantId: string;
    role: 'admin' | 'member';
    joinedAt: string;
    addedBy?: string;
    leftAt?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateGroupParticipantRequest {
    groupId: string;
    participantType: 'customer' | 'contact' | 'user';
    participantId: string;
    role?: 'admin' | 'member';
    addedBy?: string;
}
export interface UpdateGroupParticipantRequest {
    role?: 'admin' | 'member';
}
export type GroupParticipantResponse = GroupParticipant;
export interface GroupParticipantQuery extends PaginationQuery {
    filters?: {
        groupId?: string;
        participantType?: 'customer' | 'contact' | 'user';
        participantId?: string;
        role?: 'admin' | 'member';
    };
}
export interface GroupParticipantListResponse extends ListResponse<GroupParticipantResponse> {
}
