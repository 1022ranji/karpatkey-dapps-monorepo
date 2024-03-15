import Aave from '@karpatkey-monorepo/shared/components/Icons/Protocols/Aave'
import AaveV3 from '@karpatkey-monorepo/shared/components/Icons/Protocols/AaveV3'
import AaveV2 from '@karpatkey-monorepo/shared/components/Icons/Protocols/AaveV3'
import AaveAMM from '@karpatkey-monorepo/shared/components/Icons/Protocols/AaveV3'
import Angle from '@karpatkey-monorepo/shared/components/Icons/Protocols/Angle'
import Agave from '@karpatkey-monorepo/shared/components/Icons/Protocols/Agave'
import Ankr from '@karpatkey-monorepo/shared/components/Icons/Protocols/Ankr'
import Aura from '@karpatkey-monorepo/shared/components/Icons/Protocols/Aura'
import Azuro from '@karpatkey-monorepo/shared/components/Icons/Protocols/Azuro'
import Balancer from '@karpatkey-monorepo/shared/components/Icons/Protocols/Balancer'
import Bancor from '@karpatkey-monorepo/shared/components/Icons/Protocols/Bancor'
import Compound from '@karpatkey-monorepo/shared/components/Icons/Protocols/Compound'
import Connext from '@karpatkey-monorepo/shared/components/Icons/Protocols/Connext'
import Convex from '@karpatkey-monorepo/shared/components/Icons/Protocols/Convex'
import Curve from '@karpatkey-monorepo/shared/components/Icons/Protocols/Curve'
import Default from '@karpatkey-monorepo/shared/components/Icons/Protocols/Default'
import Element from '@karpatkey-monorepo/shared/components/Icons/Protocols/Element'
import HoneySwap from '@karpatkey-monorepo/shared/components/Icons/Protocols/HoneySwap'
import Idle from '@karpatkey-monorepo/shared/components/Icons/Protocols/Idle'
import Lido from '@karpatkey-monorepo/shared/components/Icons/Protocols/Lido'
import Maker from '@karpatkey-monorepo/shared/components/Icons/Protocols/Maker'
import Notional from '@karpatkey-monorepo/shared/components/Icons/Protocols/Notional'
import Pods from '@karpatkey-monorepo/shared/components/Icons/Protocols/Pods'
import Spark from '@karpatkey-monorepo/shared/components/Icons/Protocols/Spark'
import StakeWise from '@karpatkey-monorepo/shared/components/Icons/Protocols/StakeWise'
import SushiSwap from '@karpatkey-monorepo/shared/components/Icons/Protocols/SushiSwap'
import Swapr from '@karpatkey-monorepo/shared/components/Icons/Protocols/Swapr'
import UniswapV3 from '@karpatkey-monorepo/shared/components/Icons/Protocols/UniswapV3'
import Validators from '@karpatkey-monorepo/shared/components/Icons/Protocols/Validators'
import CoW from '@karpatkey-monorepo/shared/components/Icons/Protocols/CoW'
import Enzyme from '@karpatkey-monorepo/shared/components/Icons/Protocols/Enzyme'
import Gnosis from '@karpatkey-monorepo/shared/components/Icons/Protocols/Gnosis'
import RocketPool from '@karpatkey-monorepo/shared/components/Icons/Protocols/RocketPool'
import KarpatkeyIcon from '@karpatkey-monorepo/shared/components/Icons/Protocols/Karpatkey'
import Stader from '@karpatkey-monorepo/shared/components/Icons/Protocols/Stader'
import StakeDAO from '@karpatkey-monorepo/shared/components/Icons/Protocols/StakeDAO'
import MU from '@karpatkey-monorepo/shared/components/Icons/Protocols/MU'

import * as React from 'react'

interface ProtocolIconProps {
  protocol: string
}

const ProtocolIcon = (props: ProtocolIconProps) => {
  const { protocol } = props

  let icon: Maybe<React.ReactElement> = null

  switch (protocol) {
    case 'Aave':
      icon = <Aave width={24} height={24} />
      break
    case 'AaveV2':
      icon = <AaveV2 width={24} height={24} />
      break
    case 'AaveV3':
      icon = <AaveV3 width={24} height={24} />
      break
    case 'Aave (AMM)':
      icon = <AaveAMM width={24} height={24} />
      break
    case 'Angle':
      icon = <Angle width={24} height={24} />
      break
    case 'Azuro':
      icon = <Azuro width={24} height={24} />
      break
    case 'Ankr':
      icon = <Ankr width={24} height={24} />
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
    case 'Idle':
      icon = <Idle width={24} height={24} />
      break
    case 'Element':
      icon = <Element width={24} height={24} />
      break
    case 'Bancor':
      icon = <Bancor width={24} height={24} />
      break
    case 'Connext':
      icon = <Connext width={24} height={24} />
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
    case 'Honeyswap':
      icon = <HoneySwap width={24} height={24} />
      break
    case 'Lido':
      icon = <Lido width={24} height={24} />
      break
    case 'Maker':
      icon = <Maker width={24} height={24} />
      break
    case 'CoW':
      icon = <CoW width={24} height={24} />
      break
    case 'CoW AMM':
      icon = <CoW width={24} height={24} />
      break
    case 'Notional':
      icon = <Notional width={24} height={24} />
      break
    case 'Pods':
      icon = <Pods width={24} height={24} />
      break
    case 'Swapr':
      icon = <Swapr width={24} height={24} />
      break
    case 'SwaprV3':
      icon = <Swapr width={24} height={24} />
      break
    case 'Spark':
      icon = <Spark width={24} height={24} />
      break
    case 'SushiSwap':
      icon = <SushiSwap width={24} height={24} />
      break
    case 'Stakewise':
      icon = <StakeWise width={24} height={24} />
      break
    case 'Validators (GC)':
      icon = <Validators width={24} height={24} />
      break
    case 'UniswapV3':
      icon = <UniswapV3 width={24} height={24} />
      break
    case 'Enzyme':
      icon = <Enzyme width={24} height={24} />
      break
    case 'Gnosis':
      icon = <Gnosis width={24} height={24} />
      break
    case 'Rocket':
      icon = <RocketPool width={24} height={24} />
      break
    case 'Arbitrage Bot':
      icon = <KarpatkeyIcon width={24} height={24} />
      break
    case 'Stader':
      icon = <Stader width={24} height={24} />
      break
    case 'StakeDAO':
      icon = <StakeDAO width={24} height={24} />
      break
    case 'Mu Exchange':
      icon = <MU width={24} height={24} />
      break
    default:
      icon = <Default width={24} height={24} />
      break
  }

  return icon
}

export default ProtocolIcon
