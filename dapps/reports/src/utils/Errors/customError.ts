import { ErrorBase } from '@karpatkey-monorepo/reports/src/utils/Errors/errorBase.class'

type ErrorName = 'REPORT_NOT_AVAILABLE_FOR_THE_PERIOD' | 'DAO_NOT_FOUND'

export class CustomError extends ErrorBase<ErrorName> {}
