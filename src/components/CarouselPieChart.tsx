import React from 'react'
import Slider from 'react-slick'
import { Box } from '@mui/material'
import NextArrow from '@mui/icons-material/ArrowForwardIos'
import PrevArrow from '@mui/icons-material/ArrowBackIos'

interface CarouselProps {
  children: React.ReactNode
  className?: string
}

export const CarouselPieChart = ({ children, className }: CarouselProps) => {
  const settings = {
    dots: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '5px',
    className: className,
    variableWidth: true,
    swipeToSlide: true,
    nextArrow: <NextArrow sx={{ fill: 'black', fontSize: '14px' }} />,
    prevArrow: <PrevArrow sx={{ fill: 'black', fontSize: '14px' }} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <Box className="slider-container" component={'div'} sx={{ marginY: '20px', marginX: '20px' }}>
      <Slider {...settings}>{children}</Slider>
    </Box>
  )
}
