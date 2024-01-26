import { Dashboard, Report } from './state'

export enum ActionType {
  UpdateDAO,
  UpdateYear,
  UpdateMonth,
  UpdateDashboard,
  UpdateReport
}

export interface UpdateDAO {
  type: ActionType.UpdateDAO
  payload: number
}

export interface UpdateYear {
  type: ActionType.UpdateYear
  payload: number
}

export interface UpdateMonth {
  type: ActionType.UpdateMonth
  payload: number
}

export interface UpdateDashboard {
  type: ActionType.UpdateDashboard
  payload: Dashboard
}

export interface UpdateReport {
  type: ActionType.UpdateReport
  payload: Report
}

export type Actions = UpdateDAO | UpdateYear | UpdateMonth | UpdateDashboard | UpdateReport
