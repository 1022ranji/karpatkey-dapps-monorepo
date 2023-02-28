import { ResponsivePie } from '@nivo/pie'

const Pie = ({ data /* see data tab */ }: any) => (
  <ResponsivePie
    data={data}
    colors={{ scheme: 'greys' }}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [
        ['darker', 1],
        ['opacity', 1]
      ]
    }}
    valueFormat={function (e) {
      return e + '%'
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [
        ['darker', 2],
        ['opacity', 1]
      ]
    }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: 'stablecoins'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'ether'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'gno'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'bitcoin'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'others'
        },
        id: 'lines'
      }
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        symbolBorderWidth: 1,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />
)

export default Pie
