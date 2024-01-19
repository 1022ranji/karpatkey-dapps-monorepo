export type Filter = {
  dao: Maybe<number>
  month: Maybe<number>
  year: Maybe<number>
}

// TODO: improve types without the use of "any"
export type ReportData = {
  metrics: any
  daoResume: any
  report: any
}

export type ReportProps = ReportData & Filter

// TODO improve types without the use of "any"
export type FormProps = {
  name: string
  control: any
  onChange?: (value: any) => void
}
