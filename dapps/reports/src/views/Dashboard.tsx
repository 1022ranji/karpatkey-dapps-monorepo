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

interface TableProps {
  daoResume: any
  latestMonth: number
}

const DashboardTable = ({ daoResume, latestMonth }: TableProps) => {
  const router = useRouter()

  const latestMonthLabel = MONTHS.find((month) => month.id === Number(latestMonth))?.label

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { borderBottom: 'none !important' } }}>
            <TableEmptyCellCustom
              sx={{ minWidth: '260px', maxWidth: '260px', paddingY: '4px', paddingLeft: '5px' }}
            />
            <TableCellCustom
              align="left"
              sx={{ minWidth: '205px', maxWidth: '205px', paddingY: '4px', paddingX: '20px' }}
            >
              <Value value={'Total funds'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{ minWidth: '165px', maxWidth: '165px', paddingY: '4px', paddingX: '20px' }}
            >
              <Value value={'Capital utilisation'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{ minWidth: '145px', maxWidth: '145px', paddingY: '4px', paddingX: '20px' }}
            >
              <Value value={'Farming results'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '115px',
                maxWidth: '115px',
                paddingY: '4px',
                paddingLeft: '20px',
                marginRight: '5px'
              }}
            >
              <Value value={'APY'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableEmptyCellCustom
              sx={{ minWidth: '25px', maxWidth: '25px', paddingY: '4px', paddingRight: '5px' }}
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
                  totalFunds,
                  capitalUtilization,
                  farmingResults,
                  globalROI,
                  urlToReport
                } = dao

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
                          minWidth: '260px',
                          maxWidth: '260px',
                          paddingY: '4px',
                          paddingLeft: '5px'
                        }}
                      >
                        <BoxWrapperRow key={index} gap={4} sx={{ justifyContent: 'flex-start' }}>
                          <Image src={icon} alt={name} width={48} height={48} />
                          <Value value={name} fontWeight={600} />
                        </BoxWrapperRow>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '205px',
                          maxWidth: '205px',
                          paddingY: '4px',
                          paddingX: '20px'
                        }}
                      >
                        <Value value={formatCurrency(totalFunds)} />
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '165px',
                          maxWidth: '165px',
                          paddingY: '4px',
                          paddingX: '20px'
                        }}
                      >
                        <Value value={formatPercentage(capitalUtilization, 0)} />
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '145px',
                          maxWidth: '145px',
                          paddingY: '4px',
                          paddingX: '20px'
                        }}
                      >
                        <Value value={formatCurrency(farmingResults)} />
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '115px',
                          maxWidth: '115px',
                          paddingY: '4px',
                          paddingLeft: '20px',
                          marginRight: '5px'
                        }}
                      >
                        <Value value={formatPercentage(globalROI, 1)} />
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '25px',
                          maxWidth: '25px',
                          paddingY: '4px',
                          paddingRight: '5px'
                        }}
                      >
                        <OpenInNewIcon
                          onClick={onClick}
                          sx={{ cursor: 'pointer', fontSize: '1.2rem' }}
                        />
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
  const { daoResume, nonCustodialAum, lastMonthFarmingResults, latestMonth } = props

  const daoResumeWithoutLido = daoResume.filter((dao: any) => dao.shouldBeDisplayedHomepage)
  const daoResumeWithLido = daoResume.filter((dao: any) => !dao.shouldBeDisplayedHomepage)

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn
        sx={{
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 5,
          marginRight: '10%',
          marginLeft: '10%'
        }}
        gap={'50px'}
      >
        <BoxWrapperColumn gap={5}>
          <CustomTypography variant="h1" textAlign="center">
            DAO treasury reports
          </CustomTypography>

          <BoxWrapperRow gap={12}>
            <NumberBlock amount={formatCurrency(nonCustodialAum)} title="Non-custodial AUM" />
            <NumberBlock
              amount={formatCurrency(lastMonthFarmingResults)}
              title="Last month farming results"
            />
          </BoxWrapperRow>
        </BoxWrapperColumn>

        <BoxWrapperColumn gap={'50px'}>
          <BoxWrapperColumn>
            <DashboardTable daoResume={daoResumeWithoutLido} latestMonth={latestMonth} />
          </BoxWrapperColumn>

          <Divider sx={{ borderBottomWidth: 5 }} />

          <BoxWrapperColumn gap={4}>
            <Title title="Other treasuries not considered in non-custodial AUM" />
            <DashboardTable daoResume={daoResumeWithLido} latestMonth={latestMonth} />
          </BoxWrapperColumn>
        </BoxWrapperColumn>

        <Value
          value={'Reports are available in desktop view only. Responsive view is coming soon!'}
          fontWeight={400}
          fontSize={'16px'}
        />
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Dashboard
