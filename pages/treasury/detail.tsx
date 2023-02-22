import googleCredentials from '@/google-credentials.json'
import { BigQuery } from '@google-cloud/bigquery'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'

interface IDetailProps {
  rows: any
}

export default function Detail({ rows }: IDetailProps) {
  console.log(rows)
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Hello detail
        </Typography>
      </Box>
    </Container>
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

  // Print the results
  console.log('Rows:')
  rows.forEach((row) => console.log(row))

  // Pass data to the page via props
  return { props: { rows } }
}
