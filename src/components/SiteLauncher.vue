<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { LinkItem, LinkKey } from '../config/links'

import PortfolioIcon from '../assets/icons/portfolio.svg?raw'
import QRCodeIcon from '../assets/icons/qr-code.svg?raw'
import SudokuIcon from '../assets/icons/sudoku.svg?raw'
import VocabIcon from '../assets/icons/vocab.svg?raw'
import FlashcardsIcon from '../assets/icons/flashcards.svg?raw'
import GitHubIcon from '../assets/icons/github.svg?raw'
import LinkedInIcon from '../assets/icons/lkdin.svg?raw'

const props = defineProps<{ linkItems: LinkItem[] }>()

defineEmits<{
  (e: 'open', key: LinkKey): void
  (e: 'prefetch', key: LinkKey): void
}>()

const isExpanded = ref(false)
const mobileEl = ref<HTMLElement | null>(null)
const desktopEl = ref<HTMLElement | null>(null)
const hoveredItem = ref<LinkKey | null>(null)
const tooltipStyle = ref({ top: '0px', left: '0px' })

function toggle() {
  isExpanded.value = !isExpanded.value
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  const outsideMobile = !mobileEl.value?.contains(target)
  const outsideDesktop = !desktopEl.value?.contains(target)
  if (isExpanded.value && outsideMobile && outsideDesktop) {
    isExpanded.value = false
  }
}

function showTooltip(event: MouseEvent | FocusEvent, key: LinkKey) {
  hoveredItem.value = key
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tooltipStyle.value = {
    top: `${rect.top + rect.height / 2}px`,
    left: `${rect.right + 12}px`,
  }
}

function hideTooltip() {
  hoveredItem.value = null
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

defineExpose({ toggle })

const iconMap: Record<LinkKey, string> = {
  portfolio: PortfolioIcon,
  qrGenerator: QRCodeIcon,
  sudoku: SudokuIcon,
  flashcardsExtension: VocabIcon,
  flashcardsPage: FlashcardsIcon,
  github: GitHubIcon,
  linkedIn: LinkedInIcon,
}

function getIcon(key: LinkKey) {
  return iconMap[key] || PortfolioIcon
}

const visibleItems = computed(() => (isExpanded.value ? props.linkItems : []))

function onBeforeEnter(el: Element) {
  const i = parseInt((el as HTMLElement).dataset.index ?? '0');
  (el as HTMLElement).style.transitionDelay = `${i * 55}ms`
}

function onAfterEnter(el: Element) {
  (el as HTMLElement).style.transitionDelay = ''
}
</script>

<template>
  <!-- ─── Mobile: top bar, expands downward (hidden at md+) ─── -->
  <nav
    ref="mobileEl"
    class="fixed z-50 md:hidden bg-(--sidebar-bg) border-b border-(--border) left-0 right-0 top-0 transition-[max-height] duration-300 ease-out overflow-hidden"
    :class="isExpanded ? 'max-h-dvh overflow-y-auto' : 'max-h-16'"
  >
    <button
      @click="toggle()"
      class="ml-6 mt-4 mb-4 w-10 h-10 flex flex-col items-center justify-center text-(--text-secondary) hover:text-(--accent-primary) transition-colors rounded-lg hover:bg-(--hover-overlay) gap-1.5"
      :aria-label="isExpanded ? 'Collapse menu' : 'Expand menu'"
    >
      <span
        class="block h-0.5 bg-current transition-all duration-300"
        :class="isExpanded ? 'w-5 rotate-45 translate-y-2' : 'w-5'"
      />
      <span
        class="block h-0.5 w-5 bg-current transition-all duration-300"
        :class="isExpanded ? 'opacity-0' : 'opacity-100'"
      />
      <span
        class="block h-0.5 bg-current transition-all duration-300"
        :class="isExpanded ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'"
      />
    </button>

    <!-- Items mount when open, stagger in from below -->
    <div class="px-4 pb-4">
      <TransitionGroup
        name="mobile-item"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 gap-3"
        @before-enter="onBeforeEnter"
        @after-enter="onAfterEnter"
      >
        <button
          v-for="(item, index) in visibleItems"
          :key="item.key"
          :data-index="index"
          type="button"
          :aria-label="`Open ${item.label}`"
          @mouseenter="$emit('prefetch', item.key)"
          @focus="$emit('prefetch', item.key)"
          @keydown.enter="$emit('open', item.key)"
          @click="$emit('open', item.key)"
          class="relative w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer bg-(--sidebar-item) border border-(--border) transition-all duration-200 hover:bg-(--sidebar-item-hover) hover:shadow-[0_0_15px_var(--shadow-glow)]"
        >
          <div
            class="w-8 h-8 shrink-0 flex items-center justify-center text-(--accent-primary)"
            v-html="getIcon(item.key)"
          />
          <div class="flex-1 text-left overflow-hidden">
            <div class="text-sm font-semibold text-(--text) mb-1 truncate">{{ item.label }}</div>
            <div class="text-xs text-(--text-secondary) line-clamp-2">{{ item.description }}</div>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </nav>

  <!-- ─── Desktop: left rail, expands width (hidden below md) ─── -->
  <nav
    ref="desktopEl"
    class="hidden md:flex max-h-screen fixed z-50 flex-col bg-(--sidebar-bg) border-r border-(--border) left-0 top-0 bottom-0 transition-[width] duration-300 ease-out overflow-y-auto overflow-x-hidden"
    :class="isExpanded ? 'w-64' : 'w-22'"
  >
    <button
      @click="toggle()"
      class="ml-6 mt-4 mb-4 w-10 h-10 flex flex-col items-center justify-center text-(--text-secondary) hover:text-(--accent-primary) transition-colors rounded-lg hover:bg-(--hover-overlay) gap-1.5 shrink-0"
      :aria-label="isExpanded ? 'Collapse menu' : 'Expand menu'"
    >
      <span
        class="block h-0.5 bg-current transition-all duration-300"
        :class="isExpanded ? 'w-5 rotate-45 translate-y-2' : 'w-5'"
      />
      <span
        class="block h-0.5 w-5 bg-current transition-all duration-300"
        :class="isExpanded ? 'opacity-0' : 'opacity-100'"
      />
      <span
        class="block h-0.5 bg-current transition-all duration-300"
        :class="isExpanded ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'"
      />
    </button>

    <!-- Items always rendered; text label fades/slides in horizontally -->
    <div
      class="px-4 pb-4 transition-all duration-200 ease-out md:opacity-100 md:translate-y-0 md:pointer-events-auto"
      :class="
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
      "
    >
      <!-- Items animate individually -->
      <TransitionGroup
        name="menu"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3"
      >
        <button
          v-for="item in props.linkItems"
          :key="item.key"
          type="button"
          @mouseenter="(e) => { $emit('prefetch', item.key); showTooltip(e, item.key) }"
          @mouseleave="hideTooltip"
          @focus="(e) => { $emit('prefetch', item.key); showTooltip(e, item.key) }"
          @blur="hideTooltip"
          @click="$emit('open', item.key)"
          class="relative w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer bg-(--sidebar-item) border border-(--border) transition-all duration-200 hover:bg-(--sidebar-item-hover) hover:shadow-[0_0_15px_var(--shadow-glow)]"
          :class="isExpanded ? 'justify-start' : 'justify-start md:justify-center'"
        >
          <div
            class="w-8 h-8 shrink-0 flex items-center justify-center text-(--accent-primary)"
            v-html="getIcon(item.key)"
          />

          <!-- Text collapses on desktop when not expanded -->
          <div
            class="flex-1 text-left overflow-hidden"
            :class="isExpanded ? 'md:block' : 'md:hidden'"
          >
            <div class="text-sm font-semibold text-(--text) mb-1 truncate">{{ item.label }}</div>
            <div class="text-xs text-(--text-secondary) line-clamp-2">{{ item.description }}</div>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </nav>

  <Teleport to="body">
    <span
      v-if="hoveredItem !== null && !isExpanded"
      class="fixed -translate-y-1/2 px-2.5 py-1.5 rounded-lg border text-lg font-medium whitespace-nowrap pointer-events-none shadow-md"
      style="background: var(--sidebar-bg); border-color: var(--border); color: var(--text); z-index: 9999"
      :style="{ top: tooltipStyle.top, left: tooltipStyle.left }"
    >
      {{ props.linkItems.find(i => i.key === hoveredItem)?.label }}
    </span>
  </Teleport>
</template>

<style scoped>
@property --spin-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes spin-border {
  to {
    --spin-angle: 360deg;
  }
}

button[type='button']::before {
  content: '';
  position: absolute;
  inset: -2px;
  padding: 2px;
  border-radius: calc(0.75rem + 2px);
  background: conic-gradient(
    from var(--spin-angle),
    transparent 55%,
    color-mix(in srgb, var(--accent-primary) 20%, transparent) 70%,
    var(--accent-primary) 87%,
    transparent 93%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 200ms ease;
  pointer-events: none;
}

button[type='button']:hover::before {
  opacity: 1;
  animation: spin-border 1.5s linear infinite;
}

/* Mobile TransitionGroup: items slide up from below and fade in */
.mobile-item-enter-active,
.mobile-item-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.mobile-item-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.mobile-item-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
