import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import { Divider } from '@mui/material'
import * as React from 'react'

interface PaperSectionProps {
  title: string
  children: React.ReactNode
}

const PaperSection = (props: PaperSectionProps) => {
  const { title, children } = props
  return (
    <Paper>
      <Divider />
      <BoxWrapperColumn sx={{ marginX: '30px', marginY: '30px' }} gap={4}>
        <CustomTypography id={slugify(title)} variant="paperSectionTitle" textAlign="left">
          {title}
        </CustomTypography>
        <BoxWrapperColumn>{children}</BoxWrapperColumn>
      </BoxWrapperColumn>
    </Paper>
  )
}

export default PaperSection
