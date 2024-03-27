import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import * as React from 'react'

interface IModalDialog {
  open: boolean
  handleClose: (status: boolean) => Promise<void>
  title: string
  description: string
  component?: React.ReactNode
  okButtonTitle?: string
  cancelButtonTitle?: string
}

export const ModalDialog = (props: IModalDialog) => {
  const { open, handleClose, title, description, component, okButtonTitle, cancelButtonTitle } =
    props
  return (
    <Dialog
      open={open}
      onClose={async () => {
        await handleClose(false)
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        {component}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await handleClose(false)
          }}
        >
          {cancelButtonTitle}
        </Button>
        <Button
          onClick={async () => {
            await handleClose(true)
          }}
          autoFocus
        >
          {okButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
