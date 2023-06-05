import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Protocol</CustomTypography>

interface ProtocolAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function ProtocolAutocomplete(props: ProtocolAutocompleteProps) {
  return <CustomAutocomplete {...props} label={<Label />} />
}
