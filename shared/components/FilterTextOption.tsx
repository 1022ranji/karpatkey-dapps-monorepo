import React from 'react'

import CustomTypography, { CustomTypographyProps } from './CustomTypography'

interface FilterTextOptionProps {
  title: Maybe<string>
}

const FilterTextOption = (props: FilterTextOptionProps & CustomTypographyProps) => {
  const { title, ...otherProps } = props
  return (
    <CustomTypography
      {...otherProps}
      variant="filterTextOption"
      sx={{
        border: '1px solid #1A1A1A',
        borderRadius: '4px',
        padding: '9px 16px',
        cursor: 'pointer'
      }}
    >
      {title}
    </CustomTypography>
  )
}

export default FilterTextOption
