import {
  ButtonAddress,
  AnimatePresenceWrapper,
  CustomTypography,
  BoxWrapperColumn,
  BoxWrapperRow
} from 'src/components'
import { DAO_ADDRESS, FILTER_DAO } from 'src/config/constants'
import { getDAO, getMonthName } from 'src/utils'
import Image from 'next/image'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { Box, Theme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

export const Hero = () => {
  const { state } = useApp()

  const { DAO: filterDAO, month } = state
  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const { dao, monthName } = React.useMemo(() => {
    const dao: FILTER_DAO | undefined = getDAO(filterDAO)
    const monthName = month ? getMonthName(+month) : null

    return { dao, monthName }
  }, [filterDAO, month])

  if (!dao || !monthName) {
    return null
  }

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn
        sx={{
          margin: {
            xs: '20px 20px 0 20px',
            md: '30px 30px 30px 30px'
          },
          alignItems: 'flex-start',
          gap: { xs: 2, md: 4 }
        }}
      >
        <BoxWrapperRow sx={{ gap: { xs: 0, md: 2 } }}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Image src={dao?.icon ?? ''} alt={dao?.name} width={116} height={116} key={dao?.icon} />
          </Box>
          <a className="anchor" id="summary" />
          <BoxWrapperColumn
            sx={{
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              justifyContent: 'space-between'
            }}
          >
            <CustomTypography
              variant="heroSectionTitle"
              sx={{
                fontSize: {
                  xs: '44px',
                  md: '64px'
                },
                lineHeight: {
                  xs: '44px',
                  md: '64px'
                }
              }}
            >
              {dao?.name?.trim()}
            </CustomTypography>
            <CustomTypography
              variant="heroSectionSubtitle"
              sx={{
                fontSize: {
                  xs: '24px',
                  md: '32px'
                },
                lineHeight: {
                  xs: '24px',
                  md: '64px'
                }
              }}
            >
              {monthName.trim()} Treasury Report
            </CustomTypography>
          </BoxWrapperColumn>
        </BoxWrapperRow>
        <BoxWrapperRow
          sx={{
            justifyContent: 'flex-start',
            gap: 2,
            paddingBottom: '20px',
            ...(isMD
              ? { flexWrap: 'wrap' }
              : { width: 'fit-content', maxWidth: '100%', overflowX: 'auto' })
          }}
        >
          {dao?.addresses
            // sort by item order
            .sort((a: DAO_ADDRESS, b: DAO_ADDRESS) => a.order - b.order)
            .map((daoAddress: DAO_ADDRESS, index: number) => (
              <ButtonAddress key={index} daoAddress={daoAddress} />
            ))}
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Hero
