type PrefetchState = 'idle' | 'loading' | 'done' | 'error'

export function usePrefetch() {
  const cache = new Map<string, PrefetchState>()

  async function prefetch(url: string) {
    const state = cache.get(url)
    if (state === 'loading' || state === 'done') return

    cache.set(url, 'loading')
    try {
      // no-cors avoids CORS failures; purpose is warming connection / DNS / TLS
      await fetch(url, { mode: 'no-cors', credentials: 'omit', cache: 'no-store' })
      cache.set(url, 'done')
    } catch {
      cache.set(url, 'error')
    }
  }

  function getState(url: string) {
    return cache.get(url) ?? 'idle'
  }

  return { prefetch, getState }
}
