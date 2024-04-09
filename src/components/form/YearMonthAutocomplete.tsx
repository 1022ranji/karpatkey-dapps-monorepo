import * as React from 'react'
import { CustomAutocomplete, CustomTypography } from 'src/components'
import { FILTER_DAOS, MONTHS } from 'src/config/constants'

const Label = () => <CustomTypography variant="filterTextRenderInput">Period</CustomTypography>

interface YearMonthAutocompleteProps {
  name: string
  control: any
  selectedValues?: any
}

export const YearMonthAutocomplete = (props: YearMonthAutocompleteProps) => {
  const { selectedValues } = props
  const { DAO } = selectedValues || {}

  // Get the allowed years and months for the selected DAO
  const YEARS_MONTHS =
    FILTER_DAOS.find((option) => {
      return +option.id === +DAO
    })
      ?.datesAllowed?.reduce((acc: string[], option) => {
        // reduce to use a pair year-month as id and label
        const pair = `${option.year}-${option.month}`
        if (!acc.includes(pair)) {
          acc.push(pair)
        }
        return acc
      }, [])
      .sort((a, b) => {
        const [aYear, aMonth] = a.split('-')
        const [bYear, bMonth] = b.split('-')
        return +aYear === +bYear ? +bMonth - +aMonth : +bYear - +aYear
      })
      .map((pair) => {
        const [year, month] = pair.split('-')
        const monthString =
          MONTHS.find((option) => {
            return +option.id === +month
          })?.label ?? ''

        return {
          id: pair,
          label: `${year} ${monthString}`
        }
      }) ?? []

  return <CustomAutocomplete {...props} options={YEARS_MONTHS} label={<Label />} />
}
