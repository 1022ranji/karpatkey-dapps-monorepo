import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import dynamic from 'next/dynamic'
import * as React from 'react'

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
  fundsByProtocol: any[]
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
    fundsByProtocol
  } = props

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ margin: '30px 30px' }} gap={10}>
        <BoxWrapperRow id="summary" gap={8} sx={{ justifyContent: 'space-between' }}>
          <DynamicInfoCard title="Total funds" value={formatCurrency(totalFunds)} />
          <DynamicInfoCard
            title="Capital utilization"
            value={formatPercentage(capitalUtilization)}
          />
          <DynamicInfoCard title="Farming results" value={formatCurrency(farmingResults)} />
          <DynamicInfoCard
            title="Global ROI"
            value={formatPercentage(globalROI)}
            helpInfo="This value is calculated as (1+(Farming Results / Initial Balance at Final Prices))^12-1."
          />
        </BoxWrapperRow>
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <DynamicPieChart
            data={fundsByTokenCategory}
            title="Total funds by token category"
            dataKey="funds"
            showLegend={false}
            width={450}
            height={400}
          />
          <DynamicPieChart
            data={fundsByBlockchain}
            title="Total funds by blockchain"
            dataKey="funds"
            showLegend={false}
            width={450}
            height={400}
          />
        </BoxWrapperRow>
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <DynamicPieChart
            data={fundsByType}
            title="Total funds by type"
            dataKey="funds"
            showLegend={false}
            width={450}
            height={400}
          />
          <DynamicPieChart
            data={fundsByProtocol}
            title="Farming funds by protocol"
            dataKey="allocation"
            showLegend={false}
            width={450}
            height={400}
          />
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Summary
