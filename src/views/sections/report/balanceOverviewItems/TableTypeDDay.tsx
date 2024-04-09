import {
  Box,
  Tooltip,
  BoxProps,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import * as React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import { formatCurrency, formatNumber } from 'src/utils/format'
import {
  BoxWrapperRow,
  CustomTypography,
  TableCellCustom,
  TableFooterCellCustom,
  TableHeadCellCustom
} from 'src/components'
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

export const TableTypeDDay = (props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  const { state } = useApp()
  const { currency } = state

  const haveOperationsFundsField = balanceOverviewType.some(
    (row: any) => row['Operations funds'] !== 0
  )

  return (
    <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCellCustom
              sx={{
                width: haveOperationsFundsField ? '20%' : '25%',
                position: 'sticky',
                left: 0,
                zIndex: 1,
                backgroundColor: '#eeeded'
              }}
              align="left"
            >
              <CustomTypo>Token category</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom
              sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
              align="right"
            >
              <BoxWrapperRow sx={{ justifyContent: 'flex-end' }}>
                <CustomTypo>DeFi funds</CustomTypo>
                <Tooltip
                  title={'Positions aimed at yield generation'}
                  enterTouchDelay={0}
                  sx={{
                    ml: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <InfoIcon />
                </Tooltip>
              </BoxWrapperRow>
            </TableHeadCellCustom>
            {haveOperationsFundsField ? (
              <TableHeadCellCustom sx={{ width: '20%' }} align="right">
                <BoxWrapperRow sx={{ justifyContent: 'flex-end' }}>
                  <CustomTypo>Operations funds</CustomTypo>
                  <Tooltip
                    title={
                      'Positions tailored to meet specific requirements like market making, not focused on yield generation'
                    }
                    enterTouchDelay={0}
                    sx={{
                      ml: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    <InfoIcon />
                  </Tooltip>
                </BoxWrapperRow>
              </TableHeadCellCustom>
            ) : null}
            <TableHeadCellCustom
              sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
              align="right"
            >
              <CustomTypo>Wallet</CustomTypo>
            </TableHeadCellCustom>
            <TableHeadCellCustom
              sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
              align="right"
            >
              <CustomTypo>Total</CustomTypo>
            </TableHeadCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceOverviewType.map((row: any, index: number) => {
            dataFooterType['DeFi funds'] = (dataFooterType['DeFi funds'] || 0) + row['DeFi funds']
            dataFooterType['Operations funds'] =
              (dataFooterType['Operations funds'] || 0) + row['Operations funds']
            dataFooterType['Wallet'] = (dataFooterType['Wallet'] || 0) + row['Wallet']
            dataFooterType['Total'] = (dataFooterType['Total'] || 0) + row['Total']
            return (
              <TableRow key={index}>
                <TableCellCustom
                  sx={{
                    width: haveOperationsFundsField ? '20%' : '25%',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: '#eeeded'
                  }}
                  align="left"
                >
                  <CustomTypo>{row['Token Category']}</CustomTypo>
                </TableCellCustom>
                <TableCellCustom
                  sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                  align="right"
                >
                  <CustomTypo sx={{ fontWeight: '400 !important' }}>
                    {currency === 'USD'
                      ? formatCurrency(row['DeFi funds'] || 0)
                      : formatNumber(row['DeFi funds'] || 0, 0)}
                  </CustomTypo>
                </TableCellCustom>
                {haveOperationsFundsField ? (
                  <TableCellCustom sx={{ width: '20%' }} align="right">
                    <CustomTypo sx={{ fontWeight: '400 !important' }}>
                      {currency === 'USD'
                        ? formatCurrency(row['Operations funds'] || 0)
                        : formatNumber(row['Operations funds'] || 0, 0)}
                    </CustomTypo>
                  </TableCellCustom>
                ) : null}
                <TableCellCustom
                  sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                  align="right"
                >
                  <CustomTypo sx={{ fontWeight: '400 !important' }}>
                    {currency === 'USD'
                      ? formatCurrency(row['Wallet'] || 0)
                      : formatNumber(row['Wallet'] || 0, 0)}
                  </CustomTypo>
                </TableCellCustom>
                <TableCellCustom
                  sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
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
                width: haveOperationsFundsField ? '20%' : '25%',
                position: 'sticky',
                left: 0,
                zIndex: 1,
                backgroundColor: '#eeeded'
              }}
              align="left"
            >
              <CustomTypo>Total</CustomTypo>
            </TableFooterCellCustom>
            <TableFooterCellCustom
              sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
              align="right"
            >
              <CustomTypo>
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['DeFi funds'] || 0)
                  : formatNumber(dataFooterType['DeFi funds'] || 0, 0)}
              </CustomTypo>
            </TableFooterCellCustom>
            {haveOperationsFundsField ? (
              <TableFooterCellCustom sx={{ width: '20%' }} align="right">
                <CustomTypo>
                  {currency === 'USD'
                    ? formatCurrency(dataFooterType['Operations funds'] || 0)
                    : formatNumber(dataFooterType['Operations funds'] || 0, 0)}
                </CustomTypo>
              </TableFooterCellCustom>
            ) : null}
            <TableFooterCellCustom
              sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
              align="right"
            >
              <CustomTypo>
                {currency === 'USD'
                  ? formatCurrency(dataFooterType['Wallet'] || 0)
                  : formatNumber(dataFooterType['Wallet'] || 0, 0)}
              </CustomTypo>
            </TableFooterCellCustom>
            <TableFooterCellCustom
              sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
              align="right"
            >
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
