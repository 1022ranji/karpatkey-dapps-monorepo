import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'
import dynamic from 'next/dynamic'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import BoxInfoCard from '@karpatkey-monorepo/shared/components/InfoCard'

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie')
)

interface FundsByProtocolContainerProps {
  fundsByProtocol: any[]
  defiResults: number
}

const FundsByProtocolContainer = (props: FundsByProtocolContainerProps) => {
  const { fundsByProtocol, defiResults } = props

  return (
    <PaperSection
      id="Funds and results by position"
      title="Funds and results by position"
      subTitle="Allocated funds by protocol"
      helpInfo="Farming funds, % allocation and results per position. Swap results."
    >
      {!fundsByProtocol || fundsByProtocol.length === 0 ? (
        <EmptyData />
      ) : (
        <BoxWrapperRow sx={{ justifyContent: 'space-evenly' }}>
          <DynamicPieChart
            data={fundsByProtocol}
            dataKey="allocation"
            width={550}
            height={450}
            innerRadius={80}
            outerRadius={150}
          />
          <BoxInfoCard title="DeFi results" value={formatCurrency(defiResults, 0)} />
        </BoxWrapperRow>
      )}
    </PaperSection>
  )
}

export default FundsByProtocolContainer
