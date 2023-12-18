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

interface TableResultsProps {
  operationDetails: any
  totals: any
}

const TableOperations = (props: TableResultsProps) => {
  const { operationDetails, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: '15%' }} align="left">
                Blockchain
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '15%' }} align="left">
                Position
              </TableHeadCellCustom>
              <TableHeadCellCustom
                align="left"
                sx={{
                  width: '15%',
                  wordWrap: 'break-all',
                  whiteSpace: 'normal',
                  paddingRight: '10px'
                }}
              >
                Operations funds
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '15%' }} align="left">
                Allocation
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '15%' }} align="left">
                Operation results *
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '25%' }} align="left">
                Price variation for initial balance
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {operationDetails.length === 0 ? (
              <TableRow>
                <TableEmptyCellCustom colSpan={6}>
                  <EmptyData />
                </TableEmptyCellCustom>
              </TableRow>
            ) : (
              <>
                {operationDetails.map((row: any, index: number) => {
                  if (!displayAll && index > 4) return null

                  return (
                    <TableRow key={index}>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
                        {row?.blockchain}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
                        <BoxWrapperColumn sx={{ width: '90%', overflowWrap: 'anywhere' }}>
                          {row?.position}
                          <CustomTypography variant="tableCellSubData">
                            {row?.protocol}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
                        {formatCurrency(row?.operationsFunds?.toFixed(2) || 0)}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
                        {formatPercentage(row?.allocation?.toFixed(2)) || 0}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '15%' }} align="left">
                        {formatCurrency(row?.operationResults?.toFixed(2) || 0)}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '25%' }} align="left">
                        {formatCurrency(row?.priceVariation?.toFixed(2) || 0)}
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                {operationDetails.length > 5 ? (
                  <TableRow>
                    <TableCellCustom colSpan={6} align="center">
                      <BoxWrapperRow gap={1}>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{ cursor: 'pointer', align: 'center' }}
                          onClick={() => setDisplayAll(!displayAll)}
                        >
                          {!displayAll
                            ? `${operationDetails.length > 4 ? 5 : operationDetails.length} of ${
                                operationDetails.length
                              }`
                            : `${operationDetails.length} of ${operationDetails.length}`}
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
                          {displayAll ? 'View less' : 'View all'}
                        </CustomTypography>
                      </BoxWrapperRow>
                    </TableCellCustom>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableFooterCellCustom sx={{ width: '15%' }} align="left">
                    Total
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '15%' }} align="left">
                    {' '}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '15%' }} align="left">
                    {formatCurrency(totals?.operationsFundsTotal || 0)}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '15%' }} align="left">
                    {formatPercentage(totals?.allocationTotal || 0)}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '15%' }} align="left">
                    {formatCurrency(totals?.operationResultsTotal || 0)}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '25%' }} align="left">
                    {formatCurrency(totals?.priceVariationTotal || 0)}
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
        Operations Results include results from fees, rebasing, pool token variation and rewards
        from Operations positions
      </CustomTypography>
    </BoxWrapperColumn>
  )
}

export default TableOperations
