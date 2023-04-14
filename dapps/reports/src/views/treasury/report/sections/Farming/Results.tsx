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

interface IFarmingResultsDetailByProtocol {
  fundsDetails: any
  totalDetails: any
}

const Results: React.FC<IFarmingResultsDetailByProtocol> = (
  props: IFarmingResultsDetailByProtocol
) => {
  const { fundsDetails, totalDetails } = props

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={4}>
      <CustomTypography variant="h6" color="textSecondary" align="center">
        Farming results details by protocol
      </CustomTypography>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Protocol</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                Rewards
              </TableCell>
              <TableCell align="right">Fees/Rebasing/Pool Token Variation</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundsDetails.map((row: any, index: number) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row['protocol']}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row['position']}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['rewards']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {numbro(row['fees']).formatCurrency({
                      spaceSeparated: true,
                      mantissa: 2
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {numbro(row['total']).formatCurrency({
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
                {numbro(totalDetails.rewardsTotal).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right">
                {numbro(totalDetails.feesTotal).formatCurrency({
                  spaceSeparated: true,
                  mantissa: 2
                })}
              </TableCellTotal>
              <TableCellTotal align="right">
                {numbro(totalDetails.total).formatCurrency({
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

export default Results
