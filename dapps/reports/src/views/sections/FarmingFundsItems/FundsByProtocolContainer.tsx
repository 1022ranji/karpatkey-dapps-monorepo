import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { PieChart } from '@karpatkey-monorepo/reports/src/components/Charts/NewPie'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

interface FundsByProtocolContainerProps {
  fundsByProtocol: any[]
  defiResults: number
}

const FundsByProtocolContainer = (props: FundsByProtocolContainerProps) => {
  const { fundsByProtocol } = props

  const isDDay = isYearAndMonthValid()

  return (
    <PaperSection
      id={isDDay ? 'Funds and results by position' : 'Farming funds and results'}
      title={isDDay ? 'Funds and results by position' : 'Farming funds and results'}
      subTitle={isDDay ? 'Allocated funds by protocol' : 'Farming funds by protocol'}
      helpInfo={
        isDDay
          ? 'DeFi funds, % allocation and results per position. Swap results. Operations funds and results per position.'
          : 'Farming funds, % allocation and results per position. Swap results.'
      }
    >
      {!fundsByProtocol || fundsByProtocol.length === 0 ? (
        <EmptyData />
      ) : (
        <BoxWrapperRow sx={{ justifyContent: isDDay ? 'space-evenly' : 'center' }}>
          <PieChart
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
