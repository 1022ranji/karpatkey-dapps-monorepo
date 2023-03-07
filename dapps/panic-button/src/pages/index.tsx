import PageLayout from '@/src/components/Layout/Layout'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const HomepageContent = dynamic(() => import('../views/Homepage'), { ssr: false })

const Homepage = (): ReactElement => <HomepageContent />

Homepage.getTitle = 'Home'

Homepage.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>

export default Homepage
