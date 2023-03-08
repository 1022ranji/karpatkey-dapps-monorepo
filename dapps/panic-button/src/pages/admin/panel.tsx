import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import ContainerWrapper from '@monorepo/shared/components/ContainerWrapper'
import ErrorBoundaryWrapper from '@monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import Box from '@mui/material/Box'
import React from 'react'

import ResetCache from '../../components/ButtonActions/ResetCache'
import TriggerAction from '../../components/ButtonActions/TriggerAction'

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
