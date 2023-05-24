import fs from 'fs'

export default class Cache {
  private static instance: Cache

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  getReport(reportName: Report) {
    const filePath = `${process.cwd()}/public/cache/${reportName}.json`
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  }

  writeConsole(reportName: Report, data: any) {
    const filePath = `${process.cwd()}/public/cache/${reportName}.json`
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
  }

  writeApi(reportName: Report, data: any) {
    const filePath = `${process.cwd()}/public/cache/${reportName}.json`
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
  }
}
