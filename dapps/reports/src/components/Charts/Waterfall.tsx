import { reduceSentenceByLengthInLines } from '@karpatkey-monorepo/reports/src/utils/strings'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { Box, BoxProps, Paper } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

export type WaterfallProps = {
  title?: string
  data: any[]
  bottom?: number
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={24}
        sx={{
          backgroundColor: '#d9d9d9',
          width: 'max-content',
          minHeight: 60,
          height: 'max-content'
        }}
      >
        <CustomTypography
          variant="body2"
          color="textSecondary"
          sx={{ padding: 1, fontWeight: 'bold', textAlign: 'left' }}
        >
          {payload[1].payload.value}
        </CustomTypography>
        <CustomTypography
          variant="body2"
          color="textSecondary"
          sx={{ padding: 1, textAlign: 'left' }}
        >
          {numbro(payload[1].value).formatCurrency({
            spaceSeparated: false,
            mantissa: 2,
            thousandSeparated: true
          })}
        </CustomTypography>
      </Paper>
    )
  }

  return null
}

const RenderCustomizedLabel = (props: any) => {
  const { x, y, width, value, viewBox } = props
  const radius = 10

  const customY = value > 0 ? y - radius : y - radius + viewBox.height
  return (
    <g>
      <text
        x={x + width / 2}
        y={customY}
        fontSize={12}
        fontWeight="bold"
        fill="#222222"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {numbro(value)
          .formatCurrency({
            average: true,
            spaceSeparated: false,
            mantissa: 3
          })
          .toUpperCase()}
      </text>
    </g>
  )
}

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props

  const words = reduceSentenceByLengthInLines(payload.value, 20)

  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word: string, i: number) => (
        <text
          x={0}
          y={18}
          dy={i * 18}
          key={i}
          height="auto"
          textAnchor="middle"
          fontSize={12}
          fill="#222222"
        >
          {word}
        </text>
      ))}
    </g>
  )
}

const Waterfall = ({ title, data, bottom = 20, ...props }: BoxProps & WaterfallProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      {title ? (
        <CustomTypography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
          {title}
        </CustomTypography>
      ) : null}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: bottom
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'value'} interval={0} tick={<CustomizedAxisTick />} />
          <YAxis
            fontSize={12}
            tickCount={4}
            tickFormatter={(tick) => {
              return numbro(tick)
                .formatCurrency({
                  average: true,
                  spaceSeparated: false,
                  mantissa: 0
                })
                .toUpperCase()
            }}
          />
          <Tooltip wrapperStyle={{ outline: 'none' }} content={<CustomTooltip />} />
          <Bar dataKey="pv" stackId="a" fill="transparent" barSize={60} />
          <Bar dataKey="uv" stackId="a" fill="#232323" barSize={60}>
            <LabelList dataKey="uv" content={RenderCustomizedLabel} />
            {data.map((item, index) => {
              const color =
                item.value === 'Initial Balance' || item.value === 'Final Balance'
                  ? '#222222'
                  : item.uv < 0
                  ? '#DF5C64'
                  : '#54B9A1'

              return <Cell key={`cell-${index}`} fill={color} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Waterfall
