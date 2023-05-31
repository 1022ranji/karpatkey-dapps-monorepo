import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import React from 'react'
import BoxWrapperColumn from 'shared/components/Wrappers/BoxWrapperColumn'

interface InfoCardProps {
  title: string
  value: string
}

const InfoCard = ({ title, value }: InfoCardProps) => {
  return (
    <Paper
      sx={{
        minWidth: 'max-content',
        width: '100%'
      }}
    >
      <BoxWrapperColumn gap={2}>
        <CustomTypography variant={'infoCardTitle'}>{title}</CustomTypography>
        <CustomTypography variant={'infoCardValue'}>{value}</CustomTypography>
      </BoxWrapperColumn>
    </Paper>
  )
}

export default InfoCard
