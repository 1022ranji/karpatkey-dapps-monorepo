import React from 'react'

export default function useHandleAction(actionURL: string) {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Maybe<Error>>(null)

  const [open, setOpen] = React.useState(false)

  const onClick = () => {
    reset()
    setOpen(true)
  }

  const reset = () => {
    setData(null)
    setError(null)
    setLoading(false)
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
      const response = await fetch(actionURL)
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

  return { data, error, loading, open, handleClose, handleClickAction, onClick, reset }
}
