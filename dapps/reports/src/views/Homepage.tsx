import BalanceOverview from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverview'
import FarmingFunds from '@karpatkey-monorepo/reports/src/views/sections/FarmingFunds'
import Hero from '@karpatkey-monorepo/reports/src/views/sections/Hero'
import Summary from '@karpatkey-monorepo/reports/src/views/sections/Summary'
import TokenDetails from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails'
import TreasuryVariation from '@karpatkey-monorepo/reports/src/views/sections/TreasuryVariation'
import BoxContainerWrapper from '@karpatkey-monorepo/shared/components/Wrappers/BoxContainerWrapper'
import * as React from 'react'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'

const HomepageContent = () => {
  const { state } = useApp()
  const { month, DAO, year, report, currency } = state

  if (!report) {
    return null
  }

  const { summary, balanceOverview, treasuryVariation, farmingFunds, tokenDetails } =
    report[currency]

  return (
    <BoxContainerWrapper>
      <Hero />
      <Summary
        dao={DAO}
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
        farmingFundsByProtocol={farmingFunds?.farmingFundsByProtocol}
        totalFarmingResultsFarmSwaps={farmingFunds?.totalFarmingResultsFarmSwaps}
        fundsByProtocol={summary?.fundsByProtocol}
        operationDetails={farmingFunds?.operationDetails}
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
