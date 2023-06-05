import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import UpdateCache from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/UpdateCache'
import Logo from '@karpatkey-monorepo/panic-button/src/components/Logo'
import TablePositions from '@karpatkey-monorepo/panic-button/src/components/TablePositions'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/Wrappers/ContainerWrapper'
import { reducerPositionsByProtocolAndAsset } from '@karpatkey-monorepo/shared/utils/mappers'
import Box from '@mui/material/Box'
import React from 'react'

interface IPanelProps {
  positionsData: any[]
}

export default withPageAuthRequired(function Panel({ positionsData }: IPanelProps) {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <BoxWrapperRow
          sx={{
            gap: '10px',
            mb: '30px'
          }}
        >
          <Logo />
          <CustomTypography color="textSecondary" variant="h4" textAlign="center">
            DAO Positions
          </CustomTypography>
        </BoxWrapperRow>
        <Box display="flex" flexDirection="column">
          <TablePositions rows={positionsData} />
          <UpdateCache />
        </Box>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
})

export async function getServerSideProps() {
  const rows: any[] = [] as any[]

  const positionsData = rows.reduce(reducerPositionsByProtocolAndAsset, {})

  // Pass data to the page via props
  return { props: { positionsData } }
}
