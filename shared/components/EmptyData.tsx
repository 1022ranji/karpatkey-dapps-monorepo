import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'

import BoxWrapperRow from './Wrappers/BoxWrapperRow'

const EmptyData = () => {
  return (
    <BoxWrapperRow sx={{ height: 200 }}>
      <CustomTypography variant="h4">No data available</CustomTypography>
    </BoxWrapperRow>
  )
}

export default EmptyData
