import { TFormProps } from '@karpatkey-monorepo/reports/src/types'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import * as React from 'react'
import { Controller } from 'react-hook-form'

const PeriodTypes: { value: TPeriodType; name: string }[] = [
  {
    value: 'year',
    name: 'Yearly'
  },
  {
    value: 'month',
    name: 'Monthly'
  },
  {
    value: 'week',
    name: 'Weekly'
  },
  {
    value: 'day',
    name: 'Daily'
  }
]

const FormToggleType = ({ name, control }: TFormProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="center"
          gap={1}
        >
          <CustomTypography color="textSecondary" variant="body1">
            Frequency
          </CustomTypography>
          <ToggleButtonGroup
            fullWidth
            value={value}
            exclusive
            onChange={(e, value) => {
              onChange(value)
            }}
            aria-label="text alignment"
          >
            {PeriodTypes.map(({ name, value }) => {
              return (
                <ToggleButton value={value} key={value} aria-label="centered">
                  <CustomTypography color="textSecondary" variant="body2" textAlign="center">
                    {name}
                  </CustomTypography>
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
        </Box>
      )}
    />
  )
}

export default FormToggleType
