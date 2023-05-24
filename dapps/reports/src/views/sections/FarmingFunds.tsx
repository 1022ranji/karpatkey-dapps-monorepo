import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import FundsContainer from 'dapps/reports/src/views/sections/FarmingFundsItems/FundsContainer'
import ResultsContainer from 'dapps/reports/src/views/sections/FarmingFundsItems/ResultsContainer'
import numbro from 'numbro'
import * as React from 'react'

interface FarmingFundsProps {
  totalFarmingResultsFarmSwaps: number
  farmingFundsByProtocol: any[]
  farmingResultsDetailsByProtocol: any[]
}

const FarmingFunds = (props: FarmingFundsProps) => {
  const {
    farmingFundsByProtocol: funds,
    farmingResultsDetailsByProtocol: fundsDetails,
    totalFarmingResultsFarmSwaps: totalFarmSwaps
  } = props

  return (
    <PaperSection title="Farming funds">
      <BoxWrapperColumn gap={4} marginTop={'30px'}>
        <FundsContainer {...{ funds }} />
        <ResultsContainer {...{ fundsDetails }} />
        <BoxWrapperColumn gap={2}>
          <CustomTypography variant="balanceOverviewSubtitle">
            Farming results from Farm-Swaps
          </CustomTypography>
          <CustomTypography variant="farmSwapsValue">
            {numbro(totalFarmSwaps || 0).formatCurrency({
              spaceSeparated: false,
              mantissa: 2,
              thousandSeparated: true
            })}
          </CustomTypography>
        </BoxWrapperColumn>
      </BoxWrapperColumn>
    </PaperSection>
  )
}

export default FarmingFunds
