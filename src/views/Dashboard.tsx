import React from 'react'
import { Divider } from '@mui/material'
import { BoxWrapperRow, BoxWrapperColumn, AnimatePresenceWrapper } from 'src/components'
import { NumberBlock } from 'src/views/sections/dashboard/NumberBlock'
import { formatCurrency, formatPercentage } from 'src/utils/format'
import { Value } from 'src/views/sections/dashboard/Value'
import { Title } from 'src/views/sections/dashboard/Title'
import { useApp } from 'src/contexts/app.context'
import { Currency, DAOResume } from 'src/contexts/state'
import { Table as DashboardTable } from 'src/views/sections/dashboard/Table'
import { Card } from 'src/views/sections/dashboard/Card'

export const Dashboard = () => {
  const { state } = useApp()

  const defaultMetrics = {
    ourDaoTreasuries: 0,
    nonCustodialAum: 0,
    lastMonthDeFiResults: 0,
    year: 0,
    month: 0
  }

  const { dashboard } = state
  const { daoResume = [], metrics = defaultMetrics } = dashboard || {}

  const { ourDaoTreasuries, nonCustodialAum, lastMonthDeFiResults, year, month } = metrics || {}

  const daoResumeDashboardOne = daoResume.filter((dao: any) => dao.shouldBeIncludedDashboardOne)
  const daoResumeDashboardTwo = daoResume.filter((dao: any) => dao.shouldBeIncludedDashboardTwo)

  return (
    <BoxWrapperColumn
      sx={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <BoxWrapperColumn
        sx={{
          marginTop: '128px',
          marginBottom: '40px',
          display: {
            xs: 'flex',
            md: 'none'
          },
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AnimatePresenceWrapper>
          <Value value={'Available in desktop view only.'} />
          <Value value={'Responsive view is coming soon!'} />
        </AnimatePresenceWrapper>
      </BoxWrapperColumn>

      <BoxWrapperRow
        sx={{
          marginTop: {
            xs: '40px',
            md: '128px'
          },
          marginBottom: '40px',
          paddingRight: '20px',
          paddingLeft: '20px',
          flexWrap: 'wrap',
          alignItems: {
            xs: 'center',
            md: 'flex-start'
          },
          gap: '40px'
        }}
      >
        <NumberBlock amount={formatCurrency(ourDaoTreasuries)} title="Our DAO treasuries" />
        <NumberBlock amount={formatCurrency(nonCustodialAum)} title="Non-custodial AUM" />
        <NumberBlock
          amount={formatCurrency(lastMonthDeFiResults)}
          title={'Last month DeFi results'}
        />
      </BoxWrapperRow>

      <BoxWrapperColumn
        gap={2}
        display={{ xs: 'none', md: 'flex' }}
        sx={{
          marginTop: '40px',
          marginBottom: '40px',
          marginRight: '20px',
          marginLeft: '20px'
        }}
      >
        {daoResumeDashboardOne.length === 0 ? null : (
          <AnimatePresenceWrapper>
            <BoxWrapperColumn>
              <DashboardTable
                daoResume={daoResumeDashboardOne}
                latestMonth={month}
                latestYear={year}
                currency={'USD' as Currency}
              />
            </BoxWrapperColumn>
          </AnimatePresenceWrapper>
        )}

        {daoResumeDashboardTwo.length === 0 ? null : (
          <AnimatePresenceWrapper>
            <Divider sx={{ borderBottomWidth: 5, marginBottom: 5, marginTop: 5 }} />
            <BoxWrapperColumn gap={4}>
              <Title title="Other treasuries not considered in non-custodial AUM" />
              <DashboardTable
                daoResume={daoResumeDashboardTwo}
                latestMonth={month}
                latestYear={year}
                currency={'ETH' as Currency}
              />
            </BoxWrapperColumn>
          </AnimatePresenceWrapper>
        )}
      </BoxWrapperColumn>

      <BoxWrapperRow
        gap={2}
        display={{ xs: 'flex', md: 'none' }}
        sx={{
          marginTop: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          marginRight: '20px',
          marginLeft: '20px'
        }}
      >
        {daoResumeDashboardOne.length === 0
          ? null
          : daoResumeDashboardOne.map((resume: DAOResume, index: number) => {
              const {
                name,
                keyName,
                icon,
                totalFunds,
                allocatedFunds,
                deFiResults,
                APY,
                urlToReport
              } = resume

              const isDAOEnsOctober = keyName === 'ENS DAO' && +year === 2023 && +month === 10
              const isDAOEnsNovember = keyName === 'ENS DAO' && +year === 2023 && +month === 11
              const CUSTOM_APY = isDAOEnsOctober
                ? '2.04%'
                : isDAOEnsNovember
                  ? '2.9%'
                  : formatPercentage(APY)

              const params = {
                name,
                urlToReport,
                icon,
                totalFunds,
                allocatedFunds,
                deFiResults,
                APY: CUSTOM_APY,
                currency: 'USD' as Currency,
                latestMonth: month,
                latestYear: year
              }
              return <Card {...params} key={index} />
            })}

        {daoResumeDashboardTwo.length === 0 ? null : (
          <>
            <BoxWrapperColumn gap={1} sx={{ marginBottom: '40px', marginTop: '40px' }}>
              <Divider sx={{ borderBottomWidth: 5, marginBottom: 5 }} />
              <Title title="Other treasuries not considered in non-custodial AUM" />
            </BoxWrapperColumn>
            {daoResumeDashboardTwo.map((resume: DAOResume, index: number) => {
              const {
                name,
                keyName,
                icon,
                totalFunds,
                allocatedFunds,
                deFiResults,
                APY,
                urlToReport
              } = resume

              const isDAOEnsOctober = keyName === 'ENS DAO' && +year === 2023 && +month === 10
              const isDAOEnsNovember = keyName === 'ENS DAO' && +year === 2023 && +month === 11
              const CUSTOM_APY = isDAOEnsOctober
                ? '2.04%'
                : isDAOEnsNovember
                  ? '2.9%'
                  : formatPercentage(APY)

              const params = {
                name,
                urlToReport,
                icon,
                totalFunds,
                allocatedFunds,
                deFiResults,
                APY: CUSTOM_APY,
                currency: 'ETH' as Currency,
                latestMonth: month,
                latestYear: year
              }
              return <Card {...params} key={index} />
            })}
          </>
        )}
      </BoxWrapperRow>
    </BoxWrapperColumn>
  )
}
