import * as React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useApp } from 'src/contexts/app.context'
import { Currency } from 'src/contexts/state'
import { updateCurrency } from 'src/contexts/reducers'
import { FILTER_DAOS } from 'src/config/constants'

export const FilterByCurrency = () => {
  const { state, dispatch } = useApp()

  const { currency, DAO } = state

  const handleToggleOnChange = (event: React.MouseEvent<HTMLElement>, newCurrency: Currency) => {
    if (newCurrency === null) return
    if (newCurrency === currency) return
    dispatch(updateCurrency(newCurrency))
  }

  // Get allowed currencies from FILTER_DAOS
  const currenciesAllowed = FILTER_DAOS.find((dao) => dao.id === DAO)?.currenciesAllowed

  return (
    <ToggleButtonGroup
      value={currency}
      exclusive
      onChange={handleToggleOnChange}
      aria-label="Switch between USD and ETH"
      disabled={currenciesAllowed?.length === 1}
    >
      {currenciesAllowed?.map((currencyAllowed: Currency, index: number) => (
        <ToggleButton
          disableRipple
          value={currencyAllowed}
          sx={{ textTransform: 'none' }}
          key={index}
        >
          {currencyAllowed}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
