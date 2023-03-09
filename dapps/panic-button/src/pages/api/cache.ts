import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import Cache from '@karpatkey-monorepo/shared/services/classes/cache.class'
import { DataWarehouse } from '@karpatkey-monorepo/shared/services/classes/dataWarehouse.class'
import type { NextApiRequest, NextApiResponse } from 'next'

type Status = {
  data: {
    status: boolean
    message?: Maybe<string>
    error?: Maybe<Error>
  }
}

export default withApiAuthRequired(function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status>
) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const cache = Cache.getInstance()

      // Step 1: Create a BigQuery client
      const dataWarehouse = DataWarehouse.getInstance()

      // Step 2: Query the data
      const reportData = await dataWarehouse.getBalanceReports()
      cache.writeBalanceReports(reportData)

      // send data to browser
      res.status(200).json({ data: { status: true, message: 'Cache successfully regenerated' } })
      resolve()
    } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ data: { status: false, error: error as Error } })
      reject()
    }
  })
})
