import { CardList } from './CardList'
import { PaperSection, Form, Filter, EmptyData } from 'src/components'
import * as React from 'react'
import { isFeatureFlagOne } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'
import { FilterContent } from 'components/filters/mobile/FilterContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material'

interface TokenDetailByPositionContainerProps {
  tokenDetailByPosition: any[]
}

export const TokenDetailByPositionContainer = (props: TokenDetailByPositionContainerProps) => {
  const { tokenDetailByPosition = [] } = props

  const isDDay = isFeatureFlagOne()

  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)
  const [protocolFilter, setProtocolFilter] = React.useState<Maybe<string>>(null)
  const [tokenFilter, setTokenFilter] = React.useState<Maybe<string>>(null)
  const [deFiTypeFilter, setDeFiTypeFilter] = React.useState<Maybe<string>>(null)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    setBlockchainFilter(null)
    setProtocolFilter(null)
    setTokenFilter(null)
    setDeFiTypeFilter(null)
  }

  const onSubmitClose = (params: any) => {
    const { blockchain, protocol, token, deFiType } = params
    setBlockchainFilter(blockchain)
    setProtocolFilter(protocol)
    setTokenFilter(token)
    setDeFiTypeFilter(deFiType)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const filteredDataByBlockchainAndProtocolAndToken = React.useMemo(() => {
    return tokenDetailByPosition.filter((item: any) => {
      const { blockchain, protocol, deFiType, categories = [] } = item
      const isBlockchainFilter = blockchainFilter ? blockchainFilter === blockchain : true
      const isProtocolFilter = protocolFilter ? protocolFilter === protocol : true
      const isDeFiTypeFilter = deFiTypeFilter ? deFiTypeFilter === deFiType : true

      const isTokenFilter = categories.reduce((acc: boolean, category: any) => {
        const { tokens = [] } = category
        const isToken = tokens.reduce((acc: boolean, token: any) => {
          const { symbol } = token
          const isSymbol = tokenFilter ? symbol === tokenFilter : true
          return acc || isSymbol
        }, false)
        return acc || isToken
      }, false)

      return isBlockchainFilter && isProtocolFilter && isTokenFilter && isDeFiTypeFilter
    })
  }, [blockchainFilter, protocolFilter, tokenFilter, deFiTypeFilter, tokenDetailByPosition])

  const defaultBlockchainValue = blockchainFilter
    ? {
        logo:
          blockchainFilter.toLowerCase() === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : blockchainFilter.toLowerCase() === 'gnosis'
              ? '/images/chains/gnosis.svg'
              : '/images/chains/all.svg',
        label: blockchainFilter,
        id: blockchainFilter
      }
    : null

  const defaultProtocolValue = protocolFilter
    ? {
        label: protocolFilter,
        id: protocolFilter
      }
    : null

  const defaultTokenValue = tokenFilter
    ? {
        label: tokenFilter,
        id: tokenFilter
      }
    : null

  const defaultDeFiTypeValue = deFiTypeFilter
    ? {
        label: deFiTypeFilter,
        id: deFiTypeFilter
      }
    : null

  const blockchainOptions = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { blockchain } = item
      if (!acc.includes(blockchain) && blockchain) {
        acc.push(blockchain)
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        logo:
          key.toLowerCase() === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : key.toLowerCase() === 'gnosis'
              ? '/images/chains/gnosis.svg'
              : '/images/chains/all.svg',
        label: key,
        id: key
      }
    })
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const protocolOptions = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { protocol } = item
      if (!acc.includes(protocol) && protocol) {
        acc.push(protocol)
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        label: key,
        id: key
      }
    }, [])
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const tokenOptions: any[] = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { categories } = item
      if (categories && categories.length > 0) {
        categories.forEach(({ tokens }: any) => {
          tokens?.forEach(({ symbol }: any) => {
            if (!acc.includes(symbol) && symbol) {
              acc.push(symbol)
            }
          })
        })
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        label: key,
        id: key
      }
    })
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const deFiTypeOptions = tokenDetailByPosition
    .reduce((acc: any, item: any) => {
      const { deFiType } = item
      if (!acc.includes(deFiType) && deFiType) {
        acc.push(deFiType)
      }
      return acc
    }, [])
    .map((key: string) => {
      return {
        label: key,
        id: key
      }
    })
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const CommonFilter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      blockchain={blockchainFilter}
      protocol={protocolFilter}
      token={tokenFilter}
      enableBlockchain
      enableProtocol
      enableToken
      {...(isDDay ? { enableDeFiType: true, deFiType: deFiTypeFilter } : {})}
      tooltipText={'Clear filter'}
    >
      <Form
        blockchainOptions={blockchainOptions}
        protocolOptions={protocolOptions}
        tokenOptions={tokenOptions}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        defaultProtocolValue={defaultProtocolValue}
        defaultTokenValue={defaultTokenValue}
        enableBlockchain
        enableProtocol
        enableToken
        {...(isDDay ? { enableDeFiType: true, defaultDeFiTypeValue, deFiTypeOptions } : {})}
        buttonTitle={'Apply filter'}
      />
    </Filter>
  )

  const MobileFilter = (
    <FilterContent
      enableBlockchain={true}
      enableProtocol={true}
      enableToken={true}
      {...(isDDay
        ? { enableDeFiType: true, defaultDeFiTypeValue: defaultDeFiTypeValue?.id, deFiTypeOptions }
        : {})}
      blockchainOptions={blockchainOptions}
      protocolOptions={protocolOptions}
      tokenOptions={tokenOptions}
      defaultBlockchainValue={defaultBlockchainValue?.id}
      defaultProtocolValue={defaultProtocolValue?.id}
      defaultTokenValue={defaultTokenValue?.id}
      handleClear={handleClear}
      handleClick={onSubmitClose}
    />
  )

  const { state } = useApp()
  const { currency } = state

  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <PaperSection
      subTitle={currency === 'USD' ? 'Token detail by position' : 'Token detail by position (ETH)'}
      filter={isMD ? CommonFilter : MobileFilter}
    >
      {filteredDataByBlockchainAndProtocolAndToken &&
      filteredDataByBlockchainAndProtocolAndToken.length > 0 ? (
        <CardList tokenDetailByPosition={filteredDataByBlockchainAndProtocolAndToken} />
      ) : (
        <EmptyData />
      )}
    </PaperSection>
  )
}
