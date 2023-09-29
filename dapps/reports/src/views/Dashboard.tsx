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

const Title = ({ title }: { title: string }) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: '600 !important',
        fontSize: '16px',
        lineHeight: '22px',
        color: '#222222'
      }}
    >
      {title}
    </CustomTypography>
  )
}

const Value = ({ value }: { value: string }) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: '600 !important',
        fontSize: '22px',
        lineHeight: '24px',
        color: '#222222'
      }}
    >
      {value}
    </CustomTypography>
  )
}

const Dashboard = (props: ReportProps) => {
  const { daoResume, nonCustodialAum, lastMonthFarmingResults } = props

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ alignItems: 'center', marginTop: 10 }} gap={10}>
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

        <BoxWrapperColumn sx={{ alignItems: 'flex-start' }} gap={2}>
          <TableContainer component={Box}>
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{ '& th': { borderBottom: 'none !important' } }}>
                  <TableEmptyCellCustom sx={{ width: '`15vw' }} />
                  <TableCellCustom align="left" sx={{ width: '12vw', padding: '10px' }}>
                    <Title title={'Total funds'} />
                  </TableCellCustom>
                  <TableCellCustom align="left" sx={{ width: '10vw', padding: '10px' }}>
                    <Title title={'Capital utilisation'} />
                  </TableCellCustom>
                  <TableCellCustom align="left" sx={{ width: '10vw', padding: '10px' }}>
                    <Title title={'Farming results'} />
                  </TableCellCustom>
                  <TableCellCustom align="left" sx={{ width: '5vw', padding: '10px' }}>
                    <Title title={'APY'} />
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
                      return (
                        <TableRow key={index} sx={{ '& td': { borderBottom: 'none !important' } }}>
                          <TableCellCustom align="left" sx={{ width: '15vw', padding: '10px' }}>
                            <BoxWrapperRow
                              key={index}
                              gap={4}
                              sx={{ justifyContent: 'flex-start' }}
                            >
                              <Image src={icon} alt={name} width={64} height={64} />
                              <CustomTypography
                                sx={{
                                  fontFamily: 'IBM Plex Sans',
                                  fontStyle: 'normal',
                                  fontWeight: '600 !important',
                                  fontSize: '26px',
                                  lineHeight: '22px',
                                  color: '#222222'
                                }}
                              >
                                {name}
                              </CustomTypography>
                            </BoxWrapperRow>
                          </TableCellCustom>
                          <TableCellCustom align="left" sx={{ width: '12vw', padding: '10px' }}>
                            <Value value={formatCurrency(totalFunds)} />
                          </TableCellCustom>
                          <TableCellCustom align="left" sx={{ width: '10vw', padding: '10px' }}>
                            <Value value={formatPercentage(capitalUtilization, 1)} />
                          </TableCellCustom>
                          <TableCellCustom align="left" sx={{ width: '10vw', padding: '10px' }}>
                            <Value value={formatCurrency(farmingResults)} />
                          </TableCellCustom>
                          <TableCellCustom align="left" sx={{ width: '5vw', padding: '10px' }}>
                            <Value value={formatPercentage(globalROI)} />
                          </TableCellCustom>
                          <TableCellCustom align="left" sx={{ padding: '10px' }}>
                            <OpenInNewIcon
                              onClick={() => {
                                window.open(urlToReport, '_blank')
                              }}
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
        </BoxWrapperColumn>

        <CustomTypography
          textAlign="center"
          sx={{
            fontFamily: 'IBM Plex Mono',
            fontSize: '30px',
            lineHeight: '28px',
            fontWeight: '300',
            fontStyle: 'normal'
          }}
        >
          Reports are available in desktop view only. Responsive view is coming soon!
        </CustomTypography>
        <CustomTypography
          textAlign="center"
          sx={{
            fontFamily: 'IBM Plex Mono',
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: '300',
            fontStyle: 'normal'
          }}
        >
          Select report above
        </CustomTypography>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Dashboard
