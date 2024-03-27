import { number, object, string } from 'yup'

export const filterSchemaValidation = object({
  dao: number().notRequired().min(0, 'Minimum at least 0').max(9, 'Allowed maximum is 9'),
  month: number().notRequired().min(1, 'Minimum at least 1').max(12, 'Allowed maximum is 12'),
  year: number()
    .notRequired()
    .min(2020, 'Minimum at least 2020')
    .max(2050, 'Allowed maximum is 2050'),
  currency: string()
    .notRequired()
    .matches(/^(USD|ETH)$/, 'Invalid currency')
})
