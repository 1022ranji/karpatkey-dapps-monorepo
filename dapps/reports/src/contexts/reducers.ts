import { Report, Currency, Dashboard, initialState, InitialState } from './state'
import {
  Actions,
  ActionType,
  UpdateDAO,
  UpdateDashboard,
  UpdateMonth,
  UpdateReport,
  UpdateYear,
  ClearState,
  UpdateCurrency
} from './actions'

export const mainReducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case ActionType.UpdateDAO:
      return {
        ...state,
        DAO: action.payload
      }
    case ActionType.UpdateYear:
      return {
        ...state,
        year: action.payload
      }
    case ActionType.UpdateMonth:
      return {
        ...state,
        month: action.payload
      }
    case ActionType.UpdateDashboard:
      return {
        ...state,
        dashboard: action.payload
      }
    case ActionType.UpdateReport:
      return {
        ...state,
        report: action.payload
      }
    case ActionType.ClearState:
      return {
        ...state,
        ...initialState
      }
    case ActionType.UpdateCurrency:
      return {
        ...state,
        currency: action.payload
      }
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

export const updateReport = (report: Report): UpdateReport => ({
  type: ActionType.UpdateReport,
  payload: report
})

export const clearState = (): ClearState => ({
  type: ActionType.ClearState
})

export const updateCurrency = (currency: Currency): UpdateCurrency => ({
  type: ActionType.UpdateCurrency,
  payload: currency
})
