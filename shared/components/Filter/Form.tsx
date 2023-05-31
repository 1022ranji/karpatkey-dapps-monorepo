import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BlockchainAutocomplete from '@karpatkey-monorepo/shared/components/Form/BlockchainAutocomplete'
import ProtocolAutocomplete from '@karpatkey-monorepo/shared/components/Form/ProtocolAutocomplete'
import TokenAutocomplete from '@karpatkey-monorepo/shared/components/Form/TokenAutocomplete'
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
  protocol: Maybe<AutocompleteOption>
  token: Maybe<AutocompleteOption>
}

const validationSchema = yup.object({
  blockchain: yup.object().notRequired(),
  protocol: yup.object().notRequired(),
  token: yup.object().notRequired()
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
  onSubmitClose: ({
    blockchain,
    protocol,
    token
  }: {
    blockchain: string | number
    protocol?: string | number
    token?: string | number
  }) => void
  defaultBlockchainValue: Maybe<AutocompleteOption>
  defaultProtocolValue?: Maybe<AutocompleteOption>
  defaultTokenValue?: Maybe<AutocompleteOption>
  blockchainOptions: AutocompleteOption[]
  protocolOptions?: AutocompleteOption[]
  tokenOptions?: AutocompleteOption[]
}

const Form = (props: FormProps) => {
  const {
    onRequestClose,
    defaultBlockchainValue = null,
    defaultTokenValue = null,
    defaultProtocolValue = null,
    blockchainOptions,
    protocolOptions = [],
    tokenOptions = [],
    onSubmitClose
  } = props

  // Yup validation
  const resolver = useYupValidationResolver(validationSchema)

  const defaultValues: FormValues = {
    blockchain: defaultBlockchainValue,
    protocol: defaultProtocolValue,
    token: defaultTokenValue
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver
  })

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const blockchain = data?.blockchain?.id ?? ''
    const protocol = data?.protocol?.id ?? ''
    const token = data?.token?.id ?? ''

    onRequestClose()

    const params = {
      blockchain,
      protocol,
      token
    }
    onSubmitClose(params)
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
            {protocolOptions.length > 0 ? (
              <Stack width={200}>
                <ProtocolAutocomplete
                  options={protocolOptions}
                  control={control}
                  name={'protocol'}
                />
              </Stack>
            ) : null}
            {tokenOptions.length > 0 ? (
              <Stack width={200}>
                <TokenAutocomplete options={tokenOptions} control={control} name={'token'} />
              </Stack>
            ) : null}
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
