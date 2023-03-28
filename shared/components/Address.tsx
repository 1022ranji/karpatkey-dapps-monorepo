import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { getNetworkExplorerURLByDAOAddress, shortenAddress } from '@karpatkey-monorepo/shared/utils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Tooltip } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type TAddressProps = {
  address: string
}

const Address = (props: TAddressProps) => {
  const { address } = props

  const explorerURL = React.useMemo(() => getNetworkExplorerURLByDAOAddress(address), [address])
  const onCopyExplorerURL = () => {
    window.open(explorerURL, '_blank')
  }

  const onCopyAddress = () => {
    console.log('Copy address', address)
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
      <CustomTypography ellipsis color="textSecondary" variant="body1">
        Address: {shortenAddress(address)}
      </CustomTypography>
      <Box display="flex" gap={1}>
        <CopyToClipboard text={address} onCopy={onCopyAddress}>
          <Tooltip title="Copy Address">
            <ContentCopyIcon fontSize="medium" sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </CopyToClipboard>
        <CopyToClipboard text={explorerURL} onCopy={onCopyExplorerURL}>
          <Tooltip title="Open address in block explorer">
            <OpenInNewIcon fontSize="medium" sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </CopyToClipboard>
      </Box>
    </Box>
  )
}

export default Address
