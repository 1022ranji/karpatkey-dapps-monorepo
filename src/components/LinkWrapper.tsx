import React from 'react'
import { Link } from 'src/components'

interface LinkWrapperProps {
  url: string
  children: React.ReactNode
  isCentered?: boolean
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({ url, children, isCentered }) => {
  return (
    <Link
      href={url}
      rel="noopener noreferrer"
      onContextMenu={(e: any) => e.stopPropagation()}
      sx={{
        textDecoration: 'none',
        ...(isCentered && { display: 'flex', justifyContent: 'center' })
      }}
    >
      {children}
    </Link>
  )
}
