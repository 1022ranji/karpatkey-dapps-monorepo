import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { shortenAddress } from '@karpatkey-monorepo/shared/utils'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Tooltip } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type TAddressProps = {
  address: string
}

const MenuAddress = (props: TAddressProps) => {
  const { address } = props

  const onCopyAddress = () => {
    console.log('Copy address', address)
  }

  return (
    <CopyToClipboard text={address} onCopy={onCopyAddress}>
      <Tooltip title="Copy DAO address">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{ cursor: 'pointer' }}
        >
          <CircleIcon color="success" fontSize="large" sx={{ width: 27, height: 27 }} />
          <CustomTypography ellipsis color="textSecondary" variant="body1">
            {shortenAddress(address)}
          </CustomTypography>
        </Box>
      </Tooltip>
    </CopyToClipboard>
  )
}

export default MenuAddress
