import { Button, Snackbar } from '@mui/material'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import { AnimatePresenceWrapper } from 'src/components'
import { useApp } from '../contexts/app.context'

interface State extends SnackbarOrigin {
  open: boolean
}

export const Share = () => {
  const { state } = useApp()
  const { year, month, DAO: filterDAO, currency } = state

  const value = React.useMemo(() => {
    const query = new URLSearchParams()
    const url = window.location.href.split('?')[0]
    if (filterDAO) query.append('dao', filterDAO + '')
    if (month) query.append('month', month + '')
    if (year) query.append('year', year + '')
    if (currency) query.append('currency', currency + '')
    return `${url}?${query.toString()}`
  }, [month, filterDAO, year, currency])

  const isShareButtonEnable = React.useMemo(() => {
    return !!month || !!filterDAO || !!year || !!currency
  }, [month, filterDAO, year, currency])

  // Snackbar state and handlers
  const [snackbarState, setSnackbarState] = React.useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = snackbarState

  const handleClick = (newState: SnackbarOrigin) => () => {
    if (isShareButtonEnable) {
      setSnackbarState({ ...newState, open: true })
    }
  }

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false })
  }

  return (
    <AnimatePresenceWrapper>
      <CopyToClipboard text={value}>
        <Button
          sx={{
            ...(isShareButtonEnable
              ? { backgroundColor: '#1A1A1A !important' }
              : { backgroundColor: '#7A7A7A !important' }),
            width: '110px',
            height: '48px'
          }}
          onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}
        >
          Share
        </Button>
      </CopyToClipboard>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Link copied!"
        key={vertical + horizontal}
        autoHideDuration={2000}
      />
    </AnimatePresenceWrapper>
  )
}
