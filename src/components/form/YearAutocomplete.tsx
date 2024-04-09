import * as React from 'react'
import { CustomTypography, CustomAutocomplete } from 'src/components'
import { FILTER_DAOS } from 'src/config/constants'

const Label = () => <CustomTypography variant="filterTextRenderInput">Year</CustomTypography>

interface YearAutocompleteProps {
  name: string
  control: any
  selectedValues?: any
}

export const YearAutocomplete = (props: YearAutocompleteProps) => {
  const { selectedValues } = props
  const { DAO } = selectedValues || {}

  // Get the allowed years for the selected DAO
  const YEARS =
    FILTER_DAOS.find((option) => {
      return +option.id === +DAO
    })
      ?.datesAllowed?.reduce((acc: number[], option) => {
        if (!acc.includes(option.year)) {
          acc.push(option.year)
        }
        return acc
      }, [])
      .map((year) => {
        return {
          id: year,
          label: year + ''
        }
      }) ?? []

  return <CustomAutocomplete {...props} options={YEARS} label={<Label />} />
}
