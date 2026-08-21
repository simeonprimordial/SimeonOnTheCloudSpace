/**
 * App routes use the #/ prefix so they do not collide with in-page section anchors
 * like #projects, #about, and #contact on the home page.
 *
 * Routes:
 *   #/                  home
 *   #/projects          projects archive page
 *   #/case/:slug        case study page
 *
 * Legacy query params (?case=slug, ?page=projects) remain supported.
 */

export function getRoute() {
  const hash = window.location.hash || ''
  const search = new URLSearchParams(window.location.search)
  const legacyCase = search.get('case')
  const legacyPage = search.get('page')

  // Only treat as an app route when the hash starts with "#/".
  if (hash.startsWith('#/')) {
    const raw = hash.slice(2)
    const [path = ''] = raw.split('?')
    const segments = path.split('/').filter(Boolean)

    if (segments[0] === 'case' && segments[1]) {
      return { type: 'case', slug: decodeURIComponent(segments[1]) }
    }

    if (segments[0] === 'projects') {
      return { type: 'projects' }
    }

    return { type: 'home' }
  }

  if (legacyCase) {
    return { type: 'case', slug: legacyCase }
  }

  if (legacyPage === 'projects') {
    return { type: 'projects' }
  }

  return { type: 'home' }
}

export function caseStudyHref(slug) {
  return `#/case/${encodeURIComponent(slug)}`
}

export function projectsHref() {
  return '#/projects'
}

export function homeHref() {
  return '#/'
}

export function homeSectionHref(sectionId) {
  return `#${sectionId}`
}
