import { Section } from '@karpatkey-monorepo/reports/src/components/Layout/Sidebar'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import InfoIcon from '@mui/icons-material/Info'
import { Divider } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'

interface PaperSectionProps {
  id?: Section
  title?: Section
  subTitle?: string
  helpInfo?: string
  filter?: React.ReactNode
  children: React.ReactNode
}

const PaperSection = (props: PaperSectionProps) => {
  const { id, title, subTitle, helpInfo, filter, children } = props
  return (
    <Paper className={'scrollable'} {...(id ? { id: slugify(id) } : {})}>
      <Divider />
      <BoxWrapperColumn sx={{ marginX: '30px', marginY: '30px' }} gap={3}>
        {title ? (
          <BoxWrapperRow gap={2} sx={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            <CustomTypography variant="paperSectionTitle" textAlign="left">
              {title}
            </CustomTypography>
            {helpInfo ? (
              <Tooltip
                title={
                  <CustomTypography variant="body1" sx={{ color: 'common.white' }}>
                    {helpInfo}
                  </CustomTypography>
                }
                sx={{ ml: 1, cursor: 'pointer' }}
              >
                <InfoIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
              </Tooltip>
            ) : null}
          </BoxWrapperRow>
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
