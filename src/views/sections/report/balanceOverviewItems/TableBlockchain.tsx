import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'
import { formatCurrency, formatNumber } from 'src/utils/format'
import { TableCellCustom, TableFooterCellCustom, TableHeadCellCustom } from 'src/components'
import { useApp } from 'src/contexts/app.context'

type TableBlockchainProps = {
  balanceOverviewBlockchain: { funds: number; row: string; column: string }[]
} & BoxProps

export const TableBlockchain = (props: TableBlockchainProps) => {
  const { balanceOverviewBlockchain = [] } = props

  const { state } = useApp()
  const { currency } = state

  const balanceOverviewBlockchainFlattened = balanceOverviewBlockchain.reduce(
    (acc: any, cur: any) => {
      const category = cur.row
      const blockchain = cur.column
      const itemFound = acc.find((item: any) => item.category === cur.row)

      if (itemFound) {
        itemFound[blockchain] = cur?.funds ?? 0
        itemFound.total += cur?.funds ?? 0
        return acc
      }

      acc.push({
        category,
        [blockchain]: cur?.funds ?? 0,
        total: cur?.funds ?? 0
      })

      return acc
    },
    []
  )

  const balanceOverviewBlockchainFlattenedAndSortedByTotal =
    balanceOverviewBlockchainFlattened.sort((a: any, b: any) => b.total - a.total)

  const totals = balanceOverviewBlockchainFlattenedAndSortedByTotal.reduce((acc: any, cur: any) => {
    Object.keys(cur).forEach((column: any) => {
      if (column !== 'category') {
        acc[column] = acc[column] || 0
        acc[column] += cur[column]
      }
    })
    return acc
  }, {})

  const columns = Object.keys(totals)
    .filter((column: any) => column !== 'total')
    .sort((a, b) => totals[b] - totals[a])

  const columnWidthPercentage = 100 / ((columns?.length ?? 0) + 2) + '%'

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: '100%', minWidth: '1200px', overflow: 'scroll' }}>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom
              sx={{
                width: columnWidthPercentage,
                fontSize: {
                  xs: '12px',
                  md: '16px'
                }
              }}
              align="left"
            >
              Token category
            </TableHeadCellCustom>
            {columns.map((blockchainName: any, index: number) => (
              <TableHeadCellCustom
                key={index}
                sx={{
                  width: columnWidthPercentage,
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontSize: {
                    xs: '12px',
                    md: '16px'
                  }
                }}
                align="left"
              >
                {blockchainName}
              </TableHeadCellCustom>
            ))}
            <TableHeadCellCustom
              sx={{
                width: columnWidthPercentage,
                fontSize: {
                  xs: '12px',
                  md: '16px'
                }
              }}
              align="left"
            >
              Total
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceOverviewBlockchainFlattenedAndSortedByTotal.map((item: any, index: number) => {
            const { category, total = 0 } = item
            return (
              <TableRow key={index}>
                <TableCellCustom
                  sx={{
                    width: columnWidthPercentage,
                    fontSize: {
                      xs: '12px',
                      md: '16px'
                    }
                  }}
                  align="left"
                >
                  {category}
                </TableCellCustom>
                {columns.map((blockchainName: any, index: number) => {
                  const value = item[blockchainName] ?? 0
                  return (
                    <TableCellCustom
                      key={index}
                      sx={{
                        width: columnWidthPercentage,
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        fontSize: {
                          xs: '12px',
                          md: '16px'
                        }
                      }}
                      align="left"
                    >
                      {currency === 'USD' ? formatCurrency(value) : formatNumber(value, 0)}
                    </TableCellCustom>
                  )
                })}
                <TableCellCustom
                  sx={{
                    width: columnWidthPercentage,
                    fontSize: {
                      xs: '12px',
                      md: '16px'
                    }
                  }}
                  align="left"
                >
                  {currency === 'USD' ? formatCurrency(total || 0) : formatNumber(total || 0, 0)}
                </TableCellCustom>
              </TableRow>
            )
          })}
          <TableRow>
            <TableFooterCellCustom
              sx={{
                width: columnWidthPercentage,
                fontSize: {
                  xs: '12px',
                  md: '16px'
                }
              }}
              align="left"
            >
              Total
            </TableFooterCellCustom>
            {columns.map((blockchainName: any, index: number) => {
              const total = totals[blockchainName] ?? 0
              return (
                <TableFooterCellCustom
                  key={index}
                  sx={{
                    width: columnWidthPercentage,
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    fontSize: {
                      xs: '12px',
                      md: '16px'
                    }
                  }}
                  align="left"
                >
                  {currency === 'USD' ? formatCurrency(total) : formatNumber(total, 0)}
                </TableFooterCellCustom>
              )
            })}
            <TableFooterCellCustom
              sx={{
                width: columnWidthPercentage,
                fontSize: {
                  xs: '12px',
                  md: '16px'
                }
              }}
              align="left"
            >
              {currency === 'USD'
                ? formatCurrency(totals['total'] || 0)
                : formatNumber(totals['total'] || 0, 0)}
            </TableFooterCellCustom>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
