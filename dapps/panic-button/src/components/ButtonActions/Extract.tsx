import ButtonAction from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ButtonAction'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import TextField from '@mui/material/TextField'
import React from 'react'

export default function ExtractAction() {
  return (
    <BoxWrapperRow justifyContent="flex-end" mb="10px" gap="10px">
      <ButtonAction
        buttonTitle="Withdraw"
        modalDialogTitle="Are you sure you want to withdraw some funds?"
        modalDialogDescription="Please enter the percentage of funds to be withdrawn."
        successMessage="Action executed successfully."
        actionURL="/api/withdraw"
        okButtonTitle="Withdraw"
        cancelButtonTitle="Cancel"
        component={
          <TextField
            autoFocus
            margin="dense"
            id="percentage"
            label="Percentage"
            type="number"
            fullWidth
            variant="standard"
          />
        }
      />
    </BoxWrapperRow>
  )
}
