import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  CustomTypography,
  PieChart,
  InfoCard,
  BoxWrapperColumn,
  AnimatePresenceWrapper
} from 'src/components'
import * as React from 'react'
import { Box } from '@mui/material'
import { getDAO } from 'src/utils'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'

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

export const Summary = (props: SummaryProps) => {
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
            gap: { xs: 5, md: 10 }
          }}
        >
          <InfoCard
            title={currency === 'USD' ? 'Total funds' : 'Total funds (ETH)'}
            value={currency === 'USD' ? formatCurrency(totalFunds) : formatNumber(totalFunds, 0)}
          />
          <InfoCard
            title={isDDay ? 'Allocated funds' : 'Capital utilisation'}
            value={formatPercentage(capitalUtilization, 1)}
          />
          <InfoCard
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
          <InfoCard
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
            gap: 2
          }}
        >
          <PieChart
            titleMessage="Total funds by token category"
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
            titleMessage="Total funds by blockchain"
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
            titleMessage="Total funds by type"
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
