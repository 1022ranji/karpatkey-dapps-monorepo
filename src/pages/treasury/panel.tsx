import ResetCache from '@/src/components/ButtonActions/ResetCache'
import TriggerAction from '@/src/components/ButtonActions/TriggerAction'
import ContainerWrapper from '@/src/components/ContainerWrapper'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
import Box from '@mui/material/Box'
import React from 'react'

export default function Panel() {
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
}
