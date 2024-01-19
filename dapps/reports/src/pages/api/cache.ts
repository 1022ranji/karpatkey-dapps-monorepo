import { register } from 'ts-node'
import type { NextApiRequest, NextApiResponse } from 'next'

type Status = {
  data: {
    status: boolean
    message?: Maybe<string>
    error?: Maybe<Error>
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Status>) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      register({ transpileOnly: true })
      const result1 = await import('@karpatkey-monorepo/reports/src/scripts/generateDashboard')
      const result2 = await import('@karpatkey-monorepo/reports/src/scripts/generateReports')

      console.log('result1: ', result1)
      console.log('result2: ', result2)
      // send data to browser
      res.status(200).json({ data: { status: true, message: 'Cache successfully regenerated' } })
      resolve()
    } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ data: { status: false, error } } as Status)
      reject()
    }
  })
}
