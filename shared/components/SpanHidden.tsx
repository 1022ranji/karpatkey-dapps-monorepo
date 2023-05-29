import { styled } from '@mui/material'

interface SpanHiddenProps {
  top?: number
}

const SpanHidden = styled('span')<SpanHiddenProps>(({ top = 140 }) => ({
  display: 'block',
  position: 'relative',
  top: `-${top}px`,
  visibility: 'hidden'
}))

export default SpanHidden
