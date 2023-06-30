import { reduceSentenceByLengthInLines } from '@karpatkey-monorepo/reports/src/utils/strings'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, BoxProps, List, ListItem } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import { Cell, Curve, Pie, PieChart as PieRechart } from 'recharts'

const RenderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, label, showLegend = true } = props
  const RADIAN = Math.PI / 180
  const radius = 25 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const words = reduceSentenceByLengthInLines(label, 12)
  const labels = +percent * 100 < 1 ? words.reverse() : words

  return (
    <g>
      {!showLegend && labels.length > 0
        ? labels.map((word: string, i: number) => (
            <text
              x={x}
              y={+percent * 100 < 1 ? y - 15 * (i + 1) : y + 15 * (i + 1)}
              key={i}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
              fontFamily={'IBM Plex Sans'}
              fontSize={13}
              fill="#222222"
            >
              {word}
            </text>
          ))
        : null}
      <text
        x={x}
        y={y}
        fill="#222222"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontFamily={'IBM Plex Sans'}
        fontSize={13}
      >
        {numbro(percent).format({ output: 'percent', mantissa: 2 })}
      </text>
    </g>
  )
}

export interface Point {
  x: number
  y: number
}

type CustomizedLabelLineProps = { points?: Array<Point> }
const RenderLabelLine = (props: CustomizedLabelLineProps) => {
  return <Curve {...props} stroke="#222222" type="linear" className="recharts-pie-label-line" />
}

const RenderLegend = ({ data }: any) => {
  return (
    <List>
      {data.map((entry: any, index: any) => {
        return (
          <ListItem key={index}>
            <BoxWrapperRow gap={2}>
              <Box sx={{ background: entry.color, height: 17, width: 25, maxWidth: 25 }} />
              <CustomTypography variant="pieChartLegendTitle" sx={{ wordWrap: 'break-word' }}>
                {entry.label}
              </CustomTypography>
            </BoxWrapperRow>
          </ListItem>
        )
      })}
    </List>
  )
}

interface RenderPieChartProps {
  data: any
  dataKey: string
  showLegend?: boolean
  width?: number
  height?: number
  innerRadius?: number
  outerRadius?: number
}

const RenderPieChart = (props: RenderPieChartProps) => {
  const {
    data,
    dataKey,
    showLegend = true,
    width = 420,
    height = 360,
    innerRadius = 50,
    outerRadius = 120
  } = props
  return (
    <PieRechart width={width} height={height}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill="#222222"
        dataKey={dataKey}
        label={(props) => RenderCustomizedLabel({ ...props, showLegend })}
        labelLine={RenderLabelLine}
      >
        {data.map((entry: any, index: number) => (
          <Cell style={{ outline: 'none' }} key={`cell-${index}`} fill={entry.color} />
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
  showLegend?: boolean
  alignLegend?: 'bottom' | 'right'
  width?: number
  height?: number
  innerRadius?: number
  outerRadius?: number
}

const PieChart = (props: BoxProps & PieChartProps) => {
  const {
    data,
    title,
    dataKey,
    alignLegend = 'bottom',
    showLegend = true,
    width,
    height,
    innerRadius,
    outerRadius
  } = props

  const renderWithLegend =
    alignLegend === 'bottom' ? (
      <BoxWrapperColumn
        gap={2}
        sx={{
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          minWidth: 'max-content',
          width: '100%'
        }}
      >
        {title ? <PieChartTitle title={title} /> : null}
        {data.length > 0 ? (
          <>
            <RenderPieChart
              data={data}
              dataKey={dataKey}
              width={width}
              height={height}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
            />
            <RenderLegend data={data} />
          </>
        ) : (
          <EmptyData />
        )}
      </BoxWrapperColumn>
    ) : (
      <BoxWrapperRow
        gap={15}
        sx={{
          justifyContent: 'flex-start',
          alignSelf: 'stretch',
          alignItems: 'center',
          minWidth: 'max-content',
          width: '66%'
        }}
      >
        <BoxWrapperColumn width={'50%'} gap={2}>
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
        {data.length > 0 ? <RenderLegend data={data} /> : null}
      </BoxWrapperRow>
    )

  const renderWithoutLegend = (
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
          showLegend={showLegend}
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
  return <>{showLegend ? renderWithLegend : renderWithoutLegend}</>
}
export default PieChart
