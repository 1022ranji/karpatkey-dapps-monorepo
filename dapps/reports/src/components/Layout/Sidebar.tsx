import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const SIDEBAR_WIDTH = 290

type Section =
  | 'Summary'
  | 'Balance overview'
  | 'Treasury variation'
  | 'Farming funds'
  | 'Token details'

const SECTIONS: Section[] = [
  'Summary',
  'Balance overview',
  'Treasury variation',
  'Farming funds',
  'Token details'
]

const ListItemTextCustom = styled(ListItemText)<ListItemTextProps>(() => ({
  '& .MuiListItemText-primary': {
    width: 'calc(100% + 1px)'
  }
}))

const Sidebar = () => {
  const router = useRouter()
  const [, hash = 'summary'] = router.asPath.split('#')

  return (
    <BoxWrapperColumn sx={{ padding: '10px 10px', width: SIDEBAR_WIDTH, height: '100%' }}>
      <List>
        {SECTIONS.map((text: Section, index: number) => {
          const isActive = hash === slugify(text)
          return (
            <Link
              href={`#${slugify(text)}`}
              key={index}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem key={text}>
                <ListItemButton sx={{ padding: '0 0' }} disableTouchRipple>
                  <ListItemIcon sx={{ justifyContent: 'flex-start', minWidth: '40px' }}>
                    {isActive ? (
                      <CircleIcon sx={{ color: 'custom.black.primary' }} />
                    ) : (
                      <CircleOutlinedIcon sx={{ color: 'custom.grey.secondary' }} />
                    )}
                  </ListItemIcon>
                  <ListItemTextCustom
                    primary={text}
                    title={text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: isActive ? 'custom.black.primary' : 'custom.grey.secondary',
                        fontWeight: isActive ? 700 : 600
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </BoxWrapperColumn>
  )
}

export default Sidebar
