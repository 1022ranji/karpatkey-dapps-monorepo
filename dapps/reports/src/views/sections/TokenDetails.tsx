import TokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailContainer'
import * as React from 'react'

import TokenDetailByPositionContainer from './TokenDetailItems/TokenDetailByPositionContainer'

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
