import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
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
          {fundsDetails.map((row: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {row.blockchain}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  <BoxWrapperColumn>
                    {row.position}
                    <CustomTypography variant="tableCellSubData">{row.protocol}</CustomTypography>
                  </BoxWrapperColumn>
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(row['rewards'] || 0)}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(row['fees']) || 0}
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(row['total'] || 0)}
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
              {' '}
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {formatCurrency(totals?.rewardsTotal || 0)}
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {formatCurrency(totals?.feesTotal || 0)}
            </TableFooterCellCustom>
            <TableFooterCellCustom sx={{ width: '20%' }} align="left">
              {formatCurrency(totals?.total || 0)}
            </TableFooterCellCustom>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableResults
