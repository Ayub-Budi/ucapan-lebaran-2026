<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSettings, ACCENTS } from '../stores/settings'

const router   = useRouter()
const settings = useSettings()
const acStyle  = computed(() => ({ '--ac': settings.accentColor }))
</script>

<template>
  <div class="spage">
    <div class="wrap" :style="acStyle">
      <button class="btn-back" @click="router.push('/admin')">← Kembali</button>

      <div class="head">
        <p class="orn">❈ ✦ ❈ ✦ ❈</p>
        <h2 class="title">⚙ Pengaturan</h2>
        <p class="sub">Kustomisasi tampilan & perilaku undangan</p>
      </div>

      <!-- Toggle list -->
      <div class="setting-list">

        <div class="setting-item">
          <div class="slabel">
            <span class="sicon">🎵</span>
            <div>
              <p class="sname">Autoplay Musik</p>
              <p class="sdesc">Putar otomatis saat undangan dibuka</p>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="settings.autoPlay"/>
            <span class="slider"/>
          </label>
        </div>

        <div class="setting-item">
          <div class="slabel">
            <span class="sicon">🌙</span>
            <div>
              <p class="sname">Bismillah</p>
              <p class="sdesc">Tampilkan teks Arab di undangan</p>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="settings.showBismillah"/>
            <span class="slider"/>
          </label>
        </div>

        <div class="setting-item">
          <div class="slabel">
            <span class="sicon">🤲</span>
            <div>
              <p class="sname">Doa Penutup</p>
              <p class="sdesc">Taqabbalallahu Minna Wa Minkum</p>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="settings.showTaqabbal"/>
            <span class="slider"/>
          </label>
        </div>

      </div>

      <!-- Accent color -->
      <div class="accent-block">
        <p class="accent-title">🎨 Tema Warna Aksen</p>
        <div class="swatches">
          <button
            v-for="a in ACCENTS" :key="a.id"
            class="swatch"
            :class="{ active: settings.accent === a.id }"
            :style="{ '--c': a.color }"
            @click="settings.accent = a.id"
          >
            <span class="swatch-dot"/>
            <span>{{ a.label }}</span>
          </button>
        </div>
      </div>

      <p class="autosave">✓ Tersimpan otomatis</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.spage {
  position: absolute; inset: 0; z-index: 10;
  display: flex; align-items: center; justify-content: center;
  padding: clamp(14px,3.5vw,32px);
  padding-bottom: clamp(155px,22vw,215px);
  overflow-y: auto;
}

.wrap {
  width: 100%; max-width: 440px;
  background: linear-gradient(148deg,rgba(6,10,30,.95),rgba(12,20,52,.97));
  border: 1px solid rgba(200,168,80,.22); border-radius: 20px;
  padding: clamp(50px,7vw,62px) clamp(20px,4.5vw,38px) clamp(22px,3.5vw,32px);
  box-shadow: 0 20px 70px #000d; backdrop-filter: blur(12px);
  position: relative;
  background-image:
    linear-gradient(148deg,rgba(6,10,30,.95),rgba(12,20,52,.97)),
    repeating-linear-gradient(45deg,  rgba(200,168,80,.02) 0,rgba(200,168,80,.02) 1px,transparent 0,transparent 50%),
    repeating-linear-gradient(-45deg, rgba(200,168,80,.02) 0,rgba(200,168,80,.02) 1px,transparent 0,transparent 50%);
  background-size: 100%, 20px 20px, 20px 20px;
}

.btn-back {
  position: absolute; top: 14px; left: 16px;
  background: transparent; border: 1px solid rgba(200,168,80,.3);
  color: #6a7888; font-family: 'Playfair Display', serif;
  font-size: clamp(.7rem,1.7vw,.82rem); padding: 6px 14px;
  border-radius: 50px; cursor: pointer;
  transition: color .2s, border-color .2s;
}
.btn-back:hover { color: var(--ac,#c8a850); border-color: var(--ac,#c8a850); }

.head { text-align: center; margin-bottom: 22px; }
.orn { font-size: clamp(.66rem,1.6vw,.82rem); color: var(--ac,#c8a850); letter-spacing: 7px; margin-bottom: 8px; animation: shimmer 3.5s ease-in-out infinite alternate; }
@keyframes shimmer { from{color:var(--ac,#c8a850)} to{text-shadow:0 0 16px color-mix(in srgb,var(--ac,#c8a850) 70%,transparent)} }
.title { font-size: clamp(1rem,3vw,1.3rem); color: #ddd0b0; font-weight: 700; margin-bottom: 4px; }
.sub { font-size: clamp(.68rem,1.7vw,.78rem); color: #3a5060; font-style: italic; font-family: sans-serif; }

/* Setting list */
.setting-list { display: flex; flex-direction: column; gap: 2px; margin-bottom: 20px; }

.setting-item {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 13px 14px; border-radius: 12px;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.05);
  transition: background .2s;
}
.setting-item:hover { background: rgba(200,168,80,.05); }

.slabel { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.sicon  { font-size: 1.3rem; flex-shrink: 0; }
.sname  { font-size: clamp(.82rem,2vw,.92rem); color: #c8d0d8; font-family: 'Playfair Display',serif; margin-bottom: 2px; }
.sdesc  { font-size: clamp(.66rem,1.5vw,.74rem); color: #3a5060; font-family: sans-serif; line-height: 1.4; }

/* Toggle */
.toggle { position: relative; display: inline-flex; cursor: pointer; flex-shrink: 0; }
.toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
.slider {
  width: 46px; height: 26px;
  background: #0e1a28; border: 1px solid #1e2e3e; border-radius: 13px;
  position: relative; transition: background .25s, border-color .25s;
}
.slider::after {
  content: ''; position: absolute;
  width: 20px; height: 20px; top: 2px; left: 2px;
  background: #2a3a4a; border-radius: 50%;
  transition: transform .25s, background .25s;
}
.toggle input:checked + .slider {
  background: color-mix(in srgb,var(--ac,#c8a850) 18%,transparent);
  border-color: color-mix(in srgb,var(--ac,#c8a850) 55%,transparent);
}
.toggle input:checked + .slider::after {
  transform: translateX(20px);
  background: var(--ac,#c8a850);
}

/* Accent swatches */
.accent-block { margin-bottom: 20px; }
.accent-title { font-size: clamp(.74rem,1.8vw,.86rem); color: #8a9aaa; font-family: sans-serif; margin-bottom: 10px; }
.swatches { display: flex; gap: 8px; flex-wrap: wrap; }
.swatch {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 14px; border-radius: 50px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  color: #7a8a9a; font-size: clamp(.72rem,1.7vw,.82rem); cursor: pointer;
  font-family: sans-serif; transition: background .2s, border-color .2s, color .2s;
}
.swatch-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--c); flex-shrink: 0;
  box-shadow: 0 0 4px var(--c);
}
.swatch.active {
  background: color-mix(in srgb,var(--c) 14%,transparent);
  border-color: color-mix(in srgb,var(--c) 60%,transparent);
  color: var(--c);
}
.swatch:not(.active):hover { background: rgba(255,255,255,.1); color: #c8d0d8; }

.autosave {
  font-size: clamp(.66rem,1.5vw,.74rem); color: #2a4a2a; text-align: center;
  font-family: sans-serif;
}
</style>
