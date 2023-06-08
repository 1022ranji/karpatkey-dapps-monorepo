import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { TOKEN_COINGECKO_PRICE_URL } from '@karpatkey-monorepo/shared/config/constants'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

interface TableTokenDetailProps {
  filteredTokenDetails: any[]
}

const TableTokenDetail = (props: TableTokenDetailProps) => {
  const { filteredTokenDetails } = props
  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token symbol
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Price
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Token balance
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Allocation
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                Price variation
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTokenDetails.map((row: any, index: number) => {
              const TOKEN = TOKEN_COINGECKO_PRICE_URL.find(
                (item) => item.tokenName.toLowerCase() === row.tokenSymbol.toLowerCase()
              )
              const onClick = () => {
                if (TOKEN) {
                  window.open(TOKEN.url, '_blank')
                }
              }

              return (
                <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    <BoxWrapperColumn>
                      {row.tokenSymbol}
                      <CustomTypography variant="tableCellSubData">
                        {row.tokenCategory}
                      </CustomTypography>
                    </BoxWrapperColumn>
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    <BoxWrapperRow
                      gap={1}
                      sx={{ justifyContent: 'flex-start' }}
                      title={row.priceAvg}
                    >
                      {numbro(row.priceAvg).formatCurrency({
                        spaceSeparated: false,
                        mantissa: row.priceAvg < 0.9995 ? 3 : 2,
                        thousandSeparated: true
                      })}
                      {TOKEN && (
                        <OpenInNewIcon
                          onClick={onClick}
                          fontSize={'small'}
                          sx={{ cursor: 'pointer' }}
                        />
                      )}
                    </BoxWrapperRow>
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    <BoxWrapperColumn
                      sx={{
                        minWidth: 'max-content',
                        width: '125px',
                        maxWidth: '100%',
                        alignItems: 'flex-end'
                      }}
                    >
                      {numbro(row.balance).format({
                        spaceSeparated: false,
                        thousandSeparated: true,
                        mantissa: 2
                      })}
                      <CustomTypography variant="tableCellSubData">
                        {numbro(row.usdValue).formatCurrency({
                          spaceSeparated: false,
                          mantissa: 2,
                          thousandSeparated: true
                        })}
                      </CustomTypography>
                    </BoxWrapperColumn>
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    {numbro(row.allocation).format({
                      output: 'percent',
                      spaceSeparated: false,
                      mantissa: 2
                    })}
                  </TableCellCustom>
                  <TableCellCustom sx={{ width: '20%' }} align="left">
                    <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
                      {numbro(row.priceVariation).format({
                        output: 'percent',
                        spaceSeparated: false,
                        mantissa: 2
                      })}
                      {row.priceVariation > 0 ? (
                        <ArrowUpwardIcon fontSize={'small'} />
                      ) : (
                        <ArrowDownwardIcon fontSize={'small'} />
                      )}
                    </BoxWrapperRow>
                  </TableCellCustom>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapperColumn>
  )
}

export default TableTokenDetail
