import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { spawn } from 'child_process'
import type { NextApiRequest, NextApiResponse } from 'next'

type Status = {
  data: {
    status: boolean
    trx?: Maybe<string>
    error?: Maybe<Error>
  }
}

export default withApiAuthRequired(function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status>
) {
  return new Promise<void>((resolve, reject) => {
    try {
      let message: string
      // spawn new child process to call the python script
      const python = spawn('python3', [`./../../shared/scripts/main.py`, '-p', '20'])

      // collect data from script
      python.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...')
        message = data.toString()
      })

      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} and message: ${message}`)

        const status = code === 120 || message?.includes('Success')
        const match = message?.match(
          /\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/gi
        )
        const trx = match ? match[0].substring(0, match[0].indexOf('|')) : null

        const data = {
          status,
          trx
        }

        // send data to browser
        res.status(200).json({ data })
        resolve()
      })
    } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ data: { status: false, error: error as Error } })
      reject()
    }
  })
})
