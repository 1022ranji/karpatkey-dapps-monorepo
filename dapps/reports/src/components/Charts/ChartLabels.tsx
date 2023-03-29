import { TPieChartProps } from '@karpatkey-monorepo/reports/src/components/Charts/PieChart'
import { TMapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps } from '@mui/material'
import * as React from 'react'

type TChartLabels = TPieChartProps & BoxProps
const ChartLabels: React.FC<TChartLabels> = ({ data, ...props }: TChartLabels) => {
  return (
    <Box {...props}>
      {data
        .sort((a: TMapBalancesByTokenCategory, b: TMapBalancesByTokenCategory) => b.funds - a.funds)
        .map((item: TMapBalancesByTokenCategory, index) => {
          const { fill, asset } = item
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    backgroundColor: fill,
                    marginRight: '0.5rem'
                  }}
                />
              </Box>
              <span>{asset}</span>
            </Box>
          )
        })}
    </Box>
  )
}

export default ChartLabels
