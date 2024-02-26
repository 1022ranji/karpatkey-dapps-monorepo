import Share from '@karpatkey-monorepo/reports//src/components/Share'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form, { SubmitValues } from '@karpatkey-monorepo/shared/components/Filter/Form'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAO, FILTER_DAOS, MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import { useRouter } from 'next/router'
import React from 'react'
import { useApp } from '../../contexts/app.context'
import { FilterByCurrency } from '../FilterByCurrency'
import { isYearAndMonthValid } from '../../utils/params'

const Menu = () => {
  const { state } = useApp()
  const router = useRouter()

  const { year, month, DAO: filterDAO } = state

  const param = year && month ? { yearArg: year + '', monthArg: month + '' } : undefined

  const isDDay = isYearAndMonthValid(param)

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
    (option: FILTER_DAO) => filterDAO && option.id === +filterDAO
  )

  const defaultDAOValue = filterDaoOption
    ? ({
        logo: filterDaoOption.icon,
        label: filterDaoOption.name,
        id: filterDaoOption.id
      } as AutocompleteOption)
    : null

  // Month default value
  const filterYearMonthOption =
    FILTER_DAOS.find((option) => {
      return filterDAO && +option.id === +filterDAO
    })?.datesAllowed?.find((option) => {
      return year && month && +option.month === month && +option.year === year
    }) ?? null

  const monthString =
    MONTHS.find((option) => {
      return filterYearMonthOption && +option.id === +filterYearMonthOption?.month
    })?.label ?? ''

  const defaultYearMonthValue = filterYearMonthOption
    ? {
        id: `${filterYearMonthOption.year}-${filterYearMonthOption.month}`,
        label: `${year} ${monthString}`
      }
    : null

  const onSubmitClose = (data: SubmitValues) => {
    const dao = data?.DAO
    const yearMonth = (data?.yearMonth ?? '') + ''
    const [year, month] = yearMonth.split('-')

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
      enableYearMonth
      DAO={defaultDAOValue ? defaultDAOValue.label : ''}
      yearMonth={defaultYearMonthValue ? defaultYearMonthValue.label : ''}
      tooltipText={'Clear selected report'}
    >
      <Form
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultDAOValue={defaultDAOValue}
        defaultYearMonthValue={defaultYearMonthValue}
        enableDAO
        enableYearMonth
        buttonTitle={'Apply selection'}
      />
    </Filter>
  )

  return (
    <BoxWrapperRow id={id || ''} gap={2} sx={{ justifyContent: 'space-between' }}>
      {filterElement}
      {isDDay && <FilterByCurrency />}
      <Share dao={filterDAO} year={year} month={month} />
    </BoxWrapperRow>
  )
}

export default Menu
