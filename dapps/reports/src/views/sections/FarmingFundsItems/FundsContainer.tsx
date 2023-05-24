import Filter from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/Filter'
import Form from '@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/Form'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Loading from '@karpatkey-monorepo/shared/components/Loading'
import { getFarmingFundsByProtocolTotals } from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTableFunds = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/sections/FarmingFundsItems/TableFunds'),
  {
    loading: () => <Loading />
  }
)

interface FundsContainerProps {
  funds: any[]
}

const FundsContainer = (props: FundsContainerProps) => {
  const { funds } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)
  const [protocolFilter, setProtocolFilter] = React.useState<Maybe<string>>(null)

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

  const onSubmitClose = (blockchain: string, protocol: string) => {
    setBlockchainFilter(blockchain)
    setProtocolFilter(protocol)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const defaultBlockchainValue = blockchainFilter
    ? {
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

  return (
    <BoxWrapperColumn gap={4}>
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <CustomTypography variant="balanceOverviewSubtitle">
          Farming funds/results by protocol
        </CustomTypography>
        <Filter
          id={id}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
          open={open}
          blockchain={blockchainFilter}
          protocol={protocolFilter}
        >
          <Form
            blockchainOptions={blockchainOptions}
            protocolOptions={protocolOptions}
            onRequestClose={handleClose}
            onSubmitClose={onSubmitClose}
            defaultBlockchainValue={defaultBlockchainValue}
            defaultProtocolValue={defaultProtocolValue}
          />
        </Filter>
      </BoxWrapperRow>
      <DynamicTableFunds {...{ funds: filteredFunds, totals }} />
    </BoxWrapperColumn>
  )
}

export default FundsContainer
