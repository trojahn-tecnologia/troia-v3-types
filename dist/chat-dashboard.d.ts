/**
 * Chat Dashboard Types
 * Tipos para dashboard de estatísticas de atendimento
 */
export interface ChatDashboardResponse {
    totals: DashboardTotals;
    teams: TeamStatsResponse[];
    individualUsers: UserStatsResponse[];
}
export interface DashboardTotals {
    newMessages: number;
    inProgress: number;
    waiting: number;
    returned: number;
}
export interface TeamStatsResponse {
    id: string;
    name: string;
    newMessages: number;
    inProgress: number;
    waiting: number;
    returned: number;
    users: UserStatsResponse[];
}
export interface UserStatsResponse {
    id: string;
    name: string;
    picture?: string;
    newMessages: number;
    inProgress: number;
    waiting: number;
    returned: number;
}
export interface DashboardStatsQuery {
    teamId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
}
