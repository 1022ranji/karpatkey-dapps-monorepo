import {
  formatCurrency,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, styled, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { useApp } from '../../../contexts/app.context'

interface TableResultsProps {
  operationDetails: any
  totals: any
}

const BoxWrapper = styled(BoxWrapperColumn)({
  minWidth: 'max-content',
  width: '125px',
  maxWidth: '100%',
  alignItems: 'flex-end'
})

const TableOperations = (props: TableResultsProps) => {
  const { operationDetails, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const { state } = useApp()
  const { currency } = state

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
                Operations funds
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%', paddingRight: '5px' }} align="left">
                <BoxWrapperRow sx={{ justifyContent: 'flex-start' }} gap={1}>
                  Operation <br /> results
                  <Tooltip
                    title={
                      'Operations results include fees, rebasing, pool token variation and rewards from Operations positions'
                    }
                    sx={{ ml: 1, cursor: 'pointer' }}
                  >
                    <InfoIcon />
                  </Tooltip>
                </BoxWrapperRow>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Price variation <br />
                for initial balance
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {operationDetails.length === 0 ? (
              <TableRow>
                <TableEmptyCellCustom colSpan={5}>
                  <EmptyData />
                </TableEmptyCellCustom>
              </TableRow>
            ) : (
              <>
                {operationDetails.map((row: any, index: number) => {
                  if (!displayAll && index > 4) return null

                  return (
                    <TableRow key={index}>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {row?.blockchain}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapperColumn sx={{ width: '90%', overflowWrap: 'anywhere' }}>
                          {row?.position}
                          <CustomTypography variant="tableCellSubData">
                            {row?.protocol}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        <BoxWrapper>
                          {currency === 'USD'
                            ? formatCurrency(row?.operationsFunds || 0)
                            : formatNumber(row?.operationsFunds || 0, 0)}
                          {row?.allocation > 0 ? (
                            <CustomTypography variant="tableCellSubData">
                              {formatPercentage(row.allocation)}
                            </CustomTypography>
                          ) : null}
                        </BoxWrapper>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {currency === 'USD'
                          ? formatCurrency(row?.operationResults?.toFixed(2) || 0)
                          : formatNumber(row?.operationResults?.toFixed(2) || 0, 1)}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '20%' }} align="left">
                        {currency === 'USD'
                          ? formatCurrency(row?.priceVariation?.toFixed(2) || 0)
                          : formatNumber(row?.priceVariation?.toFixed(2) || 0, 0)}
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                {operationDetails.length > 5 ? (
                  <TableRow>
                    <TableCellCustom colSpan={5} align="center">
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
                  <TableFooterCellCustom colSpan={2} align="left">
                    Total
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    <BoxWrapper>
                      {currency === 'USD'
                        ? formatCurrency(totals?.operationsFundsTotal || 0)
                        : formatNumber(totals?.operationsFundsTotal || 0, 0)}
                    </BoxWrapper>
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(totals?.operationResultsTotal || 0)
                      : formatNumber(totals?.operationResultsTotal || 0, 1)}
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(totals?.priceVariationTotal || 0)
                      : formatNumber(totals?.priceVariationTotal || 0, 0)}
                  </TableFooterCellCustom>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapperColumn>
  )
}

export default TableOperations
