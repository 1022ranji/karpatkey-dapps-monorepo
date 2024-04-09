import Image from 'next/image'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import React from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Table as MaterialTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { MONTHS } from 'src/config/constants'
import { Value } from './Value'
import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import {
  TableEmptyCellCustom,
  TableCellCustom,
  CustomTypography,
  LinkWrapper,
  BoxWrapperRow
} from 'src/components'
import { Currency } from 'src/contexts/state'

interface TableProps {
  daoResume: any[]
  latestMonth: number
  latestYear: number
  currency: Currency
}

export const Table = ({ daoResume, latestMonth, latestYear, currency }: TableProps) => {
  const router = useRouter()

  const latestMonthLabel = MONTHS.find((month) => month.id === Number(latestMonth))?.label

  return (
    <TableContainer component={Box} sx={{ overflow: 'hidden' /* Hide scrollbars */ }}>
      <MaterialTable>
        <TableHead>
          <TableRow sx={{ '& th': { borderBottom: 'none !important' } }}>
            <TableEmptyCellCustom
              sx={{
                minWidth: '260px',
                maxWidth: '260px',
                paddingY: '4px',
                paddingLeft: '5px'
              }}
            />
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '205px',
                maxWidth: '205px',
                paddingY: '4px',
                paddingX: '20px'
              }}
            >
              <Value
                value={`Total funds \n${currency === 'USD' ? '(ncAUM)' : ''}`}
                fontWeight={600}
                fontSize={'16px'}
              />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '165px',
                maxWidth: '165px',
                paddingY: '4px',
                paddingX: '20px',
                display: 'table-cell'
              }}
            >
              <Value value={'Allocated funds'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '145px',
                maxWidth: '145px',
                paddingY: '4px',
                paddingX: '20px',
                display: 'table-cell'
              }}
            >
              <Value value={`DeFi results`} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableCellCustom
              align="left"
              sx={{
                minWidth: '115px',
                maxWidth: '115px',
                paddingY: '4px',
                paddingLeft: '20px',
                marginRight: '5px',
                display: 'table-cell'
              }}
            >
              <Value value={'APY'} fontWeight={600} fontSize={'16px'} />
            </TableCellCustom>
            <TableEmptyCellCustom
              sx={{
                minWidth: '25px',
                maxWidth: '25px',
                paddingY: '4px',
                paddingRight: '5px',
                display: 'table-cell'
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {daoResume?.length === 0 ? null : (
            <>
              {daoResume?.map((dao: any, index: number) => {
                const {
                  icon,
                  name,
                  keyName,
                  totalFunds = 0,
                  allocatedFunds = 0,
                  deFiResults = 0,
                  APY = 0,
                  urlToReport
                } = dao

                const isDAOEnsOctober =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 10
                const isDAOEnsNovember =
                  keyName === 'ENS DAO' && +latestYear === 2023 && +latestMonth === 11
                const CUSTOM_APY = isDAOEnsOctober
                  ? '2.04%'
                  : isDAOEnsNovember
                    ? '2.9%'
                    : formatPercentage(APY)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const onClick = (e: any) => {
                  if (e.ctrlKey || e.metaKey) {
                    //if ctrl key or command is pressed
                    window.open(urlToReport, '_blank')
                  } else {
                    router.push(urlToReport)
                  }
                }

                return (
                  <Tooltip
                    key={index}
                    enterTouchDelay={0}
                    title={
                      <CustomTypography variant="body2" sx={{ color: 'common.white' }}>
                        {`Click to see the ${latestMonthLabel} treasury report`}
                      </CustomTypography>
                    }
                    sx={{ cursor: 'pointer' }}
                    PopperProps={{
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [50, -15]
                          }
                        }
                      ]
                    }}
                  >
                    <TableRow
                      onClick={onClick}
                      hover
                      sx={{
                        borderRadius: 10,
                        display: 'table-group-row !important',
                        '& td': {
                          borderBottom: 'none !important'
                        },
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '260px',
                          maxWidth: '260px',
                          paddingY: '4px',
                          paddingLeft: '5px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <BoxWrapperRow key={index} gap={4} sx={{ justifyContent: 'flex-start' }}>
                            <Image src={icon} alt={name} width={48} height={48} />
                            <Value value={name} fontWeight={600} />
                          </BoxWrapperRow>
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '205px',
                          maxWidth: '205px',
                          paddingY: '4px',
                          paddingX: '20px'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value
                            value={
                              currency === 'USD'
                                ? formatCurrency(totalFunds || 0)
                                : `${formatNumber(totalFunds || 0, 0)} ETH`
                            }
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '165px',
                          maxWidth: '165px',
                          paddingY: '4px',
                          paddingX: '20px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value value={formatPercentage(allocatedFunds || 0, 0)} />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '145px',
                          maxWidth: '145px',
                          paddingY: '4px',
                          paddingX: '20px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value
                            value={
                              currency === 'USD'
                                ? formatCurrency(deFiResults || 0)
                                : `${formatNumber(deFiResults || 0, 0)} ETH`
                            }
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '115px',
                          maxWidth: '115px',
                          paddingY: '4px',
                          paddingLeft: '20px',
                          marginRight: '5px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <Value value={CUSTOM_APY} />
                        </LinkWrapper>
                      </TableCellCustom>
                      <TableCellCustom
                        align="left"
                        sx={{
                          minWidth: '25px',
                          maxWidth: '25px',
                          paddingY: '4px',
                          paddingRight: '5px',
                          display: 'table-cell'
                        }}
                      >
                        <LinkWrapper url={urlToReport}>
                          <OpenInNewIcon
                            onClick={onClick}
                            sx={{ cursor: 'pointer', fontSize: '1.2rem' }}
                          />
                        </LinkWrapper>
                      </TableCellCustom>
                    </TableRow>
                  </Tooltip>
                )
              })}
            </>
          )}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  )
}
