import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

interface TableFundsProps {
  funds: any
  totals: any
}

const TableFunds = (props: TableFundsProps) => {
  const { funds, totals } = props
  return (
    <BoxWrapperColumn gap={4}>
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
                Farming funds
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Unclaimed rewards
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Farming results *
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds.map((row: any, index: number) => {
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
                    <BoxWrapperColumn
                      sx={{
                        minWidth: 'max-content',
                        width: '125px',
                        maxWidth: '100%',
                        alignItems: 'flex-end'
                      }}
                    >
                      {numbro(row.funds).formatCurrency({
                        spaceSeparated: false,
                        mantissa: 2,
                        thousandSeparated: true
                      })}
                      <CustomTypography variant="tableCellSubData">
                        {numbro(row.allocation / 100).format({
                          output: 'percent',
                          spaceSeparated: false,
                          mantissa: 2
                        })}
                      </CustomTypography>
                    </BoxWrapperColumn>
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {numbro(row.unclaimed).formatCurrency({
                      spaceSeparated: false,
                      mantissa: 2,
                      thousandSeparated: true
                    })}
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {numbro(row.results).formatCurrency({
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
                {' '}
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                {numbro(totals?.fundsTotal || 0).formatCurrency({
                  spaceSeparated: false,
                  mantissa: 2,
                  thousandSeparated: true
                })}
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                {numbro(totals?.unclaimedTotal || 0).formatCurrency({
                  spaceSeparated: false,
                  mantissa: 2,
                  thousandSeparated: true
                })}
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                {numbro(totals?.resultsTotal || 0).formatCurrency({
                  spaceSeparated: false,
                  mantissa: 2,
                  thousandSeparated: true
                })}
              </TableFooterCellCustom>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <CustomTypography
        variant="body2"
        color="textSecondary"
        align="left"
        sx={{ fontStyle: 'italic' }}
      >
        * Farming Results includes results from fees, rebasing, pool token variation and rewards
      </CustomTypography>
    </BoxWrapperColumn>
  )
}

export default TableFunds
