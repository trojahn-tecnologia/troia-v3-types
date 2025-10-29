"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingType = exports.AudienceType = exports.CampaignStatus = void 0;
/**
 * Campaign Status
 */
var CampaignStatus;
(function (CampaignStatus) {
    CampaignStatus["DRAFT"] = "draft";
    CampaignStatus["SCHEDULED"] = "scheduled";
    CampaignStatus["IN_PROGRESS"] = "in_progress";
    CampaignStatus["PAUSED"] = "paused";
    CampaignStatus["COMPLETED"] = "completed";
    CampaignStatus["FAILED"] = "failed";
    CampaignStatus["CANCELLED"] = "cancelled";
})(CampaignStatus || (exports.CampaignStatus = CampaignStatus = {}));
/**
 * Audience Type - Tipo de audiência da campanha
 */
var AudienceType;
(function (AudienceType) {
    AudienceType["LEADS"] = "leads";
    AudienceType["CUSTOMERS"] = "customers";
    AudienceType["GROUPS"] = "groups";
    AudienceType["MANUAL"] = "manual"; // Lista manual de IDs
})(AudienceType || (exports.AudienceType = AudienceType = {}));
/**
 * Scheduling Type - Tipo de agendamento
 */
var SchedulingType;
(function (SchedulingType) {
    SchedulingType["IMMEDIATE"] = "immediate";
    SchedulingType["SCHEDULED"] = "scheduled";
    SchedulingType["RECURRING"] = "recurring"; // Enviar periodicamente
})(SchedulingType || (exports.SchedulingType = SchedulingType = {}));
