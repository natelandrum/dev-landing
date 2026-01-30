export function preconnectTo(url: string) {
  try {
    const u = new URL(url)
    const origin = u.origin

    const id = `preconnect:${origin}`
    if (document.getElementById(id)) return

    const link = document.createElement('link')
    link.id = id
    link.rel = 'preconnect'
    link.href = origin
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  } catch {
    // ignore bad URLs
  }
}
