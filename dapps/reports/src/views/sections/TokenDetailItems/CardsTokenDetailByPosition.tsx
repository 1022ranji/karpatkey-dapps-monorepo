import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Divider, Grid } from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

interface CardsTokenDetailByPositionProps {
  tokenDetailByPosition: any[]
}

interface TitleProps {
  title: string
}

const Title = ({ title }: TitleProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '18px',
        color: 'custom.grey.dark'
      }}
    >
      {title}
    </CustomTypography>
  )
}

interface PositionProps {
  position: string
}

const Position = ({ position }: PositionProps) => {
  return (
    <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
      <CustomTypography
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '22px',
          lineHeight: '24px',
          color: 'custom.grey.dark'
        }}
      >
        {position}
      </CustomTypography>
      <OpenInNewIcon fontSize={'small'} />
    </BoxWrapperRow>
  )
}

interface CardBoxPositionProps {
  blockchain: string
  protocol: string
  position: string
  data: {
    [key: string]: {
      [key: string]: {
        tokenBalance: number
        usdValue: number
      }
    }
  }
}

const CardBoxPosition = (props: CardBoxPositionProps) => {
  const { blockchain, protocol, position, data } = props
  return (
    <BoxWrapperColumn
      sx={{
        width: '290px',
        height: 'content-fit',
        padding: '8px 8px',
        border: '1px solid #B6B6B6',
        background: 'background.paper',
        '.MuiBox-root:last-child > hr:last-child': { display: 'none' }
      }}
      gap={2}
    >
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <Title title={blockchain} />
        <Title title={protocol} />
      </BoxWrapperRow>
      <Position position={position} />
      {Object.keys(data)
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((title: string, index: number) => {
          const tokens = data[title as any]
          return <ListItems key={index} title={title} tokens={tokens} />
        })}
    </BoxWrapperColumn>
  )
}

interface ItemTextProps {
  itemText: string
}

const ItemText = ({ itemText }: ItemTextProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
        color: 'custom.grey.dark'
      }}
    >
      {itemText}
    </CustomTypography>
  )
}

interface ItemUSDProps {
  itemUsd: string
}

const ItemUSD = ({ itemUsd }: ItemUSDProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '14px',
        color: '#222222',
        letterSpacing: '-0.02em',
        textAlign: 'end'
      }}
    >
      {itemUsd}
    </CustomTypography>
  )
}

interface ListItemsProps {
  title: string
  tokens: {
    [key: string]: {
      tokenBalance: number
      usdValue: number
    }
  }
}

const ListItems = ({ title, tokens }: ListItemsProps) => {
  return (
    <BoxWrapperColumn sx={{ gap: 2 }}>
      <ItemText itemText={title} />
      <Divider />
      {Object.keys(tokens).map((token: string, index: number) => {
        const tokenData = tokens[token]
        const usdValue = numbro(tokenData.usdValue).formatCurrency({
          spaceSeparated: false,
          thousandSeparated: true,
          mantissa: 0
        })

        return (
          <Box key={index}>
            <BoxWrapperColumn>
              <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
                <ItemText itemText={token} />
                <ItemText itemText={tokenData.tokenBalance.toFixed(2)} />
              </BoxWrapperRow>
              <ItemUSD itemUsd={usdValue} />
            </BoxWrapperColumn>
            <Divider />
          </Box>
        )
      })}
    </BoxWrapperColumn>
  )
}

const CardsTokenDetailByPosition = (props: CardsTokenDetailByPositionProps) => {
  const { tokenDetailByPosition } = props

  return (
    <Grid container spacing={4}>
      {Object.keys(tokenDetailByPosition).map((blockchain: string) => {
        const protocols = Object.keys(tokenDetailByPosition[blockchain as any])
        return protocols.map((protocol: string) => {
          const positions = Object.keys(tokenDetailByPosition[blockchain as any][protocol])
          return positions.map((position: string, index: number) => {
            const data = tokenDetailByPosition[blockchain as any][protocol][position]
            return (
              <Grid item key={index}>
                <CardBoxPosition
                  blockchain={blockchain}
                  protocol={protocol}
                  position={position}
                  data={data}
                />
              </Grid>
            )
          })
        })
      })}
    </Grid>
  )
}

export default CardsTokenDetailByPosition
