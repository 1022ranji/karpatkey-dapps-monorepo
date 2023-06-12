import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box } from '@mui/material'
import Lottie from 'lottie-react'
import React from 'react'

const Welcome = () => {
  const [lottieFile, setLottieFile] = React.useState<Maybe<any>>(null)

  React.useEffect(() => {
    ;(async () => {
      const karpatkeyFields = await import(
        '@karpatkey-monorepo/reports/src/utils/Lottie/karpatkeyFields.json'
      )

      setLottieFile(karpatkeyFields)
    })()
  }, [])

  const style = {
    height: 500,
    width: 700,
    margin: 'auto'
  }

  return (
    <Box>
      <CustomTypography variant="h1" textAlign="center" sx={{ marginY: 8 }}>
        karpatkey&aposs DAO treasury reports
      </CustomTypography>
      <Lottie style={style} loop={false} animationData={lottieFile} />
    </Box>
  )
}

export default Welcome
