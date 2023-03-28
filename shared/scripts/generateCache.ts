import { Command } from 'commander'

import { ALLOWED_REPORTS } from '../config/constants'
import Cache from '../services/classes/cache.class'
import { DataWarehouse } from '../services/classes/dataWarehouse.class'

const program = new Command()

program.option('-r, --report-name <type>', 'flavour of report cache to be generated')

program.parse(process.argv)

const options = program.opts()
const reportName = options.reportName ?? null

if (!reportName) {
  console.error('Report name is required')
  process.exit(1)
}

const report = ALLOWED_REPORTS.find((report) => report.reportName === reportName)
if (!report) {
  console.error(`Report name ${reportName} is not allowed`)
  process.exit(1)
}

;(async () => {
  try {
    const cache = Cache.getInstance()

    // Step 1: Create a BigQuery client
    const dataWarehouse = DataWarehouse.getInstance()

    // Step 2: Query the data
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const reportData = await dataWarehouse[report.reportName]()
    cache.write(report.reportName, reportData)
    console.log(`Success, cache generated!`)
  } catch (e) {
    console.error(e)
  }
})()
