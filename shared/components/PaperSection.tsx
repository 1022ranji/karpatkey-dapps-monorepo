import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import { Divider } from '@mui/material'
import { styled } from '@mui/material'
import * as React from 'react'

const SpanHidden = styled('span')({
  display: 'block',
  position: 'relative',
  top: '-110px',
  visibility: 'hidden'
})

interface PaperSectionProps {
  title: string
  children: React.ReactNode
}

const PaperSection = (props: PaperSectionProps) => {
  const { title, children } = props
  return (
    <Paper>
      <Divider />
      <BoxWrapperColumn sx={{ marginX: '30px', marginTop: '30px', marginBottom: '30px' }} gap={2}>
        <SpanHidden id={slugify(title)} />
        <CustomTypography variant="paperSectionTitle" textAlign="left">
          {title}
        </CustomTypography>
        <BoxWrapperColumn>{children}</BoxWrapperColumn>
      </BoxWrapperColumn>
    </Paper>
  )
}

export default PaperSection
