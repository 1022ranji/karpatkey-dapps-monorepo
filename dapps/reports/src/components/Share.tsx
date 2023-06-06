import { Filter } from '@karpatkey-monorepo/reports/src/types'
import Button from '@mui/material/Button'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Share = (props: Filter) => {
  const { month, dao, year } = props
  const value = React.useMemo(() => `/?dao=${dao}&month=${month}&year=${year}`, [month, dao, year])
  const onCopy = () => {
    window.open(value, '_blank')
  }

  return (
    <CopyToClipboard text={value} onCopy={onCopy}>
      <Button
        sx={{
          width: '110px',
          height: '48px'
        }}
      >
        Share
      </Button>
    </CopyToClipboard>
  )
}

export default Share
