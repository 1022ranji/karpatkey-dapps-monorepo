export type Filter = {
  dao: Maybe<number>
  month: Maybe<number>
  year: Maybe<number>
}

// TODO: improve types without the use of "any"
export type ReportData = {
  totalFunds: number
  capitalUtilization: number
  farmingResults: number
  globalROI: number
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  fundsByProtocol: any[]
  balanceOverviewType: any[]
  balanceOverviewBlockchain: any[]
  treasuryVariationData: any[]
  historicVariationData: any[]
  treasuryVariationForThePeriodDetailData: any[]
  totalFarmingResultsFarmSwaps: number
  farmingFundsByProtocol: any[]
  farmingResultsDetailsByProtocol: any[]
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
  tokenDetailByPosition: any[]
  walletTokenDetail: any[]
  daoResume: any[]
  nonCustodialAum: number
  lastMonthFarmingResults: number
  latestMonth: number
}

export type ReportProps = ReportData & Filter

// TODO improve types without the use of "any"
export type FormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
