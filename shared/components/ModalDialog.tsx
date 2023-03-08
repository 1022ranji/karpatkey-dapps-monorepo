import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'

interface IModalDialog {
  open: boolean
  handleClose: (status: boolean) => Promise<void>
  title: string
  description: string
}

const ModalDialog = (props: IModalDialog) => {
  const { open, handleClose, title, description } = props
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await handleClose(false)
          }}
        >
          Disagree
        </Button>
        <Button
          onClick={async () => {
            await handleClose(true)
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalDialog
