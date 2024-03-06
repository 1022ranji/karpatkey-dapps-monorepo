import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { CustomPopover, CustomTypography, FilterTextOption, BoxWrapperRow } from 'src/components'

interface FilterProps {
  id: string | undefined
  title?: string
  open: boolean
  anchorEl: any
  handleClose: () => void
  handleClear: () => void
  handleClick: (event: any) => void
  children: React.ReactNode
  blockchain?: Maybe<string>
  protocol?: Maybe<string>
  token?: Maybe<string>
  deFiType?: Maybe<string>
  DAO?: Maybe<string>
  yearMonth?: Maybe<string>
  enableProtocol?: boolean
  enableBlockchain?: boolean
  enableToken?: boolean
  enableDeFiType?: boolean
  enableDAO?: boolean
  enableYearMonth?: boolean
  position?: 'left' | 'right' | 'middle'
  tooltipText?: string
}

export const Filter = (props: FilterProps) => {
  const {
    id,
    title = 'Filters',
    open,
    anchorEl,
    handleClose,
    children,
    handleClick,
    handleClear,
    blockchain,
    protocol,
    token,
    deFiType,
    DAO,
    yearMonth,
    enableToken,
    enableBlockchain,
    enableProtocol,
    enableDeFiType,
    enableDAO,
    enableYearMonth,
    position = 'middle',
    tooltipText
  } = props

  const isClearButtonEnabled = React.useMemo(() => {
    return (
      (enableBlockchain && blockchain) ||
      (enableProtocol && protocol) ||
      (enableToken && token) ||
      (enableDeFiType && deFiType) ||
      (enableDAO && DAO) ||
      (enableYearMonth && yearMonth)
    )
  }, [
    blockchain,
    DAO,
    enableBlockchain,
    enableDAO,
    enableProtocol,
    enableToken,
    enableDeFiType,
    enableYearMonth,
    protocol,
    deFiType,
    token,
    yearMonth
  ])

  return (
    <BoxWrapperRow>
      <CustomTypography variant="filterTitle">{title}</CustomTypography>
      <BoxWrapperRow
        gap={2}
        onClick={handleClick}
        id={id || ''}
        sx={{ marginRight: '16px', marginLeft: '16px' }}
      >
        {enableBlockchain ? (
          <FilterTextOption
            title={blockchain || 'Blockchain'}
            {...(blockchain ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableProtocol ? (
          <FilterTextOption
            title={protocol || 'Protocol'}
            {...(protocol ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableToken ? (
          <FilterTextOption
            title={token || 'Token'}
            {...(token ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableDeFiType ? (
          <FilterTextOption
            title={deFiType || 'Type'}
            {...(deFiType ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableDAO ? (
          <FilterTextOption title={DAO || 'DAO'} {...(DAO ? { fontWeight: 'extra-bold' } : {})} />
        ) : null}
        {enableYearMonth ? (
          <FilterTextOption
            title={yearMonth || 'Period'}
            {...(yearMonth ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
      </BoxWrapperRow>
      <Tooltip title={tooltipText} sx={{ ml: 1 }}>
        <HighlightOffIcon
          sx={{
            ...(isClearButtonEnabled
              ? { color: 'custom.black.primary' }
              : { color: 'custom.grey.secondary' }),
            cursor: 'pointer',
            width: 48,
            height: 48
          }}
          onClick={() => {
            if (isClearButtonEnabled) {
              handleClear()
            }
          }}
          fontSize={'small'}
        />
      </Tooltip>
      <CustomPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        position={position}
      >
        {children}
      </CustomPopover>
    </BoxWrapperRow>
  )
}
