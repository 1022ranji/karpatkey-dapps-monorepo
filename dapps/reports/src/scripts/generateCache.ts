/* eslint-disable @typescript-eslint/no-unused-vars */
import '@karpatkey-monorepo/reports/src/scripts/loadEnv'
import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { DataWarehouse } from '@karpatkey-monorepo/reports/src/services/classes/dataWarehouse.class'

/* eslint-enable @typescript-eslint/no-unused-vars */
import { ALLOWED_REPORTS } from '@karpatkey-monorepo/shared/config/constants'
import { Command } from 'commander'

const program = new Command()

program.option('-r, --report-name <type>', 'flavour of report cache to be generated')

program.parse(process.argv)

const options = program.opts()
const reportName = options.reportName ?? null

if (!reportName) {
  console.error('Report name is required')
  process.exit(1)
}

const report = ALLOWED_REPORTS.find(
  (report: { fileName: string; reportName: TReport }) => report.reportName === reportName
)
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
    const reportData = await dataWarehouse[report.reportName as TReport]()
    cache.writeConsole(report.reportName as TReport, reportData)
    console.log(`Success, cache generated!`)
  } catch (e) {
    console.error(e)
  }
})()
