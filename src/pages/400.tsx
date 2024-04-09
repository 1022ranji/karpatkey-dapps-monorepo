import { Box, styled } from '@mui/material'
import * as React from 'react'
import { CustomTypography } from 'src/components'

const PageWrapper = styled(Box)({
  maxWidth: 1000,
  margin: '100px auto'
})

const Custom401Page = () => {
  const effectTriggeredRef = React.useRef(false)

  React.useEffect(() => {
    // Trigger the cache
    const triggerCache = async () => {
      try {
        const response = await fetch('/api/cache', {
          method: 'POST'
        })
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (!effectTriggeredRef.current) {
      effectTriggeredRef.current = true
      triggerCache()
    }
  }, [])

  React.useEffect(() => {
    // Check if the cache is ready using polling
    const checkCache = async () => {
      try {
        const response = await fetch('/api/check-cache')
        const data = await response.json()
        if (data.existCache) {
          window.location.href = '/'
        }
      } catch (error) {
        console.error(error)
      }
    }

    const interval = setInterval(() => {
      checkCache()
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <PageWrapper>
      <Box height="100%" display="flex" position="relative" alignItems="center">
        <Box display="block" height="100%" width="100%" position="relative">
          <CustomTypography color="textSecondary" variant="h3" textAlign="center">
            Please wait, we are creating a cache
          </CustomTypography>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Custom401Page
