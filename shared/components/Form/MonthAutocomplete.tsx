import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import {
  getDAONumberByName,
  MONTHS_ALLOWED_BY_DAO
} from '@karpatkey-monorepo/shared/config/constants'
import * as React from 'react'

const Label = () => <CustomTypography variant="filterTextRenderInput">Month</CustomTypography>

interface MonthAutocompleteProps {
  name: string
  control: any
  selectedValues?: any
}

export default function MonthAutocomplete(props: MonthAutocompleteProps) {
  const { selectedValues } = props
  // Add default to the year the actual year
  const currentYear = new Date().getFullYear()
  const { DAO, year = currentYear } = selectedValues || {}

  const options =
    MONTHS_ALLOWED_BY_DAO.find((option) => {
      return getDAONumberByName(option.DAO) === DAO
    })
      ?.DATES_ALLOWED?.filter((option) => {
        return option.year === year
      })
      .map((option) => {
        return {
          id: option.month,
          label: option.label
        }
      }) ?? []

  return <CustomAutocomplete {...props} options={options} label={<Label />} />
}
