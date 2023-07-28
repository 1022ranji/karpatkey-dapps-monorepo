import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import * as React from 'react'

const UniswapHelpText = () => {
  return (
    <Tooltip
      title="For UniswapV3, unclaimed fees are shown as unclaimed rewards"
      sx={{ ml: 1, cursor: 'pointer' }}
    >
      <InfoIcon />
    </Tooltip>
  )
}

export default UniswapHelpText
