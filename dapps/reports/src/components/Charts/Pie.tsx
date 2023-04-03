import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { TMapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps, Grid, List, ListItem } from '@mui/material'
import React from 'react'
import { Cell, Legend, Pie, PieChart as PieRechart } from 'recharts'

const COLORS = ['#808080', '#D0D0D0', '#A9A9A9', '#C0C0C0', '#71797E', '#B2BEB5']

export type TPieChartProps = {
  data: TMapBalancesByTokenCategory[]
  title: string
  dataKey: string
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return percent * 100 > 2 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="10px"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  ) : (
    <text />
  )
}

const CustomizedLegend = (props: any) => {
  const { payload } = props
  return (
    <Box sx={{ width: 180 }}>
      <List sx={{ marginLeft: 2 }}>
        {payload.map((entry: any, index: any) => {
          return (
            <ListItem key={index}>
              <Grid container rowSpacing={1} columnSpacing={1} columns={2}>
                <Grid item>
                  <Box sx={{ background: entry.color, height: 17, width: 25, maxWidth: 25 }} />
                </Grid>
                <Grid item>
                  <CustomTypography variant="body2">{entry.payload.payload.value}</CustomTypography>
                </Grid>
              </Grid>
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
          innerRadius={40}
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
