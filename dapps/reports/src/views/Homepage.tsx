import { ActionKind, useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import { ReportProps } from '@karpatkey-monorepo/reports/src/types'
import BalanceOverview from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverview'
import FarmingFunds from '@karpatkey-monorepo/reports/src/views/sections/FarmingFunds'
import Hero from '@karpatkey-monorepo/reports/src/views/sections/Hero'
import Summary from '@karpatkey-monorepo/reports/src/views/sections/Summary'
import TokenDetails from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails'
import TreasuryVariation from '@karpatkey-monorepo/reports/src/views/sections/TreasuryVariation'
import BoxContainerWrapper from '@karpatkey-monorepo/shared/components/BoxContainerWrapper'
import * as React from 'react'

const HomepageContent = (props: ReportProps) => {
  const {
    month,
    dao,
    year,
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
    totalFarmingResultsFarmSwaps,
    farmingFundsByProtocol,
    farmingResultsDetailsByProtocol
  } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useFilter()

  React.useEffect(() => {
    dispatch({ type: ActionKind.UPDATE, payload: { value: { month, dao, year }, error: null } })
  }, [month, dao, year, dispatch])

  const farmingFundsResultsProps = {
    totalFarmingResultsFarmSwaps,
    farmingFundsByProtocol,
    farmingResultsDetailsByProtocol
  }

  return (
    <BoxContainerWrapper gap={3}>
      <Hero />
      <Summary
        totalFunds={totalFunds}
        capitalUtilization={capitalUtilization}
        farmingResults={farmingResults}
        fundsByTokenCategory={fundsByTokenCategory}
        fundsByType={fundsByType}
        fundsByBlockchain={fundsByBlockchain}
        fundsByProtocol={fundsByProtocol}
      />
      <BalanceOverview
        balanceOverviewType={balanceOverviewType}
        balanceOverviewBlockchain={balanceOverviewBlockchain}
      />
      <TreasuryVariation
        rowsTreasuryVariation={rowsTreasuryVariation}
        rowsHistoricVariation={rowsHistoricVariation}
        rowsTreasuryVariationForThePeriodDetail={rowsTreasuryVariationForThePeriodDetail}
      />
      <FarmingFunds {...farmingFundsResultsProps} />
      <TokenDetails />
    </BoxContainerWrapper>
  )
}

export default HomepageContent
