import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'

interface InfoCardProps {
  title: string
  value: string
  helpInfo?: string
}

const InfoCard = ({ title, value, helpInfo }: InfoCardProps) => {
  return (
    <BoxWrapperColumn
      sx={{
        minWidth: 'max-content',
        width: 'max-content',
        gap: 2
      }}
    >
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
            <InfoIcon sx={{ fontSize: 24, cursor: 'pointer' }} />
          </Tooltip>
        ) : null}
      </BoxWrapperRow>
      <CustomTypography variant={'infoCardValue'}>{value}</CustomTypography>
    </BoxWrapperColumn>
  )
}

export default InfoCard
