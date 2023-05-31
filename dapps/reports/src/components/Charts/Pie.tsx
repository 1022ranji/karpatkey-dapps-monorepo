import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { MapBalancesByTokenCategory } from '@karpatkey-monorepo/shared/utils/mappers'
import { Box, BoxProps, List, ListItem } from '@mui/material'
import numbro from 'numbro'
import React from 'react'
import { Cell, Pie, PieChart as PieRechart } from 'recharts'
import BoxWrapperColumn from 'shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from 'shared/components/Wrappers/BoxWrapperRow'

export type PieChartProps = {
  data: MapBalancesByTokenCategory[]
  title: string
  dataKey: string
  alignLegend?: 'bottom' | 'right'
}

const RADIAN = Math.PI / 180
const RenderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.15
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return percent * 100 > 2 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="14px"
    >
      {numbro(percent).format({
        output: 'percent',
        spaceSeparated: false,
        mantissa: 2
      })}
    </text>
  ) : (
    <text />
  )
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
          <PieRechart width={280} height={320}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={140}
              fill="#8884d8"
              dataKey={dataKey}
              label={RenderCustomizedLabel}
              labelLine={false}
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
            <PieRechart width={280} height={320}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={140}
                fill="#8884d8"
                dataKey={dataKey}
                label={RenderCustomizedLabel}
                labelLine={false}
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
