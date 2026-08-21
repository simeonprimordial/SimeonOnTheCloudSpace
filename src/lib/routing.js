/** Hash-based routes that work on GitHub Pages without SPA server fallback. */

export function getRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [path = '', queryString = ''] = raw.split('?')
  const segments = path.split('/').filter(Boolean)
  const params = new URLSearchParams(queryString)

  // Legacy support: ?case=slug and ?page=projects
  const search = new URLSearchParams(window.location.search)
  const legacyCase = search.get('case')
  const legacyPage = search.get('page')

  if (segments[0] === 'case' && segments[1]) {
    return { type: 'case', slug: segments[1], params }
  }

  if (segments[0] === 'projects' || legacyPage === 'projects') {
    return { type: 'projects', params }
  }

  if (legacyCase) {
    return { type: 'case', slug: legacyCase, params }
  }

  return { type: 'home', params }
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

export function homeProjectsHref() {
  return '#projects'
}

export function navigate(hashPath) {
  const next = hashPath.startsWith('#') ? hashPath : `#${hashPath}`
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }
  window.location.hash = next.replace(/^#/, '')
}
