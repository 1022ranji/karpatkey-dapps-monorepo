import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import React from 'react'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import Image from 'next/image'
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import { NumberBlock } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/NumberBlock'
import {
  formatCurrency,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import { useRouter } from 'next/router'
import { Value } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Value'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import { LinkWrapper } from '@karpatkey-monorepo/reports/src/components/LinkWrapper'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useScreenSize } from '@karpatkey-monorepo/reports/src/hooks/useScreenSize'
import { Title } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Title'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'
import { Currency } from '@karpatkey-monorepo/reports/src/contexts/state'

interface TableProps {
  daoResume: any
  latestMonth: number
  latestYear: number
  currency: Currency
}

const DashboardTable = ({ daoResume, latestMonth, latestYear, currency }: TableProps) => {
  const router = useRouter()

  const latestMonthLabel = MONTHS.find((month) => month.id === Number(latestMonth))?.label

  const matchesCapitalUtilization = useMediaQuery('(min-width:710px)')
  const matchesFarmingResults = useMediaQuery('(min-width:780px)')
  const matchesAPY = useMediaQuery('(min-width:900px)')
  const matchesIcon = useMediaQuery('(min-width:1050px)')

  const screenSize = useScreenSize()
  const isMobile = screenSize.width < 550

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { borderBottom: 'none !important' } }}>
            <TableEmptyCellCustom
              sx={{
                minWidth: isMobile ? '170px' : '260px',
                maxWidth: isMobile ? '170px' : '260px',
                paddingY: '4px',
                paddingLeft: '5px'
              }}
            />
            <TableCellCustom
              align="left"
              sx={{
                minWidth: isMobile ? '190px' : '205px',
                maxWidth: isMobile ? '190px' : '205px',
                paddingY: '4px',
                paddingX: '20px'
              }}
            >
              <Value
                value={`Total funds (${currency === 'USD' ? 'ncAUM' : 'ETH'})`}
                fontWeight={600}
                fontSize={'16px'}
              />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: isMobile ? '150px' : '165px',
                maxWidth: isMobile ? '150px' : '165px',
                paddingY: '4px',
                paddingX: '20px',
                ...(matchesCapitalUtilization ? { display: 'table-cell' } : { display: 'none' })
              }}
            >
              <Value value={'Allocated funds'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: isMobile ? '130px' : '145px',
                maxWidth: isMobile ? '130px' : '145px',
                paddingY: '4px',
                paddingX: '20px',
                ...(matchesFarmingResults ? { display: 'table-cell' } : { display: 'none' })
              }}
            >
              <Value
                value={`DeFi results ${currency === 'ETH' ? '(ETH)' : ''}`}
                fontWeight={600}
                fontSize={'16px'}
              />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: isMobile ? '100px' : '115px',
                maxWidth: isMobile ? '100px' : '115px',
                paddingY: '4px',
                paddingLeft: '20px',
                marginRight: '5px',
                ...(matchesAPY ? { display: 'table-cell' } : { display: 'none' })
              }}
            >
              <Value value={'APY'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableEmptyCellCustom
              sx={{
                minWidth: '25px',
                maxWidth: '25px',
                paddingY: '4px',
                paddingRight: '5px',
                ...(matchesIcon ? { display: 'table-cell' } : { display: 'none' })
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {daoResume.length === 0 ? null : (
            <>
              {daoResume.map((dao: any, index: number) => {
                const {
                  icon,
                  name,
                  keyName,
                  totalFunds,
                  allocatedFunds,
                  deFiResults,
                  APY,
                  urlToReport
                } = dao

                const isDAOEnsOctober =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 10
                const isDAOEnsNovember =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 11
                const CUSTOM_APY = isDAOEnsOctober
                  ? '2.04%'
                  : isDAOEnsNovember
                  ? '2.9%'
                  : formatPercentage(APY)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const onClick = (e: any) => {
                  if (e.ctrlKey || e.metaKey) {
                    //if ctrl key or command is pressed
                    window.open(urlToReport, '_blank')
                  } else {
                    router.push(urlToReport)
                  }
                }

                return (
                  <Tooltip
                    key={index}
                    title={
                      <CustomTypography variant="body2" sx={{ color: 'common.white' }}>
                        {`Click to see the ${latestMonthLabel} treasury report`}
                      </CustomTypography>
                    }
                    sx={{ cursor: 'pointer' }}
                    PopperProps={{
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [50, -15]
                          }
                        }
                      ]
                    }}
                  >
                    <TableRow
                      onClick={onClick}
                      hover
                      sx={{
                        borderRadius: 10,
                        display: 'table-group-row !important',
                        '& td': {
                          borderBottom: 'none !important'
                        },
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: isMobile ? '170px' : '260px',
                          maxWidth: isMobile ? '170px' : '260px',
                          paddingY: '4px',
                          paddingLeft: '5px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <BoxWrapperRow key={index} gap={4} sx={{ justifyContent: 'flex-start' }}>
                            <Image
                              src={icon}
                              alt={name}
                              width={isMobile ? 32 : 48}
                              height={isMobile ? 32 : 48}
                            />
                            <Value value={name} fontWeight={600} />
                          </BoxWrapperRow>
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: isMobile ? '190px' : '205px',
                          maxWidth: isMobile ? '190px' : '205px',
                          paddingY: '4px',
                          paddingX: '20px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value
                            value={
                              currency === 'USD'
                                ? formatCurrency(totalFunds)
                                : formatNumber(totalFunds, 0)
                            }
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: isMobile ? '150px' : '165px',
                          maxWidth: isMobile ? '150px' : '165px',
                          paddingY: '4px',
                          paddingX: '20px',
                          ...(matchesCapitalUtilization
                            ? { display: 'table-cell' }
                            : { display: 'none' })
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value value={formatPercentage(allocatedFunds, 0)} />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: isMobile ? '130px' : '145px',
                          maxWidth: isMobile ? '130px' : '145px',
                          paddingY: '4px',
                          paddingX: '20px',
                          ...(matchesFarmingResults
                            ? { display: 'table-cell' }
                            : { display: 'none' })
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value
                            value={
                              currency === 'USD'
                                ? formatCurrency(deFiResults)
                                : formatNumber(deFiResults, 0)
                            }
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: isMobile ? '100px' : '115px',
                          maxWidth: isMobile ? '100px' : '115px',
                          paddingY: '4px',
                          paddingLeft: '20px',
                          marginRight: '5px',
                          ...(matchesAPY ? { display: 'table-cell' } : { display: 'none' })
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value value={CUSTOM_APY} />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '25px',
                          maxWidth: '25px',
                          paddingY: '4px',
                          paddingRight: '5px',
                          ...(matchesIcon ? { display: 'table-cell' } : { display: 'none' })
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <OpenInNewIcon
                            onClick={onClick}
                            sx={{ cursor: 'pointer', fontSize: '1.2rem' }}
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                    </TableRow>
                  </Tooltip>
                )
              })}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

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

  const matchesQuery = useMediaQuery('(min-width:1000px)')

  const screenSize = useScreenSize()

  const daoResumeDashboardOne = daoResume.filter((dao: any) => dao.shouldBeIncludedDashboardOne)
  const daoResumeDashboardTwo = daoResume.filter((dao: any) => dao.shouldBeIncludedDashboardTwo)

  return (
    <BoxWrapperColumn
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '840px !important',
        marginBottom: '110px',
        marginTop: screenSize.width > 1050 ? '110px' : '40px',
        marginRight: '10%',
        marginLeft: '10%',
        gap: screenSize.height > 1200 ? '120px' : screenSize.height > 1050 ? '80px' : '40px'
      }}
    >
      <BoxWrapperColumn
        sx={{
          display: screenSize.width < 1050 ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AnimatePresenceWrapper>
          <Value value={'Available in desktop view only.'} fontWeight={400} fontSize={'16px'} />
          <Value value={'Responsive view is coming soon!'} fontWeight={400} fontSize={'16px'} />
        </AnimatePresenceWrapper>
      </BoxWrapperColumn>

      <BoxWrapperColumn
        sx={{
          gap: screenSize.height > 1200 ? '120px' : screenSize.height > 1050 ? '80px' : '40px'
        }}
      >
        <BoxWrapperRow
          sx={{
            ...(matchesQuery
              ? {
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '80px'
                }
              : { flexDirection: 'column', alignItems: 'center', gap: '40px' })
          }}
        >
          <NumberBlock amount={formatCurrency(ourDaoTreasuries)} title="Our DAO treasuries" />
          <NumberBlock amount={formatCurrency(nonCustodialAum)} title="Non-custodial AUM" />
          <NumberBlock
            amount={formatCurrency(lastMonthDeFiResults)}
            title={'Last month DeFi results'}
          />
        </BoxWrapperRow>
      </BoxWrapperColumn>

      <BoxWrapperColumn
        sx={{
          gap: screenSize.height > 1200 ? '120px' : screenSize.height > 1050 ? '80px' : '40px'
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
        )}
      </BoxWrapperColumn>
    </BoxWrapperColumn>
  )
}

export default Dashboard
