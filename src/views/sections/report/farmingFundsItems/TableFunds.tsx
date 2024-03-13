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

const BoxWrapper = styled(BoxWrapperColumn)({
  minWidth: 'max-content',
  width: '125px',
  maxWidth: '100%',
  alignItems: 'flex-end'
})

const TableFunds = (props: TableFundsProps) => {
  const { funds, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table
          sx={{
            width: '100%',
            minWidth: {
              xs: '600px',
              md: '1200px'
            },
            overflow: 'scroll'
          }}
        >
          <TableHead>
            <TableRow>
              <TableHeadCellCustom
                sx={{
                  width: isDDay ? '25%' : '20%',
                  fontSize: {
                    xs: '12px',
                    md: '16px'
                  }
                }}
                align="left"
              >
                Blockchain
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{
                  width: isDDay ? '25%' : '20%',
                  fontSize: {
                    xs: '12px',
                    md: '16px'
                  }
                }}
                align="left"
              >
                Position
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{
                  width: isDDay ? '25%' : '20%',
                  fontSize: {
                    xs: '12px',
                    md: '16px'
                  }
                }}
                align="left"
              >
                {isDDay ? 'DeFi funds' : 'Farming funds'}
              </TableHeadCellCustom>
              {!isDDay ? (
                <TableHeadCellCustom
                  sx={{
                    width: '20%',
                    fontSize: {
                      xs: '12px',
                      md: '16px'
                    }
                  }}
                  align="left"
                >
                  Unclaimed rewards
                </TableHeadCellCustom>
              ) : null}
              <TableHeadCellCustom
                sx={{
                  width: isDDay ? '25%' : '20%',
                  fontSize: {
                    xs: '12px',
                    md: '16px'
                  }
                }}
                align="left"
              >
                <BoxWrapperRow
                  sx={{
                    justifyContent: 'flex-start',
                    fontSize: {
                      xs: '12px',
                      md: '16px'
                    }
                  }}
                  gap={1}
                >
                  {isDDay ? 'DeFi results' : 'Farming results'}
                  <Tooltip
                    title={
                      isDDay
                        ? 'DeFi results include fees, rebasing, pool token variation and rewards from DeFi positions'
                        : 'Farming results include results from fees, rebasing, pool token variation and rewards'
                    }
                    sx={{
                      ml: 1,
                      cursor: 'pointer',
                      fontSize: {
                        xs: '12px',
                        md: '16px'
                      }
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
                          fontSize: {
                            xs: '12px',
                            md: '16px'
                          }
                        }}
                        align="left"
                      >
                        {row.blockchain}
                      </TableCellCustom>
                      <TableCellCustom
                        sx={{
                          width: isDDay ? '25%' : '20%',
                          fontSize: {
                            xs: '12px',
                            md: '16px'
                          }
                        }}
                        align="left"
                      >
                        <BoxWrapperRow
                          sx={{
                            width: '90%',
                            overflowWrap: 'anywhere',
                            justifyContent: 'flex-start'
                          }}
                        >
                          <BoxWrapperColumn>
                            {row.position}
                            <CustomTypography
                              variant="tableCellSubData"
                              sx={{
                                fontSize: {
                                  xs: '12px',
                                  md: '16px'
                                }
                              }}
                            >
                              {row.protocol}
                            </CustomTypography>
                          </BoxWrapperColumn>
                          {row.protocol === UNISWAP_PROTOCOL ? <UniswapHelpText /> : null}
                        </BoxWrapperRow>
                      </TableCellCustom>
                      <TableCellCustom
                        sx={{
                          width: isDDay ? '25%' : '20%',
                          fontSize: {
                            xs: '12px',
                            md: '16px'
                          }
                        }}
                        align="left"
                      >
                        <BoxWrapper>
                          {currency === 'USD'
                            ? formatCurrency(row.funds || 0)
                            : formatNumber(row.funds, 0)}
                          {row?.allocation > 0 ? (
                            <CustomTypography
                              variant="tableCellSubData"
                              sx={{
                                fontSize: {
                                  xs: '12px',
                                  md: '16px'
                                }
                              }}
                            >
                              {formatPercentage(row.allocation / 100)}
                            </CustomTypography>
                          ) : null}
                        </BoxWrapper>
                      </TableCellCustom>
                      {!isDDay ? (
                        <TableCellCustom
                          sx={{
                            width: '20%',
                            fontSize: {
                              xs: '12px',
                              md: '16px'
                            }
                          }}
                          align="left"
                        >
                          {currency === 'USD'
                            ? formatCurrency(row.unclaimed || 0)
                            : formatNumber(row.unclaimed, 0)}
                        </TableCellCustom>
                      ) : null}
                      <TableCellCustom
                        sx={{
                          width: isDDay ? '25%' : '20%',
                          fontSize: {
                            xs: '12px',
                            md: '16px'
                          }
                        }}
                        align="left"
                      >
                        {currency === 'USD'
                          ? formatCurrency(row.results || 0)
                          : formatNumber(row.results, 1)}
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                {funds.length > 5 ? (
                  <TableRow>
                    <TableCellCustom
                      colSpan={5}
                      align="center"
                      sx={{
                        fontSize: {
                          xs: '12px',
                          md: '16px'
                        }
                      }}
                    >
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
                    colSpan={2}
                    align="left"
                    sx={{
                      fontSize: {
                        xs: '12px',
                        md: '16px'
                      }
                    }}
                  >
                    Total
                  </TableFooterCellCustom>
                  <TableFooterCellCustom
                    sx={{
                      width: isDDay ? '25%' : '20%',
                      fontSize: {
                        xs: '12px',
                        md: '16px'
                      }
                    }}
                    align="left"
                  >
                    <BoxWrapper>
                      {currency === 'USD'
                        ? formatCurrency(totals?.fundsTotal || 0)
                        : formatNumber(totals?.fundsTotal || 0, 0)}
                    </BoxWrapper>
                  </TableFooterCellCustom>
                  {!isDDay ? (
                    <TableFooterCellCustom
                      sx={{
                        width: isDDay ? '25%' : '20%',
                        fontSize: {
                          xs: '12px',
                          md: '16px'
                        }
                      }}
                      align="left"
                    >
                      {currency === 'USD'
                        ? formatCurrency(totals?.unclaimedTotal || 0)
                        : formatNumber(totals?.unclaimedTotal || 0, 0)}
                    </TableFooterCellCustom>
                  ) : null}
                  <TableFooterCellCustom
                    sx={{
                      width: isDDay ? '25%' : '20%',
                      fontSize: {
                        xs: '12px',
                        md: '16px'
                      }
                    }}
                    align="left"
                  >
                    {currency === 'USD'
                      ? formatCurrency(totals?.resultsTotal || 0)
                      : formatNumber(totals?.resultsTotal || 0, 1)}
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

export default TableFunds
