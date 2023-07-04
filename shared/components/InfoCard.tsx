import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'

interface InfoCardProps {
  title: string
  value: string
  helpInfo?: string
}

const InfoCard = ({ title, value, helpInfo }: InfoCardProps) => {
  return (
    <Paper
      sx={{
        minWidth: 'max-content',
        width: '100%'
      }}
    >
      <BoxWrapperColumn gap={2}>
        <BoxWrapperRow gap={2} sx={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <CustomTypography variant={'infoCardTitle'}>{title}</CustomTypography>
          {helpInfo ? (
            <Tooltip
              title={
                <CustomTypography variant="body2" sx={{ color: 'common.white' }}>
                  {helpInfo}
                </CustomTypography>
              }
              sx={{ ml: 1, cursor: 'pointer' }}
            >
              <HelpCenterIcon sx={{ fontSize: 24 }} />
            </Tooltip>
          ) : null}
        </BoxWrapperRow>

        <CustomTypography variant={'infoCardValue'}>{value}</CustomTypography>
      </BoxWrapperColumn>
    </Paper>
  )
}

export default InfoCard
