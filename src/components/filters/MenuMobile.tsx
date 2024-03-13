import React from 'react'
import { BoxWrapperRow, CustomTypography } from 'src/components'
import { Box } from '@mui/material'
import { FilterIcon, ShareIcon } from 'src/components/icons'
import Image from 'next/image'
import { useApp } from 'src/contexts/app.context'
import { FILTER_DAO } from 'src/config/constants'
import { getDAO, getMonthName } from 'src/utils'

export const MenuMobile = () => {
  const { state } = useApp()

  const { DAO: filterDAO, month } = state

  const { dao, monthName } = React.useMemo(() => {
    const dao: FILTER_DAO | undefined = getDAO(filterDAO)
    const monthName = month ? getMonthName(+month) : null

    return { dao, monthName }
  }, [filterDAO, month])

  if (!dao || !monthName) {
    return null
  }

  return (
    <BoxWrapperRow
      sx={{
        justifyContent: 'space-between',
        height: '66px',
        width: '100%',
        cursor: 'pointer'
      }}
    >
      <Box
        gap={1}
        sx={{
          width: '30%',
          paddingRight: '10px',
          paddingLeft: '10px',
          borderLeft: '1px solid #E0E0E0',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image src={dao?.icon ?? ''} alt={dao?.name || ''} width={30} height={30} key={dao?.icon} />
        <CustomTypography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          {dao?.name}
        </CustomTypography>
      </Box>
      <Box
        sx={{
          width: '25%',
          paddingRight: '10px',
          paddingLeft: '10px',
          borderLeft: '1px solid #E0E0E0',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <CustomTypography sx={{ fontSize: 18, fontWeight: 600 }}>Jan 2023</CustomTypography>
      </Box>
      <Box
        sx={{
          width: '15%',
          paddingRight: '10px',
          paddingLeft: '10px',
          borderLeft: '1px solid #E0E0E0',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <CustomTypography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          USD
        </CustomTypography>
      </Box>
      <Box
        sx={{
          width: '15%',
          borderLeft: '1px solid #E0E0E0',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FilterIcon width={38} height={38} />
      </Box>
      <Box
        sx={{
          width: '15%',
          borderLeft: '1px solid #E0E0E0',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ShareIcon width={38} height={38} />
      </Box>
    </BoxWrapperRow>
  )
}
