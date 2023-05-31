import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import Filter from '@karpatkey-monorepo/shared/components/Filter/Filter'
import Form from '@karpatkey-monorepo/shared/components/Filter/Form'
import Loading from '@karpatkey-monorepo/shared/components/Loading'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTableTokenDetail = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TableTokenDetail'),
  {
    loading: () => <Loading />
  }
)

interface TokenDetailContainerProps {
  tokenDetails: any[]
  tokenDetailsGrouped: any[]
}

const TokenDetailContainer = (props: TokenDetailContainerProps) => {
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

  const onSubmitClose = (params: any) => {
    const { blockchain } = params
    setBlockchainFilter(blockchain)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const defaultBlockchainValue = blockchainFilter
    ? {
        label: blockchainFilter,
        id: blockchainFilter
      }
    : null

  const filter = (
    <Filter
      id={id}
      handleClick={handleClick}
      handleClose={handleClose}
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
      />
    </Filter>
  )

  return (
    <PaperSection title="Token detail" subTitle="Token detail" filter={filter}>
      <DynamicTableTokenDetail filteredTokenDetails={filteredTokenDetails} />
    </PaperSection>
  )
}

export default TokenDetailContainer
