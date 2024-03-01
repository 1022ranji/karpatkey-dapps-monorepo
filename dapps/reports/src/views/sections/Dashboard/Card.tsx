import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Title } from './Title'
import Image from 'next/image'
import React from 'react'
import { LinkWrapper } from '../../../components/LinkWrapper'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useRouter } from 'next/router'
import { NumberBlockCard } from './NumberBlockCard'
import { Currency } from '../../../contexts/state'
import { formatCurrency, formatNumber, formatPercentage } from '../../../utils/format'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'

interface CardProps {
  name: string
  urlToReport: string
  icon: string
  totalFunds: number
  allocatedFunds: number
  deFiResults: number
  APY: string
  currency: Currency
}

export const Card = (props: CardProps) => {
  const { name, urlToReport, currency, icon, totalFunds, allocatedFunds, deFiResults, APY } = props
  const router = useRouter()

  const onClick = (e: any) => {
    if (e.ctrlKey || e.metaKey) {
      //if ctrl key or command is pressed
      window.open(urlToReport, '_blank')
    } else {
      router.push(urlToReport)
    }
  }
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn
        gap={4}
        sx={{
          maxWidth: '320px',
          minWidth: '320px',
          height: 'content-fit',
          padding: '8px 8px',
          border: '1px solid #B6B6B6',
          background: 'background.paper'
        }}
      >
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <BoxWrapperRow gap={1}>
            <Image src={icon} alt={name} width={48} height={48} />
            <Title title={name} />
          </BoxWrapperRow>
          <LinkWrapper url={urlToReport}>
            <OpenInNewIcon onClick={onClick} sx={{ cursor: 'pointer', fontSize: '1.4rem' }} />
          </LinkWrapper>
        </BoxWrapperRow>
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }} gap={4}>
          <BoxWrapperColumn gap={4}>
            <NumberBlockCard
              amount={
                currency === 'USD'
                  ? formatCurrency(totalFunds || 0)
                  : `${formatNumber(totalFunds || 0, 0)} ETH`
              }
              title={`Total funds ${currency === 'USD' ? '(ncAUM)' : ''}`}
            />
            <NumberBlockCard
              amount={
                currency === 'USD'
                  ? formatCurrency(deFiResults || 0)
                  : `${formatNumber(deFiResults || 0, 0)} ETH`
              }
              title={'DeFi results'}
            />
          </BoxWrapperColumn>
          <BoxWrapperColumn gap={4}>
            <NumberBlockCard
              amount={formatPercentage(allocatedFunds || 0, 0)}
              title={'Allocated funds'}
            />
            <NumberBlockCard amount={APY} title={'APY'} />
          </BoxWrapperColumn>
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}
