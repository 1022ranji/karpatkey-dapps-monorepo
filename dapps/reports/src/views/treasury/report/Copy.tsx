import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Copy = (props: TReportFilter) => {
  const { periodType, dao, period } = props
  const value = `/treasury/report?dao=${dao}&period=${period}&periodType=${periodType}`
  const onCopy = () => {
    window.open(value, '_blank')
  }

  return (
    <>
      <CopyToClipboard text={value} onCopy={onCopy}>
        <OpenInNewIcon fontSize="large" sx={{ cursor: 'pointer' }} />
      </CopyToClipboard>
    </>
  )
}

export default Copy
