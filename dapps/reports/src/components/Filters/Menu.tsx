import Share from '@karpatkey-monorepo/reports//src/components/Share'
import { ActionKind, useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form, { SubmitValues } from '@karpatkey-monorepo/shared/components/Filter/Form'
import { MONTHS } from '@karpatkey-monorepo/shared/components/Form/MonthAutocomplete'
import { YEARS } from '@karpatkey-monorepo/shared/components/Form/YearAutocomplete'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { useRouter } from 'next/router'
import React from 'react'

const Menu = () => {
  const { state, dispatch } = useFilter()
  const router = useRouter()

  const filter = state.value

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    dispatch({
      type: ActionKind.UPDATE,
      payload: {
        value: { month: null, dao: null, year: null },
        error: null
      }
    })
    const href = '/'
    router.push(href)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // DAO default value
  const filterDaoOption = FILTER_DAOS.find(
    (option: FILTER_DAO) => filter.dao && option.id === Number(filter.dao)
  )

  const defaultDAOValue = filterDaoOption
    ? ({
        logo: filterDaoOption.icon,
        label: filterDaoOption.name,
        id: filterDaoOption.id
      } as AutocompleteOption)
    : null

  // Month default value
  const filterMonthOption = MONTHS.find((option) => option.id === Number(filter.month))
  const defaultMonthValue = filterMonthOption ? filterMonthOption : null

  // Year default value
  const filterYearOption = YEARS.find((option) => option.id === Number(filter.year))
  const defaultYearValue = filterYearOption ? filterYearOption : null

  const onSubmitClose = (data: SubmitValues) => {
    const month = data?.month
    const dao = data?.DAO
    const year = data?.year

    if (month === undefined || dao === undefined || year === undefined) return

    dispatch({
      type: ActionKind.UPDATE,
      payload: {
        value: { month: Number(month), dao: Number(dao), year: Number(year) },
        error: null
      }
    })
    const href = `/?dao=${dao}&month=${month}&year=${year}`
    router.push(href)
  }

  const filterElement = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      enableDAO
      enableMonth
      enableYear
      DAO={defaultDAOValue ? defaultDAOValue.label : ''}
      year={defaultYearValue ? defaultYearValue.label : ''}
      month={defaultMonthValue ? defaultMonthValue.label : ''}
    >
      <Form
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultDAOValue={defaultDAOValue}
        defaultYearValue={defaultYearValue}
        defaultMonthValue={defaultMonthValue}
        enableDAO
        enableYear
        enableMonth
      />
    </Filter>
  )

  return (
    <BoxWrapperRow gap={2}>
      <BoxWrapperRow component={'span'} id={id || ''} aria-describedby={id} gap={2}>
        {filterElement}
        <Share {...filter} />
      </BoxWrapperRow>
    </BoxWrapperRow>
  )
}

export default Menu
