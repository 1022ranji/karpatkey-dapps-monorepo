// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BigQuery } from '@google-cloud/bigquery'
import googleCredentials from '@karpatkey-monorepo/shared/google-credentials.json'

export class DataWarehouse {
  private static instance: DataWarehouse
  private bigQuery: BigQuery

  private constructor() {
    this.bigQuery = new BigQuery({
      projectId: googleCredentials.project_id,
      keyFilename: '../../shared/google-credentials.json'
    })
  }

  public static getInstance(): DataWarehouse {
    if (!DataWarehouse.instance) {
      DataWarehouse.instance = new DataWarehouse()
    }

    return DataWarehouse.instance
  }

  async getBalanceReports() {
    const { bigQuery } = this

    const dataset = bigQuery.dataset('reports')
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
    const [job] = await bigQuery.createQueryJob(options)
    console.log(`Job ${job.id} started.`)

    // Wait for the query to finish
    const [rows] = await job.getQueryResults()

    // We need to do this because the rows object is not serializable (some weird objects returned by the BigQuery API)
    return JSON.parse(JSON.stringify(rows))
  }
}
