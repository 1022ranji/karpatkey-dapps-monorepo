import * as React from 'react'
import { CustomAutocomplete, CustomTypography } from 'src/components'

const Label = () => <CustomTypography variant="filterTextRenderInput">Protocol</CustomTypography>

interface ProtocolAutocompleteProps {
  name: string
  control: any
  options: any
}

export const ProtocolAutocomplete = (props: ProtocolAutocompleteProps) => {
  return <CustomAutocomplete {...props} label={<Label />} />
}
