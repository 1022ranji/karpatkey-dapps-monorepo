import ResetCache from '@/src/components/ButtonActions/ResetCache'
import TriggerAction from '@/src/components/ButtonActions/TriggerAction'
import ContainerWrapper from '@/src/components/ContainerWrapper'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Box from '@mui/material/Box'
import React from 'react'

export default withPageAuthRequired(function Panel() {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flex: 'auto',
            flexDirection: 'column'
          }}
        >
          <ResetCache />
          <TriggerAction />
        </Box>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
})
