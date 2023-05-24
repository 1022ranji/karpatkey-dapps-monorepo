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
            <TableHeadCellCustom align="left">Token Category</TableHeadCellCustom>
            <TableHeadCellCustom align="left">Farming Funds</TableHeadCellCustom>
            <TableHeadCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
              Unclaimed Rewards
            </TableHeadCellCustom>
            <TableHeadCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
              Wallet
            </TableHeadCellCustom>
            <TableHeadCellCustom align="right">Grand total</TableHeadCellCustom>
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
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellCustom component="th" scope="row">
                  {row['Token Category']}
                </TableCellCustom>
                <TableCellCustom align="left">
                  {numbro(row['Farming Funds'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(row['Unclaimed Rewards'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(row['Wallet'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom align="right">
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
            <TableFooterCellCustom align="left">Grand total</TableFooterCellCustom>
            <TableFooterCellCustom align="left">
              {numbro(dataFooterType['Farming Funds']).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
              {numbro(dataFooterType['Unclaimed Rewards'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
              {numbro(dataFooterType['Wallet'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right">
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
