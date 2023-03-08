import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import PageLayout from '../components/Layout/Layout'

const HomepageContent = dynamic(() => import('../views/Homepage'), { ssr: false })

const Homepage = (): ReactElement => <HomepageContent />

Homepage.getTitle = 'Home'

Homepage.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>

export default Homepage
