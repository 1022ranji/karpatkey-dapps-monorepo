import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { BoxProps } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import { Cell, Pie, PieChart as PieRechart } from 'recharts'
import { reduceSentenceByLengthInLines } from '@karpatkey-monorepo/reports/src/utils/strings'

const RenderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, fontSize, index, percent, label } = props

  const RADIAN = Math.PI / 180
  const sin = Math.sin(RADIAN * midAngle)
  const cos = Math.cos(RADIAN * midAngle)
  const startX = cx + outerRadius * cos
  const startY = cy + outerRadius * -sin
  const middleY = cy + (outerRadius + 50 * Math.abs(sin)) * -sin

  let endX = startX + (cos >= 0 ? 1 : -1) * 30
  let textAnchor = cos >= 0 ? 'start' : 'end'
  const mirrorNeeded = midAngle > -270 && midAngle < -210 && percent < 0.04 && index % 2 === 1
  if (mirrorNeeded) {
    endX = startX + outerRadius * -cos * 2 + 100
    textAnchor = 'start'
  }

  const words = reduceSentenceByLengthInLines(label, 12)
  const labels = +percent * 100 < 0.5 ? words.reverse() : words

  return (
    <g>
      <path
        d={`M${startX},${startY}L${startX},${middleY}L${endX},${middleY}`}
        fill="none"
        stroke="#000"
        strokeWidth={1}
      />
      <text
        x={endX + (cos >= 0 || mirrorNeeded ? 1 : -1) * 12}
        y={middleY + fontSize / 2}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontFamily={'IBM Plex Sans'}
        fontSize={fontSize}
        fill="#222222"
      >
        {numbro(percent).format({ output: 'percent', mantissa: 2 })}
      </text>
      {labels &&
        labels.length > 0 &&
        labels.map((word: string, i: number) => (
          <text
            x={endX + (cos >= 0 || mirrorNeeded ? 1 : -1) * 12}
            y={
              +percent * 100 < 0.5
                ? middleY + fontSize / 2 - (i + 1) * fontSize
                : middleY + fontSize / 2 + (i + 1) * fontSize
            }
            key={i}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontFamily={'IBM Plex Sans'}
            fontSize={fontSize}
            fill="#222222"
          >
            {word}
          </text>
        ))}
    </g>
  )
}

export interface Point {
  x: number
  y: number
}

interface RenderPieChartProps {
  data: any
  dataKey: string
  width?: number
  height?: number
  innerRadius?: number
  outerRadius?: number
}

const RenderPieChart = (props: RenderPieChartProps) => {
  const { data, dataKey, width = 420, height = 360, innerRadius = 50, outerRadius = 120 } = props

  return (
    <PieRechart width={width} height={height}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fontSize={12}
        paddingAngle={data.length > 1 ? 10 : 1}
        dataKey={dataKey}
        label={RenderCustomizedLabel}
        labelLine={false}
      >
        {data.map((entry: any, index: number) => (
          <Cell
            style={{ outline: 'none' }}
            key={`cell-${index}`}
            fill={entry.color}
            stroke={entry.fill}
          />
        ))}
      </Pie>
    </PieRechart>
  )
}

interface PieChartTitleProps {
  title: string
}

const PieChartTitle = ({ title }: PieChartTitleProps) => {
  return (
    <CustomTypography variant="infoCardTitle" textAlign="left">
      {title}
    </CustomTypography>
  )
}

export type PieChartProps = {
  data: {
    color: string
    value: string
    label: string
    allocation: number
  }[]
  title?: string
  dataKey: string
  width?: number
  height?: number
  innerRadius?: number
  outerRadius?: number
}

const PieChart = (props: BoxProps & PieChartProps) => {
  const { data, title, dataKey, width, height, innerRadius, outerRadius } = props

  return (
    <BoxWrapperColumn
      gap={2}
      sx={{
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        minWidth: 'max-content'
      }}
    >
      {title ? <PieChartTitle title={title} /> : null}
      {data.length > 0 ? (
        <RenderPieChart
          data={data}
          dataKey={dataKey}
          width={width}
          height={height}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />
      ) : (
        <EmptyData />
      )}
    </BoxWrapperColumn>
  )
}
export default PieChart
