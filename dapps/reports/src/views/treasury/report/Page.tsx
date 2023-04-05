import { TReportFilter, TReportProps } from '@karpatkey-monorepo/reports/src/types'
import Breadcrumb from '@karpatkey-monorepo/reports/src/views/treasury/report/Breadcrumb'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import { Box, Divider, Grid } from '@mui/material'
import dynamic from 'next/dynamic'
import numbro from 'numbro'
import * as React from 'react'

const Loading = () => (
  <CustomTypography
    color="textSecondary"
    variant="body1"
    justifyContent="center"
    textAlign="center"
  >
    Loading...
  </CustomTypography>
)

const DynamicTitle = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Title')
)
const DynamicFilter = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Filter')
)
const DynamicOpen = dynamic(() => import('dapps/reports/src/views/treasury/report/Open'))

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie'),
  { loading: () => <Loading /> }
)
const DynamicPositions = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Positions'),
  { loading: () => <Loading /> }
)
const DynamicBalanceOverview = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/BalanceOverview'),
  { loading: () => <Loading /> }
)
const DynamicInfoCard = dynamic(() => import('@karpatkey-monorepo/shared/components/InfoCard'), {
  loading: () => <Loading />
})
const DynamicTreasuryVariation = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/TreasuryVariation'),
  {
    loading: () => <Loading />
  }
)

// TODO this view is too big, split it into smaller components, also add a rule to the linter to prevent this, like max 200 lines per file
const Page = (props: TReportProps) => {
  const {
    periodType,
    daoName,
    period,
    summary,
    totalFunds,
    capitalUtilization,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol,
    balanceOverviewType,
    balanceOverviewBlockchain
  } = props
  const paramProps = { periodType, daoName, period }

  return (
    <>
      <BoxWrapperRow sx={{ marginTop: '101px', marginBottom: '101px' }}>
        <DynamicTitle periodType={periodType} daoName={daoName} />
      </BoxWrapperRow>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ paddingY: 4, justifyContent: { xs: 'flex-end', sm: 'space-between' } }}
      >
        <Breadcrumb {...(paramProps as TReportFilter)} />
        <BoxWrapperRow gap={2}>
          <DynamicFilter {...(paramProps as TReportFilter)} />
          <DynamicOpen {...(paramProps as TReportFilter)} />
        </BoxWrapperRow>
      </Box>

      <PaperSection title="Summary">
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
                spaceSeparated: true,
                mantissa: 2
              })}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <DynamicInfoCard
              title="Capital utilization"
              value={numbro(capitalUtilization).format({
                output: 'percent',
                spaceSeparated: true,
                mantissa: 2
              })}
            />
          </Grid>
          <Grid item xs={4} sm={12} md={4}>
            <DynamicInfoCard
              title="Farming results"
              value={numbro(farmingResults).formatCurrency({
                spaceSeparated: true,
                mantissa: 2
              })}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
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
      </PaperSection>
      <PaperSection title="Balance Overview">
        <DynamicBalanceOverview
          balanceOverviewType={balanceOverviewType}
          balanceOverviewBlockchain={balanceOverviewBlockchain}
        />
      </PaperSection>
      <PaperSection title="Treasury Variation">
        <DynamicTreasuryVariation />
      </PaperSection>
      <PaperSection title="Farming Funds / Results">
        <DynamicPositions data={summary} />
      </PaperSection>
      <PaperSection title="Token Detail">
        <DynamicPositions data={summary} />
      </PaperSection>
    </>
  )
}

export default Page
