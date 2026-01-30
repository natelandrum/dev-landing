<template>
  <header
    class="flex items-center justify-between gap-4 px-4.5 py-3.5 border border-(--border) rounded-[14px] bg-(--panel) backdrop-blur-md"
  >
    <div class="flex flex-col xl:flex-row">
      <div class="font-semibold tracking-wider text-2xl opacity-95">NATE / SOFTWARE DEVELOPER</div>
      <div class="text-[16px] opacity-70 mt-1.5 xl:ml-10">
        Building systems that think, adapt, and sometimes misbehave.
      </div>
    </div>

    <div class="flex flex-col md:flex-row text-right items-end md:items-center gap-3.5">
      <div class="flex items-center gap-2 text-[16px] opacity-85">
        <span
          class="w-2 h-2 rounded-full bg-[#07cc28] shadow-[0_0_10px_rgba(0,229,255,0.55)]"
        ></span>
        online
      </div>
      <div class="font-mono text-[16px] opacity-80">{{ time }}</div>
      <button
        class="border border-(--border) bg-(--hover-overlay)] rounded-[10px] px-2.5 py-1.5 text-inherit cursor-pointer hover:border-(--accent-primary)/40"
        type="button"
        @click="$emit('toggleTheme')"
      >
        ◐
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineEmits<{ (e: 'toggleTheme'): void }>()

const time = ref('')
let timer: number | undefined

function tick() {
  const d = new Date()
  time.value = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  tick()
  timer = window.setInterval(tick, 1000)
})
onUnmounted(() => timer && window.clearInterval(timer))
</script>
