import Loading from '@karpatkey-monorepo/shared/components/Loading'
import { Grid } from '@mui/material'
import dynamic from 'next/dynamic'
import numbro from 'numbro'
import * as React from 'react'

const DynamicInfoCard = dynamic(() => import('@karpatkey-monorepo/shared/components/InfoCard'), {
  loading: () => <Loading />
})

const DynamicFunds = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/sections/Farming/Funds'),
  {
    loading: () => <Loading />
  }
)

const DynamicResults = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/sections/Farming/Results'),
  {
    loading: () => <Loading />
  }
)

interface IFarmingFundsResults {
  totalFarmingFunds: number
  rowsFarmingFundsByProtocol: any[]
  rowsFarmingFundsByProtocolTotals: {
    fundsTotal: number
    unclaimedTotal: number
    resultsTotal: number
  }
  rowsFarmingResultsDetailsByProtocol: any[]
  rowsFarmingResultsDetailsByProtocolTotals: {
    rewardsTotal: number
    feesTotal: number
    total: number
  }
}

const FarmingFundsResults = (props: IFarmingFundsResults) => {
  const {
    totalFarmingFunds,
    rowsFarmingFundsByProtocol: funds,
    rowsFarmingFundsByProtocolTotals: totals,
    rowsFarmingResultsDetailsByProtocol: fundsDetails,
    rowsFarmingResultsDetailsByProtocolTotals: totalDetails
  } = props

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      gap={6}
      paddingTop={4}
    >
      <Grid item xs={4} sm={8} md={12}>
        <DynamicInfoCard
          title="Farming Results"
          value={numbro(totalFarmingFunds).formatCurrency({
            spaceSeparated: false,
            mantissa: 2
          })}
        />
      </Grid>
      <Grid item xs={4} sm={8} md={12}>
        <DynamicFunds {...{ funds, totals }} />
      </Grid>
      <Grid item xs={4} sm={8} md={12}>
        <DynamicInfoCard
          title="Farming Results from Farm-Swaps"
          value={numbro(0).formatCurrency({
            spaceSeparated: false,
            mantissa: 2
          })}
        />
      </Grid>
      <Grid item xs={4} sm={8} md={12}>
        <DynamicResults {...{ fundsDetails, totalDetails }} />
      </Grid>
    </Grid>
  )
}

export default FarmingFundsResults
