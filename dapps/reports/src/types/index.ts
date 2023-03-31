export type TReportFilter = {
  daoName: DAO_NAME
  period: string
  periodType: PeriodType
}

export type TReportData = {
  summary: any[]
  totalFunds: number
  capitalUtilization: number
  farmingResults: number
}

export type TReportProps = TReportData & TReportFilter

export type TTitleProps = {
  periodType: PeriodType
  daoName: DAO_NAME
}

export type TFormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
