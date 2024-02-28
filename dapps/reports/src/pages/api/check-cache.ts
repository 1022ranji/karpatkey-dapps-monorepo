import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { existsSync } from 'fs'
import { FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Check DAOs cache
      const existDAOCache = FILTER_DAOS.reduce((acc, { id, isEnabled }) => {
        if (!isEnabled) {
          return acc
        }

        const pathFile = path.resolve(process.cwd(), `./cache/${id}.json`)
        const existFileCache = existsSync(pathFile)

        if (!existFileCache) {
          return false
        }
        return acc
      }, true)

      // Check dashboard cache
      const pathFile = path.resolve(process.cwd(), './cache/dashboard.json')
      const existDashboardCache = existsSync(pathFile)

      const existCache = existDAOCache && existDashboardCache

      res.status(200).json({ existCache })
      resolve()
    } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ data: { status: false, error } })
      reject()
    }
  })
}
