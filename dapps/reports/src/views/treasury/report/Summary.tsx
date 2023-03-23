import PieChart from '@karpatkey-monorepo/reports/src/components/Charts/Pie'
import { TReportData } from '@karpatkey-monorepo/reports/src/types'
import Box from '@mui/material/Box'
import * as React from 'react'

const Summary = (props: TReportData) => {
  const { summaryData } = props
  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <PieChart data={summaryData} />
    </Box>
  )
}

export default Summary
