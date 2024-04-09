import { Box, styled, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableHeadCellCustom,
  TableFooterCellCustom,
  TableEmptyCellCustom,
  TableCellCustom,
  EmptyData,
  CustomTypography
} from 'src/components'
import { useApp } from 'src/contexts/app.context'

interface TableResultsProps {
  operationDetails: any
  totals: any
}

export const CustomTypo = styled(CustomTypography)(({ theme }) => ({
  fontFamily: 'IBM Plex Mono',
  fontStyle: 'normal',
  fontWeight: '700 !important',
  color: `custom.black.primary`,
  textOverflow: 'ellipsis',
  whiteSpace: 'wrap',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    fontSize: '11px',
    lineHeight: '14px'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
    lineHeight: '16px'
  }
}))

const TableOperations = (props: TableResultsProps) => {
  const { operationDetails, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const { state } = useApp()
  const { currency } = state

  return (
    <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom
              sx={{
                width: '25%',
                position: 'sticky',
                left: 0,
                zIndex: 1,
                backgroundColor: '#eeeded'
              }}
              align="left"
            >
              <CustomTypo>Position</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '25%' }} align="right">
              <CustomTypo>Operations funds</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '25%' }} align="right">
              <BoxWrapperRow sx={{ justifyContent: 'flex-end' }} gap={0}>
                <CustomTypo>Operations results</CustomTypo>
                <Tooltip
                  enterTouchDelay={0}
                  title={
                    'Operations results include fees, rebasing, pool token variation and rewards from Operations positions'
                  }
                  sx={{ ml: 1, cursor: 'pointer' }}
                >
                  <InfoIcon />
                </Tooltip>
              </BoxWrapperRow>
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: '25%' }} align="right">
              <CustomTypo>Price variation for initial balance</CustomTypo>
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
                    <TableCellCustom
                      sx={{
                        width: '25%',
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: '#eeeded'
                      }}
                      align="left"
                    >
                      <BoxWrapperColumn>
                        <CustomTypo>{row?.position}</CustomTypo>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{
                            fontSize: {
                              xs: '11px',
                              md: '16px'
                            },
                            fontWeight: '400 !important'
                          }}
                        >
                          {row?.protocol}
                        </CustomTypography>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{
                            fontSize: {
                              xs: '11px',
                              md: '16px'
                            },
                            fontWeight: '400 !important',
                            fontStyle: 'italic'
                          }}
                        >
                          {row?.blockchain}
                        </CustomTypography>
                      </BoxWrapperColumn>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '25%' }} align="right">
                      <CustomTypo>
                        {currency === 'USD'
                          ? formatCurrency(row?.operationsFunds || 0)
                          : formatNumber(row?.operationsFunds || 0, 0)}
                      </CustomTypo>
                      {row?.allocation > 0 && (
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{
                            fontSize: {
                              xs: '11px',
                              md: '16px'
                            },
                            fontWeight: '400 !important'
                          }}
                        >
                          {formatPercentage(row.allocation)}
                        </CustomTypography>
                      )}
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '25%' }} align="right">
                      <CustomTypo>
                        {currency === 'USD'
                          ? formatCurrency(row?.operationResults?.toFixed(2) || 0)
                          : formatNumber(row?.operationResults?.toFixed(2) || 0, 1)}
                      </CustomTypo>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: '25%' }} align="right">
                      <CustomTypo sx={{ fontWeight: '400 !important' }}>
                        {currency === 'USD'
                          ? formatCurrency(row?.priceVariation?.toFixed(2) || 0)
                          : formatNumber(row?.priceVariation?.toFixed(2) || 0, 0)}
                      </CustomTypo>
                    </TableCellCustom>
                  </TableRow>
                )
              })}

              {operationDetails.length > 5 ? (
                <TableRow>
                  <TableCellCustom colSpan={4} align="center">
                    <BoxWrapperRow gap={1}>
                      <CustomTypography
                        variant="tableCellSubData"
                        sx={{
                          cursor: 'pointer',
                          align: 'center',
                          fontSize: {
                            xs: '12px',
                            md: '16px'
                          }
                        }}
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
                          fontWeight: '700 !important',
                          fontSize: {
                            xs: '12px',
                            md: '16px'
                          }
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
                <TableFooterCellCustom
                  sx={{
                    width: '25%',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: '#eeeded'
                  }}
                  align="left"
                >
                  <CustomTypo>Total</CustomTypo>
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '25%' }} align="right">
                  <CustomTypo>
                    {currency === 'USD'
                      ? formatCurrency(totals?.operationsFundsTotal || 0)
                      : formatNumber(totals?.operationsFundsTotal || 0, 0)}
                  </CustomTypo>
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '25%' }} align="right">
                  <CustomTypo>
                    {currency === 'USD'
                      ? formatCurrency(totals?.operationResultsTotal || 0)
                      : formatNumber(totals?.operationResultsTotal || 0, 1)}
                  </CustomTypo>
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: '25%' }} align="right">
                  <CustomTypo>
                    {currency === 'USD'
                      ? formatCurrency(totals?.priceVariationTotal || 0)
                      : formatNumber(totals?.priceVariationTotal || 0, 0)}
                  </CustomTypo>
                </TableFooterCellCustom>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableOperations
