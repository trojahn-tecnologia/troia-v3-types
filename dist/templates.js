"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCategory = exports.TemplateStatus = void 0;
/**
 * Template Status Lifecycle
 */
var TemplateStatus;
(function (TemplateStatus) {
    TemplateStatus["DRAFT"] = "draft";
    TemplateStatus["PENDING_APPROVAL"] = "pending_approval";
    TemplateStatus["APPROVED"] = "approved";
    TemplateStatus["REJECTED"] = "rejected";
    TemplateStatus["ARCHIVED"] = "archived"; // Arquivado (não usado mais)
})(TemplateStatus || (exports.TemplateStatus = TemplateStatus = {}));
/**
 * Template Category (WhatsApp requirement)
 */
var TemplateCategory;
(function (TemplateCategory) {
    TemplateCategory["MARKETING"] = "MARKETING";
    TemplateCategory["UTILITY"] = "UTILITY";
    TemplateCategory["AUTHENTICATION"] = "AUTHENTICATION"; // OTP, verification
})(TemplateCategory || (exports.TemplateCategory = TemplateCategory = {}));
