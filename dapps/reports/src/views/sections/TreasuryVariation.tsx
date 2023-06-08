import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import TabPanel from '@karpatkey-monorepo/shared/components/TabPanel'
import { FILTER_DAO } from '@karpatkey-monorepo/shared/config/constants'
import { getDAO } from '@karpatkey-monorepo/shared/utils'
import HelpIcon from '@mui/icons-material/Help'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import dynamic from 'next/dynamic'
import * as React from 'react'

import { useFilter } from '../../contexts/filter.context'

const DynamicWaterfall = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Waterfall')
)

interface TreasuryVariationProps {
  rowsTreasuryVariation: any[]
  rowsHistoricVariation: any[]
  rowsTreasuryVariationForThePeriodDetail: any[]
}

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const TreasuryVariation = (props: TreasuryVariationProps) => {
  const { rowsTreasuryVariation, rowsHistoricVariation, rowsTreasuryVariationForThePeriodDetail } =
    props

  const { state } = useFilter()
  const filterValue = state.value
  const DAO: Maybe<FILTER_DAO> = getDAO(filterValue.dao) || null

  const [toggleType, setToggleType] = React.useState(0)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    const value = newToggleType !== null ? newToggleType : toggleType === 0 ? 1 : 0
    setToggleType(value)
  }

  const helpText = DAO
    ? `Treasury variation since ${MONTH_SHORT[DAO.sinceMonth]}-${DAO.sinceYear} ($USD)`
    : ''

  const filter = (
    <ToggleButtonGroup
      value={toggleType}
      exclusive
      onChange={handleChange}
      aria-label="Balance overview type"
    >
      <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
        Selected period
      </ToggleButton>
      <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
        Year to period
        <Tooltip title={helpText} sx={{ ml: 1 }}>
          <HelpIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )

  return (
    <>
      <PaperSection
        title="Treasury variation"
        subTitle="Treasury variation summary"
        filter={filter}
      >
        <TabPanel value={toggleType} index={0}>
          <DynamicWaterfall data={rowsTreasuryVariation} />
        </TabPanel>
        <TabPanel value={toggleType} index={1}>
          <DynamicWaterfall data={rowsHistoricVariation} />
        </TabPanel>
      </PaperSection>
      <PaperSection subTitle="Treasury variation for the period (detail) ($USD)">
        <DynamicWaterfall data={rowsTreasuryVariationForThePeriodDetail} />
      </PaperSection>
    </>
  )
}

export default TreasuryVariation
