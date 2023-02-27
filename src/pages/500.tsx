import { Box, styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import { NextPage } from 'next'

const PageWrapper = styled(Box)({
  maxWidth: 1000,
  margin: '100px auto'
})

const Custom500Page: NextPage = () => {
  return (
    <PageWrapper>
      <Box height="100%" display="flex" position="relative" alignItems="center">
        <Box display="block" height="100%" width="100%" position="relative">
          <Typography variant="h3" textAlign="center">
            Internal server error
          </Typography>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Custom500Page
