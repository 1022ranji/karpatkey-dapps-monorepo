import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import { Divider } from '@mui/material'
import * as React from 'react'
import BoxWrapperColumn from 'shared/components/Wrappers/BoxWrapperColumn'

interface PaperSectionProps {
  title: string
  children: React.ReactNode
}

const PaperSection = (props: PaperSectionProps) => {
  const { title, children } = props
  return (
    <Paper>
      <Divider />
      <BoxWrapperColumn sx={{ marginX: '30px', marginY: '30px' }}>
        <CustomTypography
          id={slugify(title)}
          className={'scrollable'}
          variant="paperSectionTitle"
          textAlign="left"
        >
          {title}
        </CustomTypography>
        <BoxWrapperColumn>{children}</BoxWrapperColumn>
      </BoxWrapperColumn>
    </Paper>
  )
}

export default PaperSection
