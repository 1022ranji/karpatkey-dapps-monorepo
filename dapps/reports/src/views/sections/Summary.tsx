import {formatCurrency, formatPercentage} from '@karpatkey-monorepo/reports/src/utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import * as React from 'react'
import { Box } from '@mui/material'
import BoxPieChart from '@karpatkey-monorepo/reports/src/components/Charts/Pie'
import BoxInfoCard from '@karpatkey-monorepo/shared/components/InfoCard'
import {PieChart} from '@karpatkey-monorepo/reports/src/components/Charts/NewPie'

interface SummaryProps {
  totalFunds: number
  capitalUtilization: number
  globalROI: number
  farmingResults: number
  fundsByTokenCategory: any[]
  fundsByType: any[]
  fundsByBlockchain: any[]
  balanceOverviewType: any[]
}

const Summary = (props: SummaryProps) => {
  const {
    totalFunds,
    capitalUtilization,
    globalROI,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    balanceOverviewType
  } = props

  /* eslint-disable */
  const negativeTotalValue = balanceOverviewType.find((item) => item.Total < 0)

  console.log('fundsByTokenCategory', fundsByTokenCategory)
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{margin: '30px 30px'}} gap={10}>
        <Box
          id="summary"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            gap: 10
          }}
        >
          <BoxInfoCard title="Total funds" value={formatCurrency(totalFunds)}/>
          <BoxInfoCard
            title="Capital utilisation"
            value={formatPercentage(capitalUtilization, 1)}
          />
          <BoxInfoCard title="Farming results" value={formatCurrency(farmingResults)}/>
          <BoxInfoCard
            title="APY"
            value={formatPercentage(globalROI)}
            helpInfo="This value is calculated as (1+(Farming Results / Initial Balance at Final Prices))^12-1."
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            gap: 10
          }}
        >
          <PieChart
            title="Total funds by blockchain"
            data={fundsByTokenCategory.map((item) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            width={400}
            height={350}
          />
          {/*<BoxPieChart*/}
          {/*  data={fundsByTokenCategory}*/}
          {/*  title="Total funds by token category"*/}
          {/*  dataKey="funds"*/}
          {/*  width={400}*/}
          {/*  height={350}*/}
          {/*  innerRadius={40}*/}
          {/*  outerRadius={100}*/}
          {/*  {...(negativeTotalValue*/}
          {/*    ? {*/}
          {/*        footerMessage: (*/}
          {/*          <CustomTypography*/}
          {/*            variant={'body2'}*/}
          {/*            color="textSecondary"*/}
          {/*            sx={{*/}
          {/*              fontFamily: 'IBM Plex Sans',*/}
          {/*              fontSize: 12,*/}
          {/*              fontStyle: 'italic',*/}
          {/*              textAlign: 'center'*/}
          {/*            }}*/}
          {/*          >*/}
          {/*            Negative balance due to loan debt ={' '}*/}
          {/*            {formatCurrency(negativeTotalValue?.Total)}*/}
          {/*          </CustomTypography>*/}
          {/*        )*/}
          {/*      }*/}
          {/*    : {})}*/}
          {/*/>*/}
          <BoxPieChart
            data={fundsByBlockchain}
            title="Total funds by blockchain"
            dataKey="funds"
            width={400}
            height={350}
            innerRadius={40}
            outerRadius={100}
          />
          <BoxPieChart
            data={fundsByType}
            title="Total funds by type"
            dataKey="funds"
            width={400}
            height={350}
            innerRadius={40}
            outerRadius={100}
          />
        </Box>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Summary
