import { TFormProps } from '@karpatkey-monorepo/reports/src/types'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { getDAOByDAOName, getDAOsForDropdown } from '@karpatkey-monorepo/shared/utils'
import { Box, ListItemIcon, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { Controller } from 'react-hook-form'

type TFormDAO = {
  watch: any
}

type TFormDAODropdownProps = TFormProps & TFormDAO

const FormDAODropdown = (props: TFormDAODropdownProps) => {
  const { name, control } = props
  const DAOs = getDAOsForDropdown()

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
            DAO
          </CustomTypography>
          <Select
            value={value}
            onChange={onChange}
            variant={'standard'}
            sx={{
              marginBottom: '10px',
              '& .MuiSelect-select': {
                display: 'flex'
              }
            }}
            renderValue={(selected) => {
              const dao = getDAOByDAOName(selected as TDAO_Name)
              return (
                <BoxWrapperRow gap={2} sx={{ minWidth: 100 }}>
                  <Image src={dao?.icon || ''} alt={dao?.name || ''} width={24} height={24} />
                  <CustomTypography color="textSecondary" variant="body1">
                    {dao?.name || ''}
                  </CustomTypography>
                </BoxWrapperRow>
              )
            }}
          >
            {DAOs.map(({ keyName, name, icon }, index) => (
              <MenuItem key={index} value={keyName}>
                <ListItemIcon sx={{ marginRight: 2 }}>
                  <Image src={icon} alt={name} width={24} height={24} />
                </ListItemIcon>
                <CustomTypography color="textSecondary" variant="body1" textAlign="center">
                  {name}
                </CustomTypography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    />
  )
}

export default FormDAODropdown
