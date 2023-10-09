import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { MONTHS, MONTHS_ALLOWED } from '@karpatkey-monorepo/shared/config/constants'
import * as React from 'react'
import { isProductionCheckingDomainName } from '@karpatkey-monorepo/shared/utils'

const Label = () => <CustomTypography variant="filterTextRenderInput">Month</CustomTypography>

interface MonthAutocompleteProps {
  name: string
  control: any
}

export default function MonthAutocomplete(props: MonthAutocompleteProps) {
  const options = isProductionCheckingDomainName() ? MONTHS_ALLOWED : MONTHS
  return <CustomAutocomplete {...props} options={options} label={<Label />} />
}
