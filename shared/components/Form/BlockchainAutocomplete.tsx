import * as React from 'react'
import { CustomAutocomplete } from 'shared/components/CustomAutocomplete'
import CustomTypography from 'shared/components/CustomTypography'

const Label = () => <CustomTypography variant="filterTextRenderInput">Blockchain</CustomTypography>

interface BlockchainAutocompleteProps {
  name: string
  control: any
  options: any
}

export default function BlockchainAutocomplete(props: BlockchainAutocompleteProps) {
  return <CustomAutocomplete {...props} label={<Label />} />
}
