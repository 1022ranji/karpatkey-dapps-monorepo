import { ActionKind, useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import { ReportProps } from '@karpatkey-monorepo/reports/src/types'
import BalanceOverview from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverview'
import FarmingFunds from '@karpatkey-monorepo/reports/src/views/sections/FarmingFunds'
import Hero from '@karpatkey-monorepo/reports/src/views/sections/Hero'
import Summary from '@karpatkey-monorepo/reports/src/views/sections/Summary'
import TokenDetails from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails'
import TreasuryVariation from '@karpatkey-monorepo/reports/src/views/sections/TreasuryVariation'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxContainerWrapper from '@karpatkey-monorepo/shared/components/Wrappers/BoxContainerWrapper'
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
    farmingResultsDetailsByProtocol,
    tokenDetails
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
    <BoxContainerWrapper>
      <AnimatePresenceWrapper>
        <Hero />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <Summary
          totalFunds={totalFunds}
          capitalUtilization={capitalUtilization}
          farmingResults={farmingResults}
          fundsByTokenCategory={fundsByTokenCategory}
          fundsByType={fundsByType}
          fundsByBlockchain={fundsByBlockchain}
          fundsByProtocol={fundsByProtocol}
        />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <BalanceOverview
          balanceOverviewType={balanceOverviewType}
          balanceOverviewBlockchain={balanceOverviewBlockchain}
        />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <TreasuryVariation
          rowsTreasuryVariation={rowsTreasuryVariation}
          rowsHistoricVariation={rowsHistoricVariation}
          rowsTreasuryVariationForThePeriodDetail={rowsTreasuryVariationForThePeriodDetail}
        />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <FarmingFunds {...farmingFundsResultsProps} />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <TokenDetails tokenDetails={tokenDetails} />
      </AnimatePresenceWrapper>
    </BoxContainerWrapper>
  )
}

export default HomepageContent
