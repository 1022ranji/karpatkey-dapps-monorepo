import { Divider } from '@mui/material'
import * as React from 'react'

import BoxWrapperColumn from './BoxWrapperColumn'
import CustomTypography from './CustomTypography'
import Paper from './Paper'

interface IPaperSection {
  title?: string
  children: React.ReactNode
}

const PaperSection = (props: IPaperSection) => {
  const { title, children } = props
  return (
    <Paper>
      {title && (
        <CustomTypography color="textSecondary" variant="h5" textAlign="left">
          {title}
        </CustomTypography>
      )}
      <Divider sx={{ marginY: 2 }} />
      <BoxWrapperColumn>{children}</BoxWrapperColumn>
    </Paper>
  )
}

export default PaperSection
