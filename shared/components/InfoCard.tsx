import { Box, styled } from '@mui/material'
import React from 'react'

import BoxWrapperRow from './BoxWrapperRow'
import CustomTypography from './CustomTypography'
import Paper from './Paper'

const Value = styled(CustomTypography)(() => ({
  fontWeight: '600',
  fontStyle: 'normal',
  lineHeight: '31px'
}))

const Title = styled(CustomTypography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '-0.0375em',
  color: theme.palette.primary.main
}))

interface IInfoCardProps {
  title: string
  value: string
}

const InfoCard = ({ title, value }: IInfoCardProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ justifyContent: { xs: 'flex-start', sm: 'center' } }}
    >
      <Paper
        sx={{
          minWidth: '200px',
          width: '100%',
          maxWidth: '800px'
        }}
      >
        <BoxWrapperRow gap={1} sx={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Box display="flex" flexDirection="column">
            <Title variant={'h6'}>{title}</Title>
            <Value>{value}</Value>
          </Box>
        </BoxWrapperRow>
      </Paper>
    </Box>
  )
}

export default InfoCard
