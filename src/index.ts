// Common types
export * from './common';

// Core modules
export * from './app';
export * from './companies';
export * from './user';
export * from './modules';
export * from './plans';
export * from './levels';
export * from './company-plans';
export * from './user-permissions';

// Business modules
export * from './teams';
export * from './channels';
export * from './shifts';
export * from './skills';
export * from './company-integrations';
export * from './assignment';
export * from './app-integrations';
export * from './email-templates';

// Provider system (shared between app & company integrations)
export * from './providers';
export * from './gateway';

// Queue system (shared between Backend & Gateway)
export * from './queue-jobs';

// Validation utilities (shared between Gateway & Backend)
export * from './validation';

// Communication system
export * from './communications';

// Socket.IO Events (shared between Frontend & Backend)
export * from './socket-events';

// Payment system
export * from './payments';
export * from './saved-cards';

// Customer service modules
export * from './contacts';
export * from './customers';
export * from './leads';
export * from './funnels';

// Phase 2: Advanced customer service modules
export * from './tickets';
export * from './conversations';
export * from './conversation-messages';
export * from './activities';

// Group conversation support
export * from './groups';
export * from './group-participants';