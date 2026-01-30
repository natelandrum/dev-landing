<template>
  <aside
    ref="launcherEl"
    class="fixed z-50 bg-(--sidebar-bg) border-(--border) transition-[width,max-height] duration-300 ease-out overflow-hidden left-0 right-0 top-0 border-b md:right-auto md:bottom-0 md:border-b-0 md:border-r"
    :class="asideSizeClass"
  >
    <!-- Toggle button (same for both layouts) -->
    <button
      @click="toggle()"
      class="ml-6 mt-4 mb-4 w-10 h-10 flex flex-col items-center justify-center text-(--text-secondary) hover:text-(--accent-primary) transition-colors rounded-lg hover:bg-(--hover-overlay) gap-1.5"
      aria-label="Toggle menu"
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

    <!-- Content wrapper: fades/slides as a whole -->
    <div
      class="px-4 pb-4 transition-all duration-200 ease-out
            md:opacity-100 md:translate-y-0 md:pointer-events-auto"
      :class="isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'"
    >
      <!-- Items animate individually -->
      <TransitionGroup
        name="menu"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3"
      >
        <button
          v-for="item in visibleItems"
          :key="item.key"
          type="button"
          @mouseenter="$emit('prefetch', item.key)"
          @click="$emit('open', item.key)"
          class="group w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer bg-(--sidebar-item) border border-(--border) transition-all duration-200 hover:bg-(--sidebar-item-hover) hover:border-(--accent-primary)/50 hover:shadow-[0_0_15px_var(--shadow-glow)]"
          :class="isDesktopExpanded ? 'justify-start' : 'justify-start md:justify-center'"
        >
          <div
            class="w-8 h-8 shrink-0 flex items-center justify-center text-(--accent-primary)"
            v-html="getIcon(item.key)"
          />

          <!-- Text collapses on desktop when not expanded -->
          <div
            class="flex-1 text-left overflow-hidden"
            :class="isDesktopExpanded ? 'md:block' : 'md:hidden'"
          >
            <div class="text-sm font-semibold text-(--text) mb-1 truncate">{{ item.label }}</div>
            <div class="text-xs text-(--text-secondary) line-clamp-2">{{ item.description }}</div>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { LinkItem, LinkKey } from '../config/links'

// Import SVG icons as raw strings
import PortfolioIcon from '../assets/icons/portfolio.svg?raw'
import QRCodeIcon from '../assets/icons/qr-code.svg?raw'
import SudokuIcon from '../assets/icons/sudoku.svg?raw'
import VocabIcon from '../assets/icons/vocab.svg?raw'
import FlashcardsIcon from '../assets/icons/flashcards.svg?raw'

const props = defineProps<{ linkItems: LinkItem[] }>()

defineEmits<{
  (e: 'open', key: LinkKey): void
  (e: 'prefetch', key: LinkKey): void
}>()

const isExpanded = ref(false)
const launcherEl = ref<HTMLElement | null>(null)

// Expose toggle method to parent
function toggle() {
  isExpanded.value = !isExpanded.value
}

// Click outside to close
function handleClickOutside(event: MouseEvent) {
  if (isExpanded.value && launcherEl.value && !launcherEl.value.contains(event.target as Node)) {
    isExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({ toggle })

// Map icons to link keys
const iconMap: Record<LinkKey, string> = {
  portfolio: PortfolioIcon,
  qrGenerator: QRCodeIcon,
  sudoku: SudokuIcon,
  flashcardsExtension: VocabIcon,
  flashcardsPage: FlashcardsIcon,
}

function getIcon(key: LinkKey) {
  return iconMap[key] || PortfolioIcon
}

/** Desktop "expanded" is only meaningful at md+ */
const isDesktopExpanded = computed(() => isExpanded.value)

/**
 * For TransitionGroup: when collapsed, render 0 items so they animate out.
 * Use props.linkItems (not a bare linkItems symbol).
 */
const visibleItems = computed(() => props.linkItems)

/**
 * Single source of truth for sizing:
 * - Mobile: animate max-height (top bar -> panel)
 * - Desktop: animate width (rail -> full sidebar)
 */
const asideSizeClass = computed(() => {
  return isExpanded.value ? 'md:w-64' : 'md:max-h-screen max-h-16 md:w-22'
})
</script>

<style scoped>
/* TransitionGroup classes */
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
