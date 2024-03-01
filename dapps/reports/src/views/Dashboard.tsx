import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import React from 'react'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Divider } from '@mui/material'
import { NumberBlock } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/NumberBlock'
import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import { Value } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Value'
import { Title } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Title'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'
import { Currency, DAOResume } from '@karpatkey-monorepo/reports/src/contexts/state'
import { useScreenSize } from '@karpatkey-monorepo/reports/src/hooks/useScreenSize'
import { DashboardTable } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Table'
import { Card } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Card'

const Dashboard = () => {
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

  const screenSize = useScreenSize()
  const isMobile = screenSize.width < 1000

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

      <BoxWrapperRow
        gap={2}
        sx={{
          marginTop: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          marginRight: '20px',
          marginLeft: '20px'
        }}
      >
        {!isMobile ? (
          daoResumeDashboardOne.length === 0 ? null : (
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
          )
        ) : null}

        {!isMobile ? (
          daoResumeDashboardTwo.length === 0 ? null : (
            <AnimatePresenceWrapper>
              <Divider sx={{ borderBottomWidth: 5, marginBottom: 5 }} />
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
          )
        ) : null}

        {isMobile
          ? daoResumeDashboardOne.length === 0
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
                  currency: 'USD' as Currency
                }
                return <Card {...params} key={index} />
              })
          : null}

        {isMobile ? (
          daoResumeDashboardTwo.length === 0 ? null : (
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
                  currency: 'ETH' as Currency
                }
                return <Card {...params} key={index} />
              })}
            </>
          )
        ) : null}
      </BoxWrapperRow>
    </BoxWrapperColumn>
  )
}

export default Dashboard
