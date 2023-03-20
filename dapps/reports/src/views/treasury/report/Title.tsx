import { TTitleProps } from '@karpatkey-monorepo/reports/src/types'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

const Title = ({ periodType, dao }: TTitleProps) => {
  return (
    <CustomTypography color="textSecondary" variant="h4" textAlign="center">
      A {periodType} in {dao} farms
    </CustomTypography>
  )
}

export default Title
