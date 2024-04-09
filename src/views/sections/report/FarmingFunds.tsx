import { FundsContainer } from 'src/views/sections/report/farmingFundsItems/FundsContainer'
import { FundsByProtocolContainer } from 'src/views/sections/report/farmingFundsItems/FundsByProtocolContainer'
import { OperationsContainer } from 'src/views/sections/report/farmingFundsItems/OperationsContainer'
import { AnimatePresenceWrapper, CustomTypography, PaperSection } from 'src/components'
import * as React from 'react'
import { isYearAndMonthValid } from 'src/utils/params'
import { formatCurrency, formatNumber } from 'src/utils/format'
import { useApp } from 'src/contexts/app.context'

interface FarmingFundsProps {
  farmingFundsByProtocol: any[]
  totalFarmingResultsFarmSwaps: number
  fundsByProtocol: any[]
  operationDetails: any[]
}

export const FarmingFunds = (props: FarmingFundsProps) => {
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
          {totalFarmSwaps === 0 && (
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
          )}

          {totalFarmSwaps !== 0 && currency === 'USD' && (
            <CustomTypography>{formatCurrency(totalFarmSwaps)}</CustomTypography>
          )}

          {totalFarmSwaps !== 0 && currency === 'ETH' && (
            <CustomTypography>{formatNumber(totalFarmSwaps, 0)}</CustomTypography>
          )}
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
