import { Header as DashboardHeader } from './dashboard/Header'
import { Body as DashboardBody } from './dashboard/Body'

import { Header as ReportHeader, HEADER_HEIGHT } from './report/Header'
import { Body as ReportBody } from './report/Body'
import { Sidebar as ReportSidebar } from './report/Sidebar'

import { Footer as CommonFooter } from './Footer'

import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactElement } from 'react'
import { BoxWrapperColumn } from 'src/components'

interface LayoutProps {
  children: React.ReactElement
}

const DashboardWrapper = styled(BoxWrapperColumn)(() => ({
  height: '100vh',
  width: '100vw'
}))

const ReportWrapper = styled(BoxWrapperColumn)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  margin: '0'
}))

const ReportBodyWrapper = styled(Box)(() => ({
  display: `flex`,
  height: `calc(100vh - ${HEADER_HEIGHT}px)`
}))

export const Layout = ({ children }: LayoutProps): ReactElement => {
  const queryParams = new URLSearchParams(window.location.search)
  const daoParam = queryParams.get('dao')
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')

  const isSidebarVisible = !!(daoParam && yearParam && monthParam)

  return isSidebarVisible ? (
    <ReportWrapper>
      <ReportHeader />
      <ReportBodyWrapper>
        <ReportSidebar />
        <ReportBody component="main">{children}</ReportBody>
      </ReportBodyWrapper>
    </ReportWrapper>
  ) : (
    <DashboardWrapper>
      <DashboardHeader />
      <DashboardBody component="main">{children}</DashboardBody>
      <CommonFooter />
    </DashboardWrapper>
  )
}
