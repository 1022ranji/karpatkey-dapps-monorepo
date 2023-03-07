import { styled } from '@mui/material'
import Link, { LinkBaseProps } from '@mui/material/Link'
import classNames from 'classnames'
import NextLink from 'next/link'
import React, { FC, memo } from 'react'

const LinkWrapper = styled('div')(() => ({
  display: 'flex',
  '& > a': {
    color: 'primary.main',
    display: 'block',
    width: 'auto',
    textDecoration: 'none',
    transition: 'all .2s ease-in-out',
    letterSpacing: '-0.01em',
    lineHeight: 2,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',

    '&.withAnimation': {
      '&:hover': {
        '&:after': {
          transform: 'scale(1, 1) translate(100%, 0)'
        }
      },
      '&:after': {
        width: '100%',
        content: '""',

        position: 'absolute',
        bottom: '0px',
        height: '2px',
        right: '100%',
        background: 'currentColor',
        transition:
          'transform .2s ease-in-out, color .0s ease-in-out, -webkit-transform .2s ease-in-out'
      }
    }
  }
}))

// eslint-disable-next-line react/display-name
const LinkComponent = memo(
  ({
    className,
    withUnderlineAnimation,
    ...linkProps
  }: LinkBaseProps & { withUnderlineAnimation?: boolean }) => (
    <Link
      underline="none"
      {...linkProps}
      className={classNames(className, {
        withAnimation: withUnderlineAnimation
      })}
    />
  )
)

// eslint-disable-next-line react/display-name
const CustomLink = memo(
  ({ href, ...others }: LinkBaseProps & { withUnderlineAnimation?: boolean }) => (
    <LinkWrapper>
      <LinkComponent href={href} {...others} />
    </LinkWrapper>
  )
)

interface TextLinkProps extends LinkBaseProps {
  withUnderlineAnimation?: boolean
  useNextLink?: boolean
}

const TextLink: FC<TextLinkProps> = (props) => {
  const { href, withUnderlineAnimation = true, useNextLink = false, ...others } = props
  const nextHref = href as unknown

  return useNextLink ? (
    <NextLink href={nextHref as URL} passHref>
      <CustomLink href={href} withUnderlineAnimation={withUnderlineAnimation} {...others} />
    </NextLink>
  ) : (
    <CustomLink href={href} withUnderlineAnimation={withUnderlineAnimation} {...others} />
  )
}

export default TextLink
