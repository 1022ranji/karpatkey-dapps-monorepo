import TokenDetailByPositionContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionContainer'
import TokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailContainer'
import * as React from 'react'

interface TokenDetailsProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
  tokenDetailByPosition: any[]
}

const TokenDetails = (props: TokenDetailsProps) => {
  const { tokenDetails, tokenDetailsGrouped, tokenDetailByPosition } = props
  return (
    <>
      <TokenDetailContainer tokenDetails={tokenDetails} tokenDetailsGrouped={tokenDetailsGrouped} />
      <TokenDetailByPositionContainer tokenDetailByPosition={tokenDetailByPosition} />
    </>
  )
}

export default TokenDetails
