import { AutocompleteOption, Filter, Form, EmptyData, PaperSection } from 'src/components'
import * as React from 'react'
import { useApp } from 'src/contexts/app.context'
import { TableTokenDetail } from './TableTokenDetail'
import { FilterContent } from 'components/filters/mobile/FilterContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material'

interface TokenDetailContainerProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
}

export const TokenDetailContainer = (props: TokenDetailContainerProps) => {
  const { tokenDetails = [], tokenDetailsGrouped = [] } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)

  const filteredTokenDetailsWithoutAllocation = blockchainFilter
    ? tokenDetails.filter((tokenDetail) => {
        return blockchainFilter ? blockchainFilter === tokenDetail['blockchain'] : true
      })
    : tokenDetailsGrouped

  const usdValueTotal = filteredTokenDetailsWithoutAllocation.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue.usdValue,
    0
  )

  const filteredTokenDetails = filteredTokenDetailsWithoutAllocation
    .map((tokenDetail) => {
      return {
        ...tokenDetail,
        allocation: tokenDetail.usdValue / usdValueTotal
      }
    })
    .sort((a, b) => b.allocation - a.allocation)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const blockchainOptions = tokenDetails
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
      defaultBlockchainValue={defaultBlockchainValue?.id}
      handleClear={handleClear}
      handleClick={onSubmitClose}
    />
  )

  const isFilterApplied = blockchainFilter !== null

  const { state } = useApp()
  const { currency } = state

  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <PaperSection
      id="Token detail"
      title="Token detail"
      subTitle={
        currency === 'USD'
          ? 'Token detail with price variation'
          : 'Token detail with price variation (ETH)'
      }
      helpInfo="Token balances, price variations, detail by position and wallet"
      filter={isMD ? CommonFilter : MobileFilter}
    >
      {filteredTokenDetails.length === 0 && !isFilterApplied ? (
        <EmptyData />
      ) : (
        <TableTokenDetail filteredTokenDetails={filteredTokenDetails} />
      )}
    </PaperSection>
  )
}
