import { handleAuth } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default handleAuth({
  onError(req: NextApiRequest, res: NextApiResponse) {
    // Add your own custom error handling
    res.redirect(307, '/401')
  }
})
