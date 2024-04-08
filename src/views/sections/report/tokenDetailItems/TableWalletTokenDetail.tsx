import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  TableHeadCellCustom,
  TableEmptyCellCustom,
  TableCellCustom,
  EmptyData,
  CustomTypography
} from 'src/components'
import { Box, BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { useScreenSize } from 'src/hooks/useScreenSize'
import { styled } from '@mui/material/styles'

interface TableWalletTokenDetailProps {
  filteredWalletTokenDetail: any[]
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

export const TableWalletTokenDetail = (props: TableWalletTokenDetailProps & BoxProps) => {
  const { filteredWalletTokenDetail, ...moreProps } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const { state } = useApp()
  const { currency } = state

  const screenSize = useScreenSize()

  return (
    <BoxWrapperColumn
      gap={4}
      sx={{ width: screenSize.width < 1650 ? '100%' : '50%' }}
      {...moreProps}
    >
      <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom
                sx={{
                  width: '20%',
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: '#eeeded'
                }}
                align="left"
              >
                <CustomTypo>Token symbol</CustomTypo>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Share</CustomTypo>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Token balance</CustomTypo>
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
                  if (!displayAll && index > 4) return null

                  return (
                    <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCellCustom
                        sx={{
                          width: '33%',
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
                            {row.blockchain}
                          </CustomTypography>
                        </BoxWrapperColumn>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '33%' }} align="right">
                        <CustomTypo sx={{ fontWeight: '400 !important' }}>
                          {formatPercentage(row.allocation)}
                        </CustomTypo>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: '33%' }} align="right">
                        <BoxWrapperColumn>
                          <CustomTypo>{formatNumber(row.tokenBalance)}</CustomTypo>
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
                        </BoxWrapperColumn>
                      </TableCellCustom>
                    </TableRow>
                  )
                })}
                {filteredWalletTokenDetail.length > 5 ? (
                  <TableRow>
                    <TableCellCustom colSpan={3} align="center">
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
                                filteredWalletTokenDetail.length > 4
                                  ? 5
                                  : filteredWalletTokenDetail.length
                              } of ${filteredWalletTokenDetail.length}`
                            : `${filteredWalletTokenDetail.length} of ${filteredWalletTokenDetail.length}`}
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
    </BoxWrapperColumn>
  )
}
