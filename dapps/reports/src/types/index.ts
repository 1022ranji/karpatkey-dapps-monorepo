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
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  fundsByProtocol: any[]
  balanceOverviewType: any[]
  balanceOverviewBlockchain: any[]
  rowsTreasuryVariation: any[]
  rowsHistoricVariation: any[]
  rowsTreasuryVariationForThePeriodDetail: any[]
  totalFarmingResultsFarmSwaps: number
  farmingFundsByProtocol: any[]
  farmingResultsDetailsByProtocol: any[]
}

export type ReportProps = ReportData & Filter

// TODO improve types without the use of "any"
export type FormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
