import fs from 'fs'

export default class Cache {
  private static instance: Cache

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  getReport(reportName: TReport) {
    const data = fs.readFileSync(`./public/cache/${reportName}.json`, 'utf8')
    return JSON.parse(data)
  }

  writeConsole(reportName: TReport, data: any) {
    fs.writeFileSync(`./public/cache/${reportName}.json`, JSON.stringify(data), 'utf8')
  }

  writeApi(reportName: TReport, data: any) {
    fs.writeFileSync(`./public/cache/${reportName}.json`, JSON.stringify(data), 'utf8')
  }
}
