export default function HeroIllustration() {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 flex items-center justify-center">
      <svg viewBox="0 0 380 320" className="w-full h-auto max-w-[360px]" role="img" aria-label="Illustration of a person working at a desk surrounded by cloud infrastructure icons">
        {/* soft glow backdrop */}
        <ellipse cx="190" cy="290" rx="140" ry="14" fill="var(--color-surface-2)" />

        {/* floating cloud outline */}
        <g opacity="0.9">
          <path
            d="M110,70 q-18,0 -18,18 q-14,2 -14,18 q0,18 18,18 h140 q20,0 20,-20 q0,-18 -16,-20 q-2,-24 -26,-24 q-14,0 -22,10 q-6,-8 -18,-8 q-16,0 -20,14 q-2,0 -4,0 Z"
            fill="var(--color-surface-2)"
            stroke="var(--color-line)"
            strokeWidth="1.5"
          />
        </g>

        {/* floating icon: server */}
        <g transform="translate(56,40)">
          <rect width="34" height="34" rx="6" fill="var(--color-bg)" stroke="var(--color-amber)" strokeWidth="1.5" />
          <line x1="8" y1="12" x2="26" y2="12" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="20" x2="26" y2="20" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* floating icon: database */}
        <g transform="translate(280,54)">
          <ellipse cx="17" cy="8" rx="17" ry="7" fill="var(--color-bg)" stroke="var(--color-green)" strokeWidth="1.5" />
          <path d="M0,8 v18 a17,7 0 0 0 34,0 v-18" fill="var(--color-bg)" stroke="var(--color-green)" strokeWidth="1.5" />
          <path d="M0,17 a17,7 0 0 0 34,0" fill="none" stroke="var(--color-green)" strokeWidth="1.2" opacity="0.6" />
        </g>

        {/* floating icon: lock (security) */}
        <g transform="translate(190,28)">
          <rect x="0" y="12" width="26" height="20" rx="4" fill="var(--color-bg)" stroke="var(--color-text-dim)" strokeWidth="1.5" />
          <path d="M5,12 v-5 a8,8 0 0 1 16,0 v5" fill="none" stroke="var(--color-text-dim)" strokeWidth="1.5" />
        </g>

        {/* connecting dotted lines from icons down to desk */}
        <path d="M73,80 L120,175" stroke="var(--color-line)" strokeWidth="1.2" strokeDasharray="3 5" />
        <path d="M297,90 L230,175" stroke="var(--color-line)" strokeWidth="1.2" strokeDasharray="3 5" />
        <path d="M203,60 L190,150" stroke="var(--color-line)" strokeWidth="1.2" strokeDasharray="3 5" />

        {/* isometric desk */}
        <g>
          <polygon points="90,220 190,180 290,220 190,260" fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1.5" />
          {/* desk legs */}
          <line x1="110" y1="228" x2="110" y2="255" stroke="var(--color-line)" strokeWidth="2" />
          <line x1="270" y1="228" x2="270" y2="255" stroke="var(--color-line)" strokeWidth="2" />
        </g>

        {/* laptop on desk */}
        <g transform="translate(150,178)">
          <polygon points="0,26 40,10 80,26 40,42" fill="var(--color-bg)" stroke="var(--color-line)" strokeWidth="1.2" />
          <polygon points="10,24 40,12 70,24 40,34" fill="var(--color-green)" opacity="0.25" />
          <polygon points="0,26 0,20 40,4 40,10" fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1.2" />
        </g>

        {/* person: simplified seated silhouette */}
        <g transform="translate(150,110)">
          {/* head */}
          <circle cx="40" cy="14" r="13" fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1.5" />
          {/* body */}
          <path
            d="M18,70 q0,-30 22,-32 q22,2 22,32 Z"
            fill="var(--color-amber)"
            opacity="0.85"
          />
          {/* arm reaching to laptop */}
          <path d="M40,45 q14,10 20,22" fill="none" stroke="var(--color-amber)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        </g>

        {/* status pill */}
        <g transform="translate(150,285)">
          <circle cx="0" cy="0" r="4" fill="var(--color-green)" />
          <text x="10" y="4" className="font-mono" style={{ fontSize: '11px', fill: 'var(--color-text-dim)' }}>
            building in the cloud
          </text>
        </g>
      </svg>
    </div>
  )
}
