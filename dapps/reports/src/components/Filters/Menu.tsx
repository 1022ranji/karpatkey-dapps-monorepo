import Share from '@karpatkey-monorepo/reports//src/components/Share'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form, { SubmitValues } from '@karpatkey-monorepo/shared/components/Filter/Form'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import {
  getDAONumberByName,
  MONTHS_ALLOWED_BY_DAO
} from '@karpatkey-monorepo/shared/config/constants'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { useRouter } from 'next/router'
import React from 'react'

const Menu = () => {
  const { state } = useFilter()
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
    window.open('/', '_self')
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // DAO default value
  const filterDaoOption = FILTER_DAOS.find(
    (option: FILTER_DAO) => filter?.dao && option.id === +filter?.dao
  )

  const defaultDAOValue = filterDaoOption
    ? ({
        logo: filterDaoOption.icon,
        label: filterDaoOption.name,
        id: filterDaoOption.id
      } as AutocompleteOption)
    : null

  // Month default value
  const filterMonthOption =
    MONTHS_ALLOWED_BY_DAO.find((option) => {
      return filter?.dao && getDAONumberByName(option.DAO) === +filter?.dao
    })?.DATES_ALLOWED?.find((option) => {
      return (
        filter?.year &&
        filter.month &&
        option.month === +filter.month &&
        option.year === +filter?.year
      )
    }) ?? null
  const defaultMonthValue = filterMonthOption
    ? {
        id: filterMonthOption.month,
        label: filterMonthOption.label
      }
    : null

  // Year default value
  const filterYearOption =
    MONTHS_ALLOWED_BY_DAO.find((option) => {
      return filter?.dao && getDAONumberByName(option.DAO) === +filter?.dao
    })?.DATES_ALLOWED?.find((option) => {
      return filter?.year && option.year === +filter?.year
    }) ?? null
  const defaultYearValue = filterYearOption
    ? {
        id: filterYearOption.year,
        label: filterYearOption.year + ''
      }
    : null

  const onSubmitClose = (data: SubmitValues) => {
    const month = data?.month
    const dao = data?.DAO
    const year = data?.year

    if (month === undefined || dao === undefined || year === undefined) return

    const query = new URLSearchParams()
    if (dao !== null && dao !== undefined) query.append('dao', dao + '')
    if (month !== null && month !== undefined) query.append('month', month + '')
    if (year !== null && year !== undefined) query.append('year', year + '')

    const href = `/?${query.toString()}`
    router.push(href)
  }

  const filterElement = (
    <Filter
      id={id}
      title="Select report"
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
      tooltipText={'Clear selected report'}
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
        buttonTitle={'Apply selection'}
      />
    </Filter>
  )

  return (
    <BoxWrapperRow gap={2}>
      <BoxWrapperRow id={id || ''} gap={2}>
        {filterElement}
        <Share {...filter} />
      </BoxWrapperRow>
    </BoxWrapperRow>
  )
}

export default Menu
