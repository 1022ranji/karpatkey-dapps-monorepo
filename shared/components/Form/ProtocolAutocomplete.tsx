import * as React from 'react'
import { CustomAutocomplete } from 'shared/components/CustomAutocomplete'
import CustomTypography from 'shared/components/CustomTypography'

const Label = () => <CustomTypography variant="filterTextRenderInput">Protocol</CustomTypography>

interface ProtocolAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function ProtocolAutocomplete(props: ProtocolAutocompleteProps) {
  return <CustomAutocomplete {...props} label={<Label />} />
}
