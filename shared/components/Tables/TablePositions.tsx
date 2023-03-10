import TriggerAction from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/TriggerAction'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import * as React from 'react'

interface IData {
  assetName: string
  funds: number
  actions: string
}

interface IHeadCell {
  id: keyof IData
  label: string
  align: 'left' | 'right'
}

const HEAD_CELLS: readonly IHeadCell[] = [
  {
    id: 'assetName',
    label: 'Assets',
    align: 'left'
  },
  {
    id: 'funds',
    label: 'Funds',
    align: 'left'
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right'
  }
]

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {HEAD_CELLS.map((headCell: IHeadCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

interface IEnhancedTableToolbarProps {
  title: string
}

function EnhancedTableToolbar({ title }: IEnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
      }}
    >
      {
        <CustomTypography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">
          {title}
        </CustomTypography>
      }
    </Toolbar>
  )
}

export default function TablePositions({ rows }: any) {
  return (
    <>
      {Object.keys(rows).map((row: any, index: number) => {
        console.log('row', rows[row])
        return (
          <Box key={index} sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 5 }}>
              <EnhancedTableToolbar title={`Protocol ${row}`} />
              <TableContainer>
                <Table sx={{ minWidth: 390 }} aria-labelledby="tableTitle" size={'medium'}>
                  <EnhancedTableHead />
                  <TableBody>
                    <>
                      {Object.keys(rows[row]).map((asset: any, index: number) => {
                        return (
                          <TableRow tabIndex={-1} key={index}>
                            <TableCell sx={{ width: '33%' }}>{asset}</TableCell>
                            <TableCell sx={{ width: '33%' }}>
                              {parseInt(rows[row][asset].totalFunds).toFixed(2)} USD
                            </TableCell>
                            <TableCell align={'right'} sx={{ width: '33%' }}>
                              <TriggerAction />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )
      })}
    </>
  )
}
