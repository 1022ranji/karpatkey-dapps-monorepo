import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import FormDAODropdown from '@karpatkey-monorepo/shared/components/FormItems/FormDAODropdown'
import FormToggleType from '@karpatkey-monorepo/shared/components/FormItems/FormToggleType'
import { Box } from '@mui/material'
import * as React from 'react'

type TModalFilterForm = {
  control: any
  watch: any
}
type TModalFilterFormProps = TModalFilterForm & TReportFilter
const ModalFilterForm = ({ control, watch }: TModalFilterFormProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="left"
      justifyContent="center"
      gap={4}
      marginTop={4}
    >
      <FormDAODropdown control={control} name={'daoName'} watch={watch} />
      <FormToggleType control={control} name={'periodType'} />
      {/*<FormDatePicker control={control} name={'period'} />*/}
    </Box>
  )
}

export default ModalFilterForm
