import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import { getOperationsDetailTotals } from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'

const DynamicTableOperations = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/TableOperations')
)

interface ResultsContainerProps {
  operationDetails: any[]
}

const OperationsContainer = (props: ResultsContainerProps) => {
  const { operationDetails } = props

  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)
  const [protocolFilter, setProtocolFilter] = React.useState<Maybe<string>>(null)

  const filteredOperationDetails = operationDetails.filter((item) => {
    const blockchain = blockchainFilter ? blockchainFilter === item?.blockchain : true
    const protocol = protocolFilter ? protocolFilter === item?.protocol : true
    return blockchain && protocol
  })

  const totals = getOperationsDetailTotals(filteredOperationDetails)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const blockchainOptions = operationDetails
    .reduce((result: AutocompleteOption[], currentValue) => {
      const value = result.find((item) => item.id === currentValue?.blockchain)
      if (!value)
        result.push({
          logo:
            currentValue?.blockchain.toLowerCase() === 'ethereum'
              ? '/images/chains/ethereum.svg'
              : currentValue?.blockchain.toLowerCase() === 'gnosis'
                ? '/images/chains/gnosis.svg'
                : '/images/chains/all.svg',
          label: currentValue?.blockchain,
          id: currentValue?.blockchain
        })

      return result
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label))

  const protocolOptions = operationDetails
    .reduce((result: AutocompleteOption[], currentValue) => {
      const value = result.find((item) => item.id === currentValue?.protocol)
      if (!value)
        result.push({
          label: currentValue?.protocol,
          id: currentValue?.protocol
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

  const filter = (
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

  const isFilterActive = blockchainFilter || protocolFilter

  return (
    <PaperSection subTitle="Operations funds/results by position" filter={filter}>
      {filteredOperationDetails.length === 0 && !isFilterActive ? (
        <EmptyData />
      ) : (
        <DynamicTableOperations {...{ operationDetails: filteredOperationDetails, totals }} />
      )}
    </PaperSection>
  )
}

export default OperationsContainer
