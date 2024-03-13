import CarouselUI from 'react-material-ui-carousel'
import React from 'react'

interface CarrouselProps {
  children: React.ReactNode
}
export const Carousel = (props: CarrouselProps) => {
  return (
    <CarouselUI
      autoPlay={false}
      animation={'slide'}
      swipe={true}
      indicators={false}
      cycleNavigation={false}
      navButtonsAlwaysVisible={true}
      {...props}
    >
      {props.children}
    </CarouselUI>
  )
}
