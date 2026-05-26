/**
 * Standalone remote domain serves app routes at /* while build artifacts
 * remain under /mf/remote/* (required for host microfrontend at /mf/remote/*).
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/mf/remote/')) {
      return env.ASSETS.fetch(request)
    }

    const indexRequest = new Request(
      new URL('/mf/remote/index.html', url.origin),
      request,
    )
    return env.ASSETS.fetch(indexRequest)
  },
}

interface Env {
  ASSETS: Fetcher
}
