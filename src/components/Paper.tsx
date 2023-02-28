import { styled } from '@mui/material'
import MuiPaper, { PaperProps } from '@mui/material/Paper'
import { FC } from 'react'

const StyledPaper = styled(MuiPaper)((props) => ({
  '&': {
    borderRadius: 4,
    ...(props.elevation === 12 ? { boxShadow: '0px 2px 5px #00000005' } : {})
  }
}))

const Paper: FC<PaperProps> = (props) => {
  return <StyledPaper {...props} />
}

export default Paper
