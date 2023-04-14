import { TTitleProps } from '@karpatkey-monorepo/reports/src/types'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { existDAOKeyName, getNameByDAOName } from '@karpatkey-monorepo/shared/utils'
import * as React from 'react'

const Title = ({ periodType, daoName }: TTitleProps) => {
  const daoTitle = daoName && existDAOKeyName(daoName) ? getNameByDAOName(daoName) : 'all the DAOs'
  return (
    <CustomTypography variant="h1" textAlign="center" sx={{ paddingTop: '40px' }}>
      A {periodType} in {daoTitle} farms
    </CustomTypography>
  )
}

export default Title
