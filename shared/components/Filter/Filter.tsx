import CustomPopover from '@karpatkey-monorepo/shared/components/CustomPopover'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import FilterTextOption from '@karpatkey-monorepo/shared/components/Filter/FilterTextOption'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import * as React from 'react'

interface FilterProps {
  id: string | undefined
  open: boolean
  anchorEl: any
  handleClose: () => void
  handleClick: (event: any) => void
  children: React.ReactNode
  blockchain?: Maybe<string>
  protocol?: Maybe<string>
  token?: Maybe<string>
  DAO?: Maybe<string>
  year?: Maybe<string>
  month?: Maybe<string>
  enableProtocol?: boolean
  enableBlockchain?: boolean
  enableToken?: boolean
  enableDAO?: boolean
  enableYear?: boolean
  enableMonth?: boolean
  position?: 'left' | 'right' | 'middle'
}

const Filter = (props: FilterProps) => {
  const {
    id,
    open,
    anchorEl,
    handleClose,
    children,
    handleClick,
    blockchain,
    protocol,
    token,
    DAO,
    year,
    month,
    enableToken,
    enableBlockchain,
    enableProtocol,
    enableDAO,
    enableYear,
    enableMonth,
    position = 'middle'
  } = props

  return (
    <BoxWrapperRow gap={4}>
      <CustomTypography variant="filterTitle">Filters</CustomTypography>
      <BoxWrapperRow
        component={'span'}
        gap={2}
        onClick={handleClick}
        id={id || ''}
        aria-describedby={id}
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
        {enableDAO ? (
          <FilterTextOption title={DAO || 'DAO'} {...(DAO ? { fontWeight: 'extra-bold' } : {})} />
        ) : null}
        {enableMonth ? (
          <FilterTextOption
            title={month || 'Month'}
            {...(month ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
        {enableYear ? (
          <FilterTextOption
            title={year || 'Year'}
            {...(year ? { fontWeight: 'extra-bold' } : {})}
          />
        ) : null}
      </BoxWrapperRow>
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
export default Filter
