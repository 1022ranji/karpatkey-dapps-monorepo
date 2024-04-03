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
    lineHeight: '16px'
  }
}))

export const TableType = (props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  const { state } = useApp()
  const { currency } = state

  return (
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
            return (
              <TableRow key={index}>
                <TableCellCustom
                  sx={{
                    width: '20%',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: '#eeeded'
                  }}
                  align="left"
                >
                  <CustomTypo>{row['Token Category']}</CustomTypo>
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="right">
                  <CustomTypo sx={{ fontWeight: '400 !important' }}>
                    {currency === 'USD'
                      ? formatCurrency(row['Farming funds'] || 0)
                      : formatNumber(row['Farming funds'] || 0, 0)}
                  </CustomTypo>
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="right">
                  <CustomTypo sx={{ fontWeight: '400 !important' }}>
                    {currency === 'USD'
                      ? formatCurrency(row['Unclaimed rewards'] || 0)
                      : formatNumber(row['Unclaimed rewards'] || 0, 0)}
                  </CustomTypo>
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="right">
                  <CustomTypo sx={{ fontWeight: '400 !important' }}>
                    {currency === 'USD'
                      ? formatCurrency(row['Wallet'] || 0)
                      : formatNumber(row['Wallet'] || 0, 0)}
                  </CustomTypo>
                </TableCellCustom>
                <TableCellCustom sx={{ width: '20%' }} align="right">
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
                backgroundColor: '#eeeded'
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
  )
}
