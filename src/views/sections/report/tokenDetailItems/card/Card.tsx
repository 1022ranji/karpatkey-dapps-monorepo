import { formatCurrency, formatNumber } from 'src/utils/format'
import { ItemText } from './ItemText'
import { Position } from './Position'
import { ProtocolIcon } from './ProtocolIcon'
import { Title } from './Title'
import { BoxWrapperColumn, BoxWrapperRow, UniswapHelpText } from 'src/components'
import * as React from 'react'
import { Common } from './Common'
import { Ratios } from './Ratios'
import { UNISWAP_PROTOCOL } from 'src/config/constants'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'

interface CardItemProps {
  id: number
  card: any
}

export const Card = (props: CardItemProps) => {
  const { card } = props
  const { blockchain, protocol, position, totalUsdValue, cardType, categories, deFiType } = card

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  const helpText = <UniswapHelpText />

  return (
    <BoxWrapperColumn gap={4}>
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
  )
}
