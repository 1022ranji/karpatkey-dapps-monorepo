declare type Maybe<T> = T | null

declare type ComponentProps = {
  children?: React.ReactNode
}

declare type NetworkId = 0 | 1 | 100

declare enum NetworkIds {
  ALL = 0,
  ETHEREUM = 1,
  GNOSIS = 100,
}

declare interface DAO {
  addresses: string[]
  name: string
  icon: string
  keyName: DAO_NAME
}

declare interface Network {
  DAOs: DAO[]
}

declare enum PeriodTime {
  YEAR = 'year',
  WEEK = 'week',
  MONTH = 'month',
  DAY = 'day'
}

declare type PeriodType = `${PeriodTime}`

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare type Report =
  'getDailyBalanceReports'
  | 'getTreasuryFinancialMetrics'
  | 'getTokens'
  | 'getTreasuryVariationMetricsDetail'
  | 'getTreasuryFinancialPositions'

declare type DAO_NAME =
  'GnosisDAO'
  | 'Gnosis LTD'
  | 'BalancerDAO'
  | 'ENS'
  | 'CowDAO'
  | 'Karpatkey'
  | 'Gnosis Guild'
  | 'None'
