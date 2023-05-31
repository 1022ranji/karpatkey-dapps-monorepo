import Share from '@karpatkey-monorepo/reports//src/components/Share'
import Form from '@karpatkey-monorepo/reports/src/components/Filters/Form'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import CustomPopover from '@karpatkey-monorepo/shared/components/CustomPopover'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import FilterTextOption from '@karpatkey-monorepo/shared/components/FilterTextOption'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { getDAOName, getMonthName } from '@karpatkey-monorepo/shared/utils'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const FilterSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={72}
      height={42}
      sx={{
        backgroundColor: 'custom.grey.secondary',
        borderRadius: '4px'
      }}
    />
  )
}

const Menu = () => {
  const { state } = useFilter()

  const filter = state.value

  const daoName = filter.dao ? getDAOName(Number(filter.dao)) : null
  const monthName = filter.month ? getMonthName(Number(filter.month)) : null
  const yearName = filter.year ? Number(filter.year) : null

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <BoxWrapperRow gap={2}>
      <CustomTypography variant="filterTitle">Filters</CustomTypography>

      <BoxWrapperRow
        component={'span'}
        onClick={handleClick}
        id={id || ''}
        aria-describedby={id}
        gap={2}
      >
        {!daoName || !monthName || !yearName ? (
          <>
            <FilterSkeleton />
            <FilterSkeleton />
            <FilterSkeleton />
          </>
        ) : (
          <>
            <FilterTextOption title={daoName} />
            <FilterTextOption title={monthName} />
            <FilterTextOption title={yearName + ''} />
          </>
        )}
      </BoxWrapperRow>
      <CustomPopover id={id} open={open} anchorEl={anchorEl} handleClose={handleClose}>
        <Form onRequestClose={handleClose} />
      </CustomPopover>
      <Share {...filter} />
    </BoxWrapperRow>
  )
}

export default Menu
