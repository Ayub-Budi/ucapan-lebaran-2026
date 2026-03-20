import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export type Accent = 'gold' | 'emerald' | 'rose' | 'sky'

export const ACCENTS: { id: Accent; label: string; color: string }[] = [
  { id: 'gold',    label: 'Emas',   color: '#c8a850' },
  { id: 'emerald', label: 'Zamrud', color: '#34c47e' },
  { id: 'rose',    label: 'Mawar',  color: '#e0507a' },
  { id: 'sky',     label: 'Langit', color: '#4db8d8' },
]

const KEY = 'eid-1447-cfg'

export const useSettings = defineStore('settings', () => {
  const autoPlay      = ref(true)
  const showBismillah = ref(true)
  const showTaqabbal  = ref(true)
  const accent        = ref<Accent>('gold')

  // Load from localStorage
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const s = JSON.parse(raw) as Record<string, unknown>
      if (typeof s.autoPlay === 'boolean')      autoPlay.value = s.autoPlay
      if (typeof s.showBismillah === 'boolean') showBismillah.value = s.showBismillah
      if (typeof s.showTaqabbal === 'boolean')  showTaqabbal.value = s.showTaqabbal
      if (ACCENTS.find(a => a.id === s.accent)) accent.value = s.accent as Accent
    }
  } catch { /* ignore */ }

  // Auto-save on change
  watch([autoPlay, showBismillah, showTaqabbal, accent], () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        autoPlay:      autoPlay.value,
        showBismillah: showBismillah.value,
        showTaqabbal:  showTaqabbal.value,
        accent:        accent.value,
      }))
    } catch { /* ignore */ }
  })

  const accentColor = computed(() => ACCENTS.find(a => a.id === accent.value)!.color)

  return { autoPlay, showBismillah, showTaqabbal, accent, accentColor }
})
