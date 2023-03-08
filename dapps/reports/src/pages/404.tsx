import CustomTypography from '@monorepo/shared/components/CustomTypography'
import TextLink from '@monorepo/shared/components/TextLink'
import { Box, Button, styled } from '@mui/material'
import { NextPage } from 'next'
import * as React from 'react'

const PageWrapper = styled(Box)({
  maxWidth: 1000,
  margin: '100px auto'
})

const HomeLinkWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '85%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    top: '100%',
    width: '100%'
  }
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    height: '59px'
  }
}))

const Custom404Page: NextPage = () => {
  return (
    <PageWrapper>
      <Box height="100%" display="flex" alignItems="center">
        <Box display="block" height="100%" width="100%" position="relative">
          <CustomTypography color="textSecondary" variant="h3" textAlign="center">
            Page not found
          </CustomTypography>
        </Box>
        <HomeLinkWrapper>
          <TextLink useNextLink={false} href="/" withUnderlineAnimation={false}>
            <StyledButton size="large" type="button" variant="contained">
              Back to Home
            </StyledButton>
          </TextLink>
        </HomeLinkWrapper>
      </Box>
    </PageWrapper>
  )
}

export default Custom404Page
