import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'

type TableBlockchainProps = {
  balanceOverviewBlockchain: { funds: number; row: string; column: string }[]
} & BoxProps

const TableBlockchain = (props: TableBlockchainProps) => {
  const { balanceOverviewBlockchain = [] } = props

  const columnsSorted = balanceOverviewBlockchain
    .reduce((acc: any, cur: any) => {
      if (!acc.includes(cur.column)) {
        acc.push(cur.column)
      }
      return acc
    }, [])
    .sort((a: any, b: any) => a.localeCompare(b))

  const rowsFlatByColumns = balanceOverviewBlockchain.reduce((acc: any, cur: any) => {
    acc[cur.row] = acc[cur.row] || {}
    acc[cur.row][cur.column] = cur.funds
    return acc
  }, {})

  let total = 0

  const rowGrandTotals = Object.keys(rowsFlatByColumns).reduce((acc: any, cur: any) => {
    Object.keys(rowsFlatByColumns[cur]).forEach((column: any) => {
      acc[column] = acc[column] || 0
      acc[column] += rowsFlatByColumns[cur][column]
    })
    return acc
  }, {})

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom sx={{ width: '25%' }} align="left">
              Token Category
            </TableHeadCellCustom>
            {columnsSorted.map((blockchainName: any, index: number) => (
              <TableHeadCellCustom
                key={index}
                sx={{ width: `${50 / columnsSorted.length}%` }}
                align="left"
              >
                {blockchainName}
              </TableHeadCellCustom>
            ))}
            <TableHeadCellCustom sx={{ width: '25%' }} align="left">
              Grand total
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(rowsFlatByColumns).map((category: any, index: number) => {
            let rowTotal = 0
            return (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellCustom sx={{ width: '25%' }} align="left">
                  {category}
                </TableCellCustom>
                {columnsSorted.map((blockchainName: any, index: number) => {
                  rowTotal += rowsFlatByColumns[category][blockchainName] || 0
                  return (
                    <TableHeadCellCustom
                      key={index}
                      sx={{ width: `${50 / columnsSorted.length}%` }}
                      align="left"
                    >
                      {formatCurrency(rowsFlatByColumns[category][blockchainName] || 0)}
                    </TableHeadCellCustom>
                  )
                })}
                <TableCellCustom sx={{ width: '25%' }} align="left">
                  {formatCurrency(rowTotal, 0)}
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
            <TableFooterCellCustom sx={{ width: '25%' }} align="left">
              Grand total
            </TableFooterCellCustom>
            {columnsSorted.map((blockchainName: any, index: number) => {
              total += rowGrandTotals[blockchainName]
              return (
                <TableFooterCellCustom
                  key={index}
                  sx={{ width: `${50 / Object.keys(rowGrandTotals).length}%` }}
                  align="left"
                >
                  {formatCurrency(rowGrandTotals[blockchainName])}
                </TableFooterCellCustom>
              )
            })}
            <TableFooterCellCustom sx={{ width: '25%' }} align="left">
              {formatCurrency(total || 0)}
            </TableFooterCellCustom>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBlockchain
