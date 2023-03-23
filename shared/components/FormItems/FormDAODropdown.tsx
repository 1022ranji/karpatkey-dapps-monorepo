import { TFormProps } from '@karpatkey-monorepo/reports/src/types'
import Address from '@karpatkey-monorepo/shared/components/Address'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import {
  getDAOByAddress,
  getDAOsForDropdownByNetwork,
  getNetworkNameByDAOAddress,
  isDefaultAddress
} from '@karpatkey-monorepo/shared/utils'
import { Box, ListItemIcon, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { Controller } from 'react-hook-form'

type TFormDAOChainId = {
  chainId: NetworkId
  watch: any
}

type TFormDAODropdownProps = TFormProps & TFormDAOChainId

const FormDAODropdown = (props: TFormDAODropdownProps) => {
  const { name, control, watch, chainId } = props
  const DAOs = getDAOsForDropdownByNetwork(chainId)

  const daoAddress = watch(name)
  const networkName = getNetworkNameByDAOAddress(daoAddress)

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
              const dao = getDAOByAddress(selected, chainId)
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
            {DAOs.map(({ value, name, icon }, index) => (
              <MenuItem key={index} value={value}>
                <ListItemIcon sx={{ marginRight: 2 }}>
                  <Image src={icon} alt={name} width={24} height={24} />
                </ListItemIcon>
                <CustomTypography color="textSecondary" variant="body1" textAlign="center">
                  {name}
                </CustomTypography>
              </MenuItem>
            ))}
          </Select>
          {daoAddress && !isDefaultAddress(daoAddress as string) && (
            <Address address={daoAddress} />
          )}
          {networkName && !isDefaultAddress(daoAddress as string) && (
            <CustomTypography ellipsis color="textSecondary" variant="body1">
              Network: {networkName || ''}
            </CustomTypography>
          )}
        </Box>
      )}
    />
  )
}

export default FormDAODropdown
