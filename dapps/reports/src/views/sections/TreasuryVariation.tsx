import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
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

const DynamicWaterfall = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Waterfall')
)

interface TreasuryVariationProps {
  rowsTreasuryVariation: any[]
  rowsHistoricVariation: any[]
  rowsTreasuryVariationForThePeriodDetail: any[]
}

const MONTH_SHORT = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
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

  const DAO_MONTH = MONTH_SHORT.find((month, index) => index + 1 === DAO?.sinceMonth)
  const helpText = DAO ? `Treasury variation since ${DAO_MONTH}-${DAO.sinceYear}` : ''

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
        id="Treasury variation"
        title="Treasury variation"
        subTitle="Treasury variation summary"
        filter={filter}
      >
        <TabPanel value={toggleType} index={0}>
          {rowsTreasuryVariation.length > 0 ? (
            <DynamicWaterfall data={rowsTreasuryVariation} barSize={150} />
          ) : (
            <EmptyData />
          )}
        </TabPanel>
        <TabPanel value={toggleType} index={1}>
          {rowsHistoricVariation.length > 0 ? (
            <DynamicWaterfall data={rowsHistoricVariation} barSize={150} />
          ) : (
            <EmptyData />
          )}
        </TabPanel>
      </PaperSection>
      <PaperSection subTitle="Treasury variation for the period (detail)">
        {rowsTreasuryVariationForThePeriodDetail.length > 0 ? (
          <DynamicWaterfall data={rowsTreasuryVariationForThePeriodDetail} />
        ) : (
          <EmptyData />
        )}
      </PaperSection>
    </>
  )
}

export default TreasuryVariation
