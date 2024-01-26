import { Dashboard, InitialState } from './state'
import {
  Actions,
  ActionType,
  UpdateDAO,
  UpdateDashboard,
  UpdateMonth,
  UpdateReport,
  UpdateYear
} from './actions'

export const mainReducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    default:
      return state
  }
}

// Helper functions to simplify the caller
export const updateDAO = (DAO: number): UpdateDAO => ({
  type: ActionType.UpdateDAO,
  payload: DAO
})

export const updateYear = (year: number): UpdateYear => ({
  type: ActionType.UpdateYear,
  payload: year
})

export const updateMonth = (month: number): UpdateMonth => ({
  type: ActionType.UpdateMonth,
  payload: month
})

export const updateDashboard = (dashboard: Dashboard): UpdateDashboard => ({
  type: ActionType.UpdateDashboard,
  payload: dashboard
})

export const updateReport = (report: any): UpdateReport => ({
  type: ActionType.UpdateReport,
  payload: report
})
