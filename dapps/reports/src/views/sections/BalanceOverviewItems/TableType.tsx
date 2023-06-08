import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import numbro from 'numbro'
import * as React from 'react'

type TableTypeProps = { balanceOverviewType: any } & BoxProps

const TableType = (props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Token category
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Farming funds
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Unclaimed rewards
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Wallet
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Grand total
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceOverviewType.map((row: any, index: number) => {
            dataFooterType['Farming Funds'] =
              (dataFooterType['Farming Funds'] || 0) + row['Farming Funds']
            dataFooterType['Unclaimed Rewards'] =
              (dataFooterType['Unclaimed Rewards'] || 0) + row['Unclaimed Rewards']
            dataFooterType['Wallet'] = (dataFooterType['Wallet'] || 0) + row['Wallet']
            dataFooterType['Total'] = (dataFooterType['Total'] || 0) + row['Total']
            return (
              <TableRow key={index}>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {row['Token Category']}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(row['Farming Funds'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(row['Unclaimed Rewards'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(row['Wallet'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(row['Total'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
              </TableRow>
            )
          })}
          <TableRow>
            <TableEmptyCellCustom />
            <TableEmptyCellCustom />
            <TableEmptyCellCustom />
            <TableEmptyCellCustom />
            <TableEmptyCellCustom />
          </TableRow>
          <TableRow>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              Grand total
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {numbro(dataFooterType['Farming Funds']).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {numbro(dataFooterType['Unclaimed Rewards'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {numbro(dataFooterType['Wallet'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {numbro(dataFooterType['Total'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableType
