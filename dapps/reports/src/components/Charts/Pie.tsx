import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { TMapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps, List, ListItem } from '@mui/material'
import React from 'react'
import { Cell, Legend, Pie, PieChart as PieRechart } from 'recharts'

const COLORS = ['#1A1A1A', '#555555', '#888787', '#B9B9B9', '#EEEDED']

export type TPieChartProps = {
  data: TMapBalancesByTokenCategory[]
  title: string
  dataKey: string
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.35
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="12px"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomizedLegend = (props: any) => {
  const { payload } = props
  return (
    <Box sx={{ width: 180 }}>
      <List sx={{ marginX: 2 }}>
        {payload.map((entry: any, index: any) => {
          return (
            <ListItem key={index}>
              <Box flexDirection="row" display="flex" gap={2}>
                <Box sx={{ background: entry.color, height: 17, width: 44 }} />
                <CustomTypography variant="body2">{entry.payload.payload.value}</CustomTypography>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
const PieChart = ({ data, title, dataKey, ...props }: BoxProps & TPieChartProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
      sx={{ marginY: '20px' }}
    >
      <CustomTypography
        variant="h6"
        color="textSecondary"
        sx={{ height: '70px' }}
        textAlign="center"
      >
        {title}
      </CustomTypography>
      <PieRechart width={390} height={210}>
        <Legend
          content={<CustomizedLegend />}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey={dataKey}
          label={renderCustomizedLabel}
          labelLine={false}
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
