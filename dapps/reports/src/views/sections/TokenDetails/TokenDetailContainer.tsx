import Filter from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails/Filter'
import Form from '@karpatkey-monorepo/reports/src/views/sections/TokenDetails/Form'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Loading from '@karpatkey-monorepo/shared/components/Loading'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicTableTokenDetail = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/sections/TokenDetails/TableTokenDetail'),
  {
    loading: () => <Loading />
  }
)

interface TokenDetailContainerProps {
  tokenDetails: any[]
}

const TokenDetailContainer = (props: TokenDetailContainerProps) => {
  const { tokenDetails = [] } = props
  const [blockchainFilter, setBlockchainFilter] = React.useState<Maybe<string>>(null)

  const filteredTokenDetails = tokenDetails.filter((tokenDetail) => {
    return blockchainFilter ? blockchainFilter === tokenDetail['blockchain'] : true
  })

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

  const onSubmitClose = (blockchain: string) => {
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

  return (
    <BoxWrapperColumn gap={4}>
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <CustomTypography variant="balanceOverviewSubtitle">Token detail</CustomTypography>
        <Filter
          id={id}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
          open={open}
          blockchain={blockchainFilter}
        >
          <Form
            blockchainOptions={blockchainOptions}
            onRequestClose={handleClose}
            onSubmitClose={onSubmitClose}
            defaultBlockchainValue={defaultBlockchainValue}
          />
        </Filter>
      </BoxWrapperRow>
      <DynamicTableTokenDetail filteredTokenDetails={filteredTokenDetails} />
    </BoxWrapperColumn>
  )
}

export default TokenDetailContainer
