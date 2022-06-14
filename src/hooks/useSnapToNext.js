import React from 'react'

const useSnapToNext = (ref, triggerDistance = 200) => {
  let scrollPosition = 0

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const handleScroll = () => {
    let direction = 'down'
    const scrollY = window.scrollY
    if (Math.abs(scrollY - scrollPosition) > 10) {
      if (scrollY > scrollPosition) {
        scrollPosition = scrollY
        direction = 'down'
      } else {
        scrollPosition = scrollY
        direction = 'up'
      }
    }

    const isAwayFromTop = scrollY > triggerDistance

    const isOnScreen = ref.current.getBoundingClientRect().bottom > 0

    const inViewFromBottom = scrollY < window.innerHeight - triggerDistance

    
    if (inViewFromBottom && direction === 'up' ) {
      scrollIntoView()
    }
    if (isAwayFromTop && direction === 'down' && isOnScreen) {
      scrollIntoView(true)
    }
  }

  const scrollIntoView = (next) => {
    if (next) {
      ref.current.nextElementSibling.scrollIntoView({ behavior: 'smooth' })
    } else {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

}


export default useSnapToNext