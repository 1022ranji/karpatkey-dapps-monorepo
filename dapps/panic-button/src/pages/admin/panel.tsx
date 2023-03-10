import Logo from '@/dapps/reports/src/components/Logo'
import CustomTypography from '@/shared/components/CustomTypography'
import { getCommonServerSideProps } from '@/shared/utils'
import { reducerPositionsByProtocolAndAsset } from '@/shared/utils/mappers'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import ResetCache from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ResetCache'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import TablePositions from '@karpatkey-monorepo/shared/components/Tables/TablePositions'
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
  console.log('positions', positionsData)
  //const positionsData = mapDataToTable(parsedRowsReducedByProtocol)

  // Pass data to the page via props
  return { props: { positionsData } }
}
