import { CustomAutocomplete } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

const getYears = () => {
  const max = new Date().getFullYear()
  const min = max - 4
  const years = []

  for (let i = max; i >= min; i--) {
    years.push({
      label: i.toString(),
      id: i
    })
  }
  return years
}

export const YEARS = getYears()

const Label = () => <CustomTypography variant="filterTextRenderInput">Year</CustomTypography>

interface YearAutocompleteProps {
  name: string
  control: any
}

export default function YearAutocomplete(props: YearAutocompleteProps) {
  return <CustomAutocomplete {...props} options={YEARS} label={<Label />} />
}
