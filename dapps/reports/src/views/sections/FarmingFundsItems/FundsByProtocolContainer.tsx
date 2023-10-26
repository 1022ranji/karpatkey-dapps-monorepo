import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { PieChart } from '@karpatkey-monorepo/reports/src/components/Charts/NewPie'

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
      helpInfo="Farming funds, % allocation and results per position. Swap results."
    >
      {!fundsByProtocol || fundsByProtocol.length === 0 ? (
        <EmptyData />
      ) : (
        <BoxWrapperRow sx={{ justifyContent: 'center' }}>
          <PieChart
            title="Total funds by type"
            data={fundsByProtocol.map((item) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            innerSize="60%"
            outerSize="90%"
            width={550}
            height={450}
          />
        </BoxWrapperRow>
      )}
    </PaperSection>
  )
}

export default FundsByProtocolContainer
