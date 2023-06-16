import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import * as React from 'react'

interface PositionProps {
  position: string
}

const Position = ({ position }: PositionProps) => {
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
      <OpenInNewIcon fontSize={'small'} />
    </CustomTypography>
  )
}

export default Position
