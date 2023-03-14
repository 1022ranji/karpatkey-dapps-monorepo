import UpdateCache from '@/dapps/panic-button/src/components/ButtonActions/UpdateCache'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Logo from '@karpatkey-monorepo/panic-button/src/components/Logo'
import TablePositions from '@karpatkey-monorepo/panic-button/src/components/TablePositions'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
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
  const rows: any[] = getCommonServerSideProps({ daily: true, daoName: 'Karpatkey' })

  const positionsData = rows.reduce(reducerPositionsByProtocolAndAsset, {})

  // Pass data to the page via props
  return { props: { positionsData } }
}
