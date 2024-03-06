import { TokenDetailByPositionContainer } from 'src/views/sections/report/tokenDetailItems/TokenDetailByPositionContainer'
import { TokenDetailContainer } from 'src/views/sections/report/tokenDetailItems/TokenDetailContainer'
import { WalletTokenDetailContainer } from 'src/views/sections/report/tokenDetailItems/WalletTokenDetailContainer'
import { AnimatePresenceWrapper } from 'src/components'
import * as React from 'react'

interface TokenDetailsProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
  tokenDetailByPosition: any[]
  walletTokenDetail: any[]
}

export const TokenDetails = (props: TokenDetailsProps) => {
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
