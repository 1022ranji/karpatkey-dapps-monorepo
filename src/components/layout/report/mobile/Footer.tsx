import { Box, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import {
  AnimatePresenceWrapper,
  CustomTypography,
  Github,
  Linkedin,
  Mirror,
  Twitter,
  BoxWrapperRow,
  BoxWrapperColumn
} from 'src/components'
import { useScreenSize } from 'src/hooks/useScreenSize'

const Wrapper = styled(BoxWrapperColumn)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default,
  justifyContent: 'center',
  gap: 20,
  height: '70px',
  width: '100%',
  maxWidth: '1140px',
  padding: '20px 20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '20px',
  marginTop: '60px'
}))

const Container = styled(Box)(() => ({
  display: 'block',
  position: 'static',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  maxWidth: '940px'
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
  const isMobile = screenSize.width < 767

  const year = new Date()
  const fullYear = year.getFullYear()

  return (
    <AnimatePresenceWrapper>
      <Wrapper>
        <Container sx={{ paddingLeft: '20px', paddingRight: '20px', marginBottom: '20px' }}>
          <Box
            gap={4}
            sx={{
              display: 'flex',
              flexDirection: !isMobile ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: !isMobile ? 'space-between' : 'center'
            }}
          >
            <BoxWrapperRow sx={{ justifyContent: 'center' }}>
              <Title>© {fullYear} karpatkey</Title>
              <Title>&nbsp;&nbsp;•&nbsp;&nbsp;</Title>
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
            </BoxWrapperRow>
            <BoxWrapperRow gap={4}>
              <Link
                href={`https://github.com/karpatkey`}
                target="_blank"
                height={'20px'}
                width={'20px'}
              >
                <Github height={'20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://twitter.com/karpatkey`}
                target="_blank"
                height={'20px'}
                width={'20px'}
              >
                <Twitter height={'20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://mirror.xyz/karpatkey.eth`}
                target="_blank"
                height={'20px'}
                width={'20px'}
              >
                <Mirror height={'20px'} width={'100%'} />
              </Link>
              <Link
                href={`https://www.linkedin.com/company/karpatkey/mycompany/`}
                target="_blank"
                height={'20px'}
                width={'20px'}
              >
                <Linkedin height={'20px'} width={'100%'} />
              </Link>
            </BoxWrapperRow>
          </Box>
        </Container>
      </Wrapper>
    </AnimatePresenceWrapper>
  )
}
