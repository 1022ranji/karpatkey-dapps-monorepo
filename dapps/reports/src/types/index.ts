export type TReportFilter = {
  daoName: DAO_NAME
  period: string
  periodType: PeriodType
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
}

export type TReportProps = TReportData & TReportFilter

export type TTitleProps = {
  periodType: PeriodType
  daoName: DAO_NAME
}

// TODO improve types without the use of "any"
export type TFormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
