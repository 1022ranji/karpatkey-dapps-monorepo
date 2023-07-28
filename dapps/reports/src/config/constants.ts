export const DAO_DEFAULT = Number(process.env.REACT_DAO_DEFAULT || 5)

export const GOOGLE_PROJECT_ID = process.env.REACT_GOOGLE_PROJECT_ID
export const GOOGLE_CREDS = {
  client_id: process.env.REACT_GOOGLE_CLIENT_ID,
  client_email: process.env.REACT_GOOGLE_CLIENT_EMAIL,
  project_id: GOOGLE_PROJECT_ID,
  private_key: process.env?.REACT_GOOGLE_PRIVATE_KEY?.replace(new RegExp('\\\\n', 'g'), '\n')
}

export const DATA_WAREHOUSE_ENV = process.env.REACT_DATA_WAREHOUSE_ENV || 'production'
export const PASSWORD_PROTECT = process.env.PASSWORD_PROTECT

export const UNISWAP_PROTOCOL = 'UniswapV3'
