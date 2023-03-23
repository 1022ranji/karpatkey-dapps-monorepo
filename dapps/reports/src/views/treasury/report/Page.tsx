import PieChart from '@karpatkey-monorepo/reports/src/components/Charts/Pie'
import { TReportFilter, TReportProps } from '@karpatkey-monorepo/reports/src/types'
import Breadcrumb from '@karpatkey-monorepo/reports/src/views/treasury/report/Breadcrumb'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTitle = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Title')
)
const DynamicFilter = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Filter')
)
const DynamicCopy = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Copy')
)

const Page = (props: TReportProps) => {
  const { summaryData, chainId, periodType, daoAddress, period } = props
  const paramProps = { chainId, periodType, daoAddress, period }
  return (
    <>
      <BoxWrapperRow sx={{ paddingY: 4 }}>
        <DynamicTitle periodType={periodType} daoAddress={daoAddress} chainId={chainId} />
      </BoxWrapperRow>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ paddingY: 2 }}
      >
        <Breadcrumb {...(paramProps as TReportFilter)} />
        <BoxWrapperRow gap={2}>
          <DynamicFilter {...(paramProps as TReportFilter)} />
          <DynamicCopy {...(paramProps as TReportFilter)} />
        </BoxWrapperRow>
      </Box>

      <PaperSection title="1. Portfolio Summary">
        <Box sx={{ height: 350, width: '100%' }}>
          <PieChart data={summaryData} />
        </Box>
      </PaperSection>
      <PaperSection title="2. Revenues">TODO</PaperSection>
      <PaperSection title="3. Positions">TODO</PaperSection>
      <PaperSection title="4. Portfolio">TODO</PaperSection>
      <PaperSection title="5. Treasury variation">TODO</PaperSection>
    </>
  )
}

export default Page
