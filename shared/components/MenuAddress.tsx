import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { getNameByDAOName } from '@karpatkey-monorepo/shared/utils'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Tooltip } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type TAddressProps = {
  daoName: DAO_NAME
}

const MenuAddress = (props: TAddressProps) => {
  const { daoName } = props

  const onCopyName = () => {
    console.log('Copy dao name', daoName)
  }

  const name = getNameByDAOName(daoName)

  return (
    <CopyToClipboard text={daoName} onCopy={onCopyName}>
      <Tooltip title="Open DAO name">
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
            {name}
          </CustomTypography>
        </Box>
      </Tooltip>
    </CopyToClipboard>
  )
}

export default MenuAddress
