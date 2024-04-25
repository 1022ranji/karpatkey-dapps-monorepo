import React from 'react'
import Slider from 'react-slick'
import { Box } from '@mui/material'
import NextArrow from '@mui/icons-material/ArrowForwardIos'
import PrevArrow from '@mui/icons-material/ArrowBackIos'

interface CarouselProps {
  children: React.ReactNode
  className?: string
  dots?: boolean
  beforeChange?: (oldIndex: number, newIndex: number) => void
  afterChange?: (index: number) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrevArrowCustom = ({ currentSlide, slideCount, ...arrowProps }: any) => (
  <PrevArrow sx={{ fill: 'black', fontSize: '14px' }} {...arrowProps} />
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NextArrowCustom = ({ currentSlide, slideCount, ...arrowProps }: any) => (
  <NextArrow sx={{ fill: 'black', fontSize: '14px' }} {...arrowProps} />
)

export const CarouselCards = ({
  children,
  className,
  dots = false,
  beforeChange,
  afterChange
}: CarouselProps) => {
  const settings = {
    dots,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: className,
    swipeToSlide: true,
    infinite: true,
    nextArrow: <NextArrowCustom />,
    prevArrow: <PrevArrowCustom />,
    beforeChange,
    afterChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
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
