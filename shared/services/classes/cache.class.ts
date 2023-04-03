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
    const data = fs.readFileSync(`../../shared/cache/${reportName}.json`, 'utf8')
    return JSON.parse(data)
  }

  write(reportName: Report, data: any) {
    fs.writeFileSync(`../shared/cache/${reportName}.json`, JSON.stringify(data), 'utf8')
  }
}
