import ButtonAction from '@karpatkey-monorepo/panic-button/src/components/ButtonActions/ButtonAction'
import React from 'react'
import BoxWrapperRow from 'shared/components/Wrappers/BoxWrapperRow'

export default function UpdateCache() {
  return (
    <BoxWrapperRow justifyContent="flex-start" mb="10px" gap="10px">
      <ButtonAction
        buttonTitle="Update cache"
        modalDialogTitle="Are you sure you want to update the cache?"
        modalDialogDescription="This will update the cache."
        successMessage="Cache updated successfully."
        okButtonTitle="Update"
        cancelButtonTitle="Cancel"
        actionURL="/api/cache"
      />
    </BoxWrapperRow>
  )
}
