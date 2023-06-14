import {
  formatCurrency,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { Box, BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'

interface TableWalletTokenDetailProps {
  filteredWalletTokenDetail: any[]
}

const TableWalletTokenDetail = (props: TableWalletTokenDetailProps & BoxProps) => {
  const { filteredWalletTokenDetail, ...moreProps } = props

  return (
    <BoxWrapperColumn gap={4} {...moreProps}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token symbol
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Allocation
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token balance
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWalletTokenDetail.length === 0 ? (
              <TableRow>
                <TableEmptyCellCustom colSpan={3}>
                  <EmptyData />
                </TableEmptyCellCustom>
              </TableRow>
            ) : (
              <>
                {filteredWalletTokenDetail.map((row: any, index: number) => {
                  return (
                    <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCellCustom sx={{ width: '33%' }} align="left">
                        <BoxWrapperColumn>
                          {row.tokenSymbol}
                          <CustomTypography variant="tableCellSubData">
                            {row.blockchain}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '33%' }} align="left">
                        {formatPercentage(row.allocation)}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '33%' }} align="left">
                        <BoxWrapperColumn
                          sx={{
                            minWidth: 'max-content',
                            width: '125px',
                            maxWidth: '100%',
                            alignItems: 'flex-end'
                          }}
                        >
                          {formatNumber(row.tokenBalance)}
                          <CustomTypography variant="tableCellSubData">
                            {formatCurrency(row.usdValue, 2)}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                    </TableRow>
                  )
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapperColumn>
  )
}

export default TableWalletTokenDetail