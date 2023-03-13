import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import CloseIcon from '@mui/icons-material/Close'
import { Alert } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'

export enum ESnackStatus {
  Error = 'error',
  Success = 'success',
  None = 'none'
}

export interface ISnackbarActionProps {
  status: ESnackStatus
  message: string
  open: boolean
}

export default function SnackbarAction({ status, message, open }: ISnackbarActionProps) {
  const [openSnackBar, setOpenSnackBar] = React.useState(open)

  const isError = React.useMemo(() => status === ESnackStatus.Error, [status])

  React.useEffect(() => {
    setOpenSnackBar(open)
  }, [open])

  const handleClose = () => {
    setOpenSnackBar(false)
  }

  return (
    <Snackbar open={openSnackBar} onClose={handleClose}>
      <Alert severity={isError ? 'error' : 'success'} sx={{ alignItems: 'center' }}>
        <Box display="flex" justifyContent="center" flexDirection="row" alignItems="center">
          <CustomTypography color="textSecondary" variant="body1">
            {message}
          </CustomTypography>
          <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Alert>
    </Snackbar>
  )
}
