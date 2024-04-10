import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import * as React from 'react'

export const UniswapHelpText = () => {
  return (
    <Tooltip
      title="For UniswapV3, unclaimed fees are shown as unclaimed rewards"
      sx={{ ml: 1, cursor: 'pointer' }}
      enterTouchDelay={0}
    >
      <InfoIcon />
    </Tooltip>
  )
}
