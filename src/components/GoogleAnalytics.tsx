import Script from 'next/script'
import { DATA_WAREHOUSE_ENV } from '../config/constants'

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => {
  if (DATA_WAREHOUSE_ENV !== 'production') {
    console.log('No google analytic tracking, development environment')
    return null
  }
  if (!ga_id) {
    console.error('Google Analytics ID is missing')
    return null
  }
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?
      id=${ga_id}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga_id}');
        `
        }}
      ></Script>
    </>
  )
}
export default GoogleAnalytics
