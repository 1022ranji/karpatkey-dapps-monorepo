import { styled } from '@mui/material'
import { TypographyProps } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FC, memo } from 'react'

export interface CustomTypographyProps extends Omit<TypographyProps, 'fontWeight'> {
  fontWeight?: 'regular' | 'medium' | 'semi-bold' | 'bold' | 'extra-bold'
  lineClamp?: number
  ellipsis?: boolean
  capitalize?: boolean
}

const translateFontWeight = (weight: string) => {
  switch (weight) {
    case 'regular':
      return 400
    case 'medium':
      return 500
    case 'semi-bold':
      return 600
    case 'bold':
      return 700
    case 'extra-bold':
      return 800
    default:
      return 400
  }
}

const CustomTypography: FC<CustomTypographyProps> = ({
  lineClamp = 3,
  ellipsis = false,
  capitalize = false,
  fontWeight = 'regular',
  ...props
}) => {
  const StyledTypography = memo(
    styled(Typography)<TypographyProps>(() => ({
      ...(ellipsis && {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: `${lineClamp}`,
        WebkitBoxOrient: 'vertical'
      }),
      ...(capitalize && {
        textTransform: 'uppercase'
      })
    }))
  )

  return <StyledTypography fontWeight={translateFontWeight(fontWeight)} {...props} />
}

export default CustomTypography
