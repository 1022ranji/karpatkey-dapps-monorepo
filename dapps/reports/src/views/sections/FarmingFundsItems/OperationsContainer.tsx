import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import { getOperationsDetailTotals } from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTableOperations = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/TableOperations')
)

interface ResultsContainerProps {
  operationDetails: any[]
}

const OperationsContainer = (props: ResultsContainerProps) => {
  const { operationDetails } = props

  const totals = getOperationsDetailTotals(operationDetails)

  return (
    <PaperSection subTitle="Operations funds/results by position">
      {operationDetails.length === 0 ? (
        <EmptyData />
      ) : (
        <DynamicTableOperations {...{ operationDetails, totals }} />
      )}
    </PaperSection>
  )
}

export default OperationsContainer
