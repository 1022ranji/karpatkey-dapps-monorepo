import TimeLineScale from '@/components/charts/TimeLineScale'
import { DataWarehouse } from '@/services/classes/dataWarehouse.class'
import { getLastWeekDate, getTodayDate } from '@/utils'
import {
  convertDataToLineSeries,
  filterByRangeOfDates,
  reducerTotalBalancesByDate
} from '@/utils/mappers'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'

interface IDetailProps {
  rows: any
}

export default function Detail({ rows }: IDetailProps) {
  return (
    <>
      <Typography variant="h3">DAO Weekly Report.</Typography>
      <Box sx={{ height: 350, width: '100%' }}>
        <TimeLineScale data={rows} />
      </Box>
    </>
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
