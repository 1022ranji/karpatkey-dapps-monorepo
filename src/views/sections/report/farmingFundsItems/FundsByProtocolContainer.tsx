import * as React from 'react'
import { PieChart, EmptyData, PaperSection } from 'src/components'
import { isYearAndMonthValid } from 'src/utils/params'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material'
import Box from '@mui/material/Box'

interface FundsByProtocolContainerProps {
  fundsByProtocol: any[]
}

export const FundsByProtocolContainer = (props: FundsByProtocolContainerProps) => {
  const { fundsByProtocol } = props

  const isDDay = isYearAndMonthValid()

  const isBreakpointOne = useMediaQuery((theme: Theme) => theme.breakpoints.up(1000))
  const isBreakpointTwo = useMediaQuery((theme: Theme) => theme.breakpoints.up(720))
  const isBreakpointThree = useMediaQuery((theme: Theme) => theme.breakpoints.up(480))

  const settingsSize = {
    innerSize: isBreakpointOne
      ? '50%'
      : isBreakpointTwo
        ? '45%'
        : isBreakpointThree
          ? '40%'
          : '35%',
    outerSize: isBreakpointOne ? '75%' : isBreakpointTwo ? '70%' : isBreakpointThree ? '65%' : '60%'
  }

  const settingsHeightWidth = {
    width: isBreakpointOne ? 700 : isBreakpointTwo ? 500 : isBreakpointThree ? 470 : 360,
    height: isBreakpointOne ? 560 : isBreakpointTwo ? 500 : isBreakpointThree ? 470 : 360
  }

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
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PieChart
            data={fundsByProtocol.map((item) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            innerSize={settingsSize.innerSize}
            outerSize={settingsSize.outerSize}
            width={settingsHeightWidth.width}
            height={settingsHeightWidth.height}
            centered={true}
          />
        </Box>
      )}
    </PaperSection>
  )
}
