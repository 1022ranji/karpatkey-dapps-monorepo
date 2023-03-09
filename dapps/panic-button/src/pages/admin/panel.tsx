import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import ResetCache from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ResetCache'
import TriggerAction from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/TriggerAction'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
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
