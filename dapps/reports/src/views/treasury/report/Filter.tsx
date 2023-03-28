import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import ModalDialog from '@karpatkey-monorepo/shared/components/Modals/ModalDialog'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import ModalFilterForm from './ModalFilterForm'

const Filter = (props: TReportFilter) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const methods = useForm({ defaultValues: props })
  const { handleSubmit, control, watch } = methods

  const onSubmit = (params: TReportFilter) => {
    router.push({
      pathname: `/treasury/report`,
      query: { ...params }
    })
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = async (status: boolean) => {
    if (status) {
      await handleSubmit(onSubmit)()
    }
    setOpen(false)
  }

  return (
    <>
      <Tooltip title="Open filter modal dialog">
        <FilterAltIcon fontSize="medium" onClick={handleClick} sx={{ cursor: 'pointer' }} />
      </Tooltip>
      <ModalDialog
        open={open}
        title={'Filter'}
        description={'Please apply some filters to the report'}
        handleClose={handleClose}
        component={<ModalFilterForm control={control} watch={watch} {...props} />}
        okButtonTitle={'Apply'}
        cancelButtonTitle={'Cancel'}
      />
    </>
  )
}

export default Filter
