import * as React from 'react'
import { EmptyData, TableCellCustom } from 'src/components'

interface TableCellEmptyDataProps {
  colSpan?: number
}

export const TableCellEmptyData = ({ colSpan = 5 }: TableCellEmptyDataProps) => (
  <TableCellCustom align="center" colSpan={colSpan}>
    <EmptyData />
  </TableCellCustom>
)
