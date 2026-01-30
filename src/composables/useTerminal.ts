import { ref } from 'vue'

type Line = {
  id: string
  text: string
  tone?: 'normal' | 'ok' | 'warn'
}

const uid = () => Math.random().toString(36).slice(2)

export function useTerminal() {
  const lines = ref<Line[]>([])
  const isTyping = ref(false)

  async function typeLine(text: string, tone: Line['tone'] = 'normal') {
    isTyping.value = true

    const id = uid()
    lines.value.push({ id, text: '', tone })

    for (let i = 0; i < text.length; i++) {
      lines.value = lines.value.map((line) =>
        line.id === id ? { ...line, text: text.slice(0, i + 1) } : line,
      )
      await sleep(8)
    }
    isTyping.value = false
  }
  function pushLine(text: string, tone: Line['tone'] = 'normal') {
    lines.value.push({ id: uid(), text, tone })
  }
  async function bootSequence() {
    lines.value = []
    await typeLine('> booting nlandrum.dev...')

    await sleep(1500)
    pushLine('Log: modules loaded', 'ok')
    pushLine('Log: links online', 'ok')
    await sleep(800)
    pushLine("Tip: press '/' or Ctrl/Cmd+K to focus the terminal")
    pushLine("Tip: try the command 'help'")
  }
  return { lines, isTyping, typeLine, pushLine, bootSequence }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
