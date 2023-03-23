import { date, mixed, object, string } from 'yup'

export const filterSchemaValidation = object({
  chainId: mixed()
    .oneOf([0, 1, 100] as const)
    .notRequired(),
  daoAddress: string().notRequired(),
  period: date().notRequired(),
  periodType: mixed()
    .oneOf(['day', 'week', 'month', 'year'] as const)
    .notRequired()
})
