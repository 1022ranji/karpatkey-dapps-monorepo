import { BalanceOverview } from 'src/views/sections/report/BalanceOverview'
import { FarmingFunds } from 'src/views/sections/report/FarmingFunds'
import { Hero } from 'src/views/sections/report/Hero'
import { Summary } from 'src/views/sections/report/Summary'
import { TokenDetails } from 'src/views/sections/report/TokenDetails'
import { TreasuryVariation } from 'src/views/sections/report/TreasuryVariation'
import { BoxContainerWrapper } from 'src/components/wrappers'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { Disclaimer } from 'components/layout/report/Disclaimer'

export const Report = () => {
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
      <Disclaimer />
    </BoxContainerWrapper>
  )
}
