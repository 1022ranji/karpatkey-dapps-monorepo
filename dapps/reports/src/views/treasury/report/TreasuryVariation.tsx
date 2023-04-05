import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicWaterfall = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Waterfall')
)

const TreasuryVariation: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <DynamicWaterfall />
    </Box>
  )
}

export default TreasuryVariation
