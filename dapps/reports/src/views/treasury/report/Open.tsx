import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import ArrowUp from '@karpatkey-monorepo/shared/components/Icons/ArrowUp'
import { IconButton, Tooltip } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Open = (props: TReportFilter) => {
  const { periodType, daoName, period } = props
  const value = React.useMemo(
    () => `/treasury/report?daoName=${daoName}&period=${period}&periodType=${periodType}`,
    [daoName, period, periodType]
  )
  const onCopy = () => {
    window.open(value, '_blank')
  }

  return (
    <CopyToClipboard text={value} onCopy={onCopy}>
      <Tooltip title="Open the filtered report in another tab">
        <IconButton>
          <ArrowUp />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  )
}

export default Open
