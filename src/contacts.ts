// Contact Types - Multi-channel identifier support
export interface ContactIdentifiers {
  email: string[];
  phone: string[];
  whatsapp: Array<{
    lid: string;
    phone: string;
  }>;
  instagram: Array<{
    id: string;
    username: string;
  }>;
  facebook: Array<{
    id: string;
    username: string;
  }>;
  telegram: Array<{
    id: string;
    username?: string;
  }>;
}

export interface Contact {
  _id?: string;
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

  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  picture?: string;
  tags?: string[];
  identifiers: Partial<ContactIdentifiers>;
  customerId?: string;
}

export interface UpdateContactRequest {
  name?: string;
  picture?: string;
  tags?: string[];
  identifiers?: Partial<ContactIdentifiers>;
  customerId?: string;
}

export interface ContactResponse extends Omit<Contact, '_id'> {
  id: string;
}

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
  };
}

export interface ContactListResponse extends ListResponse<ContactResponse> {}

// Import types
import { PaginationQuery, ListResponse } from './common';