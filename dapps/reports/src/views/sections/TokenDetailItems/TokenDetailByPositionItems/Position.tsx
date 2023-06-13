import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import * as React from 'react'

interface PositionProps {
  position: string
}

const Position = ({ position }: PositionProps) => {
  return (
    <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
      <CustomTypography
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '22px',
          lineHeight: '24px',
          color: 'custom.grey.dark',
          maxWidth: '88%',
          overflowWrap: 'anywhere'
        }}
      >
        {position}
      </CustomTypography>
      <OpenInNewIcon fontSize={'small'} />
    </BoxWrapperRow>
  )
}

export default Position
