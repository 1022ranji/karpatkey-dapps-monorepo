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
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'
import useIsLoading from '@karpatkey-monorepo/reports/src/hooks/useIsLoading'

export const FOOTER_HEIGHT = 40

const FooterWrapper = styled(BoxWrapperColumn)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default,
  height: 'auto',
  paddingRight: '48px',
  paddingLeft: '48px',
  paddingTop: '40px',
  paddingBottom: '20px',
  justifyContent: 'space-between',
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
  primaryDisclaimerText?: boolean
  secondaryDisclaimerText?: boolean
}

const Footer = (props: FooterProps) => {
  const { primaryDisclaimerText, secondaryDisclaimerText } = props
  const isDDay = isYearAndMonthValid()

  const isLoading = useIsLoading()

  return (
    <>
      {isLoading ? null : (
        <AnimatePresenceWrapper>
          <FooterWrapper>
            {primaryDisclaimerText || secondaryDisclaimerText ? (
              <BoxWrapperColumn gap={'10px'}>
                {primaryDisclaimerText ? (
                  <CustomTypography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                    width="100%"
                    sx={{ fontStyle: 'italic' }}
                  >
                    Token Balances and Prices are considered at end of month 0 UTC.
                  </CustomTypography>
                ) : null}
                {secondaryDisclaimerText && isDDay ? (
                  <BoxWrapperColumn gap={'10px'} sx={{ marginBottom: '40px', marginTop: '40px' }}>
                    <CustomTypography
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      width="100%"
                      sx={{ fontStyle: 'italic', lineHeight: '28px' }}
                    >
                      The following report is provided for informational purposes only, and does not
                      constitute financial, investment, legal, regulatory, or tax advice.
                    </CustomTypography>
                    <CustomTypography
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      width="100%"
                      sx={{ fontStyle: 'italic', lineHeight: '28px' }}
                    >
                      The accuracy of the data and information contained in the report cannot be
                      guaranteed, as they are provided strictly on a best efforts basis. References
                      to assets are made for informational purposes, and are not a recommendation,
                      offer to sell, or solicitation of an offer to buy any asset. Content, data, or
                      assessments provided in this report are subject to change without notice.
                      Furthermore, the financial statements presented have not undergone a
                      comprehensive financial statement audit from a third-party professional
                      accounting firm. As such, there may exist errors or inaccuracies that affect
                      the statements.
                    </CustomTypography>
                    <CustomTypography
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      width="100%"
                      sx={{ fontStyle: 'italic', lineHeight: '28px' }}
                    >
                      This report may include certain forward looking statements; such statements
                      face a high degree of uncertainty and are not a guarantee or promise of future
                      performance or events. Author(s) are materially relying on waiver of liability
                      as a condition of providing this report. By accessing the content herein,
                      readers agree to indemnify and hold harmless author(s) and karpatkey DAO
                      against any and all claims.
                    </CustomTypography>
                    <CustomTypography
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      width="100%"
                      sx={{ fontStyle: 'italic', lineHeight: '28px' }}
                    >
                      ACCORDINGLY, WE RECOMMEND THAT YOU DO NOT RELY ON NOR MAKE ANY FINANCIAL OR
                      INVESTMENT DECISION BASED ON THE STATEMENTS AND INFORMATION CONTAINED IN THIS
                      REPORT.
                    </CustomTypography>
                  </BoxWrapperColumn>
                ) : null}
              </BoxWrapperColumn>
            ) : null}
            <BoxWrapperRow sx={{ justifyContent: 'space-between', height: FOOTER_HEIGHT }}>
              <BoxWrapperRow>
                <CustomTypographyFooter>© 2023 karpatkey • &nbsp;</CustomTypographyFooter>
                <Link
                  href={`https://drive.google.com/drive/folders/1-RaGdsneMJ1sznUkzBw2CCWlLlO_EAJB`}
                  target="_blank"
                  sx={{ textDecoration: 'none' }}
                >
                  <CustomTypographyFooter sx={{ fontWeight: 500 }}>
                    press kit
                  </CustomTypographyFooter>
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
                <Link
                  href={`https://www.linkedin.com/company/karpatkey/mycompany/`}
                  target="_blank"
                >
                  <Linkedin height={24} width={24} />
                </Link>
              </BoxWrapperRow>
            </BoxWrapperRow>
          </FooterWrapper>
        </AnimatePresenceWrapper>
      )}
    </>
  )
}

export default Footer
