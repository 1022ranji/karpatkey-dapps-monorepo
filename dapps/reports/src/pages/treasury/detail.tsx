import TimeLineScale from '@karpatkey-monorepo/reports/src/components/Charts/TimeLineScale'
import Logo from '@karpatkey-monorepo/reports/src/components/Logo'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import { getCommonServerSideProps } from '@karpatkey-monorepo/shared/utils'
import {
  mapDataToLineSeries,
  reducerTotalBalancesByDate
} from '@karpatkey-monorepo/shared/utils/mappers/index'
import Box from '@mui/material/Box'
import * as React from 'react'

interface IDetailProps {
  balancesData: any
}

export default function Detail({ balancesData }: IDetailProps) {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <Logo />
          <CustomTypography color="textSecondary" variant="h4" textAlign="center">
            DAO Weekly Report.
          </CustomTypography>
        </Box>
        <Box sx={{ height: 350, width: '100%' }}>
          <TimeLineScale data={balancesData} />
        </Box>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}

export async function getServerSideProps() {
  const rows: any[] = getCommonServerSideProps({ daily: false, daoName: 'Karpatkey' })

  // Step 3: Reduce the data to a single object, with the date as key and the total balance as value
  const parsedRowsReduced = rows.reduce(reducerTotalBalancesByDate, {})

  // Step 4: Convert the data to a format that can be used by the chart
  const balancesData = mapDataToLineSeries(parsedRowsReduced)

  // Pass data to the page via props
  return { props: { balancesData } }
}
