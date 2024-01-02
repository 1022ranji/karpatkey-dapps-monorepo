import PageLayout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { Filter, ReportProps } from '@karpatkey-monorepo/reports/src/types'
import { getCommonServerSideProps } from '@karpatkey-monorepo/reports/src/utils/serverSide'
import { filterSchemaValidation } from '@karpatkey-monorepo/reports/src/validations'
import dynamic from 'next/dynamic'
import { GetServerSidePropsContext } from 'next/types'
import React, { ReactElement } from 'react'
import { FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'

const HomepageContent = dynamic(() => import('@karpatkey-monorepo/reports/src/views/Homepage'))
const DashboardContent = dynamic(() => import('@karpatkey-monorepo/reports/src/views/Dashboard'))

const Homepage = (props: ReportProps) => {
  const { month, dao, year } = props
  const isFilterEmpty = !month && !dao && !year

  if (isFilterEmpty) {
    return <DashboardContent {...props} />
  }

  return <HomepageContent {...props} />
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

  const serverSideProps = await getCommonServerSideProps(params)

  // Pass data to the page via props
  return {
    props: {
      ...serverSideProps,
      ...params
    }
  }
}
