import * as React from 'react'

interface ObserveAnchors {
  anchors: string[]
  inView: boolean
  setSectionVisible: (id: Maybe<string>) => void
  threshold: number
}

let lastTimeout: Maybe<NodeJS.Timeout> = null

export const useObserveAnchors = (params: ObserveAnchors) => {
  const { anchors, inView, setSectionVisible, threshold } = params

  React.useEffect(() => {
    if (!inView) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (lastTimeout) clearTimeout(lastTimeout)
          lastTimeout = setTimeout(() => {
            setSectionVisible(id)
          }, 500)
        }
      })
    }, options)

    const target = anchors.map((anchor) => `#${anchor}`).join(', ')
    document.querySelectorAll(target).forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })
  }, [inView, anchors, setSectionVisible, threshold])
}
