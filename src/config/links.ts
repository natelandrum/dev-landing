export type LinkKey =
  | 'portfolio'
  | 'qrGenerator'
  | 'sudoku'
  | 'flashcardsExtension'
  | 'flashcardsPage'
  | 'github'
  | 'linkedIn'

export type LinkItem = {
  key: LinkKey
  label: string
  description: string
  href: string
  icon?: string
}

export const LINKS: LinkItem[] = [
  {
    key: 'portfolio',
    label: 'Portfolio',
    description: 'My personal portfolio complete with projects, CV, and contact info.',
    href: 'https://portfolio.nlandrum.dev/',
  },
  {
    key: 'qrGenerator',
    label: 'QR Code Generator',
    description: 'A QR code generator with custom styling options for colors, shapes, and logos.',
    href: 'https://qr-generator.nlandrum.dev/',
  },
  {
    key: 'sudoku',
    label: 'Sudoku Solver',
    description: 'An app that solves Sudoku puzzles, or generates new ones that you can solve!',
    href: 'https://sudoku-solver.nlandrum.dev/',
  },
  {
    key: 'flashcardsExtension',
    label: 'Vocab Extractor',
    description: 'A Chrome extension for extracting vocabulary from Duolingo.',
    href: 'https://chromewebstore.google.com/detail/vocab-extractor/mdgbblkeiiflhnfhipkholfpbmpdfpfo',
  },
  {
    key: 'flashcardsPage',
    label: 'Flashcards Page',
    description: 'A web app for reviewing vocabulary extracted from Duolingo.',
    href: 'https://flashcards.nlandrum.dev/',
  },
  {
    key: 'github',
    label: 'GitHub',
    description: 'My GitHub profile with repositories and contributions.',
    href: 'https://github.com/natelandrum',
  },
  {
    key: 'linkedIn',
    label: 'LinkedIn',
    description: 'My LinkedIn profile with professional experience and connections.',
    href: 'https://www.linkedin.com/in/nathan-landrum-dev/',
  },
]

export function getLink(key: LinkKey): LinkItem {
  const found = LINKS.find((link) => link.key === key)
  if (!found) throw new Error(`Missing link for key: ${key}`)
  return found
}
