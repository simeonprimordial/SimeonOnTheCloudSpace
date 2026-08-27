/**
 * App routes prefer real pathnames under the Vite base so case studies are
 * shareable and crawlable on GitHub Pages (with a 404.html SPA fallback).
 *
 * Paths (relative to BASE):
 *   /                     home
 *   /projects             projects archive page
 *   /case/:slug           case study page
 *
 * Hash routes (#/case/:slug, #/projects) and legacy query params remain supported.
 */

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')

function stripBase(pathname) {
  if (!pathname) return '/'
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length) || '/'
    return rest.startsWith('/') ? rest : `/${rest}`
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

function parsePathSegments(path) {
  return path.split('/').filter(Boolean)
}

function routeFromSegments(segments) {
  if (segments[0] === 'case' && segments[1]) {
    return { type: 'case', slug: decodeURIComponent(segments[1]) }
  }
  if (segments[0] === 'projects') {
    return { type: 'projects' }
  }
  return { type: 'home' }
}

export function getRoute() {
  const hash = window.location.hash || ''
  const search = new URLSearchParams(window.location.search)
  const legacyCase = search.get('case')
  const legacyPage = search.get('page')

  // Prefer path-based routes (GitHub Pages SPA + 404 fallback).
  const path = stripBase(window.location.pathname)
  const pathSegments = parsePathSegments(path)
  if (pathSegments.length > 0) {
    return routeFromSegments(pathSegments)
  }

  // Hash app routes: #/case/:slug, #/projects
  if (hash.startsWith('#/')) {
    const raw = hash.slice(2)
    const [hashPath = ''] = raw.split('?')
    return routeFromSegments(parsePathSegments(hashPath))
  }

  if (legacyCase) {
    return { type: 'case', slug: legacyCase }
  }

  if (legacyPage === 'projects') {
    return { type: 'projects' }
  }

  return { type: 'home' }
}

function withBase(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (!BASE || BASE === '/') return normalized
  return `${BASE}${normalized === '/' ? '/' : normalized}`
}

export function caseStudyHref(slug) {
  return withBase(`/case/${encodeURIComponent(slug)}`)
}

export function projectsHref() {
  return withBase('/projects')
}

export function homeHref() {
  return withBase('/')
}

export function homeSectionHref(sectionId) {
  return `${withBase('/')}#${sectionId}`
}

/** Client-side navigation that keeps the URL shareable without a full reload. */
export function navigate(href) {
  const url = new URL(href, window.location.origin)
  if (url.origin !== window.location.origin) {
    window.location.href = href
    return
  }
  window.history.pushState({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
