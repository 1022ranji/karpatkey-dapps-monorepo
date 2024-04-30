import { formatCurrency, formatNumber } from '../../../../../../utils/format'
import { ItemText } from './ItemText'
import { Position } from './Position'
import { ProtocolIcon } from './ProtocolIcon'
import { Title } from './Title'
import { BoxWrapperColumn, BoxWrapperRow, UniswapHelpText } from 'components/index'
import * as React from 'react'
import { Common } from './Common'
import { Ratios } from './Ratios'
import { UNISWAP_PROTOCOL } from '../../../../../../config/constants'
import { isYearAndMonthValid } from '../../../../../../utils/params'
import { useApp } from '../../../../../../contexts/app.context'
import Box from '@mui/material/Box'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

interface CardItemProps {
  id: number
  card: any
  goToTop: boolean
}

export const Card = (props: CardItemProps) => {
  const { card, goToTop } = props
  const { blockchain, protocol, position, totalUsdValue, cardType, categories, deFiType } = card

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  const helpText = <UniswapHelpText />

  const [isOnTop, setOnTop] = React.useState(true)
  const [isAtBottom, setAtBottom] = React.useState(false)

  const scrollDown = React.useCallback((e: any) => {
    // check if scroll finish at bottom
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    // check if scroll finish at top

    const top = e.target.scrollTop === 0

    setOnTop(top)
    setAtBottom(bottom)
  }, [])

  React.useEffect(() => {
    const scrollable = document.getElementById(`scrollable_${props.id}`)
    if (scrollable) {
      scrollable.scrollTop = 0
    }
  }, [goToTop, props.id])

  const hideScrollButton = React.useMemo(() => {
    const element = document.getElementById(`scrollable_${props.id}`)
    if (element) {
      const scrollHeight = element.scrollHeight
      const clientHeight = element.clientHeight
      return scrollHeight <= clientHeight
    }
  }, [categories])

  return (
    <BoxWrapperColumn gap={5}>
      <BoxWrapperColumn gap={4} sx={{ minHeight: '150px', height: '150px', maxHeight: '240px' }}>
        {!isDDay ? (
          <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
            <Title title={blockchain} />
            <BoxWrapperRow gap={1}>
              <ProtocolIcon protocol={protocol} />
              <Title title={protocol} />
            </BoxWrapperRow>
          </BoxWrapperRow>
        ) : (
          <BoxWrapperRow sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <BoxWrapperColumn gap={1}>
              <Title title={blockchain} />
              <BoxWrapperRow gap={1}>
                <ProtocolIcon protocol={protocol} />
                <Title title={protocol} />
              </BoxWrapperRow>
            </BoxWrapperColumn>
            <Title title={deFiType} />
          </BoxWrapperRow>
        )}

        <BoxWrapperColumn gap={1}>
          <Position position={position} {...(protocol === UNISWAP_PROTOCOL ? { helpText } : {})} />
          <ItemText
            maxWidth={'fit-content'}
            itemText={
              currency === 'USD'
                ? formatCurrency(totalUsdValue || 0, 2)
                : `${formatNumber(totalUsdValue, 2)} ETH`
            }
          />
        </BoxWrapperColumn>
      </BoxWrapperColumn>

      <BoxWrapperColumn
        gap={4}
        sx={{
          minHeight: '200px',
          height: '200px',
          maxHeight: '200px',
          position: 'relative'
        }}
      >
        <Box
          id="scrollUp"
          sx={{
            position: 'absolute',
            top: '5px',
            margin: 0,
            padding: 0,
            left: 'calc(45% - 10px)',
            animation: 'jumpInfiniteUp 1.5s infinite',
            display: hideScrollButton || isOnTop ? 'none' : 'block'
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: '20px', color: '#232323' }} />
        </Box>

        <Box
          id="scrollDown"
          sx={{
            position: 'absolute',
            bottom: '5px',
            margin: 0,
            padding: 0,
            left: 'calc(45% - 10px)',
            animation: 'jumpInfiniteDown 1.5s infinite',
            display: hideScrollButton || isAtBottom ? 'none' : 'block'
          }}
        >
          <ArrowDownwardIcon sx={{ fontSize: '20px', color: '#232323' }} />
        </Box>

        <BoxWrapperColumn
          gap={2}
          id={`scrollable_${props.id}`}
          onScroll={scrollDown}
          sx={{
            paddingRight: '10px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '5px',
              padding: '10px',
              margin: '10px'
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#d3d3d3'
              // borderRadius: '10px'
            }
          }}
        >
          {cardType === 'common' &&
            categories
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((category: any, index: number) => {
                const { name, tokens } = category
                if (tokens && tokens.length > 0) {
                  return <Common key={index} title={name} tokens={tokens} />
                } else {
                  return null
                }
              })}
          {cardType === 'metrics' &&
            categories
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((category: any, index: number) => {
                const { name, tokens, ratios } = category
                if (name === 'Ratios') {
                  if (ratios && ratios.length > 0) {
                    return <Ratios key={index} title={name} ratios={ratios} />
                  } else {
                    return null
                  }
                } else {
                  if (tokens && tokens.length > 0) {
                    return <Common key={index} title={name} tokens={tokens} />
                  } else {
                    return null
                  }
                }
              })}
        </BoxWrapperColumn>
      </BoxWrapperColumn>
    </BoxWrapperColumn>
  )
}
