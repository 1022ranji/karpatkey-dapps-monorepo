import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import TableCellTotal from '@karpatkey-monorepo/shared/components/TableCellTotal'
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

type TBalanceOverview = { balanceOverviewType: any; balanceOverviewBlockchain: any } & BoxProps

const BalanceOverview: React.FC<TBalanceOverview> = (props: TBalanceOverview) => {
  const { balanceOverviewType, balanceOverviewBlockchain } = props

  const dataFooterType = {} as any
  const dataFooterBlockchain = {} as any

  // TODO, we can improve this, we can make a component for this, so we don't repeat the code
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={4} marginTop={4}>
      <Box display="flex" flexDirection="column" justifyContent="center" gap={4}>
        <CustomTypography variant="h6" color="textSecondary" align="center">
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
              {balanceOverviewType.map((row: any, index: number) => {
                dataFooterType['Farming Funds'] =
                  (dataFooterType['Farming Funds'] || 0) + row['Farming Funds']
                dataFooterType['Unclaimed Rewards'] =
                  (dataFooterType['Unclaimed Rewards'] || 0) + row['Unclaimed Rewards']
                dataFooterType['Wallet'] = (dataFooterType['Wallet'] || 0) + row['Wallet']
                dataFooterType['Total'] = (dataFooterType['Total'] || 0) + row['Total']

                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row['Token Category']}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Farming Funds'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {numbro(row['Unclaimed Rewards'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {numbro(row['Wallet'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Total'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCellTotal align="left">Total</TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterType['Farming Funds']).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(dataFooterType['Unclaimed Rewards'] || 0).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(dataFooterType['Wallet'] || 0).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterType['Total'] || 0).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" gap={4}>
        <CustomTypography variant="h6" color="textSecondary" align="center">
          Funds by Token Category / Blockchain
        </CustomTypography>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Token Category</TableCell>
                <TableCell align="right">Ethereum</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Gnosis
                </TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balanceOverviewBlockchain.map((row: any, index: number) => {
                dataFooterBlockchain['Ethereum'] =
                  (dataFooterBlockchain['Ethereum'] || 0) + row['Ethereum']
                dataFooterBlockchain['Gnosis'] =
                  (dataFooterBlockchain['Gnosis'] || 0) + row['Gnosis']
                dataFooterBlockchain['Total'] = (dataFooterBlockchain['Total'] || 0) + row['Total']

                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row['Token Category'] || 0}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Ethereum'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {numbro(row['Gnosis'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {numbro(row['Total'] || 0).formatCurrency({
                        spaceSeparated: true,
                        mantissa: 2
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCellTotal align="left">Total</TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterBlockchain['Ethereum'] || 0).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  {numbro(dataFooterBlockchain['Gnosis'] || 0).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
                <TableCellTotal align="right">
                  {numbro(dataFooterBlockchain['Total'] || 0).formatCurrency({
                    spaceSeparated: true,
                    mantissa: 2
                  })}
                </TableCellTotal>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default BalanceOverview
