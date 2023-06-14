import Aave from '@karpatkey-monorepo/shared/components/Icons/Protocols/Aave'
import Agave from '@karpatkey-monorepo/shared/components/Icons/Protocols/Agave'
import Aura from '@karpatkey-monorepo/shared/components/Icons/Protocols/Aura'
import Balancer from '@karpatkey-monorepo/shared/components/Icons/Protocols/Balancer'
import Compound from '@karpatkey-monorepo/shared/components/Icons/Protocols/Compound'
import Convex from '@karpatkey-monorepo/shared/components/Icons/Protocols/Convex'
import Curve from '@karpatkey-monorepo/shared/components/Icons/Protocols/Curve'
import Default from '@karpatkey-monorepo/shared/components/Icons/Protocols/Default'
import Lido from '@karpatkey-monorepo/shared/components/Icons/Protocols/Lido'
import Notional from '@karpatkey-monorepo/shared/components/Icons/Protocols/Notional'
import UniswapV3 from '@karpatkey-monorepo/shared/components/Icons/Protocols/UniswapV3'
import Validators from '@karpatkey-monorepo/shared/components/Icons/Protocols/Validators'
import * as React from 'react'

interface ProtocolIconProps {
  protocol: string
}

const ProtocolIcon = (props: ProtocolIconProps) => {
  const { protocol } = props

  let icon: Maybe<React.ReactElement> = null
  console.log(protocol)
  switch (protocol) {
    case 'Aave':
      icon = <Aave width={24} height={24} />
      break
    case 'Agave':
      icon = <Agave width={24} height={24} />
      break
    case 'Aura':
      icon = <Aura width={24} height={24} />
      break
    case 'Balancer':
      icon = <Balancer width={24} height={24} />
      break
    case 'Curve':
      icon = <Curve width={24} height={24} />
      break
    case 'CompoundV3':
      icon = <Compound width={24} height={24} />
      break
    case 'Compound V2':
      icon = <Compound width={24} height={24} />
      break
    case 'Convex':
      icon = <Convex width={24} height={24} />
      break
    case 'Lido':
      icon = <Lido width={24} height={24} />
      break
    case 'Notional':
      icon = <Notional width={24} height={24} />
      break
    case 'Validators (GC)':
      icon = <Validators width={24} height={24} />
      break
    case 'UniswapV3':
      icon = <UniswapV3 width={24} height={24} />
      break
    default:
      icon = <Default width={24} height={24} />
      break
  }

  return icon
}

export default ProtocolIcon
