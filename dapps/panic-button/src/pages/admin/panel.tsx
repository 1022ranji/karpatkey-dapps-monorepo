import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import ResetCache from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ResetCache'
import Logo from '@karpatkey-monorepo/panic-button/src/components/Logo'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import TablePositions from '@karpatkey-monorepo/shared/components/Tables/TablePositions'
import { getCommonServerSideProps } from '@karpatkey-monorepo/shared/utils'
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            mb: '30px'
          }}
        >
          <Logo />
          <CustomTypography color="textSecondary" variant="h4" textAlign="center">
            DAO Positions
          </CustomTypography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TablePositions rows={positionsData} />
          <ResetCache />
        </Box>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
})

export async function getServerSideProps() {
  const rows: any[] = getCommonServerSideProps({ daily: true, daoName: 'Karpatkey' })

  const positionsData = rows.reduce(reducerPositionsByProtocolAndAsset, {})

  // Pass data to the page via props
  return { props: { positionsData } }
}
