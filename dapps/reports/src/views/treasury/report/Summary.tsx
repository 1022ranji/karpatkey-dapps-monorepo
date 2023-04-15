import { TPieChartProps } from '@karpatkey-monorepo/reports/src/components/Charts/Pie'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import { TMapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import {
  Box,
  BoxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

type TSummary = TPieChartProps & BoxProps

const Summary: React.FC<TSummary> = ({ data }: TSummary) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={10}>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Asset</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Funds</TableCell>
              <TableCell align="right">Allocation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: TMapBalancesByTokenCategory, index: number) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.value}
                </TableCell>
                <TableCell align="right" title={row.price + ''}>
                  {numbro(row.price).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2
                  })}
                </TableCell>
                <TableCell align="right" title={row.funds + ''}>
                  {numbro(row.funds).formatCurrency({
                    spaceSeparated: false,
                    mantissa: 2
                  })}
                </TableCell>
                <TableCell align="right" title={row.allocation + ''}>
                  {numbro(row.allocation / 100).format({
                    output: 'percent',
                    spaceSeparated: false,
                    mantissa: 2
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BoxWrapperRow sx={{ justifyContent: 'space-between', gap: 2 }}>
        <CustomTypography color="textSecondary" variant="h6" textAlign="center">
          Total funds:
        </CustomTypography>
        <CustomTypography color="textSecondary" variant="h6" textAlign="center">
          {numbro(
            data.reduce((acc: number, curr: TMapBalancesByTokenCategory) => acc + curr.funds, 0)
          ).formatCurrency({
            spaceSeparated: false,
            mantissa: 2
          })}
        </CustomTypography>
      </BoxWrapperRow>
    </Box>
  )
}

export default Summary
