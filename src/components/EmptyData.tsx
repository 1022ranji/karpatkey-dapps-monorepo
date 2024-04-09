import { CustomTypography, BoxWrapperRow } from 'src/components'

export const EmptyData = () => {
  return (
    <BoxWrapperRow sx={{ height: 200 }}>
      <CustomTypography variant="h4">No data available</CustomTypography>
    </BoxWrapperRow>
  )
}
