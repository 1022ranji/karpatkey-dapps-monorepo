import * as React from 'react'
import { CustomAutocomplete, CustomTypography } from 'src/components'

const Label = () => <CustomTypography variant="filterTextRenderInput">Type</CustomTypography>

interface DeFiTypeAutocompleteProps {
  name: string
  control: any
  options: any
}

export const DeFiTypeAutocomplete = (props: DeFiTypeAutocompleteProps) => {
  return <CustomAutocomplete {...props} label={<Label />} />
}
