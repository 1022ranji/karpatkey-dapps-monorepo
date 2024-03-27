import Image from 'next/image'
import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useRouter } from 'next/router'
import {
  BoxWrapperColumn,
  BoxWrapperRow,
  LinkWrapper,
  AnimatePresenceWrapper
} from 'src/components'
import { NumberBlockCard } from './NumberBlockCard'
import { Currency } from 'src/contexts/state'
import { formatCurrency, formatNumber, formatPercentage } from 'src/utils/format'
import { Value } from './Value'

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
          height: 'fit-content',
          padding: '8px 8px',
          border: '1px solid #B6B6B6',
          background: 'background.paper'
        }}
      >
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <BoxWrapperRow gap={1}>
            <Image src={icon} alt={name} width={48} height={48} />
            <Value value={name} fontWeight={600} />
          </BoxWrapperRow>
          <LinkWrapper url={urlToReport} isCentered>
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
