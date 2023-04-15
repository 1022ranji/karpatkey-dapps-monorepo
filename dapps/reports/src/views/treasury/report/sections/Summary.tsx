import Loading from '@karpatkey-monorepo/shared/components/Loading'
import { Grid } from '@mui/material'
import dynamic from 'next/dynamic'
import numbro from 'numbro'
import * as React from 'react'

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie'),
  { loading: () => <Loading /> }
)

const DynamicInfoCard = dynamic(() => import('@karpatkey-monorepo/shared/components/InfoCard'), {
  loading: () => <Loading />
})

interface ISummary {
  totalFunds: number
  capitalUtilization: number
  farmingResults: number
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  fundsByProtocol: any[]
}

const Summary = (props: ISummary) => {
  const {
    totalFunds,
    capitalUtilization,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol
  } = props

  return (
    <Grid container gap={4} marginTop={4}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={4}>
          <DynamicInfoCard
            title="Total funds"
            value={numbro(totalFunds).formatCurrency({
              spaceSeparated: false,
              mantissa: 2
            })}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <DynamicInfoCard
            title="Capital utilization"
            value={numbro(capitalUtilization).format({
              output: 'percent',
              spaceSeparated: false,
              mantissa: 2
            })}
          />
        </Grid>
        <Grid item xs={4} sm={12} md={4}>
          <DynamicInfoCard
            title="Farming results"
            value={numbro(farmingResults).formatCurrency({
              spaceSeparated: false,
              mantissa: 2
            })}
          />
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={6}>
          <DynamicPieChart
            data={fundsByTokenCategory}
            title="Total funds by token category"
            dataKey="funds"
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <DynamicPieChart data={fundsByType} title="Total funds by type" dataKey="funds" />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <DynamicPieChart
            data={fundsByBlockchain}
            title="Total funds by blockchain"
            dataKey="funds"
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <DynamicPieChart
            data={fundsByProtocol}
            title="Farming funds by protocol"
            dataKey="allocation"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Summary
