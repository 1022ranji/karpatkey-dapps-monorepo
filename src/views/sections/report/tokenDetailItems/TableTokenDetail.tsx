import {
  formatCurrency,
  formatCurrencyWithPrecision,
  formatNumber,
  formatNumberWithPrecision,
  formatPercentage
} from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableHeadCellCustom,
  TableEmptyCellCustom,
  TableCellCustom,
  EmptyData,
  CustomTypography
} from 'src/components'

import { TOKEN_COINGECKO_PRICE_URL } from 'src/config/constants'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Box,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Tooltip
} from '@mui/material'
import * as React from 'react'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'
import useMediaQuery from '@mui/material/useMediaQuery'

interface TableTokenDetailProps {
  filteredTokenDetails: any[]
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

export const TableTokenDetail = (props: TableTokenDetailProps) => {
  const { filteredTokenDetails } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom
              sx={{
                width: isMD ? '20%' : '33%',
                position: 'sticky',
                left: 0,
                zIndex: 1,
                backgroundColor: '#eeeded'
              }}
              align="left"
            >
              <CustomTypo>Token symbol</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: isMD ? '20%' : '33%' }} align="right">
              <CustomTypo>{currency === 'USD' ? 'Price' : 'ETH Price'}</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom sx={{ width: isMD ? '20%' : '33%' }} align="right">
              <CustomTypo>Token balance</CustomTypo>
            </TableHeadCellCustom>

            {isMD ? (
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>{isDDay ? 'Share' : 'Allocation'}</CustomTypo>
              </TableHeadCellCustom>
            ) : null}
            {isMD ? (
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Price variation</CustomTypo>
              </TableHeadCellCustom>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTokenDetails.length === 0 ? (
            <TableRow>
              <TableEmptyCellCustom colSpan={isMD ? 5 : 4}>
                <EmptyData />
              </TableEmptyCellCustom>
            </TableRow>
          ) : (
            <>
              {filteredTokenDetails.map((row: any, index: number) => {
                if (!displayAll && index > 4) return null

                const TOKEN = TOKEN_COINGECKO_PRICE_URL.find(
                  (item) => item.tokenName.toLowerCase() === row.tokenSymbol.toLowerCase()
                )
                const onClick = () => {
                  if (TOKEN) {
                    window.open(TOKEN.url, '_blank')
                  }
                }

                const blockchains = row.blockchain.split('|')

                let blockchainFilter = blockchains.reduce(
                  (acc: string, item: string, index: number) => {
                    if (index % 2 === 0) {
                      acc += `${item} | `
                    } else {
                      acc += `${item} | \n`
                    }
                    return acc
                  },
                  ''
                )
                blockchainFilter = blockchainFilter.slice(0, -3)

                return (
                  <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCellCustom
                      sx={{
                        width: isMD ? '20%' : '33%',
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: '#eeeded'
                      }}
                      align="left"
                    >
                      <BoxWrapperColumn>
                        <CustomTypo>{row.tokenSymbol}</CustomTypo>
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
                          {row.tokenCategory}
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
                          {blockchainFilter}
                        </CustomTypography>
                      </BoxWrapperColumn>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: isMD ? '20%' : '33%' }} align="right">
                      <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-end' }}>
                        <BoxWrapperColumn gap={'2px'} sx={{ alignItems: 'flex-end' }}>
                          <Tooltip
                            title={
                              currency === 'USD'
                                ? formatCurrency(row?.price, 4)
                                : formatNumber(row?.price, 10)
                            }
                            sx={{ ml: 1, cursor: 'pointer' }}
                          >
                            <div>
                              <CustomTypo>
                                {currency === 'USD'
                                  ? formatCurrencyWithPrecision(row.price)
                                  : formatNumberWithPrecision(+row.price?.toFixed(6))}
                              </CustomTypo>
                            </div>
                          </Tooltip>

                          {!isMD ? (
                            <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-end' }}>
                              {formatPercentage(row.priceVariation) === '0.00%' ? (
                                <Tooltip
                                  title={formatPercentage(row.priceVariation, 10)}
                                  sx={{ ml: 1, cursor: 'pointer' }}
                                >
                                  <CustomTypo sx={{ fontWeight: '400 !important' }}>
                                    {formatPercentage(row.priceVariation)}
                                  </CustomTypo>
                                </Tooltip>
                              ) : (
                                <CustomTypo sx={{ fontWeight: '400 !important' }}>
                                  {formatPercentage(row.priceVariation)}
                                </CustomTypo>
                              )}

                              {row.priceVariation > 0 ? (
                                <ArrowUpwardIcon sx={{ fontSize: '1rem !important' }} />
                              ) : !row.priceVariation ? null : (
                                <ArrowDownwardIcon sx={{ fontSize: '1rem !important' }} />
                              )}
                            </BoxWrapperRow>
                          ) : null}
                        </BoxWrapperColumn>

                        {TOKEN && (
                          <OpenInNewIcon
                            onClick={onClick}
                            sx={{ cursor: 'pointer', fontSize: '1rem !important' }}
                          />
                        )}
                      </BoxWrapperRow>
                    </TableCellCustom>
                    <TableCellCustom sx={{ width: isMD ? '20%' : '33%' }} align="right">
                      <BoxWrapperColumn sx={{ alignItems: 'flex-end' }}>
                        <CustomTypo>{formatNumber(row.balance)}</CustomTypo>
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
                          {currency === 'USD'
                            ? formatCurrency(row.usdValue, 2)
                            : `${formatNumber(row.usdValue, 2)} ETH`}
                        </CustomTypography>
                        {!isMD ? (
                          <CustomTypography
                            variant="tableCellSubData"
                            sx={{
                              fontSize: {
                                xs: '11px',
                                md: '16px'
                              }
                            }}
                          >
                            {formatPercentage(row.allocation)}
                          </CustomTypography>
                        ) : null}
                      </BoxWrapperColumn>
                    </TableCellCustom>
                    {isMD ? (
                      <TableCellCustom sx={{ width: '20%' }} align="right">
                        <CustomTypo>{formatPercentage(row.allocation)}</CustomTypo>
                      </TableCellCustom>
                    ) : null}
                    {isMD ? (
                      <TableCellCustom sx={{ width: '20%' }} align="right">
                        <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-end' }}>
                          {formatPercentage(row.priceVariation) === '0.00%' ? (
                            <Tooltip
                              title={formatPercentage(row.priceVariation, 10)}
                              sx={{ ml: 1, cursor: 'pointer' }}
                            >
                              <CustomTypo>{formatPercentage(row.priceVariation)}</CustomTypo>
                            </Tooltip>
                          ) : (
                            <CustomTypo>{formatPercentage(row.priceVariation)}</CustomTypo>
                          )}

                          {row.priceVariation > 0 ? (
                            <ArrowUpwardIcon sx={{ fontSize: '1rem !important' }} />
                          ) : !row.priceVariation ? null : (
                            <ArrowDownwardIcon sx={{ fontSize: '1rem !important' }} />
                          )}
                        </BoxWrapperRow>
                      </TableCellCustom>
                    ) : null}
                  </TableRow>
                )
              })}

              {filteredTokenDetails.length > 5 ? (
                <TableRow>
                  <TableCellCustom colSpan={isMD ? 5 : 3} align="center">
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
                          ? `${
                              filteredTokenDetails.length > 4 ? 5 : filteredTokenDetails.length
                            } of ${filteredTokenDetails.length}`
                          : `${filteredTokenDetails.length} of ${filteredTokenDetails.length}`}
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
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
