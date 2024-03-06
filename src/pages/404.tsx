import { CustomTypography } from 'src/components'
import { Box, styled } from '@mui/material'
import * as React from 'react'

const PageWrapper = styled(Box)({
  maxWidth: 1000,
  margin: '100px auto'
})

const Custom404Page = () => {
  return (
    <PageWrapper>
      <Box height="100%" display="flex" position="relative" alignItems="center">
        <Box display="block" height="100%" width="100%" position="relative">
          <CustomTypography color="textSecondary" variant="h3" textAlign="center">
            Page not found
          </CustomTypography>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Custom404Page
