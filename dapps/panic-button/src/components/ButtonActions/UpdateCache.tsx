import ButtonAction from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ButtonAction'
import Box from '@mui/material/Box'
import React from 'react'

export default function UpdateCache() {
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
        buttonTitle="Update cache"
        modalDialogTitle="Are you sure you want to update the cache?"
        modalDialogDescription="This will update the cache."
        successMessage="Cache updated successfully."
        okButtonTitle="Update"
        cancelButtonTitle="Cancel"
        actionURL="/api/cache"
      />
    </Box>
  )
}
