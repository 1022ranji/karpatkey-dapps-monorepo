import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Blockchain</CustomTypography>

interface BlockchainAutocompleteProps {
  name: string
  control: any
  options: any
}

const RenderOption = (props: any, option: any) => {
  return (
    <Box
      component="span"
      sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: '#F5F5F5' }}
      {...props}
    >
      <Image src={option.logo || ''} alt={option.label} width={20} height={20} />
      {option.label}
    </Box>
  )
}

export default function BlockchainAutocomplete(props: BlockchainAutocompleteProps) {
  return <CustomAutocomplete {...props} renderOption={RenderOption} label={<Label />} />
}
