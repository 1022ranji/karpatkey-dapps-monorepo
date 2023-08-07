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
  const isProduction = domainName.includes('karpatkey')
  const options = isProduction ? [{ label: 'July', id: 7 }] : MONTHS
  return <CustomAutocomplete {...props} options={options} label={<Label />} />
}
