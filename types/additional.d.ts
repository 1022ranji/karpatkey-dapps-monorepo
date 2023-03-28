declare type Maybe<T> = T | null

type ComponentProps = {
  children?: React.ReactNode
}

type NetworkId = 0 | 1 | 100

enum NetworkIds {
  ALL = 0,
  ETHEREUM = 1,
  GNOSIS = 100,
}

interface DAO {
  address: string
  name: string
  icon: string
  keyName: string
}

interface Network {
  DAOs: DAO[]
}

enum PeriodTime {
  YEAR = 'year',
  WEEK = 'week',
  MONTH = 'month',
  DAY = 'day'
}

type PeriodType = `${PeriodTime}`

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

type Report = 'getDailyBalanceReports' | 'getTreasuryFinancialMetrics' | 'getTokens' | 'getTreasuryVariationMetricsDetail'
