import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'

interface TableFundsProps {
  funds: any
  totals: any
}

const TableFunds = (props: TableFundsProps) => {
  const { funds, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

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
            {funds.length === 0 ? (
              <TableRow>
                <TableEmptyCellCustom colSpan={5}>
                  <EmptyData />
                </TableEmptyCellCustom>
              </TableRow>
            ) : (
              <>
                {funds.map((row: any, index: number) => {
                  if (!displayAll && index > 4) return null

                  return (
                    <TableRow key={index}>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {row.blockchain}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperColumn sx={{ width: '90%', overflowWrap: 'anywhere' }}>
                          {row.position}
                          <CustomTypography variant="tableCellSubData">
                            {row.protocol}
                          </CustomTypography>
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
                          {formatCurrency(row.funds || 0)}
                          <CustomTypography variant="tableCellSubData">
                            {formatPercentage(row.allocation / 100)}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {formatCurrency(row.unclaimed) || 0}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {formatCurrency(row.results) || 0}
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                <TableRow>
                  <TableCellCustom colSpan={5} align="center">
                    <BoxWrapperRow gap={1}>
                      <CustomTypography
                        variant="tableCellSubData"
                        sx={{ cursor: 'pointer', align: 'center' }}
                        onClick={() => setDisplayAll(!displayAll)}
                      >
                        {!displayAll
                          ? `${funds.length > 4 ? 5 : funds.length} of ${funds.length}`
                          : `${funds.length} of ${funds.length}`}
                      </CustomTypography>
                      <CustomTypography
                        variant="tableCellSubData"
                        sx={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          align: 'center',
                          fontWeight: '700 !important'
                        }}
                        onClick={() => setDisplayAll(!displayAll)}
                      >
                        {displayAll ? 'Show less' : 'Show all'}
                      </CustomTypography>
                    </BoxWrapperRow>
                  </TableCellCustom>
                </TableRow>
                <TableRow>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    Grand total
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {' '}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {formatCurrency(totals?.fundsTotal || 0)}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {formatCurrency(totals?.unclaimedTotal || 0)}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {formatCurrency(totals?.resultsTotal || 0)}
                  </TableFooterCellCustom>
                </TableRow>
              </>
            )}
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
