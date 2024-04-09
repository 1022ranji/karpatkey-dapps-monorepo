import { AutocompleteOption, EmptyData, PaperSection, Form, Filter } from 'src/components'
import { getFarmingFundsByProtocolTotals } from 'src/utils/mappers/farmingFunds'
import * as React from 'react'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'
import TableFunds from './TableFunds'
import { FilterContent } from 'components/filters/mobile/FilterContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material'

interface FundsContainerProps {
  funds: any[]
}

export const FundsContainer = (props: FundsContainerProps) => {
  const { funds } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)
  const [protocolFilter, setProtocolFilter] = React.useState<Maybe<string>>(null)

  const { state } = useApp()
  const { currency } = state

  const filteredFunds = funds.filter((fund) => {
    const blockchain = blockchainFilter ? blockchainFilter === fund['blockchain'] : true
    const protocol = protocolFilter ? protocolFilter === fund['protocol'] : true
    return blockchain && protocol
  })

  const totals = getFarmingFundsByProtocolTotals(filteredFunds)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const blockchainOptions = funds
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

  const protocolOptions = funds
    .reduce((result: AutocompleteOption[], currentValue) => {
      const value = result.find((item) => item.id === currentValue['protocol'])
      if (!value)
        result.push({
          label: currentValue['protocol'],
          id: currentValue['protocol']
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
    setProtocolFilter(null)
  }

  const onSubmitClose = (params: any) => {
    const { blockchain, protocol } = params
    setBlockchainFilter(blockchain)
    setProtocolFilter(protocol)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const defaultBlockchainValue = blockchainFilter
    ? {
        logo:
          blockchainFilter.toLowerCase() === 'ethereum'
            ? '/images/chains/ethereum.svg'
            : blockchainFilter.toLowerCase() === 'gnosis'
              ? '/images/chains/gnosis.svg'
              : '/images/chains/all.svg',
        label: blockchainFilter,
        id: blockchainFilter
      }
    : null

  const defaultProtocolValue = protocolFilter
    ? {
        label: protocolFilter,
        id: protocolFilter
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
      protocol={protocolFilter}
      enableProtocol
      enableBlockchain
      tooltipText={'Clear filter'}
    >
      <Form
        blockchainOptions={blockchainOptions}
        protocolOptions={protocolOptions}
        onRequestClose={handleClose}
        onSubmitClose={onSubmitClose}
        defaultBlockchainValue={defaultBlockchainValue}
        defaultProtocolValue={defaultProtocolValue}
        enableProtocol
        enableBlockchain
        buttonTitle={'Apply filter'}
      />
    </Filter>
  )

  const MobileFilter = (
    <FilterContent
      enableBlockchain={true}
      enableProtocol={true}
      blockchainOptions={blockchainOptions}
      protocolOptions={protocolOptions}
      defaultBlockchainValue={defaultBlockchainValue?.id}
      defaultProtocolValue={defaultProtocolValue?.id}
      handleClear={handleClear}
      handleClick={onSubmitClose}
    />
  )

  const isFilterActive = blockchainFilter || protocolFilter

  const isDDay = isYearAndMonthValid()

  // check if the screen size is md
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <PaperSection
      id={isDDay ? 'Funds and results by position' : 'Farming funds and results'}
      subTitle={
        isDDay
          ? currency === 'USD'
            ? 'DeFi funds/results by position'
            : 'DeFi funds/results by position (ETH)'
          : currency === 'USD'
            ? 'Farming funds/results by position'
            : 'Farming funds/results by position (ETH)'
      }
      filter={isMD ? CommonFilter : MobileFilter}
    >
      {filteredFunds.length === 0 && !isFilterActive ? (
        <EmptyData />
      ) : (
        <TableFunds {...{ funds: filteredFunds, totals }} />
      )}
    </PaperSection>
  )
}
