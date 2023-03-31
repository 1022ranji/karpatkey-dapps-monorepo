import { TMapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps } from '@mui/material'
import React from 'react'
import { Cell, Pie, PieChart as PieRechart } from 'recharts'

const COLORS = ['#1A1A1A', '#555555', '#888787', '#B9B9B9', '#EEEDED']

export type TPieChartProps = {
  data: TMapBalancesByTokenCategory[]
}

const PieChart = ({ data, ...props }: BoxProps & TPieChartProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      <PieRechart width={260} height={260}>
        <Pie
          data={data}
          cx={130}
          cy={130}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="allocation"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieRechart>
    </Box>
  )
}

export default PieChart
