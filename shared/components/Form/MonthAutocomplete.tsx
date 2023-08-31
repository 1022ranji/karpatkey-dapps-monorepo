import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Month</CustomTypography>

interface MonthAutocompleteProps {
  name: string
  control: any
}

export default function MonthAutocomplete(props: MonthAutocompleteProps) {
  // TODO: remove this when filter refactor is ready
  const domainName = window.location.hostname
  // TODO: this should be done with an env variable
  const isProduction = domainName.includes('reports.karpatkey.com')
  const options = isProduction ? [{ label: 'July', id: 7 }] : MONTHS
  return <CustomAutocomplete {...props} options={options} label={<Label />} />
}
