import { TFormProps } from '@karpatkey-monorepo/reports/src/types'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { getNetworkByNetworkId, getNetworksForDropdown } from '@karpatkey-monorepo/shared/utils'
import { ListItemIcon, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { Controller } from 'react-hook-form'

const FormNetworkDropdown = ({ name, control, onChange: onChangeDropdown }: TFormProps) => {
  const networks = getNetworksForDropdown()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select
          value={value}
          onChange={(event) => {
            if (onChangeDropdown) onChangeDropdown(+event.target.value)
            onChange(event)
          }}
          variant={'standard'}
          disableUnderline
          sx={{
            '& .MuiSelect-select': {
              display: 'flex'
            }
          }}
          renderValue={(selected) => {
            const network = getNetworkByNetworkId(selected)
            return (
              <BoxWrapperRow gap={1} sx={{ minWidth: 100 }}>
                <Image src={network.icon} alt={network.name} width={24} height={24} />
                <CustomTypography color="textSecondary" variant="body1">
                  {network.name}
                </CustomTypography>
              </BoxWrapperRow>
            )
          }}
        >
          {networks.map(({ name, value, icon }, index) => (
            <MenuItem key={index} value={value}>
              <ListItemIcon>
                <Image src={icon} alt={name} width={24} height={24} />
              </ListItemIcon>
              <CustomTypography color="textSecondary" variant="body1" textAlign="center">
                {name}
              </CustomTypography>
            </MenuItem>
          ))}
        </Select>
      )}
    />
  )
}

export default FormNetworkDropdown
