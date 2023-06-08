import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import dynamic from 'next/dynamic'
import numbro from 'numbro'
import * as React from 'react'

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie')
)

const DynamicInfoCard = dynamic(() => import('@karpatkey-monorepo/shared/components/InfoCard'))

interface SummaryProps {
  totalFunds: number
  capitalUtilization: number
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
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol
  } = props

  return (
    <BoxWrapperColumn sx={{ margin: '30px 30px' }} gap={10}>
      <BoxWrapperRow gap={4} sx={{ justifyContent: 'space-between' }}>
        <DynamicInfoCard
          title="Total funds"
          value={numbro(totalFunds).formatCurrency({
            spaceSeparated: false,
            thousandSeparated: true,
            mantissa: 0
          })}
        />
        <DynamicInfoCard
          title="Capital utilization"
          value={numbro(capitalUtilization).format({
            output: 'percent',
            spaceSeparated: false,
            mantissa: 2
          })}
        />
        <DynamicInfoCard
          title="Farming results"
          value={numbro(farmingResults).formatCurrency({
            spaceSeparated: false,
            thousandSeparated: true,
            mantissa: 0
          })}
        />
      </BoxWrapperRow>
      <BoxWrapperRow gap={4} sx={{ justifyContent: 'space-between' }}>
        <DynamicPieChart
          data={fundsByTokenCategory}
          title="Total funds by token category"
          dataKey="funds"
        />
        <DynamicPieChart
          data={fundsByBlockchain}
          title="Total funds by blockchain"
          dataKey="funds"
        />
        <DynamicPieChart data={fundsByType} title="Total funds by type" dataKey="funds" />
      </BoxWrapperRow>
      <BoxWrapperRow sx={{ justifyContent: 'flex-start' }}>
        <DynamicPieChart
          data={fundsByProtocol}
          title="Farming funds by protocol"
          dataKey="allocation"
          alignLegend={'right'}
        />
      </BoxWrapperRow>
    </BoxWrapperColumn>
  )
}

export default Summary
