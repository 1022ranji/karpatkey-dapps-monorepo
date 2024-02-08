import TokenDetailByPositionContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionContainer'
import TokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailContainer'
import WalletTokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/WalletTokenDetailContainer'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import * as React from 'react'

interface TokenDetailsProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
  tokenDetailByPosition: any[]
  walletTokenDetail: any[]
}

const TokenDetails = (props: TokenDetailsProps) => {
  const { tokenDetails, tokenDetailsGrouped, tokenDetailByPosition, walletTokenDetail } = props

  return (
    <>
      <AnimatePresenceWrapper>
        <TokenDetailContainer
          tokenDetails={tokenDetails}
          tokenDetailsGrouped={tokenDetailsGrouped}
        />
      </AnimatePresenceWrapper>
      <TokenDetailByPositionContainer tokenDetailByPosition={tokenDetailByPosition} />
      <AnimatePresenceWrapper>
        <WalletTokenDetailContainer walletTokenDetail={walletTokenDetail} />
      </AnimatePresenceWrapper>
    </>
  )
}

export default TokenDetails
