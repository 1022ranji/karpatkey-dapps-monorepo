declare type Maybe<T> = T | null

declare type ComponentProps = {
  children?: React.ReactNode
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare type Report =
  | 'getDailyBalanceReports'
  | 'getTreasuryFinancialMetrics'
  | 'getTokens'
  | 'getTreasuryVariationMetricsDetail'
  | 'getTreasuryFinancialPositions'
  | 'getTreasuryHistoricVariation'
  | 'getFinancialMetricAndVarDetail'
  | 'getOurDAOTreasury'
  | 'getTreasuryFinancialMetricsWaterfall'
  | 'getWaterfall1Report'
  | 'getTotalFundsByTokenCategory'

declare type DAO_NAME =
  | 'Gnosis DAO'
  | 'Gnosis LTD'
  | 'Balancer DAO'
  | 'ENS DAO'
  | 'CoW DAO'
  | 'karpatkey DAO'
  | 'Gnosis Guild'
  | 'Lido'
  | 'Aave DAO'
