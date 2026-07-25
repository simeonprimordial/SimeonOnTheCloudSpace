import { useEffect, useRef } from 'react'

function chasePoint(phase) {
  return {
    x: 500 + Math.cos(phase) * 430,
    y: 350 + Math.sin(phase) * 275,
  }
}

function chaseAngle(phase) {
  const dx = -430 * Math.sin(phase)
  const dy = 275 * Math.cos(phase)
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

export default function InkChaseBackground() {
  const layerRef = useRef(null)
  const birdRef = useRef(null)
  const snakeRef = useRef(null)
  const inkBallRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    const bird = birdRef.current
    const snake = snakeRef.current
    const inkBall = inkBallRef.current
    const trail = trailRef.current

    if (!layer || !bird || !snake || !inkBall || !trail) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return undefined

    let frameId = null

    const render = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0
      const phase = progress * Math.PI * 4.4 - Math.PI * 0.25
      const birdPhase = phase
      const snakePhase = phase - 0.82
      const birdPoint = chasePoint(birdPhase)
      const snakePoint = chasePoint(snakePhase)
      const birdAngle = chaseAngle(birdPhase)
      const snakeAngle = chaseAngle(snakePhase)

      const exchange = (Math.sin(phase * 2.35) + 1) / 2
      const arc = Math.sin(exchange * Math.PI) * 54
      const ballX = snakePoint.x + (birdPoint.x - snakePoint.x) * exchange
      const ballY = snakePoint.y + (birdPoint.y - snakePoint.y) * exchange - arc
      const distance = Math.hypot(birdPoint.x - snakePoint.x, birdPoint.y - snakePoint.y)
      const scale = 0.88 + Math.min(distance / 900, 0.16)

      bird.setAttribute(
        'transform',
        `translate(${birdPoint.x.toFixed(2)} ${birdPoint.y.toFixed(2)}) rotate(${birdAngle.toFixed(2)}) scale(${scale.toFixed(3)})`,
      )
      snake.setAttribute(
        'transform',
        `translate(${snakePoint.x.toFixed(2)} ${snakePoint.y.toFixed(2)}) rotate(${snakeAngle.toFixed(2)})`,
      )
      inkBall.setAttribute('transform', `translate(${ballX.toFixed(2)} ${ballY.toFixed(2)})`)
      trail.setAttribute(
        'd',
        `M ${snakePoint.x.toFixed(2)} ${snakePoint.y.toFixed(2)} Q ${ballX.toFixed(2)} ${(ballY + 20).toFixed(2)} ${birdPoint.x.toFixed(2)} ${birdPoint.y.toFixed(2)}`,
      )

      layer.style.setProperty('--ink-chase-progress', progress.toFixed(4))
      frameId = null
    }

    const requestRender = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)

    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="ink-chase" aria-hidden="true" ref={layerRef}>
      <svg className="ink-chase__canvas" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <defs>
          <filter id="ink-chase-soften" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence baseFrequency="0.018" numOctaves="2" seed="12" type="fractalNoise" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="ink-chase-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <path className="ink-chase__exchange-trail" ref={trailRef} />

        <g className="ink-chase__bird" ref={birdRef}>
          <g className="ink-chase__bird-wing">
            <path d="M-14 1 C-38 -24 -62 -25 -80 -9 C-56 -7 -42 5 -29 18 C-19 15 -12 9 -6 3 Z" />
            <path className="ink-chase__wash" d="M-30 12 C-50 4 -66 8 -75 25 C-55 19 -41 23 -26 31 Z" />
          </g>
          <path d="M-34 4 C-21 -13 -3 -17 13 -7 C25 -12 40 -7 49 4 C35 3 25 9 16 18 C4 29 -18 24 -31 13 Z" />
          <path d="M45 2 L65 8 L46 13 Z" />
          <circle cx="35" cy="2" r="2.3" />
          <path className="ink-chase__feather" d="M-28 15 C-40 28 -44 40 -39 51" />
          <circle className="ink-chase__drop" cx="-39" cy="56" r="3" />
        </g>

        <g className="ink-chase__snake" ref={snakeRef}>
          <path
            className="ink-chase__snake-body"
            d="M-74 12 C-55 -20 -27 -25 -8 -8 C7 5 1 26 -17 27 C-33 29 -38 11 -24 3 C-8 -7 16 -1 34 11 C47 20 57 19 66 12"
          />
          <ellipse cx="69" cy="11" rx="14" ry="10" />
          <circle className="ink-chase__snake-eye" cx="75" cy="8" r="1.8" />
          <path className="ink-chase__tongue" d="M82 13 L94 16 M94 16 L100 12 M94 16 L99 21" />
          <circle className="ink-chase__drop" cx="-73" cy="18" r="3.4" />
        </g>

        <g className="ink-chase__ball" ref={inkBallRef} filter="url(#ink-chase-blur)">
          <circle r="9" />
          <circle cx="7" cy="-6" r="3" />
          <circle cx="-8" cy="5" r="2.5" />
        </g>
      </svg>
    </div>
  )
}
