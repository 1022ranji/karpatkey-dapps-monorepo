import fs from 'fs'

export default class Cache {
  private static instance: Cache

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  getBalanceReports() {
    const data = fs.readFileSync('cache/balance-reports.json', 'utf8')
    return JSON.parse(data)
  }

  writeBalanceReports(data: any) {
    fs.writeFileSync('cache/balance-reports.json', JSON.stringify(data), 'utf8')
  }
}
