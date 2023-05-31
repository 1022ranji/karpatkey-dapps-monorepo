import CustomPopover from '@karpatkey-monorepo/shared/components/CustomPopover'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import FilterTextOption from '@karpatkey-monorepo/shared/components/FilterTextOption'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import * as React from 'react'

interface FilterProps {
  id: string | undefined
  open: boolean
  anchorEl: any
  handleClose: () => void
  handleClick: (event: any) => void
  children: React.ReactNode
  blockchain: Maybe<string>
  protocol: Maybe<string>
}

const Filter = (props: FilterProps) => {
  const { id, open, anchorEl, handleClose, children, handleClick, blockchain, protocol } = props

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
        <FilterTextOption
          title={blockchain || 'Blockchain'}
          {...(blockchain ? { fontWeight: 'extra-bold' } : {})}
        />
        <FilterTextOption
          title={protocol || 'Protocol'}
          {...(protocol ? { fontWeight: 'extra-bold' } : {})}
        />
      </BoxWrapperRow>
      <CustomPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        position={'right'}
      >
        {children}
      </CustomPopover>
    </BoxWrapperRow>
  )
}
export default Filter
