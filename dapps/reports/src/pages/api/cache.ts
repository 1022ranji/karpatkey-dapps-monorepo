import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { DataWarehouse } from '@karpatkey-monorepo/reports/src/services/classes/dataWarehouse.class'
import { ALLOWED_REPORTS } from '@karpatkey-monorepo/shared/config/constants'
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
      const cache = Cache.getInstance()

      const dataWarehouse = DataWarehouse.getInstance()

      // Step 2: Query the data
      const cachePromises = ALLOWED_REPORTS.map(async (report) => {
        const reportData = await dataWarehouse[report.reportName]()
        cache.writeApi(report.reportName, reportData)
      })
      await Promise.all(cachePromises)

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
