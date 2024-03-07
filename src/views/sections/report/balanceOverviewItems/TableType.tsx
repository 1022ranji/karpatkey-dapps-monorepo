import { formatCurrency, formatNumber } from 'src/utils/format'
import {
  BoxWrapperColumn,
  TableHeadCellCustom,
  TableFooterCellCustom,
  TableCellCustom
} from 'src/components'
import { Box, BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'

type TableTypeProps = { balanceOverviewType: any } & BoxProps

export const TableType = (props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  const { state } = useApp()
  const { currency } = state

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%', minWidth: '1200px', overflow: 'scroll' }}>
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
                Total
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceOverviewType.map((row: any, index: number) => {
              dataFooterType['Farming funds'] =
                (dataFooterType['Farming funds'] || 0) + row['Farming funds']
              dataFooterType['Unclaimed rewards'] =
                (dataFooterType['Unclaimed rewards'] || 0) + row['Unclaimed rewards']
              dataFooterType['Wallet'] = (dataFooterType['Wallet'] || 0) + row['Wallet']
              dataFooterType['Total'] = (dataFooterType['Total'] || 0) + row['Total']
              return (
                <TableRow key={index}>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {row['Token Category']}
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(row['Farming funds'] || 0)
                      : formatNumber(row['Farming funds'] || 0, 0)}
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(row['Unclaimed rewards'] || 0)
                      : formatNumber(row['Unclaimed rewards'] || 0, 0)}
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(row['Wallet'] || 0)
                      : formatNumber(row['Wallet'] || 0, 0)}
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(row['Total'] || 0)
                      : formatNumber(row['Total'] || 0, 0)}
                  </TableCellCustom>
                </TableRow>
              )
            })}
            <TableRow>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                Total
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['Farming funds'] || 0)
                  : formatNumber(dataFooterType['Farming funds'] || 0, 0)}
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['Unclaimed rewards'] || 0)
                  : formatNumber(dataFooterType['Unclaimed rewards'] || 0, 0)}
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['Wallet'] || 0)
                  : formatNumber(dataFooterType['Wallet'] || 0, 0)}
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
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
