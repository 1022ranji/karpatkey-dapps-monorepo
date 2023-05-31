import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

const saveAsPdf = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()

  // The value of waitUntil determines whether the navigation is considered to be successful.
  // The default value is load, where the navigation is considered to be finished when the load event is
  // fired but we want to wait until there are no more than 0 network connections for at least 500ms by using the value
  // networkidle0. Alternatively, networkidle2 can be used to consider successful navigation when there are no more
  // than 2 network connections for at least 500ms. Besides these values, domcontentloaded is also another option,
  // and we will use this when generating a PDF directly from an HTML file later.
  await page.goto(url, { waitUntil: 'networkidle0' })

  const result = await page.pdf({
    format: 'a4',
    printBackground: true
  })
  await browser.close()

  return result
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query

  res.setHeader('Content-Disposition', `attachment; filename="file.pdf"`)
  res.setHeader('Content-Type', 'application/pdf')

  const pdf = await saveAsPdf(url as string)

  return res.send(pdf)
}
