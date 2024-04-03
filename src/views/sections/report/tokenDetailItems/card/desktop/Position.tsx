import { CustomTypography } from 'components/index'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import * as React from 'react'
import { ReactElement } from 'react'

interface PositionProps {
  position: string
  url?: string
  helpText?: ReactElement
}

export const Position = ({ position, url, helpText }: PositionProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '22px',
        lineHeight: '24px',
        color: 'custom.grey.dark',
        wordBreak: 'break-word',
        alignItems: 'center',
        display: 'flex'
      }}
      gap={1}
    >
      {position}
      {helpText}
      {url ? <OpenInNewIcon fontSize={'small'} /> : null}
    </CustomTypography>
  )
}
