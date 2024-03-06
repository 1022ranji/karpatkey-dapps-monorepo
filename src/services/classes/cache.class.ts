import fs from 'fs'

export default class Cache {
  private static instance: Cache

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  getFile(fileName: string) {
    const filePath = `${process.cwd()}/cache/${fileName}.json`
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  }

  writeFile(fileName: string, data: any) {
    const filePath = `${process.cwd()}/cache/${fileName}.json`
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
  }
}
