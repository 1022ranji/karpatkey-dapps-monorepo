import {
  AnimatePresenceWrapper,
  EmptyData,
  TabPanel,
  PaperSection,
  Waterfall
} from 'src/components'
import { FILTER_DAO, FILTER_DAOS } from 'src/config/constants'
import { getDAO } from 'src/utils'
import InfoIcon from '@mui/icons-material/Info'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import * as React from 'react'
import { isYearAndMonthValid } from 'src/utils/params'
import { useApp } from 'src/contexts/app.context'

interface TreasuryVariationProps {
  treasuryVariationData: any[]
  historicVariationData: any[]
  treasuryVariationForThePeriodDetailData: any[]
}

export const TreasuryVariation = (props: TreasuryVariationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { treasuryVariationData, historicVariationData, treasuryVariationForThePeriodDetailData } =
    props

  const { state } = useApp()
  const { DAO: filterDAO, currency, year } = state
  const DAO: Maybe<FILTER_DAO> = getDAO(filterDAO) || null

  const [toggleType, setToggleType] = React.useState(0)

  const isDDay = isYearAndMonthValid()

  const handleToggleOnChange = (event: React.MouseEvent<HTMLElement>, newToggleType: number) => {
    if (newToggleType === null) return
    if (newToggleType === toggleType) return
    setToggleType(newToggleType)
  }

  // Get actual year
  const yearNow = new Date().getFullYear()
  const sinceText =
    FILTER_DAOS.find((dao) => dao.id === filterDAO)?.sinceYearToPeriod[year || yearNow] ??
    `January ${yearNow}`

  const helpText = DAO ? `Treasury variation since ${sinceText}` : ''

  const filter = (
    <ToggleButtonGroup
      value={toggleType}
      exclusive
      onChange={handleToggleOnChange}
      aria-label="Balance overview type"
    >
      <ToggleButton disableRipple value={0} sx={{ textTransform: 'none' }}>
        Selected period
      </ToggleButton>
      <ToggleButton disableRipple value={1} sx={{ textTransform: 'none' }}>
        Year to period
        <Tooltip title={helpText} sx={{ ml: 1 }}>
          <InfoIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )

  return (
    <>
      <AnimatePresenceWrapper>
        <PaperSection
          id="Treasury variation"
          title="Treasury variation"
          subTitle={
            currency === 'USD' ? 'Treasury variation summary' : 'Treasury variation summary (ETH)'
          }
          helpInfo={
            isDDay
              ? 'Balance variation for the period (also year to period), results separated into Operations and DeFi results'
              : 'Balance variation for the period (also year to period), results separated into Non Farming and Farming Results.'
          }
          filter={filter}
        >
          <TabPanel value={toggleType} index={0}>
            {treasuryVariationData?.length > 0 ? (
              <Waterfall data={treasuryVariationData} barSize={150} />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
          <TabPanel value={toggleType} index={1}>
            {historicVariationData?.length > 0 ? (
              <Waterfall data={historicVariationData} barSize={150} />
            ) : (
              <EmptyData />
            )}
          </TabPanel>
        </PaperSection>
      </AnimatePresenceWrapper>
      <AnimatePresenceWrapper>
        <PaperSection
          subTitle={
            currency === 'USD'
              ? 'Treasury variation for the period (detail)'
              : 'Treasury variation for the period (detail) (ETH)'
          }
        >
          {treasuryVariationForThePeriodDetailData?.length > 0 ? (
            <Waterfall data={treasuryVariationForThePeriodDetailData} />
          ) : (
            <EmptyData />
          )}
        </PaperSection>
      </AnimatePresenceWrapper>
    </>
  )
}
