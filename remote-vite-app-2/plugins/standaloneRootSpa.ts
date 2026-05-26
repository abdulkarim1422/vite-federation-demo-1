import type { Plugin } from 'vite'

const MF_PREFIX = '/mf/remote'

/** Serve standalone SPA at remotedomain.com/* while assets stay under /mf/remote/* */
function standaloneRootSpaMiddleware(
  req: { url?: string },
  _res: unknown,
  next: () => void,
) {
  const url = req.url ?? ''
  const pathname = url.split('?')[0]

  if (pathname.startsWith(MF_PREFIX)) {
    return next()
  }

  // Vite internals (dev only)
  if (
    pathname.startsWith('/@') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/node_modules/')
  ) {
    return next()
  }

  // Static file requests (e.g. favicon.svg)
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return next()
  }

  const query = url.includes('?') ? url.slice(url.indexOf('?')) : ''
  req.url = `${MF_PREFIX}/${query}`
  next()
}

export function standaloneRootSpa(): Plugin {
  return {
    name: 'standalone-root-spa',
    configureServer(server) {
      server.middlewares.use(standaloneRootSpaMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(standaloneRootSpaMiddleware)
    },
  }
}
