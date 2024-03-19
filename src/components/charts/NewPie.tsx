import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { CustomTypography, BoxWrapperColumn, EmptyData } from 'src/components/'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material'

interface PieChartTitleProps {
  title: string
}

const PieChartTitle = ({ title }: PieChartTitleProps) => {
  return (
    <CustomTypography variant="infoCardTitle" textAlign="left" sx={{ width: 'fit-content' }}>
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
  titleMessage?: string
  footerMessage?: React.ReactNode
  width?: string | number
  height?: string | number
  innerSize?: string
  outerSize?: string
}

export const PieChart = (props: HighchartsReact.Props & PieChartProps) => {
  const {
    data,
    titleMessage,
    footerMessage,
    width = 440,
    height = 400,
    innerSize = '40%',
    outerSize = '65%'
  } = props
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null)

  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const options = {
    title: {
      text: ''
    },
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
        startAngle: 90,
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          click: function (e: any) {
            e.preventDefault() // prevent any action from occuring on "click" event
          }
        },
        borderWidth: 0,
        colorByPoint: true,
        type: 'pie',
        size: outerSize,
        innerSize,
        dataLabels: {
          enabled: true,
          crop: false,
          distance: isMD ? '25%' : '15%',
          style: {
            fontSize: isMD ? '12px' : '10px',
            fontFamily: 'IBM Plex Sans',
            color: '#222222',
            textOutline: '0px',
            fontWeight: 'normal',
            width: '100px'
          },
          connectorWidth: 2,
          connectorShape: 'fixedOffset',
          shadow: false
        }
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 0,
        borderWidth: 0,
        dataLabels: {
          format:
            '<span class="highcharts-data-label">{point.name}</span><br>{point.percentage:.2f} %',
          useHTML: true,
          connectorColor: 'black',
          connectorWidth: 1,
          style: {
            fontSize: isMD ? '12px' : '10px',
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
      ...(isMD ? { marginTop: '20px' } : { marginTop: '0px' }),
      height: `${height}px`,
      width: `${+width + 40}px`
    }
  }

  return (
    <BoxWrapperColumn
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: `${height}px`,
        width: `${width}px`,
        alignItems: { xs: 'center', sm: 'center', md: 'flex-start' }
      }}
    >
      {titleMessage ? <PieChartTitle title={titleMessage} /> : null}
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
