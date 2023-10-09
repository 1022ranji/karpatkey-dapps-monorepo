import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from "react";
import CustomTypography from "@karpatkey-monorepo/shared/components/CustomTypography";
import BoxWrapperColumn from "@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn";
import EmptyData from "@karpatkey-monorepo/shared/components/EmptyData";

const options: Highcharts.Options = {
  title: null,
  credits: {
    enabled: false
  },
  chart: {
    backgroundColor: 'transparent',
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      colorByPoint: true,
      type: 'pie',
      size: '100%',
      innerSize: '50%',
      dataLabels: {
        enabled: true,
        crop: false,
        distance: '10%',
        style: {
          fontWeight: 'bold',
          fontSize: '14px'
        },
        connectorWidth: 1
      }
    },
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        connectorColor: 'black'
      }
    }
  },

  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },

  // colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
  //   return {
  //     radialGradient: {
  //       cx: 0.5,
  //       cy: 0.3,
  //       r: 0.7
  //     },
  //     stops: [
  //       [0, color],
  //       [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
  //     ]
  //   };
  // }),
  // series: [{
  //   name: 'Share',
  //   data: [
  //     { name: 'Chrome', y: 73.24 },
  //     { name: 'Edge', y: 12.93 },
  //     { name: 'Firefox', y: 4.73 },
  //     { name: 'Safari', y: 2.50 },
  //     { name: 'Internet Explorer', y: 1.65 },
  //     { name: 'Other', y: 4.93 }
  //   ]
  // }]
};

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

interface PieChartProps {
  data: {
    color: string
    y: string
    name: string
  }[],
  title?: string,
  footerMessage?: React.ReactNode,
  width?: number,
  height?: number,
}

export const PieChart = (props: HighchartsReact.Props & PieChartProps ) => {
  const { data, title, footerMessage, width = 420, height = 360 } = props
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);

  options.series = [{
    name: 'Share',
    data: props.data
  }]

  return (
    <BoxWrapperColumn
      sx={{
        justifyContent: 'flex-start',
        minWidth: 'max-content',
        width,
        height,
      }}
    >
      {title ? <PieChartTitle title={title} /> : null}
      {data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
          {...props}
        />)
        : (
          <EmptyData />
        )}
      {footerMessage ? footerMessage : null}
    </BoxWrapperColumn>
  );
};


// // Data retrieved from https://netmarketshare.com/
// // Radialize the colors
// Highcharts.setOptions({
//   colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
//     return {
//       radialGradient: {
//         cx: 0.5,
//         cy: 0.3,
//         r: 0.7
//       },
//       stops: [
//         [0, color],
//         [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
//       ]
//     };
//   })
// });
//
// // Build the chart
// Highcharts.chart('container', {
//   chart: {
//     plotBackgroundColor: null,
//     plotBorderWidth: null,
//     plotShadow: false,
//     type: 'pie'
//   },
//   title: {
//     text: 'Browser market shares in April, 2022',
//     align: 'left'
//   },
//   tooltip: {
//     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   },
//   accessibility: {
//     point: {
//       valueSuffix: '%'
//     }
//   },
//   plotOptions: {
//     pie: {
//       allowPointSelect: true,
//       cursor: 'pointer',
//       dataLabels: {
//         enabled: true,
//         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//         connectorColor: 'silver'
//       }
//     }
//   },
//   series: [{
//     name: 'Share',
//     data: [
//       { name: 'Chrome', y: 73.24 },
//       { name: 'Edge', y: 12.93 },
//       { name: 'Firefox', y: 4.73 },
//       { name: 'Safari', y: 2.50 },
//       { name: 'Internet Explorer', y: 1.65 },
//       { name: 'Other', y: 4.93 }
//     ]
//   }]
// });
