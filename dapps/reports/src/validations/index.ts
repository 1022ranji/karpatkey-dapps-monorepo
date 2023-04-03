import { date, mixed, object, string } from 'yup'

export const filterSchemaValidation = object({
  daoNameName: string().notRequired(),
  period: date().notRequired(),
  periodType: mixed()
    .oneOf(['day', 'week', 'month', 'year'] as const)
    .notRequired()
})
