import FundsContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/FundsContainer'
import FundsByProtocolContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/FundsByProtocolContainer'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import numbro from 'numbro'
import * as React from 'react'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

interface FarmingFundsProps {
  totalFarmingResultsFarmSwaps: number
  farmingFundsByProtocol: any[]
  farmingResultsDetailsByProtocol: any[]
  fundsByProtocol: any[]
  defiResults: number
}

const FarmingFunds = (props: FarmingFundsProps) => {
  const {
    farmingFundsByProtocol: funds,
    totalFarmingResultsFarmSwaps: totalFarmSwaps,
    fundsByProtocol,
    defiResults
  } = props

  const isDDay = isYearAndMonthValid()

  return (
    <>
      <AnimatePresenceWrapper>
        <FundsByProtocolContainer fundsByProtocol={fundsByProtocol} defiResults={defiResults} />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <FundsContainer {...{ funds }} />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        {/*TODO: hide this component for the moment*/}
        {/*<ResultsContainer {...{ fundsDetails }} />*/}
        <PaperSection
          subTitle={isDDay ? 'DeFi results from DeFi-Swaps' : 'Farming results from Farm-Swaps'}
        >
          <CustomTypography variant="farmSwapsValue">
            {totalFarmSwaps === 0 ? (
              <CustomTypography
                variant="body2"
                color="textSecondary"
                align="left"
                sx={{ fontStyle: 'italic' }}
              >
                {isDDay
                  ? 'No DeFi results from DeFi-Swaps within the selected period'
                  : 'No farming results from Farm-Swaps within the selected period'}
              </CustomTypography>
            ) : (
              numbro(totalFarmSwaps || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 0,
                thousandSeparated: true
              })
            )}
          </CustomTypography>
        </PaperSection>
      </AnimatePresenceWrapper>
    </>
  )
}

export default FarmingFunds
