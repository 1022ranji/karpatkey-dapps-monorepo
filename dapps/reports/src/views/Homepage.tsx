import { ActionKind, useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import { ReportProps } from '@karpatkey-monorepo/reports/src/types'
import BalanceOverview from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverview'
import FarmingFunds from '@karpatkey-monorepo/reports/src/views/sections/FarmingFunds'
import Hero from '@karpatkey-monorepo/reports/src/views/sections/Hero'
import Summary from '@karpatkey-monorepo/reports/src/views/sections/Summary'
import TokenDetails from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails'
import TreasuryVariation from '@karpatkey-monorepo/reports/src/views/sections/TreasuryVariation'
import BoxContainerWrapper from '@karpatkey-monorepo/shared/components/Wrappers/BoxContainerWrapper'
import * as React from 'react'

const HomepageContent = (props: ReportProps) => {
  const { month, dao, year, report } = props

  const { summary, balanceOverview, treasuryVariation, farmingFunds, tokenDetails } = report

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useFilter()

  React.useEffect(() => {
    dispatch({ type: ActionKind.UPDATE, payload: { value: { month, dao, year }, error: null } })
  }, [month, dao, year, dispatch])

  return (
    <BoxContainerWrapper>
      <Hero />
      <Summary
        dao={dao}
        month={month}
        year={year}
        totalFunds={summary?.totalFunds}
        capitalUtilization={summary?.allocatedFunds}
        globalROI={summary?.APY}
        farmingResults={summary?.deFiResults}
        fundsByTokenCategory={summary?.fundsByTokenCategory}
        fundsByType={summary?.fundsByType}
        fundsByBlockchain={summary?.fundsByBlockchain}
        balanceOverviewType={summary?.fundsByProtocol}
      />
      <BalanceOverview
        balanceOverviewType={balanceOverview?.balanceOverviewType}
        balanceOverviewBlockchain={balanceOverview?.balanceOverviewBlockchain}
      />
      <TreasuryVariation
        treasuryVariationData={treasuryVariation?.treasuryVariationData}
        historicVariationData={treasuryVariation?.historicVariationData}
        treasuryVariationForThePeriodDetailData={
          treasuryVariation?.treasuryVariationForThePeriodDetailData
        }
      />
      <FarmingFunds
        totalFarmingResultsFarmSwaps={farmingFunds?.totalFarmingResultsFarmSwaps}
        farmingResultsDetailsByProtocol={farmingFunds?.farmingResultsDetailsByProtocol}
        farmingFundsByProtocol={farmingFunds?.farmingFundsByProtocol}
        fundsByProtocol={summary?.fundsByProtocol}
        operationDetails={farmingFunds?.operationDetails}
        defiResults={farmingFunds?.deFiResults}
      />
      <TokenDetails
        tokenDetails={tokenDetails?.tokenDetails}
        tokenDetailsGrouped={tokenDetails?.tokenDetailsGrouped}
        tokenDetailByPosition={tokenDetails?.tokenDetailByPosition}
        walletTokenDetail={tokenDetails?.walletTokenDetail}
      />
    </BoxContainerWrapper>
  )
}

export default HomepageContent
