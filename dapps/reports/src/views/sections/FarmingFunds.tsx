import FundsContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/FundsContainer'
import FundsByProtocolContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/FundsByProtocolContainer'
import OperationsContainer from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/OperationsContainer'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'
import { formatCurrency, formatNumber } from '@karpatkey-monorepo/reports/src/utils/format'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'

interface FarmingFundsProps {
  farmingFundsByProtocol: any[]
  totalFarmingResultsFarmSwaps: number
  fundsByProtocol: any[]
  operationDetails: any[]
}

const FarmingFunds = (props: FarmingFundsProps) => {
  const {
    farmingFundsByProtocol: funds,
    totalFarmingResultsFarmSwaps: totalFarmSwaps,
    fundsByProtocol,
    operationDetails
  } = props

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  return (
    <>
      <AnimatePresenceWrapper>
        <FundsByProtocolContainer fundsByProtocol={fundsByProtocol} />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <FundsContainer {...{ funds }} />
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <PaperSection
          subTitle={
            isDDay
              ? currency === 'USD'
                ? 'DeFi results from DeFi-Swaps'
                : 'DeFi results from DeFi-Swaps (ETH)'
              : currency === 'USD'
              ? 'Farming results from Farm-Swaps'
              : 'Farming results from Farm-Swaps (ETH)'
          }
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
            ) : currency === 'USD' ? (
              formatCurrency(totalFarmSwaps)
            ) : (
              formatNumber(totalFarmSwaps, 0)
            )}
          </CustomTypography>
        </PaperSection>
      </AnimatePresenceWrapper>
      {operationDetails.length > 0 && isDDay && (
        <AnimatePresenceWrapper>
          <OperationsContainer operationDetails={operationDetails} />
        </AnimatePresenceWrapper>
      )}
    </>
  )
}

export default FarmingFunds
