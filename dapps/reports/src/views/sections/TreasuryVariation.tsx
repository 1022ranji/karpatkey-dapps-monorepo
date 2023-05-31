import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Loading from '@karpatkey-monorepo/shared/components/Loading'
import PaperSection from '@karpatkey-monorepo/shared/components/PaperSection'
import TabPanel from '@karpatkey-monorepo/shared/components/TabPanel'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DateTime } from 'luxon'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicWaterfall = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Waterfall'),
  {
    loading: () => <Loading />
  }
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

  return (
    <PaperSection title="Treasury variation">
      <BoxWrapperColumn gap={10}>
        <BoxWrapperColumn>
          <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
            <CustomTypography variant="balanceOverviewSubtitle">
              Treasury variation summary
            </CustomTypography>

            <ToggleButtonGroup
              value={toggleType}
              exclusive
              onChange={handleChange}
              aria-label="Balance overview type"
            >
              <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
                Selected period
              </ToggleButton>
              <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
                Year to period
              </ToggleButton>
            </ToggleButtonGroup>
          </BoxWrapperRow>
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
        </BoxWrapperColumn>
        <DynamicWaterfall
          title="Treasury variation for the period (detail) ($USD)"
          data={rowsTreasuryVariationForThePeriodDetail}
        />
      </BoxWrapperColumn>
    </PaperSection>
  )
}

export default TreasuryVariation
