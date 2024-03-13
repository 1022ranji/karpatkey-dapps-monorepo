import * as React from 'react'
import { PieChart, EmptyData, PaperSection } from 'src/components'
import { isYearAndMonthValid } from 'src/utils/params'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material'

interface FundsByProtocolContainerProps {
  fundsByProtocol: any[]
}

export const FundsByProtocolContainer = (props: FundsByProtocolContainerProps) => {
  const { fundsByProtocol } = props

  const isDDay = isYearAndMonthValid()

  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

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
        <PieChart
          data={fundsByProtocol.map((item) => {
            return {
              name: item.label,
              y: item.allocation,
              color: item.color
            }
          })}
          innerSize={isMD ? '50%' : '45%'}
          outerSize={isMD ? '70%' : '60%'}
          height={isMD ? 560 : 310}
          width={isMD ? 460 : 300}
        />
      )}
    </PaperSection>
  )
}
