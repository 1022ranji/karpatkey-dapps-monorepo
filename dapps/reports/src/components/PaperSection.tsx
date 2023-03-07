import CustomTypography from '@/src/components/CustomTypography'
import Paper from '@/src/components/Paper'
import Divider from '@mui/material/Divider'
import * as React from 'react'

interface IPaperSection {
  title: string
  children: React.ReactNode
}

const PaperSection = (props: IPaperSection) => {
  const { title, children } = props
  return (
    <Paper sx={{ padding: 4, marginTop: 4 }}>
      <CustomTypography color="textSecondary" variant="h5" textAlign="left">
        {title}
      </CustomTypography>
      <Divider sx={{ marginY: 2 }} />
      {children}
    </Paper>
  )
}

export default PaperSection
