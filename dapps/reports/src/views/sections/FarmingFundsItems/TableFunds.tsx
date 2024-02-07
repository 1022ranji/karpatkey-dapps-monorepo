import {
  formatCurrency,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import TableCellCustom from '@karpatkey-monorepo/shared/components/Table/TableCellCustom'
import TableEmptyCellCustom from '@karpatkey-monorepo/shared/components/Table/TableEmptyCellCustom'
import TableFooterCellCustom from '@karpatkey-monorepo/shared/components/Table/TableFooterCellCustom'
import TableHeadCellCustom from '@karpatkey-monorepo/shared/components/Table/TableHeadCellCustom'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import * as React from 'react'
import UniswapHelpText from '@karpatkey-monorepo/shared/components/UniswapHelpText'
import { UNISWAP_PROTOCOL } from '@karpatkey-monorepo/reports/src/config/constants'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'

interface TableFundsProps {
  funds: any
  totals: any
}

const BoxWrapper = styled(BoxWrapperColumn)({
  minWidth: 'max-content',
  width: '125px',
  maxWidth: '100%',
  alignItems: 'flex-end'
})

const TableFunds = (props: TableFundsProps) => {
  const { funds, totals } = props
  const [displayAll, setDisplayAll] = React.useState(false)

  const isDDay = isYearAndMonthValid()

  const { state } = useApp()
  const { currency } = state

  return (
    <BoxWrapperColumn gap={4}>
      <TableContainer component={Box}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                Blockchain
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                Position
              </TableHeadCellCustom>
              <TableHeadCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                {isDDay ? 'DeFi funds' : 'Farming funds'}
              </TableHeadCellCustom>
              {!isDDay ? (
                <TableHeadCellCustom sx={{ width: '20%' }} align="left">
                  Unclaimed rewards
                </TableHeadCellCustom>
              ) : null}
              <TableHeadCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                <BoxWrapperRow sx={{ justifyContent: 'flex-start' }} gap={1}>
                  {isDDay ? 'DeFi results' : 'Farming results'}
                  <Tooltip
                    title={
                      isDDay
                        ? 'DeFi results include fees, rebasing, pool token variation and rewards from DeFi positions'
                        : 'Farming results include results from fees, rebasing, pool token variation and rewards'
                    }
                    sx={{ ml: 1, cursor: 'pointer' }}
                  >
                    <InfoIcon />
                  </Tooltip>
                </BoxWrapperRow>
              </TableHeadCellCustom>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds.length === 0 ? (
              <TableRow>
                <TableEmptyCellCustom colSpan={5}>
                  <EmptyData />
                </TableEmptyCellCustom>
              </TableRow>
            ) : (
              <>
                {funds.map((row: any, index: number) => {
                  if (!displayAll && index > 4) return null

                  return (
                    <TableRow key={index}>
                      <TableCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                        {row.blockchain}
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                        <BoxWrapperRow
                          sx={{
                            width: '90%',
                            overflowWrap: 'anywhere',
                            justifyContent: 'flex-start'
                          }}
                        >
                          <BoxWrapperColumn>
                            {row.position}
                            <CustomTypography variant="tableCellSubData">
                              {row.protocol}
                            </CustomTypography>
                          </BoxWrapperColumn>
                          {row.protocol === UNISWAP_PROTOCOL ? <UniswapHelpText /> : null}
                        </BoxWrapperRow>
                      </TableCellCustom>
                      <TableCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                        <BoxWrapper>
                          {currency === 'USD'
                            ? formatCurrency(row.funds || 0)
                            : formatNumber(row.funds, 0)}
                          {row?.allocation > 0 ? (
                            <CustomTypography variant="tableCellSubData">
                              {formatPercentage(row.allocation / 100)}
                            </CustomTypography>
                          ) : null}
                        </BoxWrapper>
                      </TableCellCustom>
                      {!isDDay ? (
                        <TableCellCustom sx={{ width: '20%' }} align="left">
                          {currency === 'USD'
                            ? formatCurrency(row.unclaimed || 0)
                            : formatNumber(row.unclaimed, 0)}
                        </TableCellCustom>
                      ) : null}
                      <TableCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                        {currency === 'USD'
                          ? formatCurrency(row.results || 0)
                          : formatNumber(row.results, 1)}
                      </TableCellCustom>
                    </TableRow>
                  )
                })}

                {funds.length > 5 ? (
                  <TableRow>
                    <TableCellCustom colSpan={5} align="center">
                      <BoxWrapperRow gap={1}>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{ cursor: 'pointer', align: 'center' }}
                          onClick={() => setDisplayAll(!displayAll)}
                        >
                          {!displayAll
                            ? `${funds.length > 4 ? 5 : funds.length} of ${funds.length}`
                            : `${funds.length} of ${funds.length}`}
                        </CustomTypography>
                        <CustomTypography
                          variant="tableCellSubData"
                          sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            align: 'center',
                            fontWeight: '700 !important'
                          }}
                          onClick={() => setDisplayAll(!displayAll)}
                        >
                          {displayAll ? 'View less' : 'View all'}
                        </CustomTypography>
                      </BoxWrapperRow>
                    </TableCellCustom>
                  </TableRow>
                ) : null}

                <TableRow>
                  <TableFooterCellCustom colSpan={2} align="left">
                    Total
                  </TableFooterCellCustom>
                  <TableFooterCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                    <BoxWrapper>
                      {currency === 'USD'
                        ? formatCurrency(totals?.fundsTotal || 0)
                        : formatNumber(totals?.fundsTotal || 0, 0)}
                    </BoxWrapper>
                  </TableFooterCellCustom>
                  {!isDDay ? (
                    <TableFooterCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                      {currency === 'USD'
                        ? formatCurrency(totals?.unclaimedTotal || 0)
                        : formatNumber(totals?.unclaimedTotal || 0, 0)}
                    </TableFooterCellCustom>
                  ) : null}
                  <TableFooterCellCustom sx={{ width: isDDay ? '25%' : '20%' }} align="left">
                    {currency === 'USD'
                      ? formatCurrency(totals?.resultsTotal || 0)
                      : formatNumber(totals?.resultsTotal || 0, 1)}
                  </TableFooterCellCustom>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapperColumn>
  )
}

export default TableFunds
