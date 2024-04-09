import * as React from 'react'
import { CustomAutocomplete, CustomTypography } from 'src/components'

const Label = () => <CustomTypography variant="filterTextRenderInput">Token</CustomTypography>

interface TokenAutocompleteProps {
  name: string
  control: any
  options: any
}

export const TokenAutocomplete = (props: TokenAutocompleteProps) => {
  return <CustomAutocomplete {...props} label={<Label />} />
}
