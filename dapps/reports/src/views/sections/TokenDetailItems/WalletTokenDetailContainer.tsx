import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { COLORS } from '@karpatkey-monorepo/shared/utils/mappers/summary'
import { PaperProps } from '@mui/material'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTableWalletTokenDetail = dynamic(
  () => import('./TokenDetailItems/TableWalletTokenDetail')
)

const DynamicPieChart = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Pie')
)

interface WalletTokenDetailContainerProps {
  walletTokenDetail: any[]
}

const WalletTokenDetailContainer = (props: WalletTokenDetailContainerProps & PaperProps) => {
  const { walletTokenDetail = [], ...moreProps } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)

  const filteredWalletTokenDetailWithoutAllocation = blockchainFilter
    ? walletTokenDetail.filter((tokenDetail) => {
        return blockchainFilter ? blockchainFilter === tokenDetail['blockchain'] : true
      })
    : walletTokenDetail

  const usdValueTotal = filteredWalletTokenDetailWithoutAllocation.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue.usdValue,
    0
  )

  const filteredWalletTokenDetail = filteredWalletTokenDetailWithoutAllocation
    .map((walletTokenDetail) => {
      return {
        ...walletTokenDetail,
        allocation: walletTokenDetail.usdValue / usdValueTotal
      }
    })
    .sort((a, b) => b.allocation - a.allocation)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const blockchainOptions = walletTokenDetail
    .reduce((result: AutocompleteOption[], currentValue) => {
      const value = result.find((item) => item.id === currentValue['blockchain'])
      if (!value)
        result.push({
          logo:
            currentValue['blockchain'].toLowerCase() === 'ethereum'
              ? '/images/chains/ethereum.svg'
              : currentValue['blockchain'].toLowerCase() === 'gnosis'
              ? '/images/chains/gnosis.svg'
              : '/images/chains/all.svg',
          label: currentValue['blockchain'],
          id: currentValue['blockchain']
        })

      return result
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label))

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    setBlockchainFilter(null)
  }

  const onSubmitClose = (params: any) => {
    const { blockchain } = params
    setBlockchainFilter(blockchain)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const defaultBlockchainValue = blockchainFilter
    ? {
        logo:
          blockchainFilter === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : blockchainFilter === 'Gnosis'
            ? '/images/chains/gnosis.svg'
            : '/images/chains/all.svg',
        label: blockchainFilter,
        id: blockchainFilter
      }
    : null

  const filter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      blockchain={blockchainFilter}
      enableBlockchain
    >
      <Form
        blockchainOptions={blockchainOptions}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        enableBlockchain
      />
    </Filter>
  )

  const isFilterApplied = blockchainFilter !== null

  const filteredWalletTokenDetailForPieChartWithColors = filteredWalletTokenDetail.map(
    (item, index) => {
      return {
        allocation: item.allocation,
        color: COLORS[index] ? COLORS[index] : COLORS[Math.floor(Math.random() * 9) + 0],
        label: item.tokenSymbol,
        value: item.usdValue
      }
    }
  )
  const filteredWalletTokenDetailForPieChartWithColorsAndOthers =
    filteredWalletTokenDetailForPieChartWithColors.reduce((result: any, currentValue: any) => {
      if (currentValue.allocation * 100 > 3) {
        result.push(currentValue)
      } else {
        const other = result.find((item: any) => item.label === 'Other')
        if (other) {
          other.value += currentValue.value
          other.allocation += currentValue.allocation
        } else {
          result.push({
            allocation: currentValue.allocation,
            color: currentValue.color,
            label: 'Other',
            value: currentValue.value
          })
        }
      }
      return result
    }, [])

  console.log(
    'filteredWalletTokenDetailForPieChartWithColorsAndOthers',
    filteredWalletTokenDetailForPieChartWithColorsAndOthers
  )

  return (
    <PaperSection subTitle="Wallet token detail" filter={filter} {...moreProps}>
      {filteredWalletTokenDetail.length === 0 && !isFilterApplied ? (
        <EmptyData />
      ) : (
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <DynamicPieChart
            data={filteredWalletTokenDetailForPieChartWithColorsAndOthers}
            dataKey="value"
            showLegend={false}
            width={450}
            height={400}
          />
          <DynamicTableWalletTokenDetail
            filteredWalletTokenDetail={filteredWalletTokenDetail}
            sx={{ width: '50%' }}
          />
        </BoxWrapperRow>
      )}
    </PaperSection>
  )
}

export default WalletTokenDetailContainer
