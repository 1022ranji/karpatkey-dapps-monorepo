import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Blockchain</CustomTypography>

interface BlockchainAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function BlockchainAutocomplete(props: BlockchainAutocompleteProps) {
  return <CustomAutocomplete {...props} label={<Label />} />
}
