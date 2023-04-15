export const NETWORK_DEFAULT = (process.env.REACT_NETWORK_DEFAULT || 0) as TNetworkId
export const DAO_NAME_DEFAULT = (process.env.REACT_DAO_NAME_DEFAULT || 'Karpatkey') as TDAO_Name

export const PERIOD_TYPE_DEFAULT = (process.env.REACT_PERIOD_TYPE_DEFAULT || 'month') as TPeriodType
export const GOOGLE_PROJECT_ID = process.env.REACT_GOOGLE_PROJECT_ID
export const GOOGLE_CREDS = {
  client_id: process.env.REACT_GOOGLE_CLIENT_ID,
  client_email: process.env.REACT_GOOGLE_CLIENT_EMAIL,
  project_id: GOOGLE_PROJECT_ID,
  private_key: process.env?.REACT_GOOGLE_PRIVATE_KEY?.replace(new RegExp('\\\\n', 'g'), '\n')
}
