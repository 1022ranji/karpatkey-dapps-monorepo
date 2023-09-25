import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import React from 'react'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import Image from 'next/image'

interface NumberBlockProps {
  amount: string
  title: string
}

const NumberBlock = ({ amount, title }: NumberBlockProps) => {
  return (
    <BoxWrapperColumn sx={{ justifyContent: 'center' }}>
      <CustomTypography variant="h2" textAlign="center">
        {amount}
      </CustomTypography>
      <CustomTypography
        textAlign="center"
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontSize: '24px',
          lineHeight: '28px',
          fontWeight: '300',
          fontStyle: 'normal'
        }}
      >
        {title}
      </CustomTypography>
    </BoxWrapperColumn>
  )
}

const Welcome = () => {
  const DAOS = FILTER_DAOS.filter((option) => option.shouldBeDisplayedHomepage).map((option) => {
    return {
      keyName: option.keyName,
      icon: option.icon,
      name: option.name,
      id: option.id
    }
  })

  return (
    <BoxWrapperColumn sx={{ alignItems: 'center', marginTop: 10 }} gap={10}>
      <CustomTypography variant="h1" textAlign="center">
        View our DAO treasury reports
      </CustomTypography>

      <BoxWrapperRow gap={12}>
        <NumberBlock amount="$312,233,233" title="Non-custodial AUM" />
        <NumberBlock amount="$312,233,233" title="Last month farming results" />
      </BoxWrapperRow>

      <BoxWrapperColumn sx={{ alignItems: 'flex-start' }} gap={2}>
        {DAOS.map(({ icon, name }, index) => {
          return (
            <BoxWrapperRow key={index} gap={4}>
              <Image src={icon} alt={name} width={80} height={80} />
              <CustomTypography variant="h2">{name}</CustomTypography>
            </BoxWrapperRow>
          )
        })}
      </BoxWrapperColumn>

      <CustomTypography
        textAlign="center"
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontSize: '30px',
          lineHeight: '28px',
          fontWeight: '300',
          fontStyle: 'normal'
        }}
      >
        Desktop site, Mobile coming soon
      </CustomTypography>
      <CustomTypography
        textAlign="center"
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontSize: '24px',
          lineHeight: '28px',
          fontWeight: '300',
          fontStyle: 'normal'
        }}
      >
        Select report above
      </CustomTypography>
    </BoxWrapperColumn>
  )
}

export default Welcome
