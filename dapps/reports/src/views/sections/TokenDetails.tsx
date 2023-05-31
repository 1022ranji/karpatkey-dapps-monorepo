import TokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailContainer'
import * as React from 'react'

interface TokenDetailsProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
}

const TokenDetails = (props: TokenDetailsProps) => {
  const { tokenDetails, tokenDetailsGrouped } = props
  return (
    <TokenDetailContainer tokenDetails={tokenDetails} tokenDetailsGrouped={tokenDetailsGrouped} />
  )
}

export default TokenDetails
