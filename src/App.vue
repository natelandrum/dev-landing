<template>
  <GridBackground />
  <main
    class="pt-20 md:pt-6.5 md:pl-20 md:ml-4 max-w-300 xl:mx-auto py-6.5 px-4 pb-10.5 grid gap-4 relative z-10"
  >
    <IdentityBar @toggleTheme="toggleTheme" />

    <TerminalPane
      ref="terminalRef"
      :lines="lines"
      :isTyping="isTyping"
      :linkItems="linkItems"
      @inputChanged="currentInput = $event"
      @open="openLink"
      @prefetch="prefetchLink"
      @command="runCommand"
    />

    <SiteLauncher
      ref="launcherRef"
      :linkItems="linkItems"
      @open="openLink"
      @prefetch="prefetchLink"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GridBackground from './components/GridBackground.vue'
import IdentityBar from './components/IdentityBar.vue'
import TerminalPane from './components/TerminalPane.vue'
import SiteLauncher from './components/SiteLauncher.vue'

import { LINKS, getLink, type LinkKey } from './config/links'
import { useTerminal } from './composables/useTerminal'
import { usePrefetch } from './composables/usePrefetch'
import { preconnectTo } from './composables/usePreconnect'

const currentInput = ref('')

const linkItems = computed(() => LINKS)

const terminalRef = ref<InstanceType<typeof TerminalPane> | null>(null)
const launcherRef = ref<InstanceType<typeof SiteLauncher> | null>(null)

const { lines, isTyping, typeLine, pushLine, bootSequence } = useTerminal()
const { prefetch } = usePrefetch()

// overlay state

onMounted(async () => {
  for (const l of LINKS) preconnectTo(l.href)

  window.addEventListener('keydown', onGlobalKeydown)

  await bootSequence()

  // Focus terminal input after boot sequence completes
  terminalRef.value?.focusInput()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
})

function onGlobalKeydown(e: KeyboardEvent) {
  // Ctrl/Cmd+K focuses terminal
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    terminalRef.value?.focusInput()
    return
  }

  // "/" focuses terminal (but avoid stealing focus if typing in an input already)
  if (e.key === '/') {
    const tag = (document.activeElement?.tagName || '').toLowerCase()
    const isTypingField = tag === 'input' || tag === 'textarea'
    if (!isTypingField) {
      e.preventDefault()
      terminalRef.value?.focusInput()
    }
  }
}

async function prefetchLink(key: LinkKey) {
  if (!key.includes('extension')) {
    const item = getLink(key)
    preconnectTo(item.href)
    void prefetch(item.href)
  }
}

async function openLink(key: LinkKey) {
  const item = getLink(key)

  // terminal ritual
  await typeLine(`> opening ${key}...`)
  pushLine(item.href)

  await sleep(330)
  window.location.assign(item.href)
}

async function runCommand(raw: string) {
  const cmd = raw.trim()
  pushLine(`> ${cmd}`)

  const [head, ...rest] = cmd.split(/\s+/)
  const arg = rest.join(' ').trim()

  switch (head?.toLowerCase()) {
    case 'help':
      pushLine('Commands:')
      pushLine('  ls                list sections')
      pushLine('  open <section>    open a section (e.g., open portfolio)')
      pushLine('  whoami            identity')
      pushLine('  focus             current focus')
      pushLine('  clear             clear terminal')
      pushLine('  launcher          toggle launcher')
      break

    case 'ls':
      const sections = LINKS.map((l) => `[${l.key}]`).join(' ')
      pushLine(sections ? `${sections}` : 'No sections available.')
      break

    case 'whoami':
      pushLine('Nate — Software Developer')
      break

    case 'focus':
      pushLine('thoughtful tools & human-centered software')
      break

    case 'clear':
      // Keep first line (boot message) and log section, clear the rest
      lines.value = lines.value.filter(
        (line) => line.text.includes('booting') || line.text.startsWith('Log:'),
      )
      break

    case 'open': {
      if (!arg) {
        pushLine('Usage: open <section>', 'warn')
        break
      }
      const match = LINKS.find((l) => l.key === arg)
      if (!match) {
        pushLine(`Unknown section: ${arg}`, 'warn')
        break
      }
      await openLink(match.key)
      break
    }
    case 'launcher':
      launcherRef.value?.toggle()
      typeLine('Toggled launcher.')
      break

    default:
      pushLine(`Unknown command: ${head} (try 'help')`, 'warn')
      break
  }
}

function toggleTheme() {
  document.documentElement.classList.toggle('light')
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
</script>
