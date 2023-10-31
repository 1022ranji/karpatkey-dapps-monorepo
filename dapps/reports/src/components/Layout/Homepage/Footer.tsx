import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Github from '@karpatkey-monorepo/shared/components/Icons/Socials/Github'
import Linkedin from '@karpatkey-monorepo/shared/components/Icons/Socials/Linkedin'
import Mirror from '@karpatkey-monorepo/shared/components/Icons/Socials/Mirror'
import Twitter from '@karpatkey-monorepo/shared/components/Icons/Socials/Twitter'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { useScreenSize } from '@karpatkey-monorepo/reports/src/hooks/useScreenSize'

const Wrapper = styled(BoxWrapperColumn)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default,
  justifyContent: 'center',
  gap: 20,
  height: '70px',
  width: '100%',
  maxWidth: '1140px',
  padding: '20px 20px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const Container = styled(Box)(() => ({
  display: 'block',
  position: 'static',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  maxWidth: '980px'
}))

const Title = styled(CustomTypography)({
  fontFamily: 'IBM Plex Sans',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '24px',
  color: '#262626'
})

export const Footer = () => {
  const screenSize = useScreenSize()
  const isMobile = screenSize.width < 600
  return (
    <AnimatePresenceWrapper>
      <Wrapper>
        <Container
          sx={{ paddingLeft: isMobile ? 'none' : '20px', paddingRight: isMobile ? 'none' : '20px' }}
        >
          <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
            <BoxWrapperRow>
              <Title>© 2023 karpatkey</Title>
              {!isMobile && <Title>&nbsp;&nbsp;•&nbsp;&nbsp;</Title>}
              {!isMobile && (
                <Link
                  href={`https://drive.google.com/drive/folders/1-RaGdsneMJ1sznUkzBw2CCWlLlO_EAJB`}
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                >
                  <Title
                    sx={{
                      fontWeight: 500,
                      '&:hover': {
                        color: 'rgba(26, 27, 31, 0.6)'
                      }
                    }}
                  >
                    press kit
                  </Title>
                </Link>
              )}
            </BoxWrapperRow>
            <BoxWrapperRow gap={isMobile ? 2 : 4}>
              <Link
                href={`https://github.com/karpatkey`}
                target="_blank"
                height={isMobile ? '20px' : '24px'}
                width={isMobile ? '20px' : '24px'}
              >
                <Github height={isMobile ? '14px' : '20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://twitter.com/karpatkey`}
                target="_blank"
                height={isMobile ? '20px' : '24px'}
                width={isMobile ? '20px' : '24px'}
              >
                <Twitter height={isMobile ? '14px' : '20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://mirror.xyz/karpatkey.eth`}
                target="_blank"
                height={isMobile ? '20px' : '24px'}
                width={isMobile ? '20px' : '24px'}
              >
                <Mirror height={isMobile ? '14px' : '20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://www.linkedin.com/company/karpatkey/mycompany/`}
                target="_blank"
                height={isMobile ? '20px' : '24px'}
                width={isMobile ? '20px' : '24px'}
              >
                <Linkedin height={isMobile ? '14px' : '20px'} width={'100%'} />
              </Link>
            </BoxWrapperRow>
          </BoxWrapperRow>
        </Container>
      </Wrapper>
    </AnimatePresenceWrapper>
  )
}
