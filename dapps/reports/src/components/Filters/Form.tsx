import { ActionKind, useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import { AutocompleteOption } from '@karpatkey-monorepo/shared/components/CustomAutocomplete'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Button, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import DAOAutocomplete from 'dapps/reports/src/components/Filters/FormElements/DAOAutocomplete'
import MonthAutocomplete, {
  MONTHS
} from 'dapps/reports/src/components/Filters/FormElements/MonthAutocomplete'
import YearAutocomplete, {
  YEARS
} from 'dapps/reports/src/components/Filters/FormElements/YearAutocomplete'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

const ButtonStyled = styled(Button)({
  padding: '6px 14px',
  width: '152px',
  height: '48px'
})

type FormValues = {
  dao: Maybe<AutocompleteOption>
  month: Maybe<AutocompleteOption>
  year: Maybe<AutocompleteOption>
}

const validationSchema = yup
  .object({
    dao: yup.object().required(),
    month: yup.object().required(),
    year: yup.object().required()
  })
  .required()

const useYupValidationResolver = (validationSchema: any) =>
  React.useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        const dao = FILTER_DAOS.find((option: FILTER_DAO) => {
          return option.id === values.dao.id
        })
        let errors = {}
        if (!dao)
          errors = {
            inner: { type: 'DAO_NOT_FOUND', message: 'DAO not found' }
          }

        if (dao && (values.month.id < dao.sinceMonth || values.year.id < dao.sinceYear)) {
          errors = {
            inner: {
              type: 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD',
              message: `Report not available for the period. Should be greater than ${dao.sinceMonth}/${dao.sinceYear}`
            }
          }
        }

        const actualMonth = DateTime.local().month
        const actualYear = DateTime.local().year
        if (values.month.id > actualMonth && values.year.id >= actualYear) {
          errors = {
            inner: {
              type: 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD',
              message: `The date selected is greater than the current date`
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
}

const Form = ({ onRequestClose }: FormProps) => {
  const { state, dispatch } = useFilter()
  const router = useRouter()

  const filter = state.value

  // DAO default value
  const filterDaoOption = FILTER_DAOS.find((option: FILTER_DAO) => option.id === Number(filter.dao))

  const defaultDaoValue = filterDaoOption
    ? ({
        logo: filterDaoOption.icon,
        label: filterDaoOption.name,
        id: filterDaoOption.id
      } as AutocompleteOption)
    : null

  // Month default value
  const filterMonthOption = MONTHS.find((option) => option.id === Number(filter.month))
  const defaultMonthValue = filterMonthOption ? filterMonthOption : null

  // Year default value
  const filterYearOption = YEARS.find((option) => option.id === Number(filter.year))
  const defaultYearValue = filterYearOption ? filterYearOption : null

  // Yup validation
  const resolver = useYupValidationResolver(validationSchema)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      dao: defaultDaoValue,
      month: defaultMonthValue,
      year: defaultYearValue
    },
    resolver
  })

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const month = data?.month?.id
    const dao = data?.dao?.id
    const year = data?.year?.id

    if (month === undefined || dao === undefined || year === undefined) return

    onRequestClose()
    dispatch({
      type: ActionKind.UPDATE,
      payload: {
        value: { month: Number(month), dao: Number(dao), year: Number(year) },
        error: null
      }
    })
    const href = `/?dao=${dao}&month=${month}&year=${year}`
    router.push(href)
  }

  return (
    <Box
      sx={{ p: '15px', width: '563px', backgroundColor: 'custom.grey.light', borderRadius: '4px' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BoxWrapperColumn gap={2}>
          <BoxWrapperRow gap={2}>
            <Stack width={283}>
              <DAOAutocomplete control={control} name={'dao'} />
            </Stack>
            <Stack width={200}>
              <MonthAutocomplete control={control} name={'month'} />
            </Stack>
            <Stack width={150}>
              <YearAutocomplete control={control} name={'year'} />
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
              See report
            </ButtonStyled>
          </BoxWrapperRow>
        </BoxWrapperColumn>
      </form>
    </Box>
  )
}

export default Form
