import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box } from '@mui/material'
import React from 'react'
import Lottie from 'react-lottie'

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

  return (
    <Box>
      <CustomTypography variant="h1" textAlign="center" sx={{ marginY: 8 }}>
        karpatkey&aposs DAO treasury reports
      </CustomTypography>
      <Lottie
        width={700}
        height={500}
        isClickToPauseDisabled={true}
        options={{
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          },
          loop: false,
          autoplay: true,
          animationData: lottieFile
        }}
      />
    </Box>
  )
}

export default Welcome
