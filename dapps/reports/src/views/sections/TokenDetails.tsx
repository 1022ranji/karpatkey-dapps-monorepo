import TokenDetailContainer from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails/TokenDetailContainer'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import * as React from 'react'

interface TokenDetailsProps {
  tokenDetails: any[]
}

const TokenDetails = (props: TokenDetailsProps) => {
  const { tokenDetails } = props
  return (
    <PaperSection title="Token details">
      <BoxWrapperColumn gap={10}>
        <TokenDetailContainer tokenDetails={tokenDetails} />
      </BoxWrapperColumn>
    </PaperSection>
  )
}

export default TokenDetails
