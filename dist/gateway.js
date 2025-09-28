"use strict";
// ============================================================================
// GATEWAY PROVIDER TYPES
// Types specific to Gateway WhatsApp integration
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayErrorType = void 0;
/**
 * Gateway Provider Error Types
 * Specific error types for Gateway provider
 */
var GatewayErrorType;
(function (GatewayErrorType) {
    GatewayErrorType["INSTANCE_NOT_FOUND"] = "INSTANCE_NOT_FOUND";
    GatewayErrorType["INSTANCE_NOT_CONNECTED"] = "INSTANCE_NOT_CONNECTED";
    GatewayErrorType["INVALID_TOKEN"] = "INVALID_TOKEN";
    GatewayErrorType["GATEWAY_UNREACHABLE"] = "GATEWAY_UNREACHABLE";
    GatewayErrorType["WEBHOOK_FAILED"] = "WEBHOOK_FAILED";
    GatewayErrorType["MESSAGE_SEND_FAILED"] = "MESSAGE_SEND_FAILED";
    GatewayErrorType["TIMEOUT"] = "TIMEOUT";
})(GatewayErrorType || (exports.GatewayErrorType = GatewayErrorType = {}));
