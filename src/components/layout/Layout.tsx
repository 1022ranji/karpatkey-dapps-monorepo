import { Wrapper as DashboardWrapper } from './dashboard/Wrapper'
import { Body as DashboardBody } from './dashboard/Body'
import { Header as DashboardHeader } from './dashboard/Header'

import { Wrapper as ReportMobileWrapper } from './report/mobile/Wrapper'
import { Body as ReportMobileBody } from './report/mobile/Body'
import { Header as ReportMobileHeader } from './report/mobile/Header'
import { Footer as ReportMobileFooter } from './report/mobile/Footer'

import { Wrapper as ReportDesktopWrapper } from './report/desktop/Wrapper'
import { Body as ReportDesktopBody } from './report/desktop/Body'
import { Header as ReportDesktopHeader } from './report/desktop/Header'
import { Sidebar as ReportDesktopSidebar } from './report/desktop/Sidebar'
import { Footer as ReportDesktopFooter } from './report/desktop/Footer'

import { Footer as DashboardFooter } from './dashboard/Footer'

import { Theme } from '@mui/material'
import React, { ReactElement } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ReportDesktopBodyWrapper } from 'components/layout/report/desktop/BodyWrapper'

interface LayoutProps {
  children: React.ReactElement
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  const queryParams = new URLSearchParams(window.location.search)
  const daoParam = queryParams.get('dao')
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')
  const currencyParam = queryParams.get('currency')

  const isSidebarVisible = !!(daoParam && yearParam && monthParam && currencyParam)
  const isMD = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return isSidebarVisible ? (
    isMD ? (
      <ReportDesktopWrapper>
        <ReportDesktopHeader />
        <ReportDesktopBodyWrapper>
          <ReportDesktopSidebar />
          <ReportDesktopBody component="main">
            {children}
            <ReportDesktopFooter />
          </ReportDesktopBody>
        </ReportDesktopBodyWrapper>
      </ReportDesktopWrapper>
    ) : (
      <ReportMobileWrapper>
        <ReportMobileHeader />
        <ReportMobileBody component="main">{children}</ReportMobileBody>
        <ReportMobileFooter />
      </ReportMobileWrapper>
    )
  ) : (
    <DashboardWrapper>
      <DashboardHeader />
      <DashboardBody component="main">{children}</DashboardBody>
      <DashboardFooter />
    </DashboardWrapper>
  )
}
