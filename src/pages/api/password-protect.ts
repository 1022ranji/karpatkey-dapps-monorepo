import { PASSWORD_PROTECT } from '../../config/constants'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
  }
  const password = req.body.password

  if (PASSWORD_PROTECT === password) {
    const cookie = serialize('login', 'true', {
      path: '/',
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      httpOnly: true
    })
    res.setHeader('Set-Cookie', cookie)
    res.redirect(302, '/')
  } else {
    const url = new URL('/password-protect', req.headers['origin'])
    url.searchParams.append('error', 'Incorrect Password')
    res.redirect(url.toString())
  }
}
