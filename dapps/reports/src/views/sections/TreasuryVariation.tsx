import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import TabPanel from '@karpatkey-monorepo/shared/components/TabPanel'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DateTime } from 'luxon'
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

const TreasuryVariation = (props: TreasuryVariationProps) => {
  const { rowsTreasuryVariation, rowsHistoricVariation, rowsTreasuryVariationForThePeriodDetail } =
    props

  const [toggleType, setToggleType] = React.useState(0)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    const value = newToggleType !== null ? newToggleType : toggleType === 0 ? 1 : 0
    setToggleType(value)
  }

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
          <DynamicWaterfall
            title="Treasury variation for the period ($USD)"
            data={rowsTreasuryVariation}
          />
        </TabPanel>
        <TabPanel value={toggleType} index={1}>
          <DynamicWaterfall
            title={'Treasury variation in ' + DateTime.now().toFormat('yyyy') + ' ($USD)'}
            data={rowsHistoricVariation}
          />
        </TabPanel>
      </PaperSection>
      <PaperSection>
        <DynamicWaterfall
          title="Treasury variation for the period (detail) ($USD)"
          data={rowsTreasuryVariationForThePeriodDetail}
        />
      </PaperSection>
    </>
  )
}

export default TreasuryVariation
