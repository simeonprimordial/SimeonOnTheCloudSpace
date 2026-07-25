import { useEffect, useState } from 'react'

const DAYPARTS = {
  dawn: {
    key: 'dawn',
    label: 'Dawn',
    themeColor: '#faf4ee',
  },
  noon: {
    key: 'noon',
    label: 'Noon',
    themeColor: '#f3f6f5',
  },
  dusk: {
    key: 'dusk',
    label: 'Dusk',
    themeColor: '#f6f1f3',
  },
  midnight: {
    key: 'midnight',
    label: 'Midnight',
    themeColor: '#eef2f7',
  },
}

const BOUNDARY_HOURS = [5, 11, 17, 22]

export function getDaypart(date = new Date()) {
  const hour = date.getHours()

  if (hour >= 5 && hour < 11) return DAYPARTS.dawn
  if (hour >= 11 && hour < 17) return DAYPARTS.noon
  if (hour >= 17 && hour < 22) return DAYPARTS.dusk
  return DAYPARTS.midnight
}

function millisecondsUntilNextBoundary(date) {
  const nextBoundary = new Date(date)
  const currentHour = date.getHours()
  const upcomingHour = BOUNDARY_HOURS.find((hour) => hour > currentHour)

  if (upcomingHour === undefined) {
    nextBoundary.setDate(nextBoundary.getDate() + 1)
    nextBoundary.setHours(BOUNDARY_HOURS[0], 0, 0, 0)
  } else {
    nextBoundary.setHours(upcomingHour, 0, 0, 0)
  }

  return Math.max(nextBoundary.getTime() - date.getTime() + 1000, 1000)
}

export function useDaypartTheme() {
  const [daypart, setDaypart] = useState(() => getDaypart())

  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')
    const originalThemeColor = themeColorMeta?.getAttribute('content')
    let timerId

    const updateDaypart = () => {
      const now = new Date()
      const nextDaypart = getDaypart(now)

      setDaypart(nextDaypart)
      themeColorMeta?.setAttribute('content', nextDaypart.themeColor)

      window.clearTimeout(timerId)
      timerId = window.setTimeout(updateDaypart, millisecondsUntilNextBoundary(now))
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) updateDaypart()
    }

    updateDaypart()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearTimeout(timerId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (themeColorMeta && originalThemeColor) {
        themeColorMeta.setAttribute('content', originalThemeColor)
      }
    }
  }, [])

  return daypart
}
