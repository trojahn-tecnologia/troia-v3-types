"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Common types
__exportStar(require("./common"), exports);
// Core modules
__exportStar(require("./app"), exports);
__exportStar(require("./companies"), exports);
__exportStar(require("./user"), exports);
__exportStar(require("./modules"), exports);
__exportStar(require("./plans"), exports);
__exportStar(require("./levels"), exports);
__exportStar(require("./company-plans"), exports);
__exportStar(require("./user-permissions"), exports);
// Business modules
__exportStar(require("./teams"), exports);
__exportStar(require("./channels"), exports);
__exportStar(require("./shifts"), exports);
__exportStar(require("./company-integrations"), exports);
__exportStar(require("./assignment"), exports);
__exportStar(require("./app-integrations"), exports);
__exportStar(require("./email-templates"), exports);
// Provider system (shared between app & company integrations)
__exportStar(require("./providers"), exports);
// Communication system
__exportStar(require("./communications"), exports);
// Payment system
__exportStar(require("./payments"), exports);
__exportStar(require("./saved-cards"), exports);
// Customer service modules
__exportStar(require("./contacts"), exports);
__exportStar(require("./customers"), exports);
__exportStar(require("./leads"), exports);
// Phase 2: Advanced customer service modules
__exportStar(require("./tickets"), exports);
__exportStar(require("./conversations"), exports);
__exportStar(require("./conversation-messages"), exports);
__exportStar(require("./activities"), exports);
