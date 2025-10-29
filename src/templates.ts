import { ObjectId } from 'mongodb';

/**
 * Template Status Lifecycle
 */
export enum TemplateStatus {
  DRAFT = 'draft',                     // Em edição, não aprovado
  PENDING_APPROVAL = 'pending_approval', // Enviado para aprovação (WhatsApp)
  APPROVED = 'approved',               // Aprovado (pronto para uso)
  REJECTED = 'rejected',               // Rejeitado pelo provider
  ARCHIVED = 'archived'                // Arquivado (não usado mais)
}

/**
 * Template Category (WhatsApp requirement)
 */
export enum TemplateCategory {
  MARKETING = 'MARKETING',             // Promotional messages
  UTILITY = 'UTILITY',                 // Transactional updates
  AUTHENTICATION = 'AUTHENTICATION'    // OTP, verification
}

/**
 * Template Variable Definition
 * Variables use numeric positions ({{1}}, {{2}}, {{3}}) for Meta compliance
 */
export interface TemplateVariable {
  position: number;          // 1, 2, 3, ... (sequencial, começando em 1)
  label: string;             // 'Nome do Cliente', 'Nome da Empresa' (UX-friendly)
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;
  example: string;           // 'João Silva', 'Empresa XYZ' (para preview e aprovação Meta)
  description?: string;

  // Validation rules
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;        // Regex pattern
    enum?: string[];         // Allowed values
  };
}

/**
 * WhatsApp Template Component (Meta format)
 */
export interface WhatsAppTemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'LOCATION';
  text?: string;             // Com placeholders {{1}}, {{2}}, etc.

  // Examples required for approval
  example?: {
    header_text?: string[];
    body_text?: string[][];  // Array de arrays (variáveis por linha)
  };

  // Buttons (Call-to-action ou Quick Reply)
  buttons?: Array<{
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
    text: string;
    url?: string;            // Para URL buttons
    phone_number?: string;   // Para PHONE buttons
  }>;
}

/**
 * WhatsApp Official Template Config (Requires Meta approval)
 */
export interface WhatsAppOfficialTemplateConfig {
  providerType: 'whatsapp_business';

  // Template ID returned by Meta after approval
  providerTemplateId?: string;  // Null até ser aprovado

  // WhatsApp template structure
  category: TemplateCategory;
  language: string;             // 'pt_BR', 'en_US', etc.

  // Components (Meta format)
  components: WhatsAppTemplateComponent[];

  // Approval metadata
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  submittedAt?: Date;
  approvedAt?: Date;
}

/**
 * Gateway Template Config (Free format - no approval)
 */
export interface GatewayTemplateConfig {
  providerType: 'whatsapp_gateway';

  // MessageContent structure
  messageData: {
    type: 'text' | 'media' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact';
    message?: string;  // Text content with {{1}}, {{2}}, etc.

    // Media fields
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'audio' | 'document';
    caption?: string;
    filename?: string;

    // Location fields
    location?: {
      latitude: number;
      longitude: number;
      name?: string;
      address?: string;
    };

    // Contact fields
    contact?: {
      name: string;
      phone?: string;
      email?: string;
    };
  };
}

/**
 * Email Template Config (HTML + Plain Text)
 */
export interface EmailTemplateConfig {
  providerType: 'email_smtp' | 'email_sendgrid';

  // Email structure
  subject: string;          // Com {{1}}, {{2}}, etc.
  htmlBody: string;         // HTML completo com {{1}}, {{2}}, etc.
  plainTextBody?: string;   // Fallback text com {{1}}, {{2}}, etc.

  // Attachments (optional)
  attachments?: Array<{
    filename: string;
    url: string;
    contentType: string;
  }>;

  // Sender configuration
  fromName?: string;        // Custom sender name
  replyTo?: string;         // Reply-to address
}

/**
 * Instagram/Facebook Template Config
 */
export interface InstagramTemplateConfig {
  providerType: 'instagram_direct' | 'facebook_messenger';

  // Message structure
  messageData: {
    text?: string;          // Com {{1}}, {{2}}, etc.

    // Media attachment
    attachment?: {
      type: 'image' | 'video' | 'audio' | 'file';
      url: string;
    };

    // Quick replies (Instagram/Facebook)
    quick_replies?: Array<{
      content_type: 'text';
      title: string;
      payload?: string;
    }>;
  };
}

/**
 * Provider-Specific Configuration Types
 */
export type TemplateProviderConfig =
  | WhatsAppOfficialTemplateConfig
  | GatewayTemplateConfig
  | EmailTemplateConfig
  | InstagramTemplateConfig;

/**
 * Template Submission Request (para envio ao provider)
 */
export interface TemplateSubmissionRequest {
  name: string;                              // Template name
  category: TemplateCategory;                // MARKETING | UTILITY | AUTHENTICATION
  language: string;                          // pt_BR, en_US, etc.
  components: WhatsAppTemplateComponent[];   // Template structure
}

/**
 * Template Submission Response (retorno do provider)
 */
export interface TemplateSubmissionResponse {
  success: boolean;
  providerTemplateId?: string;               // ID do template no WhatsApp
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  message?: string;
  error?: string;
}

/**
 * Template Status Update (webhook do WhatsApp)
 */
export interface TemplateStatusUpdate {
  providerTemplateId: string;                // ID do template no WhatsApp
  status: 'APPROVED' | 'REJECTED';
  reason?: string;                           // Rejection reason (se rejeitado)
  approvedAt?: string;
  rejectedAt?: string;
}

/**
 * Main Template Document
 */
export interface Template {
  _id?: ObjectId;
  appId: ObjectId;
  companyId: ObjectId;

  // Basic Information
  name: string;
  description?: string;
  status: TemplateStatus;

  // Provider Configuration
  providerId: ObjectId;                 // Which provider this template is for
  channelId: ObjectId;                  // Which channel this template is for (Channel → Integration)
  providerConfig: TemplateProviderConfig; // Provider-specific config

  // Variables (numeric format: {{1}}, {{2}}, {{3}}...)
  variables: TemplateVariable[];

  // Metadata
  usageCount: number;        // Times this template was used
  lastUsedAt?: Date;

  // Audit
  createdBy: ObjectId;       // userId
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * API Response Type (no ObjectId exposure)
 */
export interface TemplateResponse extends Omit<Template, '_id' | 'appId' | 'companyId' | 'providerId' | 'channelId' | 'createdBy'> {
  id: string;
  appId: string;
  companyId: string;
  providerId: string;
  channelId: string;
  createdBy: string;
}

/**
 * Create Template Request
 */
export interface CreateTemplateRequest {
  name: string;
  description?: string;
  providerId: string;
  channelId: string;        // ✅ NOVO: Vínculo com Channel (Channel → Integration → Credentials)
  providerConfig: TemplateProviderConfig;
  variables: TemplateVariable[];
}

/**
 * Update Template Request
 */
export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  providerConfig?: TemplateProviderConfig;
  variables?: TemplateVariable[];
}

/**
 * Template Query Filters
 */
export interface TemplateQuery {
  status?: TemplateStatus | TemplateStatus[];
  providerId?: string;
  providerType?: string;    // 'whatsapp_business', 'email_smtp', etc.
  search?: string;          // Search in name/description

  // Pagination
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'usageCount' | 'lastUsedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Template List Response
 */
export interface TemplateListResponse {
  items: TemplateResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Template Preview Request (with sample data)
 */
export interface TemplatePreviewRequest {
  templateId: string;
  sampleData: Record<number, string | number | boolean>; // {1: 'João', 2: 'Empresa XYZ'}
}

/**
 * Template Preview Response
 */
export interface TemplatePreviewResponse {
  providerId: string;
  providerType: string;

  // Rendered content (with variables replaced)
  rendered: {
    // For WhatsApp Official
    components?: WhatsAppTemplateComponent[];

    // For Gateway
    messageData?: any;

    // For Email
    subject?: string;
    htmlBody?: string;
    plainTextBody?: string;

    // For Instagram/Facebook
    text?: string;
    attachment?: any;
  };

  // Variables used and their values
  variablesUsed: Record<number, string | number | boolean>;
}

/**
 * Submit Template for Approval Request (WhatsApp only)
 */
export interface SubmitTemplateApprovalRequest {
  templateId: string;
}

/**
 * Template Approval Status Response
 */
export interface TemplateApprovalStatusResponse {
  templateId: string;
  status: 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  providerTemplateId?: string;
  rejectionReason?: string;
  submittedAt?: Date;
  approvedAt?: Date;
}
