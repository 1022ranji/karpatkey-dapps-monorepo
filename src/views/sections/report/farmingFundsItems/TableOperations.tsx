import {
  Box,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme
} from '@mui/material'
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
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'lodash'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

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

const TableOperations = React.memo((props: TableResultsProps) => {
  const { operationDetails, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const { state } = useApp()
  const { currency } = state

  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const [isScrollable, setIsScrollable] = React.useState({
    top: false,
    bottom: false,
    left: false,
    right: false
  })

  const checkScrollable = debounce(() => {
    const element = tableContainerRef.current
    if (!element) return

    setIsScrollable({
      top: element.scrollTop > 0,
      bottom: !(element.scrollHeight - element.scrollTop - 1 < element.clientHeight),
      left: element.scrollLeft > 0,
      right: element.scrollLeft < element.scrollWidth - element.clientWidth - 1
    })
  }, 250)

  React.useEffect(() => {
    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => {
      window.removeEventListener('resize', checkScrollable)
    }
  }, [])

  React.useEffect(() => {
    const element = tableContainerRef.current
    if (!element) return

    element.addEventListener('scroll', checkScrollable)
    return () => {
      element.removeEventListener('scroll', checkScrollable)
    }
  }, [])

  const firstRowRef = React.useRef<HTMLElement>(null)
  const lastRowRef = React.useRef<HTMLElement>(null)
  const [firstRowHeight, setFirstRowHeight] = React.useState(0)
  const [lastRowHeight, setLastRowHeight] = React.useState(0)
  React.useEffect(() => {
    if (firstRowRef.current) {
      setFirstRowHeight(firstRowRef.current.clientHeight + 20)
    }
    if (lastRowRef.current) {
      setLastRowHeight(lastRowRef.current.clientHeight + 20)
    }
  }, [])

  return (
    <>
      {isMD && (
        <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableHeadCellCustom
                  sx={{
                    width: '25%',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: 'background.paper'
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

                    const lastOne = operationDetails.length - 1 === index

                    return (
                      <TableRow key={index}>
                        <TableCellCustom
                          sx={{
                            ...(lastOne ? { borderBottom: 'none' } : {}),
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
                        <TableCellCustom
                          sx={{ width: '25%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                          align="right"
                        >
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
                        <TableCellCustom
                          sx={{ width: '25%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                          align="right"
                        >
                          <CustomTypo>
                            {currency === 'USD'
                              ? formatCurrency(row?.operationResults?.toFixed(2) || 0)
                              : formatNumber(row?.operationResults?.toFixed(2) || 0, 1)}
                          </CustomTypo>
                        </TableCellCustom>
                        <TableCellCustom
                          sx={{ width: '25%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                          align="right"
                        >
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
                      <TableCellCustom colSpan={4} align="center" sx={{ borderBottom: 'none' }}>
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
      )}
      {!isMD && (
        <Box
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            whiteSpace: 'nowrap'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: `${firstRowHeight}px`,
              margin: 0,
              padding: 0,
              left: '50%',
              animation: 'jumpInfiniteUp 1.2s infinite',
              display: isScrollable.top ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowUpwardIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              margin: 0,
              padding: 0,
              left: `10px`,
              animation: 'jumpInfiniteHorizontalLeft 1.2s infinite',
              display: isScrollable.left ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowBackIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>

          <TableContainer
            component={Box}
            ref={tableContainerRef}
            sx={{ width: '100%', height: '600px', overflow: 'auto', bgcolor: 'background.paper' }}
          >
            <Box sx={{ maxHeight: '600px' }}>
              <Table
                stickyHeader
                sx={{ borderCollapse: 'separate', borderSpacing: 0, transform: 'translateZ(0)' }}
              >
                <TableHead>
                  <TableRow>
                    <TableHeadCellCustom
                      ref={firstRowRef}
                      sx={{
                        width: '25%',
                        position: 'sticky',
                        align: 'left',
                        left: 0,
                        backgroundColor: 'background.paper',
                        zIndex: 2
                      }}
                      align="left"
                    >
                      <CustomTypo>Position</CustomTypo>
                    </TableHeadCellCustom>
                    <TableHeadCellCustom sx={{ width: '25%', zIndex: 1 }} align="right">
                      <CustomTypo>Operations funds</CustomTypo>
                    </TableHeadCellCustom>
                    <TableHeadCellCustom sx={{ width: '25%', zIndex: 1 }} align="right">
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
                    <TableHeadCellCustom sx={{ width: '25%', zIndex: 1 }} align="right">
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
                        const lastOne = operationDetails.length - 1 === index

                        return (
                          <TableRow key={index} sx={{ zIndex: -20 }}>
                            <TableCellCustom
                              sx={{
                                ...(lastOne ? { borderBottom: 'none' } : {}),
                                width: '25%',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                backgroundColor: 'background.paper'
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
                                    fontWeight: '400 !important',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'wrap',
                                    overflow: 'hidden'
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
                            <TableCellCustom
                              sx={{ width: '25%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                              align="right"
                            >
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
                            <TableCellCustom
                              sx={{ width: '25%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                              align="right"
                            >
                              <CustomTypo>
                                {currency === 'USD'
                                  ? formatCurrency(row?.operationResults?.toFixed(2) || 0)
                                  : formatNumber(row?.operationResults?.toFixed(2) || 0, 1)}
                              </CustomTypo>
                            </TableCellCustom>
                            <TableCellCustom
                              sx={{ width: '25%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                              align="right"
                            >
                              <CustomTypo sx={{ fontWeight: '400 !important' }}>
                                {currency === 'USD'
                                  ? formatCurrency(row?.priceVariation?.toFixed(2) || 0)
                                  : formatNumber(row?.priceVariation?.toFixed(2) || 0, 0)}
                              </CustomTypo>
                            </TableCellCustom>
                          </TableRow>
                        )
                      })}

                      <TableRow>
                        <TableFooterCellCustom
                          ref={lastRowRef}
                          sx={{
                            position: 'sticky',
                            zIndex: 2,
                            backgroundColor: 'background.paper',
                            align: 'left',
                            left: 0,
                            bottom: 0
                          }}
                          colSpan={1}
                          align="left"
                        >
                          <CustomTypo>Total</CustomTypo>
                        </TableFooterCellCustom>
                        <TableFooterCellCustom
                          sx={{
                            width: '25%',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 1,
                            backgroundColor: 'background.paper'
                          }}
                          align="right"
                        >
                          <CustomTypo>
                            {currency === 'USD'
                              ? formatCurrency(totals?.operationsFundsTotal || 0)
                              : formatNumber(totals?.operationsFundsTotal || 0, 0)}
                          </CustomTypo>
                        </TableFooterCellCustom>
                        <TableFooterCellCustom
                          sx={{
                            width: '25%',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 1,
                            backgroundColor: 'background.paper'
                          }}
                          align="right"
                        >
                          <CustomTypo>
                            {currency === 'USD'
                              ? formatCurrency(totals?.operationResultsTotal || 0)
                              : formatNumber(totals?.operationResultsTotal || 0, 1)}
                          </CustomTypo>
                        </TableFooterCellCustom>
                        <TableFooterCellCustom
                          sx={{
                            width: '25%',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 1,
                            backgroundColor: 'background.paper'
                          }}
                          align="right"
                        >
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
            </Box>
          </TableContainer>

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              margin: 0,
              padding: 0,
              right: '10px',
              animation: 'jumpInfiniteHorizontalRight 1.2s infinite',
              display: isScrollable.right ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowForwardIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: `${lastRowHeight}px`,
              margin: 0,
              padding: 0,
              left: '50%',
              animation: 'jumpInfiniteDown 1.2s infinite',
              display: isScrollable.bottom ? 'block' : 'none',
              zIndex: 2
            }}
          >
            <ArrowDownwardIcon style={{ fontSize: '20px', color: '#232323' }} />
          </Box>
        </Box>
      )}
    </>
  )
})

TableOperations.displayName = 'TableOperations'

export default TableOperations
