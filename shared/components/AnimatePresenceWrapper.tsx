import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AnimatePresenceWrapper = (props: ComponentProps) => {
  const { children } = props
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const animate = inView ? { opacity: 1 } : { opacity: 0 }

  return (
    <Box ref={ref}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ ...animate }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ amount: 0.7, once: true }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}

export default AnimatePresenceWrapper
