import {
  Box,
  Tooltip,
  BoxProps,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import * as React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import { formatCurrency, formatNumber } from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableCellCustom,
  TableFooterCellCustom,
  TableHeadCellCustom
} from 'src/components'
import { useApp } from 'src/contexts/app.context'

type TableTypeProps = { balanceOverviewType: any } & BoxProps

export const TableTypeDDay = (props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  const { state } = useApp()
  const { currency } = state

  const haveOperationsFundsField = balanceOverviewType.some(
    (row: any) => row['Operations funds'] !== 0
  )

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%', minWidth: '1200px', overflow: 'scroll' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Token category
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                <BoxWrapperRow sx={{ justifyContent: 'flex-start' }} gap={1}>
                  DeFi funds
                  <Tooltip
                    title={'Positions aimed at yield generation'}
                    sx={{ ml: 1, cursor: 'pointer' }}
                  >
                    <InfoIcon />
                  </Tooltip>
                </BoxWrapperRow>
              </TableHeadCellCustom>
              {haveOperationsFundsField ? (
                <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                  <BoxWrapperRow sx={{ justifyContent: 'flex-start' }} gap={1}>
                    Operations
                    <br /> funds
                    <Tooltip
                      title={
                        'Positions tailored to meet specific requirements like market making, not focused on yield generation'
                      }
                      sx={{ ml: 1, cursor: 'pointer' }}
                    >
                      <InfoIcon />
                    </Tooltip>
                  </BoxWrapperRow>
                </TableHeadCellCustom>
              ) : null}
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Wallet
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Total
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceOverviewType.map((row: any, index: number) => {
              dataFooterType['DeFi funds'] = (dataFooterType['DeFi funds'] || 0) + row['DeFi funds']
              dataFooterType['Operations funds'] =
                (dataFooterType['Operations funds'] || 0) + row['Operations funds']
              dataFooterType['Wallet'] = (dataFooterType['Wallet'] || 0) + row['Wallet']
              dataFooterType['Total'] = (dataFooterType['Total'] || 0) + row['Total']
              return (
                <TableRow key={index}>
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {row['Token Category']}
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {currency === 'USD'
                      ? formatCurrency(row['DeFi funds'] || 0)
                      : formatNumber(row['DeFi funds'] || 0, 0)}
                  </TableCellCustom>
                  {haveOperationsFundsField ? (
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {currency === 'USD'
                        ? formatCurrency(row['Operations funds'] || 0)
                        : formatNumber(row['Operations funds'] || 0, 0)}
                    </TableCellCustom>
                  ) : null}
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {currency === 'USD'
                      ? formatCurrency(row['Wallet'] || 0)
                      : formatNumber(row['Wallet'] || 0, 0)}
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {currency === 'USD'
                      ? formatCurrency(row['Total'] || 0)
                      : formatNumber(row['Total'] || 0, 0)}
                  </TableCellCustom>
                </TableRow>
              )
            })}
            <TableRow>
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Total
              </TableFooterCellCustom>
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['DeFi funds'] || 0)
                  : formatNumber(dataFooterType['DeFi funds'] || 0, 0)}
              </TableFooterCellCustom>
              {haveOperationsFundsField ? (
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {currency === 'USD'
                    ? formatCurrency(dataFooterType['Operations funds'] || 0)
                    : formatNumber(dataFooterType['Operations funds'] || 0, 0)}
                </TableFooterCellCustom>
              ) : null}
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['Wallet'] || 0)
                  : formatNumber(dataFooterType['Wallet'] || 0, 0)}
              </TableFooterCellCustom>
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['Total'] || 0)
                  : formatNumber(dataFooterType['Total'] || 0, 0)}
              </TableFooterCellCustom>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapperColumn>
  )
}
