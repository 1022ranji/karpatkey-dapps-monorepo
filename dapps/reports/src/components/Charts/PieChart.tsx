import { TMapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import { Pie, PieChart as PieChartRecharts, ResponsiveContainer, Sector } from 'recharts'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my - 8
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fontSize="14"
        fill="#333"
        fontFamily="IBM Plex Sans"
      >
        {`${payload.asset}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fontSize="12"
        fill="#999"
        fontFamily="IBM Plex Sans"
      >
        <title>{`$ ${payload.funds}`}</title>
        {`${numbro(payload.funds).formatCurrency({ spaceSeparated: true, mantissa: 2 })}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={36}
        textAnchor={textAnchor}
        fontSize="12"
        fill="#999"
        fontFamily="IBM Plex Sans"
      >
        {`${numbro(percent).format({ output: 'percent', spaceSeparated: true, mantissa: 2 })}`}
      </text>
    </g>
  )
}

export type TPieChartProps = {
  data: TMapBalancesByTokenCategory[]
}
const PieChart = ({ data, ...props }: BoxProps & TPieChartProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  return (
    <Box {...props}>
      <ResponsiveContainer width="100%" minWidth={300} height={400}>
        <PieChartRecharts width={600} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            label={renderCustomizedLabel}
            fill="#bdbdbd"
            dataKey="allocation"
            onMouseEnter={onPieEnter}
          />
        </PieChartRecharts>
      </ResponsiveContainer>
    </Box>
  )
}

export default PieChart
