import ChartLabels from '@karpatkey-monorepo/reports/src/components/Charts/ChartLabels'
import { TReportFilter, TReportProps } from '@karpatkey-monorepo/reports/src/types'
import Breadcrumb from '@karpatkey-monorepo/reports/src/views/treasury/report/Breadcrumb'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
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
const DynamicSummary = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Summary'),
  {
    loading: () => (
      <CustomTypography
        color="textSecondary"
        variant="body1"
        justifyContent="center"
        textAlign="center"
      >
        Loading...
      </CustomTypography>
    )
  }
)
const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/PieChart'),
  {
    loading: () => (
      <CustomTypography
        color="textSecondary"
        variant="body1"
        justifyContent="center"
        textAlign="center"
      >
        Loading...
      </CustomTypography>
    )
  }
)

const Page = (props: TReportProps) => {
  const { chainId, periodType, daoAddress, period, data } = props
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
        <BoxWrapperRow
          sx={(theme) => ({
            flexDirection: 'row',
            [theme.breakpoints.down('lg')]: {
              flexDirection: 'column'
            }
          })}
        >
          <BoxWrapperRow
            sx={(theme) => ({
              width: '50%',
              paddingRight: '2rem',
              [theme.breakpoints.down('lg')]: {
                width: '100%',
                paddingLeft: 0
              }
            })}
          >
            <DynamicPieChart data={data} sx={{ width: '80%' }} />
            <ChartLabels data={data} sx={{ width: '20%' }} />
          </BoxWrapperRow>
          <Box
            sx={(theme) => ({
              width: '50%',
              paddingLeft: '2rem',
              [theme.breakpoints.down('lg')]: {
                width: '100%',
                paddingLeft: 0
              }
            })}
          >
            <DynamicSummary data={data} />
          </Box>
        </BoxWrapperRow>
      </PaperSection>
      <PaperSection title="2. Revenues">TODO</PaperSection>
      <PaperSection title="3. Positions">TODO</PaperSection>
      <PaperSection title="4. Portfolio">TODO</PaperSection>
      <PaperSection title="5. Treasury variation">TODO</PaperSection>
    </>
  )
}

export default Page
