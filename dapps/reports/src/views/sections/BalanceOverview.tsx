import TableBlockchain from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableBlockchain'
import TableType from '@karpatkey-monorepo/reports/src/views/sections/BalanceOverviewItems/TableType'
import TabPanel from '@karpatkey-monorepo/reports/src/views/sections/CommonItems/TabPanel'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import { BoxProps } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import * as React from 'react'

type BalanceOverview = { balanceOverviewType: any; balanceOverviewBlockchain: any } & BoxProps

const BalanceOverview = (props: BalanceOverview) => {
  const { balanceOverviewType, balanceOverviewBlockchain } = props

  const [toggleType, setToggleType] = React.useState(1)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    const value = newToggleType !== null ? newToggleType : toggleType === 0 ? 1 : 0
    setToggleType(value)
  }

  return (
    <PaperSection title="Balance overview">
      <BoxWrapperColumn gap={4} marginTop={'30px'}>
        <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
          <CustomTypography variant="balanceOverviewSubtitle">
            Funds by token category and type/blockchain
          </CustomTypography>
          <ToggleButtonGroup
            value={toggleType}
            exclusive
            onChange={handleChange}
            aria-label="Balance overview type"
          >
            <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
              Type
            </ToggleButton>
            <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
              Blockchain
            </ToggleButton>
          </ToggleButtonGroup>
        </BoxWrapperRow>
        <TabPanel value={toggleType} index={1}>
          <TableType balanceOverviewType={balanceOverviewType} />
        </TabPanel>
        <TabPanel value={toggleType} index={0}>
          <TableBlockchain balanceOverviewBlockchain={balanceOverviewBlockchain} />
        </TabPanel>
      </BoxWrapperColumn>
    </PaperSection>
  )
}

export default BalanceOverview
