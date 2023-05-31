import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BlockchainAutocomplete from '@karpatkey-monorepo/shared/components/Form/BlockchainAutocomplete'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Button, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

const ButtonStyled = styled(Button)({
  padding: '6px 14px',
  width: '152px',
  height: '48px'
})

type FormValues = {
  blockchain: Maybe<AutocompleteOption>
}

const validationSchema = yup.object({
  blockchain: yup.object().notRequired()
})

const useYupValidationResolver = (validationSchema: any) =>
  React.useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        const errors = {}

        return {
          values,
          errors
        }
      } catch (errors) {
        return {
          values: {},
          errors: (errors as any).inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )

interface FormProps {
  onRequestClose: () => void
  onSubmitClose: (blockchain: string) => void
  defaultBlockchainValue?: Maybe<AutocompleteOption>
  blockchainOptions: AutocompleteOption[]
}

const Form = (props: FormProps) => {
  const { onRequestClose, defaultBlockchainValue, blockchainOptions, onSubmitClose } = props

  // Yup validation
  const resolver = useYupValidationResolver(validationSchema)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      blockchain: defaultBlockchainValue
    },
    resolver
  })

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const blockchain = data?.blockchain?.id ?? ''

    onRequestClose()

    onSubmitClose(String(blockchain))
  }

  return (
    <Box
      sx={{ p: '15px', width: '563px', backgroundColor: 'custom.grey.light', borderRadius: '4px' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BoxWrapperColumn gap={2}>
          <BoxWrapperRow gap={2}>
            <Stack width={200}>
              <BlockchainAutocomplete
                options={blockchainOptions}
                control={control}
                name={'blockchain'}
              />
            </Stack>
          </BoxWrapperRow>
          <BoxWrapperRow gap={2} sx={{ justifyContent: 'space-between' }}>
            {errors && Object.values(errors).length > 0 && (
              <BoxWrapperRow gap={1}>
                <WarningIcon sx={{ color: 'custom.error' }} />
                <CustomTypography
                  variant="filterErrorMessage"
                  sx={{ '::first-letter': { textTransform: 'capitalize' } }}
                >
                  {Object.values(errors)[0].message}
                </CustomTypography>
              </BoxWrapperRow>
            )}
            <ButtonStyled sx={{ marginLeft: 'auto' }} type="submit">
              Apply filter
            </ButtonStyled>
          </BoxWrapperRow>
        </BoxWrapperColumn>
      </form>
    </Box>
  )
}

export default Form
