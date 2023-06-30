import { Section } from '@karpatkey-monorepo/reports/src/components/Layout/Sidebar'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import { Divider } from '@mui/material'
import * as React from 'react'

interface PaperSectionProps {
  id?: Section
  title?: Section
  subTitle?: string
  filter?: React.ReactNode
  children: React.ReactNode
}

const PaperSection = (props: PaperSectionProps) => {
  const { id, title, subTitle, filter, children } = props
  return (
    <Paper className={'scrollable'} {...(id ? { id: slugify(id) } : {})}>
      <Divider />
      <BoxWrapperColumn sx={{ marginX: '30px', marginY: '30px' }} gap={3}>
        {title ? (
          <CustomTypography variant="paperSectionTitle" textAlign="left">
            {title}
          </CustomTypography>
        ) : null}
        {subTitle || filter ? (
          <BoxWrapperRow
            sx={{
              ...(subTitle ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' })
            }}
          >
            {subTitle ? (
              <CustomTypography variant="paperSectionSubtitle">{subTitle}</CustomTypography>
            ) : null}
            {filter ? filter : null}
          </BoxWrapperRow>
        ) : null}
        {children}
      </BoxWrapperColumn>
    </Paper>
  )
}

export default PaperSection
