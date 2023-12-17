import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import { BoxProps, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'

type TableTypeProps = { balanceOverviewType: any } & BoxProps

const TableTypeDDay = (props: TableTypeProps) => {
  const { balanceOverviewType } = props
  const dataFooterType = {} as any

  const haveOperationsFundsField = balanceOverviewType.some(
    (row: any) => row['Operations funds'] !== 0
  )

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Token category
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                DeFi funds *
              </TableHeadCellCustom>
              {haveOperationsFundsField ? (
                <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                  Operations funds **
                </TableHeadCellCustom>
              ) : null}
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Wallet
              </TableHeadCellCustom>
              <TableHeadCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Total
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
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {row['Token Category']}
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {formatCurrency(Math.round(row['DeFi funds'] || 0))}
                  </TableCellCustom>
                  {haveOperationsFundsField ? (
                    <TableCellCustom sx={{ width: '20%' }} align="left">
                      {formatCurrency(Math.round(row['Operations funds'] || 0))}
                    </TableCellCustom>
                  ) : null}
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {formatCurrency(Math.round(row['Wallet'] || 0))}
                  </TableCellCustom>
                  <TableCellCustom
                    sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                    align="left"
                  >
                    {formatCurrency(Math.round(row['Total'] || 0))}
                  </TableCellCustom>
                </TableRow>
              )
            })}
            <TableRow>
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                Total
              </TableFooterCellCustom>
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                {formatCurrency(Math.round(dataFooterType['DeFi funds'] || 0))}
              </TableFooterCellCustom>
              {haveOperationsFundsField ? (
                <TableFooterCellCustom sx={{ width: '20%' }} align="left">
                  {formatCurrency(Math.round(dataFooterType['Operations funds'] || 0))}
                </TableFooterCellCustom>
              ) : null}
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                {formatCurrency(Math.round(dataFooterType['Wallet'] || 0))}
              </TableFooterCellCustom>
              <TableFooterCellCustom
                sx={{ width: haveOperationsFundsField ? '20%' : '25%' }}
                align="left"
              >
                {formatCurrency(Math.round(dataFooterType['Total'] || 0))}
              </TableFooterCellCustom>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <BoxWrapperColumn gap={2}>
        <CustomTypography
          variant="body2"
          color="textSecondary"
          align="left"
          sx={{ fontStyle: 'italic' }}
        >
          * Positions aimed at yield generation
        </CustomTypography>

        {haveOperationsFundsField ? (
          <CustomTypography
            variant="body2"
            color="textSecondary"
            align="left"
            sx={{ fontStyle: 'italic' }}
          >
            ** Positions tailored to meet specific requirements like market making, not focused on
            yield generation
          </CustomTypography>
        ) : null}
      </BoxWrapperColumn>
    </BoxWrapperColumn>
  )
}

export default TableTypeDDay
