import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

interface TableResultsProps {
  fundsDetails: any
  totals: any
}

const TableResults = (props: TableResultsProps) => {
  const { fundsDetails, totals } = props

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom align="left">Blockchain</TableHeadCellCustom>
            <TableHeadCellCustom align="left">Position</TableHeadCellCustom>
            <TableHeadCellCustom align="right">Rewards</TableHeadCellCustom>
            <TableHeadCellCustom align="right">
              Fees/Rebasing/Pool Token Variation
            </TableHeadCellCustom>
            <TableHeadCellCustom align="right">Total</TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundsDetails.length === 0 && (
            <TableRow>
              <TableCellCustom align="center" colSpan={5}>
                No data available
              </TableCellCustom>
            </TableRow>
          )}
          {fundsDetails.map((row: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCellCustom align="left">{row.blockchain}</TableCellCustom>
                <TableCellCustom align="left">
                  <BoxWrapperColumn>
                    {row.position}
                    <CustomTypography variant="tableCellSubData">{row.protocol}</CustomTypography>
                  </BoxWrapperColumn>
                </TableCellCustom>
                <TableCellCustom align="right">
                  {numbro(row['rewards']).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom align="right">
                  {numbro(row['fees']).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableCellCustom>
                <TableCellCustom align="right">
                  {numbro(row['total']).formatCurrency({
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
            <TableFooterCellCustom align="left"> </TableFooterCellCustom>
            <TableFooterCellCustom align="right">
              {numbro(totals?.rewardsTotal || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right">
              {numbro(totals?.feesTotal || 0).formatCurrency({
                spaceSeparated: false,
                mantissa: 2,
                thousandSeparated: true
              })}
            </TableFooterCellCustom>
            <TableFooterCellCustom align="right">
              {numbro(totals?.total || 0).formatCurrency({
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

export default TableResults
