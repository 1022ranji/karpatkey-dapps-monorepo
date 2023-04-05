import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
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
import { styled } from '@mui/material/styles'
import numbro from 'numbro'
import * as React from 'react'

const TableCellTotal = styled(TableCell)(({ theme }) => ({
  lineHeight: '1.5rem',
  fontWeight: 500,
  fontSize: '0.875rem',
  color: theme.palette.text.primary
}))

type TBalanceOverview = { data: any } & BoxProps

const BalanceOverview: React.FC<TBalanceOverview> = ({ data }: TBalanceOverview) => {
  const dataFooter: any = {
    'Token Category': 'Total'
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
      <CustomTypography variant="h6" align="center">
        Funds by Token Category / Type
      </CustomTypography>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Token Category</TableCell>
              <TableCell align="right">Farming Funds</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Unclaimed Rewards
              </TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Wallet
              </TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => {
              dataFooter['Farming Funds'] =
                (dataFooter['Farming Funds'] ?? 0) + row['Farming Funds']
              dataFooter['Unclaimed Rewards'] =
                (dataFooter['Unclaimed Rewards'] ?? 0) + row['Unclaimed Rewards']
              dataFooter['Wallet'] = (dataFooter['Wallet'] ?? 0) + row['Wallet']
              dataFooter['Total'] = (dataFooter['Total'] ?? 0) + row['Total']

              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row['Token Category']}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['Farming Funds']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {numbro(row['Unclaimed Rewards']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {numbro(row['Wallet']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['Total']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCellTotal align="left">{dataFooter['Token Category']}</TableCellTotal>
              <TableCellTotal align="right">
                {numbro(dataFooter['Farming Funds']).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                {numbro(dataFooter['Unclaimed Rewards']).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                {numbro(dataFooter['Wallet']).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right">
                {numbro(dataFooter['Total']).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BalanceOverview
