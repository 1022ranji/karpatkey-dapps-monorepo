import { BigQuery } from '@google-cloud/bigquery'
import { GOOGLE_CREDS, GOOGLE_PROJECT_ID } from '@karpatkey-monorepo/reports/src/config/constants'
import { DATA_WAREHOUSE_ENV } from '@karpatkey-monorepo/reports/src/config/constants'

type DataWarehouseEnvironment = 'production' | 'development'

const REPORTS_DATASET = {
  development: {
    getTreasuryFinancialMetrics: 'reports.vw_treasury_financial_metrics',
    getTokens: 'reports.lk_tokens',
    getTreasuryVariationMetricsDetail: 'reports.vw_dev_token_detail', //'reports.mvw_treasury_variation_metrics_detail',
    getTreasuryFinancialPositions: 'reports.vw_treasury_financial_positions',
    getTreasuryHistoricVariation: 'reports.dm_treasury_historic_variation',
    getFinancialMetricAndVarDetail: 'reports.vw_financial_metric_and_var_detail',
    getOurDAOTreasury: 'reports_production.vw_prod_our_dao_tr',
    getTreasuryFinancialMetricsWaterfall: 'reports.vw_treasury_financial_metrics_waterfall',
    getWaterfall1Report: 'reports.vw_waterfall1_report',
    getTotalFundsByTokenCategory: 'reports.vw_total_funds_by_token_category'
  },
  production: {
    getTreasuryFinancialMetrics: 'reports_production.prod_treasury_financial_metrics',
    getTokens: 'reports_production.prod_tokens',
    getTreasuryVariationMetricsDetail: 'reports_production.vw_prod_token_detail', //'reports_production.prod_treasury_variation_metrics_detail',
    getTreasuryFinancialPositions: 'reports_production.prod_treasury_financial_positions',
    getTreasuryHistoricVariation: 'reports_production.prod_treasury_historic_variation',
    getFinancialMetricAndVarDetail: 'reports_production.vw_financial_metric_and_var_detail',
    getOurDAOTreasury: 'reports_production.vw_prod_our_dao_tr',
    getTreasuryFinancialMetricsWaterfall: 'reports.vw_treasury_financial_metrics_waterfall',
    getWaterfall1Report: 'reports.vw_waterfall1_report',
    getTotalFundsByTokenCategory: 'reports.vw_total_funds_by_token_category'
  }
}

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

  // DONE
  async getTotalFundsByTokenCategory() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTotalFundsByTokenCategory'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getWaterfall1Report() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getWaterfall1Report'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialMetricsWaterfall() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialMetricsWaterfall'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialMetrics() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialMetrics'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTokens() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment]['getTokens']
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryVariationMetricsDetail() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryVariationMetricsDetail'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryFinancialPositions() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryFinancialPositions'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getTreasuryHistoricVariation() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getTreasuryHistoricVariation'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  // DONE
  async getFinancialMetricAndVarDetail() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getFinancialMetricAndVarDetail'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

    return await this.executeCommonJobQuery(viewQuery)
  }

  async getOurDAOTreasury() {
    const table =
      REPORTS_DATASET[DATA_WAREHOUSE_ENV as unknown as DataWarehouseEnvironment][
        'getOurDAOTreasury'
      ]
    const viewQuery = `SELECT * FROM  \`karpatkey-data-warehouse.${table}\``

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
