import { Filter } from '@karpatkey-monorepo/reports/src/types'
import Button from '@mui/material/Button'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Share = (props: Filter) => {
  const { month, dao, year } = props
  const value = React.useMemo(() => {
    const query = new URLSearchParams()
    if (dao) query.append('dao', dao + '')
    if (month) query.append('month', month + '')
    if (year) query.append('year', year + '')
    return `/?${query.toString()}`
  }, [month, dao, year])

  const onCopy = () => {
    if (isShareButtonEnable) {
      window.open(value, '_blank')
    }
  }

  const isShareButtonEnable = React.useMemo(() => {
    return month || dao || year
  }, [month, dao, year])

  return (
    <CopyToClipboard text={value} onCopy={onCopy}>
      <Button
        sx={{
          ...(isShareButtonEnable
            ? { backgroundColor: '#1A1A1A !important' }
            : { backgroundColor: '#7A7A7A !important' }),
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
