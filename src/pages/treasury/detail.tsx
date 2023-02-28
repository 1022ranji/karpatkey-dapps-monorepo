import TimeLineScale from '@/src/components/Charts/TimeLineScale'
import ContainerWrapper from '@/src/components/ContainerWrapper'
import CustomTypography from '@/src/components/CustomTypography'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
import { DataWarehouse } from '@/src/services/classes/dataWarehouse.class'
import { getLastWeekDate, getTodayDate } from '@/src/utils'
import {
  convertDataToLineSeries,
  filterByRangeOfDates,
  reducerTotalBalancesByDate
} from '@/src/utils/mappers/index'
import Box from '@mui/material/Box'
import * as React from 'react'

interface IDetailProps {
  rows: any
}

export default function Detail({ rows }: IDetailProps) {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <CustomTypography color="textSecondary" variant="h4" textAlign="center">
          DAO Weekly Report.
        </CustomTypography>
        <Box sx={{ height: 350, width: '100%' }}>
          <TimeLineScale data={rows} />
        </Box>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}

export async function getServerSideProps() {
  // Step 1: Create a BigQuery client
  const dataWarehouse = DataWarehouse.getInstance()

  // Step 2: Query the data
  const parsedRows = await dataWarehouse.getBalanceReports()

  // Step 3: Filter the data by date range and DAO
  const startDateTime = getLastWeekDate()
  const endDateTime = getTodayDate()

  const parsedRowsFiltered = filterByRangeOfDates(parsedRows, startDateTime, endDateTime)
    .filter((item: any) => item['dao'] === 'Karpatkey')
    .sort((a: any, b: any) => {
      const aDate = a['kitche_date'].value
      const bDate = b['kitche_date'].value
      return new Date(aDate).getTime() - new Date(bDate).getTime()
    })

  // Step 4: Reduce the data to a single object, with the date as key and the total balance as value
  const parsedRowsReduced = parsedRowsFiltered.reduce(reducerTotalBalancesByDate, {})

  // Step 5: Convert the data to a format that can be used by the chart
  const rows = convertDataToLineSeries(parsedRowsReduced)

  // Pass data to the page via props
  return { props: { rows } }
}
