import Cache from '../services/classes/cache.class'
import { DataWarehouse } from '../services/classes/dataWarehouse.class'

;(async () => {
  try {
    const cache = Cache.getInstance()

    // Step 1: Create a BigQuery client
    const dataWarehouse = DataWarehouse.getInstance()

    // Step 2: Query the data
    const reportData = await dataWarehouse.getBalanceReports()
    cache.writeBalanceReports(reportData)
    console.log(`Success, cache generated!`)
  } catch (e) {
    console.error(e)
  }
})()
