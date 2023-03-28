import { TTitleProps } from '@karpatkey-monorepo/reports/src/types'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { getHumanDAO, isDefaultAddress } from '@karpatkey-monorepo/shared/utils'
import * as React from 'react'

const Title = ({ periodType, daoAddress, chainId }: TTitleProps) => {
  const daoTitle =
    daoAddress && !isDefaultAddress(daoAddress) ? getHumanDAO(daoAddress, chainId) : 'all the DAOs'
  return (
    <CustomTypography variant="h2" textAlign="center">
      A {periodType} in {daoTitle} farms
    </CustomTypography>
  )
}

export default Title
