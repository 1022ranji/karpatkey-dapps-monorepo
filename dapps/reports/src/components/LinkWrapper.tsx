import React from "react";
import Link from "@karpatkey-monorepo/shared/components/Link";

interface LinkWrapperProps {
  url: string
}

export const LinkWrapper: React.FC<LinkWrapperProps> = ({url, children} ) => {
  return (
    <Link
      href={url}
      rel="noopener noreferrer"
      onContextMenu={(e: any) => e.stopPropagation()}
      sx={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  )
}
