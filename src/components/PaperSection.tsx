import InfoIcon from '@mui/icons-material/Info'
import { Divider, Tooltip } from '@mui/material'
import * as React from 'react'
import { Section } from './layout/report/Sidebar'
import { CustomTypography, Paper, BoxWrapperRow, BoxWrapperColumn } from 'src/components'
import { slugify } from 'src/utils'

interface PaperSectionProps {
  id?: Section
  title?: Section
  subTitle?: string
  helpInfo?: string
  filter?: React.ReactNode
  children: React.ReactNode
}

export const PaperSection = (props: PaperSectionProps) => {
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
