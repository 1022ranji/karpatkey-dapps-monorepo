import TableBlockchain from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableBlockchain'
import TableType from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableType'
import TableTypeDDay from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableTypeDDay'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import TabPanel from '@karpatkey-monorepo/shared/components/TabPanel'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { BoxProps } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import * as React from 'react'
import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'

type BalanceOverview = { balanceOverviewType: any; balanceOverviewBlockchain: any } & BoxProps

const BalanceOverview = (props: BalanceOverview) => {
  const { balanceOverviewType, balanceOverviewBlockchain } = props

  const { state } = useApp()
  const { currency } = state

  const [toggleType, setToggleType] = React.useState(1)

  const isDDay = isYearAndMonthValid()

  const handleToggleOnChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    if (newToggleType === null) return
    if (newToggleType === toggleType) return
    setToggleType(newToggleType)
  }

  const Filter = (
    <ToggleButtonGroup
      value={toggleType}
      exclusive
      onChange={handleToggleOnChange}
      aria-label="Balance overview type"
    >
      <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
        Type
      </ToggleButton>
      <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
        Blockchain
      </ToggleButton>
    </ToggleButtonGroup>
  )

  return (
    <AnimatePresenceWrapper>
      <PaperSection
        id="Balance overview"
        title="Balance overview"
        subTitle={`Funds by token category and type/blockchain ${
          currency === 'ETH' ? '(ETH)' : ''
        }`}
        filter={Filter}
      >
        <BoxWrapperColumn>
          <TabPanel value={toggleType} index={1}>
            {balanceOverviewType.length > 0 ? (
              isDDay ? (
                <TableTypeDDay balanceOverviewType={balanceOverviewType} />
              ) : (
                <TableType balanceOverviewType={balanceOverviewType} />
              )
            ) : (
              <EmptyData />
            )}
          </TabPanel>
          <TabPanel value={toggleType} index={0}>
            {balanceOverviewBlockchain.length > 0 ? (
              <TableBlockchain balanceOverviewBlockchain={balanceOverviewBlockchain} />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
        </BoxWrapperColumn>
      </PaperSection>
    </AnimatePresenceWrapper>
  )
}

export default BalanceOverview
