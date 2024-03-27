import { Button } from '@mui/material'
import * as React from 'react'

interface Filter {
  handleOnClick: () => void
}

export const FilterMobile = ({ handleOnClick }: Filter) => (
  <Button
    onClick={handleOnClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      height: '42px',
      padding: '6px 14px',
      color: '#1A1A1A',
      background: '#EEEDED',
      borderRadius: '40px',
      border: '1px solid #222222',
      '&:hover': {
        background: '#FFFFFF'
      },
      fontSize: '14px'
    }}
  >
    Filter
  </Button>
)
