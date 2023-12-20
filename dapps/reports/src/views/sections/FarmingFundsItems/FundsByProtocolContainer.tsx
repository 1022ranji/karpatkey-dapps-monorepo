import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'
import dynamic from 'next/dynamic'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie')
)

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
          <DynamicPieChart
            data={fundsByProtocol}
            dataKey="allocation"
            width={550}
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
