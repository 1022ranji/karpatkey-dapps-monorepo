import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

interface TitleProps {
  title: string
}

const Title = ({ title }: TitleProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '18px',
        color: 'custom.grey.dark'
      }}
    >
      {title}
    </CustomTypography>
  )
}

export default Title
