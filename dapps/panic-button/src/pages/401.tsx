import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box, styled } from '@mui/material'
import { NextPage } from 'next'
import * as React from 'react'

const PageWrapper = styled(Box)({
  maxWidth: 1000,
  margin: '100px auto'
})

const Custom401Page: NextPage = () => {
  return (
    <PageWrapper>
      <Box height="100%" display="flex" position="relative" alignItems="center">
        <Box display="block" height="100%" width="100%" position="relative">
          <CustomTypography color="textSecondary" variant="h3" textAlign="center">
            Unauthorized
          </CustomTypography>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Custom401Page
