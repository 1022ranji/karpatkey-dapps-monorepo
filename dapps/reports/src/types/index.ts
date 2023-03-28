export type TReportFilter = {
  chainId: NetworkId
  daoAddress: string
  period: string
  periodType: PeriodType
}

export type TReportData = {
  data: any[]
}

export type TReportProps = TReportData & TReportFilter

export type TTitleProps = {
  chainId: NetworkId
  periodType: PeriodType
  daoAddress: string
}

export type TFormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
