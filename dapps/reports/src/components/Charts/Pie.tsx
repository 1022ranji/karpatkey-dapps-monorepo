import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { MapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps, List, ListItem } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import { Cell, Curve, Pie, PieChart as PieRechart } from 'recharts'

export type PieChartProps = {
  data: MapBalancesByTokenCategory[]
  title: string
  dataKey: string
  alignLegend?: 'bottom' | 'right'
}

const RenderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180
  const radius = 25 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#222222"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontFamily={'IBM Plex Sans'}
      fontSize={14}
    >
      {numbro(percent).format({ output: 'percent', mantissa: 2 })}
    </text>
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

const PieChart = ({ data, title, dataKey, alignLegend = 'bottom' }: BoxProps & PieChartProps) => {
  return (
    <>
      {alignLegend === 'bottom' ? (
        <BoxWrapperColumn
          gap={2}
          sx={{
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            minWidth: 'max-content',
            width: '100%'
          }}
        >
          <CustomTypography variant="infoCardTitle" textAlign="left">
            {title}
          </CustomTypography>
          <PieRechart width={420} height={420}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={120}
              fill="#222222"
              dataKey={dataKey}
              label={RenderCustomizedLabel}
              labelLine={RenderLabelLine}
            >
              {data.map((entry, index) => (
                <Cell style={{ outline: 'none' }} key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieRechart>
          <List>
            {data.map((entry: any, index: any) => {
              return (
                <ListItem key={index}>
                  <BoxWrapperRow gap={2}>
                    <Box sx={{ background: entry.fill, height: 17, width: 25, maxWidth: 25 }} />
                    <CustomTypography variant="pieChartLegendTitle" sx={{ wordWrap: 'break-word' }}>
                      {entry.label}
                    </CustomTypography>
                  </BoxWrapperRow>
                </ListItem>
              )
            })}
          </List>
        </BoxWrapperColumn>
      ) : (
        <BoxWrapperRow
          gap={4}
          sx={{
            justifyContent: 'flex-start',
            alignSelf: 'stretch',
            alignItems: 'center',
            minWidth: 'max-content',
            width: '66%'
          }}
        >
          <BoxWrapperColumn width={'50%'} gap={2}>
            <CustomTypography variant="infoCardTitle" textAlign="left">
              {title}
            </CustomTypography>
            <PieRechart width={420} height={420}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={120}
                fill="#222222"
                dataKey={dataKey}
                label={RenderCustomizedLabel}
                labelLine={RenderLabelLine}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieRechart>
          </BoxWrapperColumn>
          <List>
            {data.map((entry: any, index: any) => {
              return (
                <ListItem key={index}>
                  <BoxWrapperRow gap={2}>
                    <Box sx={{ background: entry.fill, height: 17, width: 25, maxWidth: 25 }} />
                    <CustomTypography variant="pieChartLegendTitle" sx={{ wordWrap: 'break-word' }}>
                      {entry.label}
                    </CustomTypography>
                  </BoxWrapperRow>
                </ListItem>
              )
            })}
          </List>
        </BoxWrapperRow>
      )}
    </>
  )
}
export default PieChart
