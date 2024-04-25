import { Box, Theme } from '@mui/material'
import { Variants, motion, useAnimation } from 'framer-motion'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import { Card as CardDesktop } from './card/desktop/Card'
import { Card as CardMobile } from './card/mobile/Card'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CarouselCards } from 'components/carousels/cards'
import { CustomTypography } from 'components/CustomTypography'
import { BoxWrapperColumn } from 'components/wrappers'

interface CardListProps {
  tokenDetailByPosition: any[]
}

export const CardList = (props: CardListProps) => {
  const { tokenDetailByPosition } = props

  const [ref, inView] = useInView()
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.stop()
    }
  }, [inView, controls, tokenDetailByPosition])

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: ({ index }: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'ease-in-out',
        delay: 0.15 * index
      }
    })
  }
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const isBreakpointOne = useMediaQuery((theme: Theme) => theme.breakpoints.up(1000))
  const isBreakpointTwo = useMediaQuery((theme: Theme) => theme.breakpoints.up(720))
  const isBreakpointThree = useMediaQuery((theme: Theme) => theme.breakpoints.up(480))

  const [position, setPosition] = React.useState(1)

  return (
    <>
      {isMD && (
        <Box
          ref={ref}
          component={motion.div}
          initial={'hidden'}
          animate={controls}
          variants={containerVariants}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            gap: '20px 20px'
          }}
        >
          {tokenDetailByPosition.map((card: any, index: number) => {
            return (
              <Box
                component={motion.div}
                key={index}
                variants={itemVariants}
                custom={{ index }}
                sx={{
                  maxWidth: '320px',
                  minWidth: '320px',
                  minHeight: '440px',
                  height: 'content-fit',
                  padding: '8px 8px',
                  border: '1px solid #B6B6B6',
                  background: 'background.paper'
                }}
              >
                <CardDesktop id={index} key={index} card={card} />
              </Box>
            )
          })}
        </Box>
      )}
      {!isMD && (
        <BoxWrapperColumn gap={0}>
          <CustomTypography variant={'body2'}>
            {`${position}/${tokenDetailByPosition.length}`}
          </CustomTypography>
          <Box
            sx={{
              margin: '0 20px 20px 20px'
            }}
          >
            <CarouselCards
              className="custom-slider-cards"
              beforeChange={(oldIndex: number, newIndex: number) => {
                console.log('beforeChange', oldIndex, newIndex)
                setPosition(newIndex + 1)
              }}
            >
              {tokenDetailByPosition.map((card: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      maxWidth: '320px',
                      minWidth: '220px',
                      width: isBreakpointOne
                        ? '320px !important'
                        : isBreakpointTwo
                          ? '280px !important'
                          : isBreakpointThree
                            ? '260px !important'
                            : '200px !important',

                      minHeight: '200px',
                      height: 'fit-content',
                      padding: '8px 8px',
                      margin: '0 10px',
                      border: '1px solid #B6B6B6',
                      background: 'background.paper'
                    }}
                  >
                    <CardMobile id={index} key={index} card={card} />
                  </Box>
                )
              })}
            </CarouselCards>
          </Box>
        </BoxWrapperColumn>
      )}
    </>
  )
}
