import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
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
  const currentYears =
    FILTER_DAOS.find((option) => {
      return +option.id === +selectedValues?.DAO
    })
      ?.datesAllowed?.reduce((acc: number[], option) => {
        if (!acc.includes(option.year)) {
          acc.push(option.year)
        }
        return acc
      }, [] as number[])
      ?.sort() ?? []
  const currentYear = currentYears?.length > 0 ? currentYears[currentYears.length - 1] : null

  const { DAO, year = currentYear } = selectedValues || {}

  const options =
    FILTER_DAOS.find((option) => {
      return +option.id === +DAO
    })
      ?.datesAllowed?.filter((option) => {
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
