import CardList from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/CardList'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'

interface TokenDetailByPositionContainerProps {
  tokenDetailByPosition: any[]
}

const TokenDetailByPositionContainer = (props: TokenDetailByPositionContainerProps) => {
  const { tokenDetailByPosition = [] } = props

  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)
  const [protocolFilter, setProtocolFilter] = React.useState<Maybe<string>>(null)
  const [tokenFilter, setTokenFilter] = React.useState<Maybe<string>>(null)

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
  }

  const onSubmitClose = (params: any) => {
    const { blockchain, protocol, token } = params
    setBlockchainFilter(blockchain)
    setProtocolFilter(protocol)
    setTokenFilter(token)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const filteredDataByBlockchain = Object.keys(tokenDetailByPosition).reduce(
    (acc: any, key: string) => {
      if (blockchainFilter) {
        if (key.toLowerCase() === blockchainFilter.toLowerCase()) {
          return {
            [key]: tokenDetailByPosition[key as keyof typeof tokenDetailByPosition]
          }
        }
        return acc
      } else {
        return tokenDetailByPosition
      }
    },
    []
  )

  const filteredDataByProtocol = Object.keys(filteredDataByBlockchain).reduce(
    (acc: any, key: string) => {
      const protocols = Object.keys(
        tokenDetailByPosition[key as keyof typeof tokenDetailByPosition]
      )
      const filteredProtocols = protocols.reduce((acc: any, protocol) => {
        if (protocolFilter) {
          if (protocol.toLowerCase() === protocolFilter.toLowerCase()) {
            return {
              [protocol]:
                tokenDetailByPosition[key as keyof typeof tokenDetailByPosition][
                  protocol as keyof (typeof tokenDetailByPosition)[keyof typeof tokenDetailByPosition]
                ]
            }
          }
          return acc
        } else {
          return tokenDetailByPosition[key as keyof typeof tokenDetailByPosition]
        }
      }, [])
      return {
        ...acc,
        [key]: filteredProtocols
      }
    },
    []
  )

  const defaultBlockchainValue = blockchainFilter
    ? {
        logo:
          blockchainFilter === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : blockchainFilter === 'Gnosis'
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

  const blockchainOptions = Object.keys(tokenDetailByPosition)
    .map((key) => {
      return {
        logo:
          key === 'Ethereum'
            ? '/images/chains/ethereum.svg'
            : key === 'Gnosis'
            ? '/images/chains/gnosis.svg'
            : '/images/chains/all.svg',
        label: key,
        id: key
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label))

  const protocolOptions = Object.keys(tokenDetailByPosition)
    .reduce((acc: any, key: string) => {
      const protocols = Object.keys(
        tokenDetailByPosition[key as keyof typeof tokenDetailByPosition]
      )
      const protocolOptions = protocols.map((protocol) => {
        return {
          label: protocol,
          id: protocol
        }
      })

      return [...acc, ...protocolOptions]
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label))

  const filter = (
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
    >
      <Form
        blockchainOptions={blockchainOptions}
        protocolOptions={protocolOptions}
        tokenOptions={[]}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        defaultProtocolValue={defaultProtocolValue}
        defaultTokenValue={defaultTokenValue}
        enableBlockchain
        enableProtocol
        enableToken
      />
    </Filter>
  )

  return (
    <PaperSection subTitle="Token detail by position" filter={filter}>
      {Object.keys(filteredDataByProtocol).length > 0 ? (
        <CardList tokenDetailByPosition={filteredDataByProtocol} />
      ) : (
        <EmptyData />
      )}
    </PaperSection>
  )
}

export default TokenDetailByPositionContainer
