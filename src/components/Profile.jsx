import { useState } from 'react'

const BASE = import.meta.env.BASE_URL

export default function Profile() {
  const [imgSrc, setImgSrc] = useState(`${BASE}images/profile.jpg`)

  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 mb-8">
      <div className="relative w-[88px] h-[88px] shrink-0">
        <img
          src={imgSrc}
          onError={() => setImgSrc(`${BASE}images/avatar-placeholder.svg`)}
          alt="Simeon Siaka"
          className="w-full h-full rounded-full object-cover border-2 border-line"
        />
        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green border-2 border-bg led-pulse" />
      </div>

      <div>
        <p className="font-display text-base mb-1">Simeon Siaka</p>
        <p className="text-text-dim text-sm max-w-[42ch]">
          Hey — I'm Simeon. I build cloud infrastructure on AWS, and I put a little of that
          same discipline into how I write, document, and ship everything else.
        </p>
      </div>
    </div>
  )
}
