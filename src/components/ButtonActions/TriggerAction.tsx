import CustomTypography from '@/src/components/CustomTypography'
import ModalDialog from '@/src/components/ModalDialog'
import TextLink from '@/src/components/TextLink'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import React from 'react'

interface IDataAction {
  status: boolean
  trx?: Maybe<string>
  error?: Maybe<Error>
}

export default function TriggerAction() {
  const [data, setData] = React.useState<Maybe<IDataAction>>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Maybe<Error>>(null)

  const [open, setOpen] = React.useState(false)

  const onClick = () => {
    setOpen(true)
  }

  const handleClose = async (status: boolean) => {
    setOpen(false)
    if (status) {
      await handleClickAction()
    }
  }

  const handleClickAction = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trigger`)
      if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
      }
      const { data } = await response.json()
      if (!data.status) {
        throw new Error(data.error.message)
      }

      setData(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={onClick}
        variant="contained"
        endIcon={<SendIcon />}
        disabled={loading}
        sx={{ mb: '10px' }}
      >
        Execute python script
      </Button>
      <ModalDialog
        open={open}
        title="Are you sure?"
        description="This will execute an action on the selected position."
        handleClose={handleClose}
      />
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && data.status && (
        <Alert severity="success">
          <CustomTypography color="textSecondary" variant="body1">
            Transaction successfully completed. You can check it{' '}
          </CustomTypography>
          <TextLink href={data.trx || ''} target="_blank">
            here
          </TextLink>
        </Alert>
      )}
    </>
  )
}
