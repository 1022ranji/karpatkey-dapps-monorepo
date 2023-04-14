export type TReportFilter = {
  daoName: TDAO_Name
  period: string
  periodType: TPeriodType
}

// TODO: improve types without the use of "any"
export type TReportData = {
  summary: any[]
  totalFunds: number
  capitalUtilization: number
  farmingResults: number
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  fundsByProtocol: any[]
  balanceOverviewType: any[]
  balanceOverviewBlockchain: any[]
  rowsTreasuryVariation: any[]
  rowsHistoricVariation: any[]
  rowsTreasuryVariationForThePeriodDetail: any[]
  totalFarmingFunds: number
  rowsFarmingFundsByProtocol: any[]
  rowsFarmingFundsByProtocolTotals: {
    fundsTotal: number
    unclaimedTotal: number
    resultsTotal: number
  }
  rowsFarmingResultsDetailsByProtocol: any[]
  rowsFarmingResultsDetailsByProtocolTotals: {
    rewardsTotal: number
    feesTotal: number
    total: number
  }
}

export type TReportProps = TReportData & TReportFilter

export type TTitleProps = {
  periodType: TPeriodType
  daoName: TDAO_Name
}

// TODO improve types without the use of "any"
export type TFormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
