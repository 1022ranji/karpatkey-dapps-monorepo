import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const TimeLineScale = ({ data }: any) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: 'time',
      format: '%Y-%m-%d',
      precision: 'day',
      useUTC: false
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false
    }}
    axisTop={null}
    axisRight={null}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0
    }}
    axisBottom={{
      format: '%b %d',
      tickValues: 'every 1 days',
      legendOffset: -12
    }}
    colors={{ scheme: 'greys' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
  />
)

export default TimeLineScale
