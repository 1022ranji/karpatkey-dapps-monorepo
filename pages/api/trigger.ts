// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { spawn } from 'child_process'
import type { NextApiRequest, NextApiResponse } from 'next'

type Status = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Status>) {
  return new Promise<void>((resolve, reject) => {
    try {
      let message: string
      // spawn new child process to call the python script
      const python = spawn('python3', ['./scripts/example.py'])

      // collect data from script
      python.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...')
        message = data.toString()
      })

      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} and message: ${message}`)
        // send data to browser
        res.status(200).json({ message })
        resolve()
      })
    } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ message: 'There was an error executing the script' })
      reject()
    }
  })
}
