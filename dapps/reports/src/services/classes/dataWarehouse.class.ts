import { BigQuery } from '@google-cloud/bigquery'
import { GOOGLE_CREDS, GOOGLE_PROJECT_ID } from '@karpatkey-monorepo/reports/src/config/constants'

export class DataWarehouse {
  private static instance: DataWarehouse
  private bigQuery: BigQuery

  private constructor() {
    this.bigQuery = new BigQuery({
      projectId: GOOGLE_PROJECT_ID,
      credentials: GOOGLE_CREDS
    })
  }

  public static getInstance(): DataWarehouse {
    if (!DataWarehouse.instance) {
      DataWarehouse.instance = new DataWarehouse()
    }

    return DataWarehouse.instance
  }

  async getDailyBalanceReports() {
    const dataset = this.bigQuery.dataset('reports_production')
    const [view] = await dataset.table('vw_last_daily_balance_reports').get()
    const viewQuery = view.metadata.view.query

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialMetrics() {
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.reports_production.prod_treasury_financial_metrics\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTokens() {
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.reports_production.prod_tokens\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryVariationMetricsDetail() {
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.reports_production.prod_treasury_variation_metrics_detail\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialPositions() {
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.reports_production.prod_treasury_financial_positions\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryHistoricVariation() {
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.reports_production.prod_treasury_historic_variation\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getFinancialMetricAndVarDetail() {
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.reports.vw_financial_metric_and_var_detail\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  private async executeCommonJobQuery(viewQuery: string) {
    const options = {
      query: viewQuery,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US'
    }

    // Run the query as a job
    const [job] = await this.bigQuery.createQueryJob(options)
    console.log(`Job ${job.id} started.`)

    // Wait for the query to finish
    const [rows] = await job.getQueryResults()

    // We need to do this because the rows object is not serializable (some weird objects returned by the BigQuery API)
    return JSON.parse(JSON.stringify(rows))
  }
}
