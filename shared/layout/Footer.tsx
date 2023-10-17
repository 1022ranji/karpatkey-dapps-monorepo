import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Github from '@karpatkey-monorepo/shared/components/Icons/Socials/Github'
import Linkedin from '@karpatkey-monorepo/shared/components/Icons/Socials/Linkedin'
import Mirror from '@karpatkey-monorepo/shared/components/Icons/Socials/Mirror'
import Twitter from '@karpatkey-monorepo/shared/components/Icons/Socials/Twitter'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import BoxWrapperColumn from '../components/Wrappers/BoxWrapperColumn'

export const FOOTER_HEIGHT = 160

const FooterWrapper = styled(BoxWrapperColumn)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default,
  height: FOOTER_HEIGHT,
  paddingRight: '48px',
  paddingLeft: '48px',
  paddingTop: '48px',
  justifyContent: 'center',
  gap: 20
}))

const CustomTypographyFooter = styled(CustomTypography)({
  fontFamily: 'IBM Plex Sans',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '34px',
  color: '#262626'
})

interface FooterProps {
  disclaimerText?: string
}

const Footer = (props: FooterProps) => {
  const { disclaimerText } = props
  return (
    <AnimatePresenceWrapper>
      <FooterWrapper>
        {disclaimerText ? (
          <BoxWrapperRow>
            <CustomTypography
              variant="body2"
              color="textSecondary"
              align="left"
              width="100%"
              sx={{ fontStyle: 'italic' }}
            >
              {disclaimerText}
            </CustomTypography>
          </BoxWrapperRow>
        ) : null}
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <BoxWrapperRow>
            <CustomTypographyFooter>© 2023 karpatkey • &nbsp;</CustomTypographyFooter>
            <Link
              href={`https://drive.google.com/drive/folders/1-RaGdsneMJ1sznUkzBw2CCWlLlO_EAJB`}
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <CustomTypographyFooter sx={{ fontWeight: 500 }}>press kit</CustomTypographyFooter>
            </Link>
          </BoxWrapperRow>
          <BoxWrapperRow gap={4}>
            <Link href={`https://github.com/KarpatkeyDAO`} target="_blank">
              <Github height={24} width={24} />
            </Link>
            <Link href={`https://twitter.com/karpatkey`} target="_blank">
              <Twitter height={24} width={24} />
            </Link>
            <Link href={`https://mirror.xyz/karpatkey.eth`} target="_blank">
              <Mirror height={24} width={24} />
            </Link>
            <Link href={`https://www.linkedin.com/company/karpatkey/mycompany/`} target="_blank">
              <Linkedin height={24} width={24} />
            </Link>
          </BoxWrapperRow>
        </BoxWrapperRow>
      </FooterWrapper>
    </AnimatePresenceWrapper>
  )
}

export default Footer
