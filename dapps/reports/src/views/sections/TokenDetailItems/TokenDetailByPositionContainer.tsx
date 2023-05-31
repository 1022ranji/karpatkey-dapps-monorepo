import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import * as React from 'react'

const TokenDetailByPositionContainer = () => {
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

  const onSubmitClose = (params: any) => {
    const { blockchain, protocol, token } = params
    setBlockchainFilter(blockchain)
    setProtocolFilter(protocol)
    setTokenFilter(token)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const defaultBlockchainValue = blockchainFilter
    ? {
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

  const filter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
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
        blockchainOptions={[]}
        protocolOptions={[]}
        tokenOptions={[]}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        defaultProtocolValue={defaultProtocolValue}
        defaultTokenValue={defaultTokenValue}
      />
    </Filter>
  )

  return (
    <PaperSection subTitle="Token detail by position" filter={filter}>
      something
    </PaperSection>
  )
}

export default TokenDetailByPositionContainer
