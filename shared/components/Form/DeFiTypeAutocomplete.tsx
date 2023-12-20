import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Type</CustomTypography>

interface DeFiTypeAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function DeFiTypeAutocomplete(props: DeFiTypeAutocompleteProps) {
  return <CustomAutocomplete {...props} label={<Label />} />
}
