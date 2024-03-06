import { useObserveAnchors } from 'src/hooks/useObserveAnchors'
import { AnimatePresenceWrapper, BoxWrapperColumn } from 'src/components'
import { slugify } from 'src/utils'
import { Circle as CircleIcon, CircleOutlined as CircleOutlinedIcon } from '@mui/icons-material'

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { isYearAndMonthValid } from 'src/utils/params'

export type Section =
  | 'Summary'
  | 'Balance overview'
  | 'Treasury variation'
  | 'Farming funds and results'
  | 'Funds and results by position'
  | 'Token detail'

const ListItemTextCustom = styled(ListItemText)<ListItemTextProps>(() => ({
  '& .MuiListItemText-primary': {
    width: 'calc(100% + 1px)'
  }
}))

export const SIDEBAR_WIDTH = 290

export const StyledSidebar = styled(BoxWrapperColumn)(() => ({
  flexBasis: '10rem',
  height: '100%',
  padding: '10px 10px',
  width: SIDEBAR_WIDTH
}))

export const Sidebar = () => {
  const router = useRouter()
  const [, hash = 'summary'] = router.asPath.split('#')

  const [sectionVisible, setSectionVisible] = React.useState<Maybe<string>>()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    trackVisibility: true,
    delay: 3000
  })

  const isDDay = isYearAndMonthValid()
  const SECTIONS: Section[] = ['Summary', 'Balance overview', 'Treasury variation', 'Token detail']

  if (isDDay) {
    SECTIONS.splice(3, 0, 'Funds and results by position')
  } else {
    SECTIONS.splice(3, 0, 'Farming funds and results')
  }

  React.useEffect(() => {
    if (inView) {
      setSectionVisible(hash)
    }
  }, [inView, hash])

  useObserveAnchors({
    inView,
    setSectionVisible,
    threshold: 1,
    anchors: ['balance-overview', 'treasury-variation']
  })

  useObserveAnchors({
    inView,
    setSectionVisible,
    threshold: 0.5,
    anchors: ['summary']
  })

  const anchorsCustom = ['token-detail']
  if (isDDay) {
    anchorsCustom.push('funds-and-results-by-position')
  } else {
    anchorsCustom.push('farming-funds-and-results')
  }

  useObserveAnchors({
    inView,
    setSectionVisible,
    threshold: 0.15,
    anchors: anchorsCustom
  })

  return (
    <AnimatePresenceWrapper>
      <StyledSidebar>
        <List ref={ref}>
          {SECTIONS.map((text: Section, index: number) => {
            const isActive = sectionVisible === slugify(text)
            return (
              <Box
                onClick={() => {
                  setSectionVisible(slugify(text))
                  router.push(`#${slugify(text)}`).catch((e) => {
                    // workaround for https://github.com/vercel/next.js/issues/37362
                    if (!e.cancelled) {
                      throw e
                    }
                  })
                }}
                key={index}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem key={text}>
                  <ListItemButton sx={{ padding: '0 0' }} disableTouchRipple>
                    <ListItemIcon sx={{ justifyContent: 'flex-start', minWidth: '35px' }}>
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
              </Box>
            )
          })}
        </List>
      </StyledSidebar>
    </AnimatePresenceWrapper>
  )
}
