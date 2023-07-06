import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'
import dynamic from 'next/dynamic'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie')
)

interface FundsByProtocolContainerProps {
  fundsByProtocol: any[]
}

const FundsByProtocolContainer = (props: FundsByProtocolContainerProps) => {
  const { fundsByProtocol } = props

  return (
    <PaperSection
      id="Farming funds and results"
      title="Farming funds and results"
      subTitle="Farming funds by protocol"
      helpInfo="Farming funds, % allocation and results per position.  Detail by rewards and fees/rebasing/pool token variation. Swap results."
    >
      {!fundsByProtocol || fundsByProtocol.length === 0 ? (
        <EmptyData />
      ) : (
        <BoxWrapperRow sx={{ justifyContent: 'center' }}>
          <DynamicPieChart
            data={fundsByProtocol}
            dataKey="allocation"
            width={450}
            height={450}
            innerRadius={80}
            outerRadius={150}
          />
        </BoxWrapperRow>
      )}
    </PaperSection>
  )
}

export default FundsByProtocolContainer
