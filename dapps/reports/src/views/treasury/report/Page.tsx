import { TReportFilter, TReportProps } from '@karpatkey-monorepo/reports/src/types'
import Breadcrumb from '@karpatkey-monorepo/reports/src/views/treasury/report/Breadcrumb'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import Loading from '@karpatkey-monorepo/shared/components/Loading'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTitle = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Title')
)

const DynamicFilter = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Filter')
)

const DynamicOpen = dynamic(() => import('dapps/reports/src/views/treasury/report/Open'))

const DynamicPositions = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Positions'),
  { loading: () => <Loading /> }
)

const DynamicBalanceOverview = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/sections/BalanceOverview'),
  { loading: () => <Loading /> }
)

const DynamicSummary = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/sections/Summary'),
  { loading: () => <Loading /> }
)

const DynamicTreasuryVariation = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/sections/TreasuryVariation'),
  {
    loading: () => <Loading />
  }
)

const DynamicFarmingFundsResults = dynamic(
  () =>
    import(
      '@karpatkey-monorepo/reports/src/views/treasury/report/sections/Farming/FarmingFundsResults'
    ),
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
    balanceOverviewBlockchain,
    rowsTreasuryVariation,
    rowsHistoricVariation,
    rowsTreasuryVariationForThePeriodDetail,
    totalFarmingFunds,
    rowsFarmingFundsByProtocol,
    rowsFarmingFundsByProtocolTotals,
    rowsFarmingResultsDetailsByProtocol,
    rowsFarmingResultsDetailsByProtocolTotals
  } = props

  const paramProps = { periodType, daoName, period }

  const treasuryVariationProps = {
    rowsTreasuryVariation,
    rowsHistoricVariation,
    rowsTreasuryVariationForThePeriodDetail
  }

  const balanceOverviewProps = {
    balanceOverviewType,
    balanceOverviewBlockchain
  }

  const summaryProps = {
    totalFunds,
    capitalUtilization,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol
  }

  const farmingFundsResultsProps = {
    totalFarmingFunds,
    rowsFarmingFundsByProtocol,
    rowsFarmingFundsByProtocolTotals,
    rowsFarmingResultsDetailsByProtocol,
    rowsFarmingResultsDetailsByProtocolTotals
  }

  return (
    <BoxWrapperColumn gap={10}>
      <DynamicTitle periodType={periodType} daoName={daoName} />
      <BoxWrapperRow
        justifyContent={'space-between'}
        sx={{ justifyContent: { xs: 'flex-end', sm: 'space-between' } }}
      >
        <Breadcrumb {...(paramProps as TReportFilter)} />
        <BoxWrapperRow gap={2}>
          <DynamicFilter {...(paramProps as TReportFilter)} />
          <DynamicOpen {...(paramProps as TReportFilter)} />
        </BoxWrapperRow>
      </BoxWrapperRow>

      <PaperSection title="Summary">
        <DynamicSummary {...summaryProps} />
      </PaperSection>

      <PaperSection title="Balance Overview">
        <DynamicBalanceOverview {...balanceOverviewProps} />
      </PaperSection>

      <PaperSection title="Treasury Variation">
        <DynamicTreasuryVariation {...treasuryVariationProps} />
      </PaperSection>

      <PaperSection title="Farming Funds / Results">
        <DynamicFarmingFundsResults {...farmingFundsResultsProps} />
      </PaperSection>

      <PaperSection title="Token Detail">
        <DynamicPositions data={summary} />
      </PaperSection>
    </BoxWrapperColumn>
  )
}

export default Page
