import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Tooltip } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Copy = (props: TReportFilter) => {
  const { chainId, periodType, daoAddress, period } = props
  const value = React.useMemo(
    () =>
      `/treasury/report?chainId=${chainId}&daoAddress=${daoAddress}&period=${period}&periodType=${periodType}`,
    [chainId, daoAddress, period, periodType]
  )
  const onCopy = () => {
    window.open(value, '_blank')
  }

  return (
    <CopyToClipboard text={value} onCopy={onCopy}>
      <Tooltip title="Copy the filters and open it in another tab">
        <OpenInNewIcon fontSize="medium" sx={{ cursor: 'pointer' }} />
      </Tooltip>
    </CopyToClipboard>
  )
}

export default Copy
