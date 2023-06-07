import * as React from 'react'

import { CustomAutocomplete } from '../CustomAutocomplete'
import CustomTypography from '../CustomTypography'

export const MONTHS = [
  { label: 'January', id: 1 },
  { label: 'February', id: 2 },
  { label: 'March', id: 3 },
  { label: 'April', id: 4 },
  { label: 'May', id: 5 },
  { label: 'June', id: 6 },
  { label: 'July', id: 7 },
  { label: 'August', id: 8 },
  { label: 'September', id: 9 },
  { label: 'October', id: 10 },
  { label: 'November', id: 11 },
  { label: 'December', id: 12 }
]

const Label = () => <CustomTypography variant="filterTextRenderInput">Month</CustomTypography>

interface MonthAutocompleteProps {
  name: string
  control: any
}

export default function MonthAutocomplete(props: MonthAutocompleteProps) {
  return <CustomAutocomplete {...props} options={MONTHS} label={<Label />} />
}
