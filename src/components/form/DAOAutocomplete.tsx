import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField, AutocompleteRenderInputParams } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { CustomAutocomplete, CustomTypography, BoxWrapperRow } from 'src/components'
import { FILTER_DAO, FILTER_DAOS } from 'src/config/constants'

const DAOs = FILTER_DAOS.filter((option: FILTER_DAO) => option.isEnabled)
  .map((option: FILTER_DAO) => {
    return {
      logo: option.icon,
      label: option.name,
      id: option.id
    }
  })
  .sort((a, b) => (a.label < b.label ? -1 : 1))

const RenderInput = (params: AutocompleteRenderInputParams) => {
  const InputProps = {
    ...params.InputProps
  }

  const option = FILTER_DAOS.find((option: FILTER_DAO) => {
    if (option.name === params.inputProps.value) {
      return option
    }
  })

  if (option) {
    InputProps.startAdornment = (
      <>
        <Image src={option.icon || ''} alt={option.name} width={20} height={20} />
        &nbsp;
      </>
    )
  }

  return (
    <TextField
      {...params}
      InputProps={InputProps}
      label={
        <BoxWrapperRow gap={2}>
          <SearchIcon />
          <CustomTypography variant="filterTextRenderInput">DAO</CustomTypography>
        </BoxWrapperRow>
      }
      variant="standard"
    />
  )
}

const RenderOption = (props: any, option: any) => {
  return (
    <Box
      component="span"
      sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: '#F5F5F5' }}
      {...props}
    >
      <Image src={option.logo || ''} alt={option.label} width={20} height={20} />
      {option.label}
    </Box>
  )
}

interface DAOAutocompleteProps {
  name: string
  control: any
  onChangeProps?: (value: any) => void
}

export const DAOAutocomplete = (props: DAOAutocompleteProps) => {
  return (
    <CustomAutocomplete
      {...props}
      options={DAOs}
      renderInput={RenderInput}
      renderOption={RenderOption}
    />
  )
}
