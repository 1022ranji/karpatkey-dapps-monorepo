import TimeLineScale from '@karpatkey-monorepo/reports/src/components/Charts/TimeLineScale'
import Logo from '@karpatkey-monorepo/reports/src/components/Logo'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import Cache from '@karpatkey-monorepo/shared/services/classes/cache.class'
import { getLastWeekDate, getTodayDate } from '@karpatkey-monorepo/shared/utils'
import {
  filterByRangeOfDates,
  mapDataToLineSeries,
  reducerTotalBalancesByDate
} from '@karpatkey-monorepo/shared/utils/mappers/index'
import Box from '@mui/material/Box'
import { DateTime } from 'luxon'
import * as React from 'react'

interface IDetailProps {
  rows: any
}

export default function Detail({ rows }: IDetailProps) {
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
          <TimeLineScale data={rows} />
        </Box>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}

export async function getServerSideProps() {
  // Step 1: Create a cache instance and obtain the data
  const cache = Cache.getInstance()
  const reportData = cache.getBalanceReports()

  // Step 2: Filter the data by date range and DAO
  const startDateTime = getLastWeekDate()
  const endDateTime = getTodayDate()

  const parsedRowsFiltered = filterByRangeOfDates(reportData, startDateTime, endDateTime)
    .filter((item: any) => item['dao'] === 'Karpatkey')
    .sort((a: any, b: any) => {
      const aDate = a['kitche_date'].value
      const bDate = b['kitche_date'].value
      return DateTime.fromISO(aDate).toUTC().toMillis() - DateTime.fromISO(bDate).toUTC().toMillis()
    })

  // Step 3: Reduce the data to a single object, with the date as key and the total balance as value
  const parsedRowsReduced = parsedRowsFiltered.reduce(reducerTotalBalancesByDate, {})

  // Step 4: Convert the data to a format that can be used by the chart
  const rows = mapDataToLineSeries(parsedRowsReduced)

  // Pass data to the page via props
  return { props: { rows } }
}
