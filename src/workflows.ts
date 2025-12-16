import { ObjectId } from 'mongodb';

// ============================================================
// WORKFLOW TYPES
// ============================================================

/**
 * Node Types - All supported node types for workflows
 */
export type WorkflowNodeType =
  // Triggers
  | 'trigger_webhook'
  | 'trigger_schedule'
  | 'trigger_event'
  | 'trigger_manual'
  | 'trigger_date_field'
  | 'trigger_inactivity'
  // Actions
  | 'action_send_message'
  | 'action_send_email'
  | 'action_http_request'
  | 'action_query_database'
  | 'action_create_lead'
  | 'action_update_contact'
  | 'action_assign'
  | 'action_set_variable'
  | 'action_create_conversation'
  // Controls
  | 'control_if'
  | 'control_switch'
  | 'control_delay'
  | 'control_loop'
  // AI
  | 'ai_agent'
  | 'ai_processor';

/**
 * Workflow Status
 */
export type WorkflowStatus = 'active' | 'inactive' | 'draft' | 'archived';

/**
 * Execution Status
 */
export type WorkflowExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

/**
 * Node Execution Status
 */
export type NodeExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

// ============================================================
// NODE CONFIGURATION INTERFACES
// ============================================================

/**
 * Filter Condition - Standard format for workflow filters
 * Used by triggers and conditions to filter entities
 */
export interface FilterCondition {
  /** Field path to evaluate (e.g., "status", "lead.step", "{{contact.tags}}") */
  field: string;
  /** Comparison operator */
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'is_empty' | 'is_not_empty';
  /** Value to compare against */
  value: any;
}

/**
 * Webhook Trigger Configuration
 */
export interface WebhookTriggerConfig {
  webhookId?: string;
  secret?: string;
  validatePayload?: boolean;
}

/**
 * Schedule Trigger Configuration (Cron)
 */
export interface ScheduleTriggerConfig {
  cronExpression: string;
  timezone?: string;
}

/**
 * Event Trigger Configuration
 */
export interface EventTriggerConfig {
  eventType: WorkflowEventType;
  filters?: FilterCondition[];
}

/**
 * Date Field Entity Types - All supported entity types for date field triggers
 */
export type DateFieldEntityType = 'contact' | 'lead' | 'ticket' | 'conversation' | 'event';

/**
 * Date Fields Map - Maps each entity type to its valid date fields
 * This ensures type-safety when configuring date field triggers
 *
 * IMPORTANT: When adding new date fields to entities, update this map!
 */
export interface DateFieldsMap {
  contact: 'createdAt' | 'updatedAt' | 'lastInteractionAt' | 'birthDate' | 'lastContactedAt';
  lead: 'createdAt' | 'updatedAt' | 'assignedAt' | 'wonDate' | 'lostDate' | 'lastInteractionAt' | 'lastFollowUpAt' | 'lastStepAt' | 'expectedCloseDate' | 'lastActivityAt';
  ticket: 'createdAt' | 'updatedAt' | 'assignedAt' | 'dueDate' | 'firstResponseAt' | 'lastResponseAt' | 'resolvedAt' | 'closedAt' | 'slaBreachTime';
  conversation: 'createdAt' | 'updatedAt' | 'startedAt' | 'closedAt' | 'lastMessageAt' | 'lastMessageFromCustomer' | 'lastMessageFromAgent' | 'assignedAt';
  event: 'startTime' | 'endTime' | 'createdAt' | 'updatedAt';
}

/**
 * Helper type to extract valid date fields for a specific entity type
 */
export type ValidDateFieldsFor<T extends DateFieldEntityType> = DateFieldsMap[T];

/**
 * Date Field Trigger Configuration (Type-Safe with Generics)
 *
 * Uses generics to ensure type-safety between entityType and dateField.
 * TypeScript will enforce that dateField is a valid date field for the specified entity.
 *
 * @example
 * // Type-safe configuration:
 * const config: DateFieldTriggerConfig<'event'> = {
 *   entityType: 'event',
 *   dateField: 'startTime', // ✅ Valid - only 'startTime' | 'endTime' | 'createdAt' | 'updatedAt' allowed
 *   offsetValue: 1,
 *   offsetUnit: 'hours',
 *   offsetDirection: 'before'
 * };
 *
 * // This would cause a TypeScript error:
 * const badConfig: DateFieldTriggerConfig<'event'> = {
 *   entityType: 'event',
 *   dateField: 'startDate', // ❌ Error: 'startDate' is not assignable to 'startTime' | 'endTime' | ...
 *   ...
 * };
 */
export interface DateFieldTriggerConfig<T extends DateFieldEntityType> {
  entityType: T;
  dateField: ValidDateFieldsFor<T>;
  /** Numeric value for the offset (0 or greater) */
  offsetValue: number;
  /** Unit for the offset */
  offsetUnit: 'minutes' | 'hours' | 'days';
  offsetDirection: 'before' | 'after';
  filters?: FilterCondition[];
}

/**
 * Union type of all valid date field trigger configs
 * Use this when you need to accept any valid configuration without specifying entity type
 */
export type AnyDateFieldTriggerConfig =
  | DateFieldTriggerConfig<'contact'>
  | DateFieldTriggerConfig<'lead'>
  | DateFieldTriggerConfig<'ticket'>
  | DateFieldTriggerConfig<'conversation'>
  | DateFieldTriggerConfig<'event'>;

/**
 * Inactivity Trigger Configuration
 */
export interface InactivityTriggerConfig {
  entityType: 'conversation' | 'contact' | 'lead';
  inactivityPeriod: number; // The numeric value (interpreted based on periodUnit)
  periodUnit?: 'seconds' | 'minutes' | 'hours' | 'days'; // default: 'seconds' for backward compatibility
  inactivityField: string; // e.g., 'lastMessageAt', 'updatedAt'
  filters?: FilterCondition[];
  maxTriggersPerEntity?: number; // default: 1
  resetOnActivity?: boolean; // default: true
}

/**
 * Send Message Action Configuration
 */
export interface SendMessageActionConfig {
  conversationId?: string;
  contactId?: string;
  channelId?: string;
  message: string;
  messageType?: 'text' | 'template';
  templateId?: string;
  templateVariables?: Record<string, string>;
}

/**
 * Send Email Action Configuration
 */
export interface SendEmailActionConfig {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
  templateVariables?: Record<string, string>;
}

/**
 * HTTP Request Action Configuration
 */
export interface HttpRequestActionConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string | Record<string, any>;
  timeout?: number;
  retryAttempts?: number;
}

/**
 * Query Database Action Configuration
 */
export interface QueryDatabaseActionConfig {
  collection: string;
  operation: 'find' | 'findOne' | 'count' | 'aggregate';
  query: Record<string, any>;
  outputVariable?: string;
}

/**
 * Create Lead Action Configuration
 */
export interface CreateLeadActionConfig {
  contactId?: string;
  funnelId?: string;
  step?: string;
  description?: string;
  value?: number;
  assignToUserId?: string;
}

/**
 * Update Contact Action Configuration
 */
export interface UpdateContactActionConfig {
  contactId?: string;
  addTags?: string[];
  removeTags?: string[];
  customFields?: Record<string, any>;
}

/**
 * Assign Action Configuration
 */
export interface AssignActionConfig {
  resourceType: 'ticket' | 'conversation' | 'lead';
  resourceId?: string;
  userId?: string;
  teamId?: string;
  strategy?: 'round_robin' | 'least_busy' | 'random' | 'specific_user';
}

/**
 * Set Variable Action Configuration
 */
export interface SetVariableActionConfig {
  variable: string;
  value: any;
  expression?: string;
}

/**
 * Create Conversation Action Configuration
 *
 * Creates a new conversation or returns an existing active/waiting conversation
 * for the specified contact. This action is essential for workflows that start
 * from non-conversation triggers (e.g., date field triggers on calendar events)
 * and need to establish a conversation context for AI Agents or messaging actions.
 *
 * The conversation is automatically added to the workflow context after creation,
 * making it available for subsequent nodes that require a conversation.
 */
export interface CreateConversationActionConfig {
  /**
   * Source type for the contact ID.
   * - 'context': Extract from workflow context (contact, event, lead)
   * - 'specific': Use a specific contact ID configured in the node
   * @default 'context'
   */
  contactSourceType?: 'context' | 'specific';

  /**
   * Contact ID to create conversation for.
   * Required when contactSourceType is 'specific'.
   */
  contactId?: string;

  /**
   * Optional channel ID to use for the conversation.
   * If not provided, the system will use the default channel for the contact.
   * Can be a context reference like {{event.channelId}}.
   */
  channelId?: string;

  /**
   * Optional variable name to store the created conversation.
   * If provided, the conversation will be stored in context.variables[outputVariable].
   * The conversation is always added to context.conversation regardless of this setting.
   */
  outputVariable?: string;
}

/**
 * IF Control Configuration
 */
export interface IfControlConfig {
  condition: string;
  operator?: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
  value?: any;
}

/**
 * Switch Control Configuration
 */
export interface SwitchControlConfig {
  field: string;
  cases: Array<{
    value: any;
    label?: string;
  }>;
  defaultCase?: boolean;
}

/**
 * Delay Control Configuration
 */
export interface DelayControlConfig {
  duration: number;
  unit: 'seconds' | 'minutes' | 'hours' | 'days';
}

/**
 * Loop Control Configuration
 */
export interface LoopControlConfig {
  items?: string; // Variable name containing array
  maxIterations?: number;
  condition?: string;
}

/**
 * AI Agent Node Configuration
 *
 * Executes an existing AI Agent with its own configured tools.
 * The agent uses its own capabilities, customActionIds, and databases.
 */
export interface AIAgentNodeConfig {
  /** ID of the AI Agent to execute */
  agentId: string;
  /** Context type - defaults to 'conversation' for workflow usage */
  contextType?: 'conversation' | 'contact' | 'lead';
  /** Optional context entity ID (usually derived from workflow context) */
  contextId?: string;
  /** Optional custom prompt to override agent's default */
  customPrompt?: string;
  /** Whether to wait for agent response before continuing workflow */
  waitForResponse?: boolean;
}

/**
 * AI Processor Node Configuration
 *
 * A standalone AI processor that receives tools from connected workflow nodes.
 * Unlike AI Agent, this node doesn't reference an existing agent - it defines
 * its own prompt, model, and receives tools via the 'tools' targetHandle.
 *
 * Use this when you want the AI to have access to specific workflow actions
 * without creating a full AI Agent entity.
 */
export interface AIProcessorNodeConfig {
  /** System prompt defining the AI's behavior */
  systemPrompt: string;
  /** Model to use (defaults to configured provider's default) */
  model?: string;
  /** Temperature for response generation (0-2, default: 0.7) */
  temperature?: number;
  /** Maximum tokens for response */
  maxTokens?: number;
  /** Context type - defaults to 'conversation' */
  contextType?: 'conversation' | 'contact' | 'lead';
  /** Optional context entity ID */
  contextId?: string;
  /** Whether to wait for AI response before continuing workflow */
  waitForResponse?: boolean;
  /**
   * IDs of workflow nodes connected as tools (via 'tools' targetHandle).
   * These are automatically populated by the WorkflowExecutor when
   * processing edges with targetHandle='tools'.
   * Action nodes connected here become available tools for the AI processor.
   */
  toolNodeIds?: string[];
}

/**
 * Node Configuration - Union of all config types
 */
export type NodeConfig =
  | WebhookTriggerConfig
  | ScheduleTriggerConfig
  | EventTriggerConfig
  | AnyDateFieldTriggerConfig
  | InactivityTriggerConfig
  | SendMessageActionConfig
  | SendEmailActionConfig
  | HttpRequestActionConfig
  | QueryDatabaseActionConfig
  | CreateLeadActionConfig
  | UpdateContactActionConfig
  | AssignActionConfig
  | SetVariableActionConfig
  | IfControlConfig
  | SwitchControlConfig
  | DelayControlConfig
  | LoopControlConfig
  | AIAgentNodeConfig
  | AIProcessorNodeConfig
  | Record<string, any>;

// ============================================================
// WORKFLOW DEFINITION
// ============================================================

/**
 * Workflow Node Position
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Workflow Node Data
 */
export interface WorkflowNodeData {
  label: string;
  description?: string;
  config: NodeConfig;
}

/**
 * Workflow Node
 */
export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: NodePosition;
  data: WorkflowNodeData;
}

/**
 * Workflow Edge
 */
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  condition?: string;
}

/**
 * Workflow Definition
 */
/**
 * Viewport configuration for React Flow
 */
export interface WorkflowViewport {
  x: number;
  y: number;
  zoom: number;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables?: Record<string, any>;
  version?: number;
  viewport?: WorkflowViewport;
}

// ============================================================
// WORKFLOW FOLDER
// ============================================================

/**
 * Workflow Folder Entity (Database Document)
 */
export interface WorkflowFolder {
  _id?: ObjectId;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: ObjectId;
  order?: number;
  appId: ObjectId;
  companyId: ObjectId;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * Workflow Folder Response (API Response)
 */
export interface WorkflowFolderResponse extends Omit<WorkflowFolder, '_id' | 'parentId' | 'appId' | 'companyId' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  id: string;
  parentId?: string;
  appId: string;
  companyId: string;
  workflowCount?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

/**
 * Create Workflow Folder Request
 */
export interface CreateWorkflowFolderRequest {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  order?: number;
}

/**
 * Update Workflow Folder Request
 */
export interface UpdateWorkflowFolderRequest {
  name?: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  parentId?: string | null;
  order?: number;
}

/**
 * Workflow Folder Query Parameters
 */
export interface WorkflowFolderQuery {
  page?: number;
  limit?: number;
  search?: string;
  parentId?: string | null;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Workflow Folder List Response (Paginated)
 */
export interface WorkflowFolderListResponse {
  items: WorkflowFolderResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================
// WORKFLOW ENTITY
// ============================================================

/**
 * Workflow Entity (Database Document)
 */
export interface Workflow {
  _id?: ObjectId;
  name: string;
  description?: string;
  status: WorkflowStatus;
  definition: WorkflowDefinition;
  folderId?: ObjectId;
  /** Environment where this workflow was created (development, production, etc.) */
  environment?: string;
  appId: ObjectId;
  companyId: ObjectId;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * Workflow Response (API Response)
 */
export interface WorkflowResponse extends Omit<Workflow, '_id' | 'folderId' | 'appId' | 'companyId' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  id: string;
  folderId?: string;
  appId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// ============================================================
// WORKFLOW EXECUTION
// ============================================================

/**
 * Node Execution Record
 */
export interface NodeExecution {
  nodeId: string;
  nodeType: WorkflowNodeType;
  status: NodeExecutionStatus;
  startedAt: Date;
  completedAt?: Date;
  input?: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  duration?: number;
}

/**
 * Workflow Execution Entity (Database Document)
 */
export interface WorkflowExecution {
  _id?: ObjectId;
  workflowId: ObjectId;
  workflowName?: string;
  status: WorkflowExecutionStatus;
  triggerType: WorkflowNodeType;
  triggerData?: Record<string, any>;
  context: Record<string, any>;
  variables: Record<string, any>;
  nodeExecutions: NodeExecution[];
  currentNodeId?: string;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  duration?: number;
  /** Indicates if this execution was triggered via test mode (for tracking/audit purposes only) */
  isTest?: boolean;
  appId: ObjectId;
  companyId: ObjectId;
}

/**
 * Workflow Execution Response (API Response)
 */
export interface WorkflowExecutionResponse extends Omit<WorkflowExecution, '_id' | 'workflowId' | 'appId' | 'companyId' | 'nodeExecutions' | 'startedAt' | 'completedAt'> {
  id: string;
  workflowId: string;
  appId: string;
  companyId: string;
  nodeExecutions: Array<Omit<NodeExecution, 'startedAt' | 'completedAt'> & {
    startedAt: string;
    completedAt?: string;
  }>;
  startedAt: string;
  completedAt?: string;
}

// ============================================================
// WORKFLOW TRIGGER COUNTS
// ============================================================

/**
 * Workflow Trigger Count (for inactivity triggers)
 */
export interface WorkflowTriggerCount {
  _id?: ObjectId;
  workflowId: ObjectId;
  entityType: 'conversation' | 'contact' | 'lead';
  entityId: string;
  triggerCount: number;
  lastTriggeredAt: Date;
  resetAt?: Date;
  appId: ObjectId;
  companyId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Workflow Trigger Count Response
 */
export interface WorkflowTriggerCountResponse extends Omit<WorkflowTriggerCount, '_id' | 'workflowId' | 'appId' | 'companyId' | 'lastTriggeredAt' | 'resetAt' | 'createdAt' | 'updatedAt'> {
  id: string;
  workflowId: string;
  appId: string;
  companyId: string;
  lastTriggeredAt: string;
  resetAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// WORKFLOW EVENTS
// ============================================================

/**
 * Workflow Event Types
 */
export type WorkflowEventType =
  // Messages
  | 'message.received'
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  // Conversations
  | 'conversation.created'
  | 'conversation.updated'
  | 'conversation.closed'
  | 'conversation.reopened'
  | 'conversation.assigned'
  | 'conversation.inactive'
  // Contacts
  | 'contact.created'
  | 'contact.updated'
  | 'contact.deleted'
  | 'contact.tag_added'
  | 'contact.tag_removed'
  | 'contact.birthday'
  | 'contact.inactive'
  // Leads
  | 'lead.created'
  | 'lead.updated'
  | 'lead.stage_changed'
  | 'lead.won'
  | 'lead.lost'
  | 'lead.inactive'
  // Tickets
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.status_changed'
  | 'ticket.assigned'
  | 'ticket.resolved'
  | 'ticket.closed'
  // Calendar Events
  | 'calendar_event.created'
  | 'calendar_event.updated'
  | 'calendar_event.cancelled'
  // Webhooks
  | 'webhook.received'
  // Custom
  | 'custom.event';

/**
 * Workflow Event
 */
export interface WorkflowEvent {
  type: WorkflowEventType;
  data: Record<string, any>;
  metadata?: Record<string, any>;
  appId: string;
  companyId: string;
  workflowId?: string;
  executionId?: string;
  timestamp: Date;
}

// ============================================================
// API REQUESTS
// ============================================================

/**
 * Create Workflow Request
 */
export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  status?: WorkflowStatus;
  definition: WorkflowDefinition;
  folderId?: string;
  /** Environment where this workflow is being created (auto-set by backend if not provided) */
  environment?: string;
}

/**
 * Update Workflow Request
 */
export interface UpdateWorkflowRequest {
  name?: string;
  description?: string;
  status?: WorkflowStatus;
  definition?: WorkflowDefinition;
  folderId?: string | null;
}

/**
 * Workflow Query Parameters
 */
export interface WorkflowQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: WorkflowStatus;
  folderId?: string | null;
  /** Filter workflows by environment */
  environment?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Workflow Execution Query Parameters
 */
export interface WorkflowExecutionQuery {
  page?: number;
  limit?: number;
  workflowId?: string;
  status?: WorkflowExecutionStatus;
  triggerType?: WorkflowNodeType;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Trigger Workflow Request
 */
export interface TriggerWorkflowRequest {
  workflowId: string;
  triggerData?: Record<string, any>;
  variables?: Record<string, any>;
}

// ============================================================
// WORKFLOW EXECUTION CONTEXT
// ============================================================

/**
 * Execution Context - Available to all nodes during execution
 */
export interface WorkflowExecutionContext {
  workflowId: string;
  executionId: string;
  appId: string;
  companyId: string;
  triggerType: WorkflowNodeType;
  triggerData: Record<string, any>;
  variables: Record<string, any>;
  metadata: Record<string, any>;
  // Entity references
  conversation?: {
    id: string;
    contactId?: string;
    channelId?: string;
    agentId?: string;
    status?: string;
  };
  contact?: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    tags?: string[];
  };
  lead?: {
    id: string;
    contactId?: string;
    funnelId?: string;
    step?: string;
    value?: number;
  };
  ticket?: {
    id: string;
    subject?: string;
    status?: string;
    priority?: string;
    assigneeId?: string;
  };
  event?: {
    id: string;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    attendees?: string[];
  };
}

// ============================================================
// NODE HANDLER INTERFACES
// ============================================================

/**
 * Node Handler Result
 */
export interface NodeHandlerResult {
  success: boolean;
  output?: Record<string, any>;
  error?: string;
  nextNodes?: string[];
  skipRemaining?: boolean;
}

/**
 * Node Handler Interface
 */
export interface INodeHandler {
  nodeType: WorkflowNodeType;
  execute(
    node: WorkflowNode,
    context: WorkflowExecutionContext
  ): Promise<NodeHandlerResult>;
  validate?(node: WorkflowNode): boolean | string;
}

// ============================================================
// WORKFLOW BUILDER TYPES (Frontend)
// ============================================================

/**
 * Node Category
 */
export type NodeCategory = 'triggers' | 'actions' | 'controls' | 'ai';

/**
 * Node Palette Item
 */
export interface NodePaletteItem {
  type: WorkflowNodeType;
  category: NodeCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultConfig: Partial<NodeConfig>;
}

/**
 * Workflow Builder State
 */
export interface WorkflowBuilderState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  isDirty: boolean;
  isValid: boolean;
  validationErrors: string[];
}

/**
 * Workflow Validation Result
 */
export interface WorkflowValidationResult {
  isValid: boolean;
  errors: Array<{
    nodeId?: string;
    edgeId?: string;
    message: string;
    severity: 'error' | 'warning';
  }>;
}
