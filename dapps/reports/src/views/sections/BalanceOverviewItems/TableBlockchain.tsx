import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import numbro from 'numbro'
import * as React from 'react'

type TableBlockchainProps = { balanceOverviewBlockchain: any } & BoxProps

const TableBlockchain = (props: TableBlockchainProps) => {
  const { balanceOverviewBlockchain } = props

  const dataFooterBlockchain = {} as any

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom align="left">Token Category</TableHeadCellCustom>
            <TableHeadCellCustom align="left">Ethereum</TableHeadCellCustom>
            <TableHeadCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
              Gnosis
            </TableHeadCellCustom>
            <TableHeadCellCustom align="right">Grand total</TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceOverviewBlockchain.map((row: any, index: number) => {
            dataFooterBlockchain['Ethereum'] =
              (dataFooterBlockchain['Ethereum'] || 0) + row['Ethereum']
            dataFooterBlockchain['Gnosis'] = (dataFooterBlockchain['Gnosis'] || 0) + row['Gnosis']
            dataFooterBlockchain['Total'] = (dataFooterBlockchain['Total'] || 0) + row['Total']

            return (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellCustom component="th" scope="row">
                  {row['Token Category'] || 0}
                </TableCellCustom>
                <TableCellCustom align="left">
                  {numbro(row['Ethereum'] || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(row['Gnosis'] || 0).formatCurrency({
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
              {numbro(dataFooterBlockchain['Ethereum'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
              {numbro(dataFooterBlockchain['Gnosis'] || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right">
              {numbro(dataFooterBlockchain['Total'] || 0).formatCurrency({
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

export default TableBlockchain
