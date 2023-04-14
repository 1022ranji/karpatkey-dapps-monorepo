import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import TableCellTotal from '@karpatkey-monorepo/shared/components/TableCellTotal'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

interface IFarmingFunds {
  funds: any
  totals: any
}

const Funds: React.FC<IFarmingFunds> = ({ funds, totals }: IFarmingFunds) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={4}>
      <CustomTypography variant="h6" color="textSecondary" align="center">
        Farming funds / Results by protocol
      </CustomTypography>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Protocol</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Farming Funds
              </TableCell>
              <TableCell align="right">Allocation</TableCell>
              <TableCell align="right">Unclaimed Rewards</TableCell>
              <TableCell align="right">Farming Results *</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds.map((row: any, index: number) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row['protocol']}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row['position']}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['funds']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {numbro(row['allocation'] / 100).format({
                      output: 'percent',
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['unclaimed']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['results']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCellTotal align="left"> </TableCellTotal>
              <TableCellTotal align="left">Total</TableCellTotal>
              <TableCellTotal align="right">
                {numbro(totals?.fundsTotal || 0).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                {numbro(totals?.fundsTotal ? 1 : 0).format({
                  output: 'percent',
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right">
                {numbro(totals?.unclaimedTotal || 0).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right">
                {numbro(totals?.resultsTotal || 0).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <CustomTypography
        variant="body2"
        color="textSecondary"
        align="right"
        sx={{ fontStyle: 'italic' }}
      >
        *Farming Results includes results from fees, rebasing, pool token variation and rewards
      </CustomTypography>
    </Box>
  )
}

export default Funds
