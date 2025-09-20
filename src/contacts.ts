// Contact Types - Multi-channel identifier support
export interface ContactIdentifiers {
  email: string[];
  phone: string[];
  whatsapp: Array<{
    phone: string;
  }>;
  instagram: Array<{
    username: string;
  }>;
  facebook: Array<{
    username: string;
  }>;
  telegram: Array<{
    username?: string;
  }>;
}

export interface Contact {
  id: string;
  appId: string;
  companyId: string;

  // Basic identification
  name: string;
  picture?: string;
  tags: string[];

  // Multi-channel identifiers
  identifiers: ContactIdentifiers;

  // Relationships
  customerId?: string;

  // Assignment system integration
  assigneeId?: string;
  teamId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  picture?: string;
  tags?: string[];
  identifiers: Partial<ContactIdentifiers>;
  customerId?: string;
  assigneeId?: string;
  teamId?: string;
}

export interface UpdateContactRequest {
  name?: string;
  picture?: string;
  tags?: string[];
  identifiers?: Partial<ContactIdentifiers>;
  customerId?: string;
  assigneeId?: string;
  teamId?: string;
}

export type ContactResponse = Contact;

export interface ContactQuery extends PaginationQuery {
  filters?: {
    name?: string;
    email?: string;
    phone?: string;
    whatsappLid?: string;
    instagramId?: string;
    facebookId?: string;
    telegramId?: string;
    customerId?: string;
    tags?: string[];
    assigneeId?: string;
    teamId?: string;
  };
}

export interface ContactListResponse extends ListResponse<ContactResponse> {}

// Import types
import { PaginationQuery, ListResponse } from './common';