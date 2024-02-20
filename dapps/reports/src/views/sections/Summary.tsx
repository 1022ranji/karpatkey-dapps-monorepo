import {
  formatCurrency,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import * as React from 'react'
import { Box } from '@mui/material'
import BoxInfoCard from '@karpatkey-monorepo/shared/components/InfoCard'
import { PieChart } from '@karpatkey-monorepo/reports/src/components/Charts/NewPie'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { getDAO } from '@karpatkey-monorepo/shared/utils'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'
import { useApp } from '../../contexts/app.context'

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

  const { state } = useApp()
  const { currency } = state

  // Logic for ENS DAO only for the month of October 2023
  const DAO_OBJ = getDAO(dao)
  const isDAOEnsOctober =
    DAO_OBJ?.keyName === 'ENS DAO' && year && month && +year === 2023 && +month === 10
  const isDAOEnsNovember =
    DAO_OBJ?.keyName === 'ENS DAO' && year && month && +year === 2023 && +month === 11
  const APY = isDAOEnsOctober ? '2.04%' : isDAOEnsNovember ? '2.9%' : formatPercentage(globalROI)

  /* eslint-disable */
  const negativeTotalValue = balanceOverviewType.find((item) => item.Total < 0)

  const isDDay = isYearAndMonthValid()

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
          <BoxInfoCard
            title={currency === 'USD' ? 'Total funds' : 'Total funds (ETH)'}
            value={currency === 'USD' ? formatCurrency(totalFunds) : formatNumber(totalFunds, 0)}
          />
          <BoxInfoCard
            title={isDDay ? 'Allocated funds' : 'Capital utilisation'}
            value={formatPercentage(capitalUtilization, 1)}
          />
          <BoxInfoCard
            title={
              isDDay
                ? currency === 'USD'
                  ? 'DeFi results'
                  : 'DeFi results (ETH)'
                : currency === 'USD'
                ? 'Farming results'
                : 'Farming results (ETH)'
            }
            value={
              currency === 'USD'
                ? formatCurrency(farmingResults || 0)
                : formatNumber(farmingResults || 0, 0)
            }
          />
          <BoxInfoCard
            title="APY"
            value={APY}
            helpInfo={
              isDDay
                ? 'Calculated as (1+(DeFi results / DeFi initial funds at final prices))^12-1.'
                : 'This value is calculated as (1+(Farming Results / Initial Balance at Final Prices))^12-1.'
            }
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            gap: 2
          }}
        >
          <PieChart
            title="Total funds by token category"
            data={fundsByTokenCategory.map((item) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            width={440}
            height={400}
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
          <PieChart
            title="Total funds by blockchain"
            data={fundsByBlockchain.map((item) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            width={440}
            height={400}
          />
          <PieChart
            title="Total funds by type"
            data={fundsByType.map((item) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            width={440}
            height={400}
          />
        </Box>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Summary
