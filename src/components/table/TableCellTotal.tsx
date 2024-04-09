import { TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TableCellTotal = styled(TableCell)(({ theme }) => ({
  lineHeight: '1.5rem',
  fontWeight: 500,
  fontSize: '0.875rem',
  color: theme.palette.text.primary
}))
