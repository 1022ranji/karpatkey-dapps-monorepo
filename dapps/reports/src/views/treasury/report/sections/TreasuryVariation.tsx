import Loading from '@karpatkey-monorepo/shared/components/Loading'
import { Grid } from '@mui/material'
import { DateTime } from 'luxon'
import dynamic from 'next/dynamic'
import * as React from 'react'

const DynamicWaterfall = dynamic(
  () => import('@karpatkey-monorepo/reports/src/components/Charts/Waterfall'),
  {
    loading: () => <Loading />
  }
)

interface ITreasuryVariation {
  rowsTreasuryVariation: any[]
  rowsHistoricVariation: any[]
  rowsTreasuryVariationForThePeriodDetail: any[]
}

const TreasuryVariation = (props: ITreasuryVariation) => {
  const { rowsTreasuryVariation, rowsHistoricVariation, rowsTreasuryVariationForThePeriodDetail } =
    props

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 4, md: 4 }}
      gap={4}
      marginTop={4}
    >
      <Grid item xs={4} sm={4} md={4}>
        <DynamicWaterfall
          title="Treasury variation for the period ($USD)"
          data={rowsTreasuryVariation}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <DynamicWaterfall
          title={'Treasury variation in ' + DateTime.now().toFormat('yyyy') + ' ($USD)'}
          data={rowsHistoricVariation}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <DynamicWaterfall
          title="Treasury variation for the period (detail) ($USD)"
          data={rowsTreasuryVariationForThePeriodDetail}
        />
      </Grid>
    </Grid>
  )
}

export default TreasuryVariation
