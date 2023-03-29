import Divider from '@mui/material/Divider'
import * as React from 'react'

import CustomTypography from './CustomTypography'
import Paper from './Paper'

interface IPaperSection {
  title: string
  children: React.ReactNode
}

const PaperSection = (props: IPaperSection) => {
  const { title, children } = props
  return (
    <Paper sx={{ paddingY: 3 }}>
      <CustomTypography color="textSecondary" variant="h5" textAlign="left">
        {title}
      </CustomTypography>
      <Divider sx={{ marginY: 2 }} />
      {children}
    </Paper>
  )
}

export default PaperSection
