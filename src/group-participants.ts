// Group Participants Types - Participantes de grupos
import { PaginationQuery, ListResponse } from './common';

export interface GroupParticipant {
  id: string;
  appId: string;
  companyId: string;

  // Relationship
  groupId: string;

  // Participant info
  participantType: 'customer' | 'contact' | 'user';
  participantId: string;
  role: 'admin' | 'member';

  // Metadata
  joinedAt: string;
  addedBy?: string;
  leftAt?: string;        // Soft delete

  // Dates
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

export interface GroupParticipantListResponse extends ListResponse<GroupParticipantResponse> {}
