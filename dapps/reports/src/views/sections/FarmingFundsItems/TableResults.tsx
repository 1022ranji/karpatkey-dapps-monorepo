import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
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
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Blockchain
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Position
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Rewards
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Fees/Rebasing/Pool Token Variation
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '20%' }} align="left">
              Total
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundsDetails.length === 0 ? (
            <TableRow>
              <TableCellCustom align="center" colSpan={5}>
                No data available
              </TableCellCustom>
            </TableRow>
          ) : null}
          {fundsDetails.length > 0
            ? fundsDetails.map((row: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {row.blockchain}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      <BoxWrapperColumn>
                        {row.position}
                        <CustomTypography variant="tableCellSubData">
                          {row.protocol}
                        </CustomTypography>
                      </BoxWrapperColumn>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {numbro(row['rewards']).formatCurrency({
                        spaceSeparated: false,
                        mantissa: 2,
                        thousandSeparated: true
                      })}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {numbro(row['fees']).formatCurrency({
                        spaceSeparated: false,
                        mantissa: 2,
                        thousandSeparated: true
                      })}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {numbro(row['total']).formatCurrency({
                        spaceSeparated: false,
                        mantissa: 2,
                        thousandSeparated: true
                      })}
                    </TableCellCustom>
                  </TableRow>
                )
              })
            : null}
          {fundsDetails.length > 0 ? (
            <>
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
                  {' '}
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(totals?.rewardsTotal || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(totals?.feesTotal || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {numbro(totals?.total || 0).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2,
                    thousandSeparated: true
                  })}
                </TableFooterCellCustom>
              </TableRow>
            </>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableResults
