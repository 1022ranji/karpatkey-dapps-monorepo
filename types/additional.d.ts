declare type TMaybe<T> = T | null

declare type TComponentProps = {
  children?: React.ReactNode
}

declare type TNetworkId = 0 | 1 | 100

declare enum ENetworkIds {
  ALL = 0,
  ETHEREUM = 1,
  GNOSIS = 100,
}

declare interface IDAO {
  addresses: string[]
  name: string
  icon: string
  keyName: DAO_NAME
}

declare interface INetwork {
  DAOs: DAO[]
}

declare enum EPeriodTime {
  YEAR = 'year',
  WEEK = 'week',
  MONTH = 'month',
  DAY = 'day'
}

declare type TPeriodType = `${EPeriodTime}`

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare type TReport =
  'getDailyBalanceReports'
  | 'getTreasuryFinancialMetrics'
  | 'getTokens'
  | 'getTreasuryVariationMetricsDetail'
  | 'getTreasuryFinancialPositions'
  | 'getTreasuryHistoricVariation'

declare type TDAO_Name =
  'GnosisDAO'
  | 'Gnosis LTD'
  | 'BalancerDAO'
  | 'ENS'
  | 'CowDAO'
  | 'Karpatkey'
  | 'Gnosis Guild'
  | 'None'
