import {
  PieChart,
  BoxWrapperRow,
  PaperSection,
  Form,
  Filter,
  EmptyData,
  AutocompleteOption
} from 'src/components'
import { OTHERS_WALLET_LIMIT } from 'src/config/constants'
import { SUMMARY_COLORS } from 'src/config/theme'
import { PaperProps, Theme } from '@mui/material'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { TableWalletTokenDetail } from './TableWalletTokenDetail'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FilterContent } from 'src/components/filters/mobile/FilterContent'

interface WalletTokenDetailContainerProps {
  walletTokenDetail: any[]
}

export const WalletTokenDetailContainer = (props: WalletTokenDetailContainerProps & PaperProps) => {
  const { walletTokenDetail = [] } = props
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

  const CommonFilter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
      handleClear={handleClear}
      anchorEl={anchorEl}
      open={open}
      blockchain={blockchainFilter}
      enableBlockchain
      tooltipText={'Clear filter'}
    >
      <Form
        blockchainOptions={blockchainOptions}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        enableBlockchain
        buttonTitle={'Apply filter'}
      />
    </Filter>
  )

  const MobileFilter = (
    <FilterContent
      enableBlockchain={true}
      blockchainOptions={blockchainOptions}
      handleClear={handleClear}
      handleClick={onSubmitClose}
    />
  )

  const isFilterApplied = blockchainFilter !== null

  const filteredWalletTokenDetailForPieChartWithColors = filteredWalletTokenDetail.map(
    (item, index) => {
      return {
        allocation: item.allocation,
        color: SUMMARY_COLORS[index]
          ? SUMMARY_COLORS[index]
          : SUMMARY_COLORS[Math.floor(Math.random() * 9) + 0],
        label: item.tokenSymbol + ' ' + item.blockchain,
        value: item.usdValue
      }
    }
  )

  const filteredWalletTokenDetailForPieChartWithColorsAndOthers =
    filteredWalletTokenDetailForPieChartWithColors.reduce((result: any, currentValue: any) => {
      if (currentValue.allocation * 100 > OTHERS_WALLET_LIMIT) {
        result.push(currentValue)
      } else {
        const other = result.find((item: any) => item.label === 'Others')
        if (other) {
          other.value += currentValue.value
          other.allocation += currentValue.allocation
        } else {
          result.push({
            allocation: currentValue.allocation,
            color: currentValue.color,
            label: 'Others',
            value: currentValue.value
          })
        }
      }
      return result
    }, [])

  const { state } = useApp()
  const { currency } = state

  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <PaperSection
      subTitle={currency === 'USD' ? 'Wallet token detail' : 'Wallet token detail (ETH)'}
      filter={isMD ? CommonFilter : MobileFilter}
    >
      {filteredWalletTokenDetail.length === 0 && !isFilterApplied ? (
        <EmptyData />
      ) : (
        <BoxWrapperRow
          gap={4}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          <PieChart
            data={filteredWalletTokenDetailForPieChartWithColorsAndOthers.map((item: any) => {
              return {
                name: item.label,
                y: item.allocation,
                color: item.color
              }
            })}
            innerSize={isMD ? '60%' : '45%'}
            outerSize={isMD ? '80%' : '60%'}
            height={isMD ? 440 : 310}
            width={isMD ? 'fit-content' : 350}
            centered={true}
          />
          <TableWalletTokenDetail filteredWalletTokenDetail={filteredWalletTokenDetail} />
        </BoxWrapperRow>
      )}
    </PaperSection>
  )
}
