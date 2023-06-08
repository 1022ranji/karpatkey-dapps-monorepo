import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import * as React from 'react'

interface TableCellEmptyDataProps {
  colSpan?: number
}

const TableCellEmptyData = ({ colSpan = 5 }: TableCellEmptyDataProps) => (
  <TableCellCustom align="center" colSpan={colSpan}>
    <EmptyData />
  </TableCellCustom>
)

export default TableCellEmptyData
