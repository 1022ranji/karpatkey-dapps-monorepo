import Box from '@mui/material/Box'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { ElementType } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedSectionWrapperProps {
  component?: ElementType
}

const variant: Variants = {
  initial: {
    opacity: 0,
    y: 50
  },
  show: {
    opacity: 1,
    y: 0
  }
}

const AnimatePresenceWrapper = (props: AnimatedSectionWrapperProps & ComponentProps) => {
  const { component = Box, children } = props
  const AnimatedBox = motion(component)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <Box ref={ref}>
      <AnimatePresence>
        <AnimatedBox
          initial="initial"
          exit="initial"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          variants={variant}
          animate={inView ? 'show' : 'initial'}
          viewport={{ amount: 0.7, once: true }}
        >
          {children}
        </AnimatedBox>
      </AnimatePresence>
    </Box>
  )
}

export default AnimatePresenceWrapper
