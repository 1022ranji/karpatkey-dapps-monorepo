import { formatCurrency, formatNumber } from 'src/utils/format'
import {
  TableHeadCellCustom,
  TableFooterCellCustom,
  TableCellCustom,
  CustomTypography
} from 'src/components'
import { Box, BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { styled } from '@mui/material/styles'
import { debounce } from 'lodash'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

type TableTypeProps = { balanceOverviewType: any } & BoxProps

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
    lineHeight: '21px'
  }
}))

export const TableType = React.memo((props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  const { state } = useApp()
  const { currency } = state

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const [isScrollable, setIsScrollable] = React.useState({ left: false, right: false })

  const checkScrollable = debounce(() => {
    const element = tableContainerRef.current
    if (!element) return

    setIsScrollable({
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

  const firstColumnRef = React.useRef<HTMLElement>(null)
  const [firstColumnWidth, setFirstColumnWidth] = React.useState(0)
  React.useEffect(() => {
    if (firstColumnRef.current) {
      setFirstColumnWidth(firstColumnRef.current.offsetWidth + 20)
    }
  }, [])

  return (
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
          top: '50%',
          margin: 0,
          padding: 0,
          left: `${firstColumnWidth}px`,
          animation: 'jumpInfiniteHorizontalLeft 1.2s infinite',
          display: isScrollable.left ? 'block' : 'none'
        }}
      >
        <ArrowBackIcon style={{ fontSize: '20px', color: '#232323' }} />
      </Box>
      <TableContainer component={Box} ref={tableContainerRef}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom
                ref={firstColumnRef}
                sx={{
                  width: '20%',
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: 'background.paper'
                }}
                align="left"
              >
                <CustomTypo>Token category</CustomTypo>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Farming funds</CustomTypo>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Unclaimed rewards</CustomTypo>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Wallet</CustomTypo>
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>Total</CustomTypo>
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceOverviewType.map((row: any, index: number) => {
              dataFooterType['Farming funds'] =
                (dataFooterType['Farming funds'] || 0) + row['Farming funds']
              dataFooterType['Unclaimed rewards'] =
                (dataFooterType['Unclaimed rewards'] || 0) + row['Unclaimed rewards']
              dataFooterType['Wallet'] = (dataFooterType['Wallet'] || 0) + row['Wallet']
              dataFooterType['Total'] = (dataFooterType['Total'] || 0) + row['Total']

              const lastOne = balanceOverviewType.length - 1 === index

              return (
                <TableRow key={index}>
                  <TableCellCustom
                    sx={{
                      ...(lastOne ? { borderBottom: 'none' } : {}),
                      width: '20%',
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: 'background.paper'
                    }}
                    align="left"
                  >
                    <CustomTypo>{row['Token Category']}</CustomTypo>
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: '20%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                    align="right"
                  >
                    <CustomTypo sx={{ fontWeight: '400 !important' }}>
                      {currency === 'USD'
                        ? formatCurrency(row['Farming funds'] || 0)
                        : formatNumber(row['Farming funds'] || 0, 0)}
                    </CustomTypo>
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: '20%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                    align="right"
                  >
                    <CustomTypo sx={{ fontWeight: '400 !important' }}>
                      {currency === 'USD'
                        ? formatCurrency(row['Unclaimed rewards'] || 0)
                        : formatNumber(row['Unclaimed rewards'] || 0, 0)}
                    </CustomTypo>
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: '20%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                    align="right"
                  >
                    <CustomTypo sx={{ fontWeight: '400 !important' }}>
                      {currency === 'USD'
                        ? formatCurrency(row['Wallet'] || 0)
                        : formatNumber(row['Wallet'] || 0, 0)}
                    </CustomTypo>
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: '20%', ...(lastOne ? { borderBottom: 'none' } : {}) }}
                    align="right"
                  >
                    <CustomTypo>
                      {currency === 'USD'
                        ? formatCurrency(row['Total'] || 0)
                        : formatNumber(row['Total'] || 0, 0)}
                    </CustomTypo>
                  </TableCellCustom>
                </TableRow>
              )
            })}
            <TableRow>
              <TableFooterCellCustom
                sx={{
                  width: '20%',
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: 'background.paper'
                }}
                align="left"
              >
                <CustomTypo>Total</CustomTypo>
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>
                  {currency === 'USD'
                    ? formatCurrency(dataFooterType['Farming funds'] || 0)
                    : formatNumber(dataFooterType['Farming funds'] || 0, 0)}
                </CustomTypo>
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>
                  {currency === 'USD'
                    ? formatCurrency(dataFooterType['Unclaimed rewards'] || 0)
                    : formatNumber(dataFooterType['Unclaimed rewards'] || 0, 0)}
                </CustomTypo>
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>
                  {currency === 'USD'
                    ? formatCurrency(dataFooterType['Wallet'] || 0)
                    : formatNumber(dataFooterType['Wallet'] || 0, 0)}
                </CustomTypo>
              </TableFooterCellCustom>
              <TableFooterCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>
                  {currency === 'USD'
                    ? formatCurrency(dataFooterType['Total'] || 0)
                    : formatNumber(dataFooterType['Total'] || 0, 0)}
                </CustomTypo>
              </TableFooterCellCustom>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          margin: 0,
          padding: 0,
          right: '10px',
          animation: 'jumpInfiniteHorizontalRight 1.2s infinite',
          display: isScrollable.right ? 'block' : 'none'
        }}
      >
        <ArrowForwardIcon style={{ fontSize: '20px', color: '#232323' }} />
      </Box>
    </Box>
  )
})

TableType.displayName = 'TableType'
