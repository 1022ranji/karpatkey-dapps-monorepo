import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import React from 'react'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import Image from 'next/image'
import { ReportProps } from '@karpatkey-monorepo/reports/src/types'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import { NumberBlock } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/NumberBlock'
import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import { useRouter } from 'next/router'
import { Value } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Value'
import { Title } from '@karpatkey-monorepo/reports/src/views/sections/Dashboard/Title'
import Divider from '@mui/material/Divider'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import Tooltip from '@mui/material/Tooltip'
import { LinkWrapper } from '@karpatkey-monorepo/reports/src/components/LinkWrapper'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useScreenSize } from '@karpatkey-monorepo/reports/src/hooks/useScreenSize'

interface TableProps {
  daoResume: any
  latestMonth: number
  latestYear: number
}

const DashboardTable = ({ daoResume, latestMonth, latestYear }: TableProps) => {
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
              <Value value={'Total funds (ncAUM)'} fontWeight={600} fontSize={'16px'} />
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
              <Value value={'DeFi results'} fontWeight={600} fontSize={'16px'} />
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
                  capitalUtilization,
                  farmingResults,
                  globalROI,
                  urlToReport
                } = dao

                console.log('latestYear', latestYear)
                console.log('latestMonth', latestMonth)
                const isDAOEnsOctober =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 10
                const isDAOEnsNovember =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 11
                const APY = isDAOEnsOctober
                  ? '2.04%'
                  : isDAOEnsNovember
                    ? '2.9%'
                    : formatPercentage(globalROI)

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
                          <Value value={formatCurrency(totalFunds)} />
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
                          <Value value={formatPercentage(capitalUtilization, 0)} />
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
                          <Value value={formatCurrency(farmingResults)} />
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
                          <Value value={APY} />
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

const Dashboard = (props: ReportProps) => {
  const {
    daoResume,
    ourDaoTreasuries,
    nonCustodialAum,
    lastMonthFarmingResults,
    latestMonth,
    latestYear
  } = props

  const daoResumeWithoutLido = daoResume.filter((dao: any) => dao.shouldBeDisplayedHomepage)
  const daoResumeWithLido = daoResume.filter((dao: any) => !dao.shouldBeDisplayedHomepage)

  const matchesQuery = useMediaQuery('(min-width:1000px)')

  const screenSize = useScreenSize()

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
            amount={formatCurrency(lastMonthFarmingResults)}
            title={'Last month DeFi results'}
          />
        </BoxWrapperRow>
      </BoxWrapperColumn>

      <BoxWrapperColumn
        sx={{
          gap: screenSize.height > 1200 ? '120px' : screenSize.height > 1050 ? '80px' : '40px'
        }}
      >
        <AnimatePresenceWrapper>
          <BoxWrapperColumn>
            <DashboardTable
              daoResume={daoResumeWithoutLido}
              latestMonth={latestMonth}
              latestYear={latestYear}
            />
          </BoxWrapperColumn>
        </AnimatePresenceWrapper>
        {daoResumeWithLido.length === 0 ? null : (
          <AnimatePresenceWrapper>
            <Divider sx={{ borderBottomWidth: 5 }} />
            <BoxWrapperColumn gap={4}>
              <Title title="Other treasuries not considered in non-custodial AUM" />
              <DashboardTable
                daoResume={daoResumeWithLido}
                latestMonth={latestMonth}
                latestYear={latestYear}
              />
            </BoxWrapperColumn>
          </AnimatePresenceWrapper>
        )}
      </BoxWrapperColumn>
    </BoxWrapperColumn>
  )
}

export default Dashboard
