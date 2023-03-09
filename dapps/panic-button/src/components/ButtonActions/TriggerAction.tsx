import ButtonAction from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ButtonAction'
import Box from '@mui/material/Box'
import React from 'react'

export default function TriggerAction() {
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
        buttonTitle="Trigger"
        modalDialogTitle="Are you sure?"
        modalDialogDescription="This will trigger the action."
        successMessage="Action triggered successfully."
        actionURL="/api/trigger"
      />
    </Box>
  )
}
