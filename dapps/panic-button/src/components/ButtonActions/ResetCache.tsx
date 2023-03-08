import Box from '@mui/material/Box'
import React from 'react'

import ButtonAction from '../../components/ButtonActions/ButtonAction'

export default function ResetCache() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mb: '10px',
        gap: '10px'
      }}
    >
      <ButtonAction
        buttonTitle="Reset cache"
        modalDialogTitle="Are you sure?"
        modalDialogDescription="This will reset the cache."
        successMessage="Cache reset successfully."
        actionURL="/api/cache"
      />
    </Box>
  )
}
