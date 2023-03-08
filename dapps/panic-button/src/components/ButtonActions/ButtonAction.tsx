import CustomTypography from '@monorepo/shared/components/CustomTypography'
import ModalDialog from '@monorepo/shared/components/ModalDialog'
import { Alert, Box, Button, CircularProgress } from '@mui/material'
import React from 'react'

import useHandleAction from '../../hooks/useHandleAction'

interface IButtonActionProps {
  actionURL: string
  buttonTitle: string
  modalDialogTitle: string
  modalDialogDescription: string

  successMessage: Maybe<string>
}

export default function ButtonAction(props: IButtonActionProps) {
  const { buttonTitle, modalDialogTitle, modalDialogDescription, successMessage, actionURL } = props

  const { onClick, open, loading, handleClose, error, data } = useHandleAction(actionURL)

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      mb="10px"
      gap="10px"
    >
      <Button
        onClick={onClick}
        variant="contained"
        disabled={loading}
        {...(loading
          ? {
              endIcon: <CircularProgress color="primary" size={20} />
            }
          : {})}
      >
        {buttonTitle}
      </Button>
      <ModalDialog
        open={open}
        title={modalDialogTitle}
        description={modalDialogDescription}
        handleClose={handleClose}
      />
      {error && <Alert severity="error">{error?.message}</Alert>}
      {successMessage && data && (
        <Alert severity="success">
          <CustomTypography color="textSecondary" variant="body1">
            {successMessage}
          </CustomTypography>
        </Alert>
      )}
    </Box>
  )
}
