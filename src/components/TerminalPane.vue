<template>
  <section
    class="flex flex-col border border-(--border) font-mono leading-[1.6] whitespace-pre-wrap rounded-2xl bg-(--panel) backdrop-blur-md p-5 h-125 relative cursor-text"
    @click="focusInput"
  >
    <!-- Top: First line -->
    <div v-if="lines.length" class="border-b-2 border-(--border-strong) pb-2 mb-2">
      <div class="line font-bold">
        {{ lines[0]?.text }}
      </div>
    </div>

    <!-- Middle: Main lines (excluding first and Logs) -->
    <div
      ref="mainTerminal"
      class="flex-1 overflow-auto font-mono text-[14px] leading-[1.6] whitespace-pre-wrap"
    >
      <div
        v-for="l in mainLines"
        :key="l.id"
        :class="[
          'line',
          l.tone === 'warn' ? 'text-(--accent-warning)' : 'text-(--text)',
          l.text.startsWith('Tip:') ? 'italic text-(--accent-info)' : '',
        ]"
      >
        <template v-if="l.tone === 'ok'">
          <span class="text-(--accent-success)">[OK] </span>{{ l.text }}
        </template>
        <template v-else-if="l.text.trim().startsWith('>')">
          <span>&gt; </span
          ><span class="text-(--accent-command) font-bold">{{
            l.text.trim().slice(1).trim()
          }}</span>
        </template>
        <template v-else>
          {{ l.text }}
        </template>
      </div>
    </div>

    <!-- Input row above the log -->
    <div class="flex items-center gap-2 mt-2 opacity-95">
      <span class="text-(--text-muted)">&gt;</span>
      <div class="relative flex-1 min-w-45">
        <span class="absolute left-0 top-0 text-(--text-muted) pointer-events-none">{{
          input || (isTyping ? '' : 'type a command…')
        }}</span>
        <input
          id="terminalInput"
          ref="inputEl"
          class="w-full bg-transparent border-0 outline-none text-(--text) caret-(--accent-primary) font-inherit p-0"
          :disabled="isTyping"
          v-model="input"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @keydown.enter.prevent="submit"
        />
      </div>
      <span class="cursor" :class="{ typing: isTyping }"></span>
    </div>
    <div
      v-if="pushLogLines.length"
      ref="logSection"
      class="border-t-2 border-(--border-strong) pt-2 mt-2 max-h-20 overflow-y-auto"
    >
      <div
        v-for="l in pushLogLines"
        :key="l.id"
        :class="[
          'line',
          l.tone === 'warn' ? 'text-(--accent-warning)' : 'text-(--text)',
          l.text.startsWith('Tip:') ? 'italic text-(--accent-info)' : '',
        ]"
      >
        <template v-if="l.tone === 'ok'">
          <span class="text-(--accent-success)">[OK] </span>{{ l.text.trim().slice(5) }}
        </template>
        <template v-else-if="l.text.trim().startsWith('>')">
          <span>&gt; </span
          ><span class="text-(--accent-command)">{{ l.text.trim().slice(1).trim() }}</span>
        </template>
        <template v-else>
          {{ l.text }}
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { LinkItem, LinkKey } from '../config/links'

const props = defineProps<{
  lines: { id: string; text: string; tone?: 'normal' | 'ok' | 'warn' }[]
  isTyping: boolean
  linkItems: LinkItem[]
}>()

const emit = defineEmits<{
  (e: 'open', key: LinkKey): void
  (e: 'prefetch', key: LinkKey): void
  (e: 'command', text: string): void
  (e: 'inputChanged', text: string): void
}>()

const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const mainTerminal = ref<HTMLElement | null>(null)
const logSection = ref<HTMLElement | null>(null)

// Computed for main and pushLog lines
const mainLines = computed(() => props.lines.slice(1).filter((l) => !l.text.includes('Log:')))
const pushLogLines = computed(() => props.lines.slice(1).filter((l) => l.text.includes('Log:')))

// Auto-scroll main log when new lines appear
watch(
  () => mainLines.value.length,
  async () => {
    await nextTick()
    if (mainTerminal.value) {
      mainTerminal.value.scrollTop = mainTerminal.value.scrollHeight
    }
  },
)

// Auto-scroll log section when new log lines appear
watch(
  () => pushLogLines.value.length,
  async () => {
    await nextTick()
    if (logSection.value) {
      logSection.value.scrollTop = logSection.value.scrollHeight
    }
  },
)

function focusInput() {
  inputEl.value?.focus()
}

function submit() {
  const text = input.value.trim()
  if (!text) return
  input.value = ''
  emit('command', text)
}

defineExpose({
  focusInput,
})
</script>
