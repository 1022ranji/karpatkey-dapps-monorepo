import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Token</CustomTypography>

interface TokenAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function TokenAutocomplete(props: TokenAutocompleteProps) {
  return <CustomAutocomplete {...props} label={<Label />} />
}
