import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicOther = dynamic(() => import('@karpatkey-monorepo/reports/src/views/treasury/Other'))

export default function Other() {
  return (
    <ContainerWrapper>
      <DynamicOther />
    </ContainerWrapper>
  )
}
