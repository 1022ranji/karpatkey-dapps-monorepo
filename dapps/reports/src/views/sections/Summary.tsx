import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import * as React from 'react'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box } from '@mui/material'
import BoxPieChart from '@karpatkey-monorepo/reports/src/components/Charts/Pie'
import BoxInfoCard from '@karpatkey-monorepo/shared/components/InfoCard'
import { getDAO } from '@karpatkey-monorepo/shared/utils'

interface SummaryProps {
  dao: Maybe<number>
  month: Maybe<number>
  year: Maybe<number>
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
    month,
    year,
    dao,
    totalFunds,
    capitalUtilization,
    globalROI,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    balanceOverviewType
  } = props

  // Logic for ENS DAO only for the month of October 2023
  const DAO_OBJ = getDAO(dao)
  const isDAOEns =
    DAO_OBJ?.keyName === 'ENS DAO' && year && month && +year === 2023 && +month === 10
  const APY = isDAOEns ? '2.04%' : formatPercentage(globalROI)

  const negativeTotalValue = balanceOverviewType.find((item) => item.Total < 0)
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ margin: '30px 30px' }} gap={10}>
        <Box
          id="summary"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            gap: 10
          }}
        >
          <BoxInfoCard title="Total funds" value={formatCurrency(totalFunds)} />
          <BoxInfoCard
            title="Capital utilisation"
            value={formatPercentage(capitalUtilization, 1)}
          />
          <BoxInfoCard title="Farming results" value={formatCurrency(farmingResults)} />
          <BoxInfoCard
            title="APY"
            value={APY}
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
          <BoxPieChart
            data={fundsByTokenCategory}
            title="Total funds by token category"
            dataKey="funds"
            width={400}
            height={350}
            innerRadius={40}
            outerRadius={100}
            {...(negativeTotalValue
              ? {
                  footerMessage: (
                    <CustomTypography
                      variant={'body2'}
                      color="textSecondary"
                      sx={{
                        fontFamily: 'IBM Plex Sans',
                        fontSize: 12,
                        fontStyle: 'italic',
                        textAlign: 'center'
                      }}
                    >
                      Negative balance due to loan debt ={' '}
                      {formatCurrency(negativeTotalValue?.Total)}
                    </CustomTypography>
                  )
                }
              : {})}
          />
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
