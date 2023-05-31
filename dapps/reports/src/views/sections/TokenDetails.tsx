import TokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailContainer'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import * as React from 'react'

interface TokenDetailsProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
}

const TokenDetails = (props: TokenDetailsProps) => {
  const { tokenDetails, tokenDetailsGrouped } = props
  return (
    <PaperSection title="Token details">
      <BoxWrapperColumn gap={10}>
        <TokenDetailContainer
          tokenDetails={tokenDetails}
          tokenDetailsGrouped={tokenDetailsGrouped}
        />
      </BoxWrapperColumn>
    </PaperSection>
  )
}

export default TokenDetails
