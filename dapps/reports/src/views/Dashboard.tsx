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

const Value = ({ value }: { value: string }) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: '400 !important',
        fontSize: '18px',
        lineHeight: '24px',
        color: '#1A1A1A'
      }}
    >
      {value}
    </CustomTypography>
  )
}

const Title = ({ title }: { title: string }) => {
  return (
    <CustomTypography
      textAlign="center"
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontSize: '24px',
        lineHeight: '28px',
        fontWeight: '300',
        fontStyle: 'normal',
        color: '#1A1A1A'
      }}
    >
      {title}
    </CustomTypography>
  )
}

interface TableProps {
  daoResume: any
}

const DashboardTable = ({ daoResume }: TableProps) => {
  const router = useRouter()

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { borderBottom: 'none !important' } }}>
            <TableEmptyCellCustom />
            <TableCellCustom align="left" sx={{ width: '20%', padding: '5px' }}>
              <Value value={'Total funds'} />
            </TableCellCustom>
            <TableCellCustom align="left" sx={{ width: '10%', padding: '5px' }}>
              <Value value={'Capital utilisation'} />
            </TableCellCustom>
            <TableCellCustom align="left" sx={{ width: '25%', padding: '5px' }}>
              <Value value={'Farming results'} />
            </TableCellCustom>
            <TableCellCustom align="left" sx={{ width: '10%', padding: '5px' }}>
              <Value value={'APY'} />
            </TableCellCustom>
            <TableEmptyCellCustom />
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

                const onClick = () => {
                  router.push(urlToReport)
                }

                return (
                  <TableRow
                    key={index}
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
                    <TableCellCustom align="left" sx={{ padding: '5px' }}>
                      <BoxWrapperRow key={index} gap={4} sx={{ justifyContent: 'flex-start' }}>
                        <Image src={icon} alt={name} width={48} height={48} />
                        <Value value={name} />
                      </BoxWrapperRow>
                    </TableCellCustom>
                    <TableCellCustom align="left" sx={{ width: '20%', padding: '5px' }}>
                      <Value value={formatCurrency(totalFunds)} />
                    </TableCellCustom>
                    <TableCellCustom align="left" sx={{ width: '10%', padding: '5px' }}>
                      <Value value={formatPercentage(capitalUtilization, 1)} />
                    </TableCellCustom>
                    <TableCellCustom align="left" sx={{ width: '25%', padding: '5px' }}>
                      <Value value={formatCurrency(farmingResults)} />
                    </TableCellCustom>
                    <TableCellCustom align="left" sx={{ width: '10%', padding: '5px' }}>
                      <Value value={formatPercentage(globalROI)} />
                    </TableCellCustom>
                    <TableCellCustom align="left" sx={{ padding: '5px' }}>
                      <OpenInNewIcon
                        onClick={onClick}
                        sx={{ cursor: 'pointer', fontSize: '1.2rem' }}
                      />
                    </TableCellCustom>
                  </TableRow>
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
  const { daoResume, nonCustodialAum, lastMonthFarmingResults } = props

  const daoResumeWithoutLido = daoResume.filter((dao: any) => dao.shouldBeDisplayedHomepage)
  const daoResumeWithLido = daoResume.filter((dao: any) => !dao.shouldBeDisplayedHomepage)

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn
        sx={{ alignItems: 'center', marginTop: 5, marginRight: '10%', marginLeft: '10%' }}
        gap={10}
      >
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

        <BoxWrapperColumn gap={10}>
          <BoxWrapperColumn>
            <DashboardTable daoResume={daoResumeWithoutLido} />
          </BoxWrapperColumn>

          <BoxWrapperColumn gap={4}>
            <Title title="Other treasuries not considered in non-custodial AUM" />
            <DashboardTable daoResume={daoResumeWithLido} />
          </BoxWrapperColumn>
        </BoxWrapperColumn>

        <Title title="Reports are available in desktop view only. Responsive view is coming soon!" />
        <Title title="Select report above" />
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Dashboard
