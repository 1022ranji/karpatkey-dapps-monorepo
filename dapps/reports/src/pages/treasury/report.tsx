import BarChart from '@karpatkey-monorepo/reports/src/components/Charts/Bar'
import PieChart from '@karpatkey-monorepo/reports/src/components/Charts/Pie'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import Table from '@karpatkey-monorepo/shared/components/Table'
import { getCommonServerSideProps } from '@karpatkey-monorepo/shared/utils'
import {
  mapDataToPie,
  mapDataToTable,
  reducerPositionsByProtocolAndAsset,
  reducerTotalBalancesByAsset
} from '@karpatkey-monorepo/shared/utils/mappers'
import Box from '@mui/material/Box'
import { DateTime } from 'luxon'
import * as React from 'react'

const revenueModules = [
  {
    title: 'Farming funds',
    value: '$3,789,582'
  },
  {
    title: 'Capital utilisation',
    value: '84.18%'
  },
  {
    title: 'Average APR',
    value: '12.18%'
  },
  {
    title: 'Weekly revenue',
    value: '$1,789,582'
  }
]

const BarData = [
  {
    country: 'AD',
    'hot dog': 22,
    'hot dogColor': 'hsl(190, 70%, 50%)',
    burger: 53,
    burgerColor: 'hsl(86, 70%, 50%)',
    sandwich: 142,
    sandwichColor: 'hsl(303, 70%, 50%)',
    kebab: 128,
    kebabColor: 'hsl(68, 70%, 50%)',
    fries: 147,
    friesColor: 'hsl(15, 70%, 50%)',
    donut: 26,
    donutColor: 'hsl(89, 70%, 50%)'
  },
  {
    country: 'AE',
    'hot dog': 66,
    'hot dogColor': 'hsl(88, 70%, 50%)',
    burger: 55,
    burgerColor: 'hsl(38, 70%, 50%)',
    sandwich: 33,
    sandwichColor: 'hsl(338, 70%, 50%)',
    kebab: 102,
    kebabColor: 'hsl(12, 70%, 50%)',
    fries: 18,
    friesColor: 'hsl(302, 70%, 50%)',
    donut: 2,
    donutColor: 'hsl(257, 70%, 50%)'
  },
  {
    country: 'AF',
    'hot dog': 18,
    'hot dogColor': 'hsl(37, 70%, 50%)',
    burger: 189,
    burgerColor: 'hsl(242, 70%, 50%)',
    sandwich: 91,
    sandwichColor: 'hsl(238, 70%, 50%)',
    kebab: 83,
    kebabColor: 'hsl(284, 70%, 50%)',
    fries: 101,
    friesColor: 'hsl(352, 70%, 50%)',
    donut: 113,
    donutColor: 'hsl(244, 70%, 50%)'
  },
  {
    country: 'AG',
    'hot dog': 113,
    'hot dogColor': 'hsl(59, 70%, 50%)',
    burger: 174,
    burgerColor: 'hsl(139, 70%, 50%)',
    sandwich: 64,
    sandwichColor: 'hsl(90, 70%, 50%)',
    kebab: 31,
    kebabColor: 'hsl(207, 70%, 50%)',
    fries: 107,
    friesColor: 'hsl(239, 70%, 50%)',
    donut: 132,
    donutColor: 'hsl(313, 70%, 50%)'
  },
  {
    country: 'AI',
    'hot dog': 123,
    'hot dogColor': 'hsl(251, 70%, 50%)',
    burger: 125,
    burgerColor: 'hsl(220, 70%, 50%)',
    sandwich: 80,
    sandwichColor: 'hsl(223, 70%, 50%)',
    kebab: 157,
    kebabColor: 'hsl(21, 70%, 50%)',
    fries: 54,
    friesColor: 'hsl(154, 70%, 50%)',
    donut: 108,
    donutColor: 'hsl(73, 70%, 50%)'
  },
  {
    country: 'AL',
    'hot dog': 11,
    'hot dogColor': 'hsl(38, 70%, 50%)',
    burger: 34,
    burgerColor: 'hsl(214, 70%, 50%)',
    sandwich: 71,
    sandwichColor: 'hsl(233, 70%, 50%)',
    kebab: 80,
    kebabColor: 'hsl(157, 70%, 50%)',
    fries: 166,
    friesColor: 'hsl(156, 70%, 50%)',
    donut: 120,
    donutColor: 'hsl(5, 70%, 50%)'
  },
  {
    country: 'AM',
    'hot dog': 149,
    'hot dogColor': 'hsl(193, 70%, 50%)',
    burger: 31,
    burgerColor: 'hsl(358, 70%, 50%)',
    sandwich: 118,
    sandwichColor: 'hsl(237, 70%, 50%)',
    kebab: 175,
    kebabColor: 'hsl(94, 70%, 50%)',
    fries: 183,
    friesColor: 'hsl(203, 70%, 50%)',
    donut: 23,
    donutColor: 'hsl(232, 70%, 50%)'
  }
]

interface IReportProps {
  portfolioSummaryData: any[]
  positionsData: any[]
}

export default function Report({ portfolioSummaryData }: IReportProps) {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <CustomTypography color="textSecondary" variant="h4" textAlign="left">
          A week in karpatkey farms - {DateTime.now().toISODate()}
        </CustomTypography>
        <PaperSection title="1. Portfolio Summary">
          <Box sx={{ height: 350, width: '100%' }}>
            <PieChart data={portfolioSummaryData} />
          </Box>
          <Table />
        </PaperSection>
        <PaperSection title="2. Revenues">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {revenueModules.map(({ title, value }, index) => (
              <Box
                key={`${value}-${index}`}
                display={'flex'}
                flexDirection="column"
                alignItems={'center'}
              >
                <CustomTypography color="textSecondary" variant="h6" textAlign="left">
                  {title}
                </CustomTypography>
                <CustomTypography color="textSecondary" variant="h6" textAlign="left">
                  {value}
                </CustomTypography>
              </Box>
            ))}
          </Box>
          <Box sx={{ height: 350, width: '100%' }}>
            <BarChart data={BarData} />
          </Box>
        </PaperSection>
        <PaperSection title="3. Positions">
          <Table />
        </PaperSection>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}

export async function getServerSideProps() {
  const rows: any[] = getCommonServerSideProps({ daily: false, daoName: 'Karpatkey' })

  // Step 3: Reduce the data to a single object with the total balances by asset
  const parsedRowsReduced = rows.reduce(reducerTotalBalancesByAsset, {})
  const portfolioSummaryData = mapDataToPie(parsedRowsReduced)

  // Step 4: Reduce the data to a collection of positions by protocol and asset, and then map it to the table data
  const parsedRowsReducedByProtocol = rows.reduce(reducerPositionsByProtocolAndAsset, {})
  const positionsData = mapDataToTable(parsedRowsReducedByProtocol)

  // Pass data to the page via props
  return { props: { portfolioSummaryData, positionsData } }
}