import { PaginationQuery, ListResponse, GenericQueryOptions, ActiveStatus } from './common';
/**
 * Email Templates Types
 * Used for email template management system
 */
export interface EmailTemplateQuery extends PaginationQuery {
    status?: ActiveStatus;
    templateType?: string;
    level?: 'system' | 'app' | 'company';
    companyId?: string;
    isActive?: boolean;
    isDefault?: boolean;
}
export interface EmailTemplateResponse {
    appId: string;
    companyId?: string;
    templateType: string;
    level: 'system' | 'app' | 'company';
    subject: string;
    htmlContent: string;
    textContent?: string;
    name: string;
    description?: string;
    isActive: boolean;
    isDefault: boolean;
    requiredVariables: string[];
    optionalVariables: string[];
    brandingConfig?: {
        primaryColor?: string;
        secondaryColor?: string;
        logoUrl?: string;
        companyName?: string;
        footerText?: string;
    };
    createdAt: string;
    updatedAt: string;
}
export interface EmailTemplateListResponse extends ListResponse<EmailTemplateResponse> {
}
export interface EmailTemplateQueryOptions extends GenericQueryOptions<EmailTemplateQuery> {
}
export interface CreateEmailTemplateRequest {
    templateType: string;
    subject: string;
    htmlContent: string;
    textContent?: string;
    name: string;
    description?: string;
    isActive?: boolean;
    isDefault?: boolean;
    requiredVariables?: string[];
    optionalVariables?: string[];
    brandingConfig?: {
        primaryColor?: string;
        secondaryColor?: string;
        logoUrl?: string;
        companyName?: string;
        footerText?: string;
    };
}
export interface UpdateEmailTemplateRequest {
    subject?: string;
    htmlContent?: string;
    textContent?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    isDefault?: boolean;
    requiredVariables?: string[];
    optionalVariables?: string[];
    brandingConfig?: {
        primaryColor?: string;
        secondaryColor?: string;
        logoUrl?: string;
        companyName?: string;
        footerText?: string;
    };
}
export interface RenderTemplateRequest {
    templateType: string;
    templateData: Record<string, any>;
    companyId?: string;
}
export interface TemplateTypeResponse {
    type: string;
    name: string;
    description: string;
    defaultVariables: {
        required: string[];
        optional: string[];
    };
}
export interface RenderedTemplateResponse {
    subject: string;
    html: string;
    text?: string;
}
