import { Box, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material'
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
  CustomTypography,
  UniswapHelpText
} from 'src/components'
import { UNISWAP_PROTOCOL } from 'src/config/constants'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'

interface TableFundsProps {
  funds: any
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

const TableFunds = (props: TableFundsProps) => {
  const { funds, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  return (
    <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom
              sx={{
                width: isDDay ? '33%' : '25%',
                position: 'sticky',
                left: 0,
                zIndex: 1,
                backgroundColor: '#eeeded'
              }}
              align="left"
            >
              <CustomTypo>Position</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
              <CustomTypo>{isDDay ? 'DeFi funds' : 'Farming funds'}</CustomTypo>
            </TableHeadCellCustom>
            {!isDDay ? (
              <TableHeadCellCustom sx={{ width: '25%' }} align="right">
                <CustomTypo>Unclaimed rewards</CustomTypo>
              </TableHeadCellCustom>
            ) : null}
            <TableHeadCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
              <BoxWrapperRow sx={{ justifyContent: 'flex-end' }} gap={0}>
                <CustomTypo>{isDDay ? 'DeFi results' : 'Farming results'}</CustomTypo>
                <Tooltip
                  title={
                    isDDay
                      ? 'DeFi results include fees, rebasing, pool token variation and rewards from DeFi positions'
                      : 'Farming results include results from fees, rebasing, pool token variation and rewards'
                  }
                  sx={{
                    ml: 1,
                    cursor: 'pointer'
                  }}
                >
                  <InfoIcon />
                </Tooltip>
              </BoxWrapperRow>
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
                    <TableCellCustom
                      sx={{
                        width: isDDay ? '25%' : '20%',
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: '#eeeded'
                      }}
                      align="left"
                    >
                      <BoxWrapperRow
                        sx={{ overflowWrap: 'anywhere', justifyContent: 'flex-start' }}
                      >
                        <BoxWrapperColumn>
                          <CustomTypo>{row.position}</CustomTypo>
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
                            {row.protocol}
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
                            {row.blockchain}
                          </CustomTypography>
                        </BoxWrapperColumn>
                        {row.protocol === UNISWAP_PROTOCOL ? <UniswapHelpText /> : null}
                      </BoxWrapperRow>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="right">
                      <BoxWrapperColumn>
                        <CustomTypo>
                          {currency === 'USD'
                            ? formatCurrency(row.funds || 0)
                            : formatNumber(row.funds, 0)}
                        </CustomTypo>
                        {row?.allocation > 0 ? (
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
                            {formatPercentage(row.allocation / 100)}
                          </CustomTypography>
                        ) : null}
                      </BoxWrapperColumn>
                    </TableCellCustom>
                    {!isDDay ? (
                      <TableCellCustom sx={{ width: '20%' }} align="right">
                        <CustomTypo sx={{ fontWeight: '400 !important' }}>
                          {currency === 'USD'
                            ? formatCurrency(row.unclaimed || 0)
                            : formatNumber(row.unclaimed, 0)}
                        </CustomTypo>
                      </TableCellCustom>
                    ) : null}
                    <TableCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="right">
                      <CustomTypo>
                        {currency === 'USD'
                          ? formatCurrency(row.results || 0)
                          : formatNumber(row.results, 1)}
                      </CustomTypo>
                    </TableCellCustom>
                  </TableRow>
                )
              })}

              {funds.length > 5 ? (
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
                          ? `${funds.length > 4 ? 5 : funds.length} of ${funds.length}`
                          : `${funds.length} of ${funds.length}`}
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
                  colSpan={1}
                  align="left"
                  sx={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: '#eeeded'
                  }}
                >
                  <CustomTypo>Total</CustomTypo>
                </TableFooterCellCustom>
                <TableFooterCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                  <CustomTypo>
                    {currency === 'USD'
                      ? formatCurrency(totals?.fundsTotal || 0)
                      : formatNumber(totals?.fundsTotal || 0, 0)}
                  </CustomTypo>
                </TableFooterCellCustom>
                {!isDDay ? (
                  <TableFooterCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                    <CustomTypo>
                      {currency === 'USD'
                        ? formatCurrency(totals?.unclaimedTotal || 0)
                        : formatNumber(totals?.unclaimedTotal || 0, 0)}
                    </CustomTypo>
                  </TableFooterCellCustom>
                ) : null}
                <TableFooterCellCustom sx={{ width: isDDay ? '33%' : '25%' }} align="right">
                  <CustomTypo>
                    {currency === 'USD'
                      ? formatCurrency(totals?.resultsTotal || 0)
                      : formatNumber(totals?.resultsTotal || 0, 1)}
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

export default TableFunds
