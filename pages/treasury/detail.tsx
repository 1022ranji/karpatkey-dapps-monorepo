import googleCredentials from '@/google-credentials.json'
import { BigQuery } from '@google-cloud/bigquery'
import Typography from '@mui/material/Typography'
import * as React from 'react'

interface IDetailProps {
  rows: any
}

export default function Detail({ rows }: IDetailProps) {
  console.log(rows)
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Hello detail
    </Typography>
  )
}

export async function getServerSideProps() {
  const bigquery = new BigQuery({
    projectId: googleCredentials.project_id,
    keyFilename: './google-credentials.json'
  })

  // Retrieve view
  const dataset = bigquery.dataset('reports')
  const [view] = await dataset.table('vw_last_daily_balance_reports').get()

  const fullTableId = view.metadata.id
  const viewQuery = view.metadata.view.query

  // Display view properties
  console.log(`View at ${fullTableId}`)
  console.log(`View query: ${viewQuery}`)

  const options = {
    query: viewQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US'
  }

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options)
  console.log(`Job ${job.id} started.`)

  // Wait for the query to finish
  const [rows] = await job.getQueryResults()

  // We need to do this because the rows object is not serializable (some weird objects returned by the BigQuery API)
  const parsedRows = JSON.parse(JSON.stringify(rows))

  // Pass data to the page via props
  return { props: { rows: parsedRows } }
}
