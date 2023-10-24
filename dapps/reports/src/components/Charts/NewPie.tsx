import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import EmptyData from '@karpatkey-monorepo/shared/components/EmptyData'

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
  }[]
  title?: string
  footerMessage?: React.ReactNode
  width?: string | number
  height?: string | number
}

export const PieChart = (props: HighchartsReact.Props & PieChartProps) => {
  const { data, title, footerMessage, width = 440, height = 400 } = props
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null)

  const options = {
    credits: {
      enabled: false
    },
    chart: {
      backgroundColor: 'transparent',
      plotShadow: false,
      type: 'pie'
    },
    series: [
      {
        name: 'Data',
        data: data
      }
    ],
    plotOptions: {
      series: {
        borderWidth: 0,
        colorByPoint: true,
        type: 'pie',
        size: '65%',
        innerSize: '40%',
        dataLabels: {
          enabled: true,
          crop: false,
          distance: '35%',
          style: {
            fontSize: '12px',
            fontFamily: 'IBM Plex Sans',
            color: '#222222',
            textOutline: '0px',
            fontWeight: 'normal'
          },
          connectorWidth: 2
        }
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 0,
        borderWidth: 0,
        minSize: 20,
        dataLabels: {
          enabled: true,
          format:
            '<span class="highcharts-data-label">{point.name}</span><br>{point.percentage:.2f} %',
          useHTML: true,
          connectorColor: 'black',
          connectorWidth: 1,
          style: {
            fontSize: '12px',
            fontFamily: 'IBM Plex Sans',
            color: '#222222',
            textOutline: '0px',
            fontWeight: 'normal'
          }
        }
      }
    },

    tooltip: {
      useHTML: true,
      borderWidth: 0,
      borderRadius: 0,
      shadow: false,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      formatter: function (this: Highcharts.TooltipFormatterContextObject): any {
        return `<span class="highcharts-data-label">${
          this.point.name
        }</span><br>${this.point.percentage?.toFixed(2)} %`
      },
      style: {
        fontSize: '12px',
        fontFamily: 'IBM Plex Sans',
        color: '#222222',
        textOutline: '0px',
        fontWeight: 'normal'
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    }
  }

  const containerProps = {
    style: {
      marginTop: '40px',
      height: `${+height * 0.8}px`,
      width: `${+width * 0.95}px`
    }
  }

  return (
    <BoxWrapperColumn
      sx={{
        justifyContent: 'flex-start',
        height: `${height}px`,
        width: `${width}px`
      }}
    >
      {title ? <PieChartTitle title={title} /> : null}
      {data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
          containerProps={containerProps}
          {...props}
        />
      ) : (
        <EmptyData />
      )}
      {footerMessage ? footerMessage : null}
    </BoxWrapperColumn>
  )
}
