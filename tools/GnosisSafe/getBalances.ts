import { getBalances } from '@safe-global/safe-gateway-typescript-sdk'

;(async () => {
  try {
    const balances = await getBalances('1', '0x58e6c7ab55Aa9012eAccA16d1ED4c15795669E1C', 'usd', {
      trusted: false
    })
    balances?.items?.map((balance: any) => {
      console.log(`Balance: ${JSON.stringify(balance, null, 4)}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
