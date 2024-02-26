import PageLayout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { Filter, ReportProps } from '@karpatkey-monorepo/reports/src/types'
import { filterSchemaValidation } from '@karpatkey-monorepo/reports/src/validations'
import { GetServerSidePropsContext } from 'next/types'
import React, { ReactElement } from 'react'
import { FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import DashboardContent from '@karpatkey-monorepo/reports/src/views/Dashboard'
import HomepageContent from '@karpatkey-monorepo/reports/src/views/Homepage'
import { readFileSync } from 'fs'
import path from 'path'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'
import {
  clearState,
  updateCurrency,
  updateDAO,
  updateDashboard,
  updateMonth,
  updateReport,
  updateYear
} from '@karpatkey-monorepo/reports/src/contexts/reducers'
import { Currency, Dashboard, Report } from '@karpatkey-monorepo/reports/src/contexts/state'

const Homepage = (props: ReportProps) => {
  const { month, dao, year, metrics, daoResume, report, currency } = props
  const isFilterEmpty = !month && !dao && !year

  const { dispatch } = useApp()

  React.useEffect(() => {
    const start = () => {
      dispatch(clearState())

      if (dao) dispatch(updateDAO(+dao))
      if (year) dispatch(updateYear(+year))
      if (month) dispatch(updateMonth(+month))

      if (metrics && daoResume) {
        const dashboard = { metrics, daoResume } as unknown as Dashboard
        dispatch(updateDashboard(dashboard))
      }

      if (report) {
        dispatch(updateReport(report as Report))
      }

      if (currency) {
        dispatch(updateCurrency(currency))
      }
    }

    start()
  }, [dispatch, dao, year, month, metrics, daoResume, report, currency])

  if (isFilterEmpty) {
    return <DashboardContent />
  }

  return <HomepageContent />
}

Homepage.getTitle = 'Home'

Homepage.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>

export default Homepage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx
  const { month = null, year = null, dao = null } = query

  if (month && year && dao) {
    const allowedMonthAndYear = FILTER_DAOS.find((option) => {
      return +option.id === +dao
    })?.datesAllowed?.find((option) => {
      return +option.year === +year && +option.month === +month
    })

    if (!allowedMonthAndYear) {
      return {
        redirect: {
          permanent: false,
          destination: '/500'
        }
      }
    }
  }

  const params = { dao, month, year } as Filter

  // Throw an error if the dao is LIDO
  if (dao && +dao === 7) {
    return {
      redirect: {
        permanent: false,
        destination: '/500'
      }
    }
  }

  // We validate the params here to avoid any errors in the page
  await filterSchemaValidation.validate(params)

  try {
    const pathFile = path.resolve(process.cwd(), './cache/dashboard.json')
    const dashboard = JSON.parse(readFileSync(pathFile, 'utf8'))

    let report = null
    if (dao && month && year) {
      const pathFile = path.resolve(process.cwd(), `./cache/${dao}.json`)
      const reports = JSON.parse(readFileSync(pathFile, 'utf8'))

      report = reports[+year][+month]
    }

    // Get allowed currencies from FILTER_DAOS
    const currenciesAllowed = FILTER_DAOS.find(
      (daoItem) => dao && +daoItem.id === +dao
    )?.currenciesAllowed

    const props = {
      ...dashboard,
      report,
      currency: currenciesAllowed?.[0] ?? Currency.USD,
      ...params
    }

    return { props }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/400'
      }
    }
  }
}
