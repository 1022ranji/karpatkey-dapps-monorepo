import SnackbarAction, {
  ESnackStatus
} from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/SnackbarAction'
import useHandleAction from '@karpatkey-monorepo/panic-button/src/hooks/useHandleAction'
import ModalDialog from '@karpatkey-monorepo/shared/components/Modals/ModalDialog'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Button, CircularProgress } from '@mui/material'
import React from 'react'

interface IButtonActionProps {
  actionURL: string
  buttonTitle: string
  modalDialogTitle: string
  modalDialogDescription: string

  successMessage: Maybe<string>
  component?: React.ReactNode
  okButtonTitle?: string
  cancelButtonTitle?: string
}

export default function ButtonAction(props: IButtonActionProps) {
  const {
    buttonTitle,
    modalDialogTitle,
    modalDialogDescription,
    successMessage,
    actionURL,
    component,
    okButtonTitle = 'Agree',
    cancelButtonTitle = 'Disagree'
  } = props

  const { onClick, open, loading, handleClose, error, data } = useHandleAction(actionURL)

  const status = React.useMemo(() => {
    if (error && data !== null) {
      return ESnackStatus.Error
    }
    if (data && !error) {
      return ESnackStatus.Success
    }
    return ESnackStatus.None
  }, [error, data]) as ESnackStatus

  const message = React.useMemo(() => {
    if (error && data !== null) {
      return error?.message || ''
    }
    if (data && !error) {
      return successMessage || ''
    }
    return ''
  }, [error, successMessage, data])

  return (
    <BoxWrapperRow justifyContent="flex-start" mb="10px" gap="10px">
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
        component={component}
        okButtonTitle={okButtonTitle}
        cancelButtonTitle={cancelButtonTitle}
      />
      <SnackbarAction status={status} message={message} open={!!data} />
    </BoxWrapperRow>
  )
}
