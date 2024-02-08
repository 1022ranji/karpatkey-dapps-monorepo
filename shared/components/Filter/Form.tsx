import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BlockchainAutocomplete from '@karpatkey-monorepo/shared/components/Form/BlockchainAutocomplete'
import DAOAutocomplete from '@karpatkey-monorepo/shared/components/Form/DAOAutocomplete'
import ProtocolAutocomplete from '@karpatkey-monorepo/shared/components/Form/ProtocolAutocomplete'
import TokenAutocomplete from '@karpatkey-monorepo/shared/components/Form/TokenAutocomplete'
import DeFiTypeAutocomplete from '@karpatkey-monorepo/shared/components/Form/DeFiTypeAutocomplete'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { MONTHS } from '@karpatkey-monorepo/shared/config/constants'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Button, ClickAwayListener, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import { DateTime } from 'luxon'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import YearMonthAutocomplete from '../Form/YearMonthAutocomplete'

const ButtonStyled = styled(Button)({
  padding: '6px 14px',
  width: '152px',
  height: '48px'
})

type FormValues = {
  blockchain: Maybe<AutocompleteOption>
  protocol: Maybe<AutocompleteOption>
  token: Maybe<AutocompleteOption>
  deFiType: Maybe<AutocompleteOption>
  DAO: Maybe<AutocompleteOption>
  yearMonth: Maybe<AutocompleteOption>
}

const validationSchema = yup.object({
  blockchain: yup.object().notRequired(),
  protocol: yup.object().notRequired(),
  token: yup.object().notRequired(),
  deFiType: yup.object().notRequired(),
  DAO: yup.object().notRequired(),
  yearMonth: yup.object().notRequired()
})

const useYupValidationResolver = (validationSchema: any, shouldCheckDAOFilter: boolean) =>
  React.useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        let errors = {}

        if (shouldCheckDAOFilter) {
          const dao = FILTER_DAOS.find((option: FILTER_DAO) => {
            return option.id === values?.DAO?.id
          })

          if (!dao)
            errors = {
              inner: {
                type: 'DAO_NOT_FOUND',
                message: 'DAO not found. It should be selected from the list.'
              }
            }

          if (!values?.yearMonth?.id) {
            errors = {
              inner: {
                type: 'YEAR_MONTH_REQUIRED',
                message: `Period is required`
              }
            }
          }

          if (dao && values?.yearMonth?.id) {
            const [year, month] = values?.yearMonth?.id.split('-')
            const periodAllowed =
              FILTER_DAOS.find((option: FILTER_DAO) => {
                return option.id === values?.DAO?.id
              })?.datesAllowed?.find((option) => {
                return +option.year === +year && +option.month === +month
              }) ?? null

            const monthLabel =
              MONTHS.find((option) => {
                return +option.id === +month
              })?.label ?? ''

            if (!periodAllowed)
              errors = {
                inner: {
                  type: 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD',
                  message: `Report not available for the period. Should be since ${monthLabel} ${dao.sinceYear}`
                }
              }
          }

          const actualMonth = DateTime.local().month
          const actualYear = DateTime.local().year
          if (values?.month?.id > actualMonth && values?.year?.id >= actualYear) {
            errors = {
              inner: {
                type: 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD',
                message: `The date selected is greater than the current date`
              }
            }
          }
        }

        return {
          values,
          errors
        }
      } catch (errors) {
        return {
          values: {},
          errors: (errors as any).inner?.reduce(
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

export type SubmitValues = {
  blockchain?: string | number
  protocol?: string | number
  token?: string | number
  deFiType?: string | number
  DAO?: string | number
  yearMonth?: string | number
}

interface FormProps {
  onRequestClose: () => void
  onSubmitClose: (data: SubmitValues) => void
  defaultBlockchainValue?: Maybe<AutocompleteOption>
  defaultProtocolValue?: Maybe<AutocompleteOption>
  defaultTokenValue?: Maybe<AutocompleteOption>
  defaultDeFiTypeValue?: Maybe<AutocompleteOption>
  defaultDAOValue?: Maybe<AutocompleteOption>
  defaultYearMonthValue?: Maybe<AutocompleteOption>
  blockchainOptions?: AutocompleteOption[]
  protocolOptions?: AutocompleteOption[]
  tokenOptions?: AutocompleteOption[]
  deFiTypeOptions?: AutocompleteOption[]
  enableProtocol?: boolean
  enableBlockchain?: boolean
  enableToken?: boolean
  enableDeFiType?: boolean
  enableDAO?: boolean
  enableYearMonth?: boolean
  buttonTitle?: string
}

const Form = (props: FormProps) => {
  const {
    onRequestClose,
    defaultBlockchainValue = null,
    defaultTokenValue = null,
    defaultProtocolValue = null,
    defaultDeFiTypeValue = null,
    defaultDAOValue = null,
    defaultYearMonthValue = null,
    blockchainOptions = [],
    protocolOptions = [],
    tokenOptions = [],
    deFiTypeOptions = [],
    onSubmitClose,
    enableToken = false,
    enableBlockchain = false,
    enableProtocol = false,
    enableDeFiType = false,
    enableDAO = false,
    enableYearMonth = false,
    buttonTitle
  } = props

  // Yup validation
  const resolver = useYupValidationResolver(validationSchema, enableDAO && enableYearMonth)

  const defaultValues: FormValues = {
    blockchain: defaultBlockchainValue,
    protocol: defaultProtocolValue,
    token: defaultTokenValue,
    deFiType: defaultDeFiTypeValue,
    DAO: defaultDAOValue,
    yearMonth: defaultYearMonthValue
  }

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver
  })

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const blockchain = data?.blockchain?.id ?? ''
    const protocol = data?.protocol?.id ?? ''
    const token = data?.token?.id ?? ''
    const deFiType = data?.deFiType?.id ?? ''
    const DAO = data?.DAO?.id ?? ''
    const yearMonth = data?.yearMonth?.id ?? ''

    onRequestClose()

    const params = {
      blockchain,
      protocol,
      token,
      deFiType,
      DAO,
      yearMonth
    }
    onSubmitClose(params)
  }

  const DAOWatched = watch('DAO')
  const yearMonthWatched = watch('yearMonth')

  const selectedValues = {
    DAO: DAOWatched?.id,
    yearMonth: yearMonthWatched?.id
  }

  return (
    <ClickAwayListener onClickAway={onRequestClose}>
      <Box
        sx={{
          p: '15px',
          minWidth: 260,
          width: 'max-content',
          backgroundColor: 'custom.grey.light',
          borderRadius: '4px'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <BoxWrapperColumn gap={2}>
            <BoxWrapperRow gap={2}>
              {enableBlockchain ? (
                <Stack width={200}>
                  <BlockchainAutocomplete
                    options={blockchainOptions}
                    control={control}
                    name={'blockchain'}
                  />
                </Stack>
              ) : null}
              {enableProtocol ? (
                <Stack width={200}>
                  <ProtocolAutocomplete
                    options={protocolOptions}
                    control={control}
                    name={'protocol'}
                  />
                </Stack>
              ) : null}
              {enableToken ? (
                <Stack width={200}>
                  <TokenAutocomplete options={tokenOptions} control={control} name={'token'} />
                </Stack>
              ) : null}
              {enableDeFiType ? (
                <Stack width={200}>
                  <DeFiTypeAutocomplete
                    options={deFiTypeOptions}
                    control={control}
                    name={'deFiType'}
                  />
                </Stack>
              ) : null}
              {enableDAO ? (
                <Stack width={200}>
                  <DAOAutocomplete
                    control={control}
                    name={'DAO'}
                    onChangeProps={
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      (value: any) => {
                        // Selected DAO changed, reset yearMonth
                        setValue('yearMonth', null)
                      }
                    }
                  />
                </Stack>
              ) : null}
              {enableYearMonth ? (
                <Stack width={200}>
                  <YearMonthAutocomplete
                    control={control}
                    name={'yearMonth'}
                    selectedValues={selectedValues}
                  />
                </Stack>
              ) : null}
            </BoxWrapperRow>
            <BoxWrapperRow gap={2} sx={{ justifyContent: 'space-between' }}>
              {errors && Object.values(errors).length > 0 && (
                <BoxWrapperRow gap={1}>
                  <WarningIcon sx={{ color: 'custom.error' }} />
                  <CustomTypography
                    variant="filterErrorMessage"
                    sx={{
                      '::first-letter': { textTransform: 'capitalize' },
                      wordBreak: 'break-word',
                      maxWidth: '350px'
                    }}
                  >
                    {Object.values(errors)[0].message}
                  </CustomTypography>
                </BoxWrapperRow>
              )}
              <ButtonStyled sx={{ marginLeft: 'auto' }} type="submit">
                {buttonTitle}
              </ButtonStyled>
            </BoxWrapperRow>
          </BoxWrapperColumn>
        </form>
      </Box>
    </ClickAwayListener>
  )
}

export default Form
