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
              <TableHeadCellCustom align="left">Blockchain</TableHeadCellCustom>
              <TableHeadCellCustom align="left">Position</TableHeadCellCustom>
              <TableHeadCellCustom align="right">Farming funds</TableHeadCellCustom>
              <TableHeadCellCustom align="right">Unclaimed rewards</TableHeadCellCustom>
              <TableHeadCellCustom align="right">Farming results *</TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds.length === 0 && (
              <TableRow>
                <TableCellCustom align="center" colSpan={5}>
                  No data available
                </TableCellCustom>
              </TableRow>
            )}
            {funds.map((row: any, index: number) => {
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
                    <BoxWrapperColumn>
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
                  <TableCellCustom align="right">
                    {numbro(row.unclaimed).formatCurrency({
                      spaceSeparated: false,
                      mantissa: 2,
                      thousandSeparated: true
                    })}
                  </TableCellCustom>
                  <TableCellCustom align="right">
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
              <TableFooterCellCustom align="left">Grand total</TableFooterCellCustom>
              <TableFooterCellCustom align="left"> </TableFooterCellCustom>
              <TableFooterCellCustom align="right">
                {numbro(totals?.fundsTotal || 0).formatCurrency({
                  spaceSeparated: false,
                  mantissa: 2,
                  thousandSeparated: true
                })}
              </TableFooterCellCustom>
              <TableFooterCellCustom align="right">
                {numbro(totals?.unclaimedTotal || 0).formatCurrency({
                  spaceSeparated: false,
                  mantissa: 2,
                  thousandSeparated: true
                })}
              </TableFooterCellCustom>
              <TableFooterCellCustom align="right">
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
