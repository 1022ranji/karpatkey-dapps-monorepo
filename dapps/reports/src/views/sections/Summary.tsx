import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import dynamic from 'next/dynamic'
import * as React from 'react'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie')
)

const DynamicInfoCard = dynamic(() => import('@karpatkey-monorepo/shared/components/InfoCard'))

interface SummaryProps {
  totalFunds: number
  capitalUtilization: number
  globalROI: number
  farmingResults: number
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  balanceOverviewType: any[]
}

const Summary = (props: SummaryProps) => {
  const {
    totalFunds,
    capitalUtilization,
    globalROI,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    balanceOverviewType
  } = props

  const negativeTotalValue = balanceOverviewType.find((item) => item.Total < 0)

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ margin: '30px 30px' }} gap={10}>
        <BoxWrapperRow id="summary" gap={8} sx={{ justifyContent: 'space-between' }}>
          <DynamicInfoCard title="Total funds" value={formatCurrency(totalFunds)} />
          <DynamicInfoCard
            title="Capital utilization"
            value={formatPercentage(capitalUtilization, 1)}
          />
          <DynamicInfoCard title="Farming results" value={formatCurrency(farmingResults)} />
          <DynamicInfoCard
            title="APY"
            value={formatPercentage(globalROI)}
            helpInfo="This value is calculated as (1+(Farming Results / Initial Balance at Final Prices))^12-1."
          />
        </BoxWrapperRow>
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <BoxWrapperColumn sx={{ alignItems: 'center' }} gap={4}>
            <DynamicPieChart
              data={fundsByTokenCategory}
              title="Total funds by token category"
              dataKey="funds"
              width={450}
              height={400}
            />
            {negativeTotalValue && (
              <CustomTypography
                variant={'body2'}
                color="textSecondary"
                sx={{ fontFamily: 'IBM Plex Sans', fontSize: 12, fontStyle: 'italic' }}
              >
                Negative balance = {formatCurrency(negativeTotalValue?.Total)}
              </CustomTypography>
            )}
          </BoxWrapperColumn>
          <DynamicPieChart
            data={fundsByBlockchain}
            title="Total funds by blockchain"
            dataKey="funds"
            width={450}
            height={400}
          />
          <DynamicPieChart
            data={fundsByType}
            title="Total funds by type"
            dataKey="funds"
            width={450}
            height={400}
          />
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Summary
