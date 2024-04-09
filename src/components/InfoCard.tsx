import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { CustomTypography, BoxWrapperRow, BoxWrapperColumn } from 'src/components'

interface InfoCardProps {
  title: string
  value: string
  helpInfo?: string
}

export const InfoCard = ({ title, value, helpInfo }: InfoCardProps) => {
  return (
    <BoxWrapperColumn
      sx={{
        minWidth: 'max-content',
        width: 'max-content',
        gap: {
          xs: 1,
          md: 2
        }
      }}
    >
      <BoxWrapperRow gap={2} sx={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
        <CustomTypography variant={'infoCardTitle'} sx={{ fontSize: { xs: '16px', md: '18px' } }}>
          {title}
        </CustomTypography>
        {helpInfo ? (
          <Tooltip
            title={
              <CustomTypography variant="body2" sx={{ color: 'common.white' }}>
                {helpInfo}
              </CustomTypography>
            }
            enterTouchDelay={0}
            sx={{ ml: 1, cursor: 'pointer' }}
          >
            <InfoIcon sx={{ fontSize: 24, cursor: 'pointer' }} />
          </Tooltip>
        ) : null}
      </BoxWrapperRow>
      <CustomTypography variant={'infoCardValue'} sx={{ fontSize: { xs: '36px', md: '44px' } }}>
        {value}
      </CustomTypography>
    </BoxWrapperColumn>
  )
}
