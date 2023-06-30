import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import WarningIcon from '@mui/icons-material/Warning'
import { Button, Input, styled } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const ButtonStyled = styled(Button)({
  padding: '6px 14px',
  width: '152px',
  height: '48px'
})

const PasswordProtect = () => {
  const router = useRouter()
  const error = router.query.error
  return (
    <BoxWrapperColumn
      gap={12}
      sx={{ justifyContent: 'center', alignItems: 'center', paddingTop: '100px' }}
    >
      <CustomTypography variant={'h1'} sx={{ textAlign: 'center' }}>
        This app is under development...
      </CustomTypography>
      <form action="/api/password-protect" method="post">
        <BoxWrapperColumn gap={2}>
          <CustomTypography variant={'h3'}>Enter Password:</CustomTypography>
          <BoxWrapperRow gap={2}>
            <Input type="password" name="password" />
            <ButtonStyled type={'submit'}>Login</ButtonStyled>
          </BoxWrapperRow>
          {error && (
            <BoxWrapperRow gap={1} sx={{ justifyContent: 'flex-start' }}>
              <WarningIcon sx={{ color: 'custom.error' }} />
              <CustomTypography
                variant="filterErrorMessage"
                sx={{
                  '::first-letter': { textTransform: 'capitalize' },
                  wordBreak: 'break-word',
                  maxWidth: '350px'
                }}
              >
                {error}
              </CustomTypography>
            </BoxWrapperRow>
          )}
        </BoxWrapperColumn>
      </form>
    </BoxWrapperColumn>
  )
}

export default PasswordProtect
