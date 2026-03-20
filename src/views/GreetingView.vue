<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import musicSrc from '../assets/music/Opick - Ya Maulana.mp3'
import { useSettings } from '../stores/settings'

const route    = useRoute()
const settings = useSettings()

const isStatic  = route.path === '/'
const recipient = computed(() => (route.query.to as string) ?? '')
const sender    = computed(() => isStatic ? 'Ayub Budi Santoso' : ((route.query.from as string) ?? ''))

const audioEl   = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

function startMusic() {
  audioEl.value?.play()
    .then(() => { isPlaying.value = true })
    .catch(() => { isPlaying.value = false })
}
function stopMusic() {
  audioEl.value?.pause()
  isPlaying.value = false
}
function toggleMusic() { isPlaying.value ? stopMusic() : startMusic() }

onMounted(() => { if (settings.autoPlay) nextTick(startMusic) })
onUnmounted(stopMusic)

const acStyle = computed(() => ({ '--ac': settings.accentColor }))
</script>

<template>
  <div class="gpage" :style="acStyle">
    <!-- hidden audio -->
    <audio ref="audioEl" :src="musicSrc" loop preload="auto" style="display:none"/>

    <!-- ── Sender navbar ──────────────────────────────────── -->
    <div v-if="sender" class="sender-nav">
      <span class="sn-icon">☪</span>
      <span class="sn-from">Dari:</span>
      <span class="sn-name">{{ sender }}</span>
      <span class="sn-icon">☪</span>
    </div>

    <!-- ── Flowing greeting ───────────────────────────────── -->
    <div class="gflow">

      <p class="g1 go orn">❈ ✦ ❈ ✦ ❈</p>

      <!-- Kepada — hanya tampil jika recipient tidak kosong -->
      <div v-if="recipient" class="g2 go kepada-box">
        <span class="kepada-lbl">Kepada Yth.</span>
        <h2 class="kepada-name">{{ recipient }}</h2>
      </div>

      <p v-if="settings.showBismillah" class="g3 go arabic">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </p>

      <div class="g4 go title-wrap">
        <span class="t-top">Selamat Hari Raya</span>
        <span class="t-main">Idul Fitri</span>
        <span class="t-year">1447 H &nbsp;·&nbsp; 2026 M</span>
      </div>

      <div class="g5 go divider">
        <span class="dl"/><span class="dc">☪</span><span class="dl"/>
      </div>

      <p class="g6 go minal">
        Minal <em>Aidin</em> Wal <em>Faizin</em>
      </p>
      <p class="g7 go maaf">Mohon Maaf Lahir &amp; Batin</p>

      <p class="g8 go orn2">✦ ❈ ✦ ❈ ✦</p>

      <p class="g9 go msg">
        Semoga hari yang fitri ini membawa kedamaian,<br/>
        kebahagiaan, dan keberkahan untuk kita semua. 🤲
      </p>

      <p v-if="settings.showTaqabbal" class="g10 go tq">
        Taqabbalallahu Minna Wa Minkum
      </p>

    </div>

    <!-- ── Floating music button ──────────────────────────── -->
    <button class="fab" @click="toggleMusic" :class="{ playing: isPlaying }">
      {{ isPlaying ? '⏸' : '♪' }}
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

/* ── Page wrapper ────────────────────────────────────────── */
.gpage {
  position: absolute; inset: 0; z-index: 10;
  overflow-y: auto;
  display: flex; flex-direction: column;
  align-items: center;
  padding-top: 0;
  padding-bottom: clamp(155px, 22vw, 215px);
}

/* ── Sender navbar ───────────────────────────────────────── */
.sender-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: clamp(10px,2vw,14px) 20px;
  background: linear-gradient(90deg, transparent, rgba(8,14,40,.82) 20%, rgba(8,14,40,.82) 80%, transparent);
  border-bottom: 1px solid rgba(200,168,80,.15);
  backdrop-filter: blur(8px);
  flex-shrink: 0;
  z-index: 5;
}
.sn-icon {
  color: var(--ac, #c8a850);
  font-size: clamp(.8rem, 2vw, 1rem);
  animation: spin 12s linear infinite;
  opacity: .7;
}
@keyframes spin { to { transform: rotate(360deg); } }
.sn-from {
  font-family: sans-serif;
  font-size: clamp(.66rem, 1.6vw, .76rem);
  color: #4a6070;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.sn-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(.88rem, 2.5vw, 1.1rem);
  color: var(--ac, #c8a850);
  font-weight: 700;
  text-shadow: 0 0 14px color-mix(in srgb, var(--ac, #c8a850) 35%, transparent);
}

/* ── Flowing content ─────────────────────────────────────── */
.gflow {
  position: relative; z-index: 2;
  max-width: 560px; width: 100%;
  text-align: center;
  padding: clamp(20px,4vw,36px) clamp(14px,4vw,28px) 0;
  display: flex; flex-direction: column; align-items: center;
  gap: clamp(10px, 2.5vw, 16px);
  flex: 1;
}
.gflow::before {
  content: ''; position: absolute; inset: -60px -80px;
  background: radial-gradient(ellipse at center, rgba(4,8,22,.76) 0%, rgba(4,8,22,.48) 45%, transparent 72%);
  pointer-events: none; z-index: -1; border-radius: 50%;
}

/* ── Staggered entrance ──────────────────────────────────── */
.go { animation: gIn .9s cubic-bezier(.22,1,.36,1) backwards; }
.g1  { animation-delay: .04s } .g2 { animation-delay: .16s } .g3 { animation-delay: .28s }
.g4  { animation-delay: .40s } .g5 { animation-delay: .54s } .g6 { animation-delay: .66s }
.g7  { animation-delay: .76s } .g8 { animation-delay: .86s } .g9 { animation-delay: .96s }
.g10 { animation-delay:1.06s }
@keyframes gIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ── Ornaments ───────────────────────────────────────────── */
.orn  { font-size:clamp(.68rem,1.7vw,.86rem); color:var(--ac,#c8a850); letter-spacing:8px; animation:shimmer 3.5s ease-in-out infinite alternate; }
.orn2 { font-size:clamp(.68rem,1.7vw,.86rem); color:var(--ac,#c8a850); letter-spacing:8px; animation:shimmer 3.5s ease-in-out infinite alternate 1s; }
@keyframes shimmer {
  from { color:var(--ac,#c8a850); text-shadow:0 0 6px color-mix(in srgb,var(--ac,#c8a850) 40%,transparent); }
  to   { text-shadow:0 0 20px color-mix(in srgb,var(--ac,#c8a850) 80%,transparent); }
}

/* ── Kepada ──────────────────────────────────────────────── */
.kepada-lbl {
  display:block; font-size:clamp(.68rem,1.7vw,.78rem); color:#556070;
  letter-spacing:4px; text-transform:uppercase; font-family:sans-serif; margin-bottom:4px;
}
.kepada-name {
  font-size:clamp(1.3rem,5.5vw,2.4rem); font-weight:700;
  color:#ffe082; text-shadow:0 0 28px rgba(255,224,130,.3), 0 2px 8px #000a;
  word-break:break-word; line-height:1.2;
}

/* ── Arabic ──────────────────────────────────────────────── */
.arabic {
  font-family:'Amiri',serif; font-size:clamp(1rem,3.4vw,1.32rem);
  color:var(--ac,#c8a850); direction:rtl;
  text-shadow:0 0 14px color-mix(in srgb,var(--ac,#c8a850) 35%,transparent), 0 2px 6px #000a;
}

/* ── Title ───────────────────────────────────────────────── */
.title-wrap { display:flex; flex-direction:column; align-items:center; gap:2px; position:relative; }
.title-wrap::before {
  content:''; position:absolute; inset:-28px -55px;
  background:radial-gradient(ellipse at center, color-mix(in srgb,var(--ac,#c8a850) 10%,transparent) 0%, transparent 65%);
  pointer-events:none;
}
.t-top  { font-size:clamp(.82rem,2.8vw,1.15rem); color:#8aacbc; letter-spacing:5px; text-transform:uppercase; font-weight:400; text-shadow:0 2px 8px #000b; }
.t-main {
  font-family:'Cinzel Decorative',serif; font-weight:700;
  font-size:clamp(2.4rem,10vw,5.4rem); line-height:1.0;
  background:linear-gradient(145deg, #9a7008 0%, #e8c060 28%, #fff8c0 52%, #e0b040 74%, #c87810 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  filter:drop-shadow(0 0 18px #c8a85066) drop-shadow(0 3px 10px #0009);
  animation:gp 5s ease-in-out infinite;
}
@keyframes gp {
  0%,100% { filter:drop-shadow(0 0 14px #c8a85055) drop-shadow(0 3px 10px #0009); }
  50%     { filter:drop-shadow(0 0 32px #ffe082aa) drop-shadow(0 3px 10px #0009); }
}
.t-year { font-size:clamp(.68rem,1.8vw,.92rem); color:#4a5a40; letter-spacing:6px; text-transform:uppercase; text-shadow:0 2px 6px #000a; }

/* ── Divider ─────────────────────────────────────────────── */
.divider { display:flex; align-items:center; justify-content:center; gap:14px; width:100%; max-width:240px; }
.dl { flex:1; height:1px; background:linear-gradient(90deg,transparent,var(--ac,#c8a850),transparent); }
.dc { font-size:1.5rem; color:var(--ac,#c8a850); animation:spin 14s linear infinite; text-shadow:0 0 12px color-mix(in srgb,var(--ac,#c8a850) 55%,transparent); }

/* ── Minal & Maaf ────────────────────────────────────────── */
.minal { font-size:clamp(1.5rem,6vw,3rem); color:#e0d0b0; font-style:normal; text-shadow:0 2px 12px #000a; }
.minal em { color:var(--ac,#c8a850); text-shadow:0 0 20px color-mix(in srgb,var(--ac,#c8a850) 55%,transparent), 0 2px 10px #000a; font-style:normal; }
.maaf { font-size:clamp(.78rem,2.4vw,1.06rem); color:#6a8aaa; letter-spacing:3px; text-transform:uppercase; text-shadow:0 2px 8px #000a; }

/* ── Message & Taqabbal ──────────────────────────────────── */
.msg { font-family:'Amiri',serif; font-size:clamp(.84rem,2.3vw,1.04rem); color:#506070; line-height:2; font-style:italic; text-shadow:0 1px 4px #000a; }
.tq  { font-family:'Amiri',serif; font-size:clamp(.78rem,1.9vw,.94rem); color:var(--ac,#c8a850); letter-spacing:1px; text-shadow:0 0 10px color-mix(in srgb,var(--ac,#c8a850) 30%,transparent), 0 2px 6px #000a; filter:brightness(.85); }

/* ── FAB music ───────────────────────────────────────────── */
.fab {
  position: fixed;
  bottom: clamp(188px,24vw,252px); right: clamp(14px,3vw,28px);
  z-index: 40;
  width:42px; height:42px; border-radius:50%;
  background:rgba(8,14,38,.85); border:1px solid rgba(200,168,80,.3);
  color:var(--ac,#c8a850); font-size:1.1rem;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; backdrop-filter:blur(8px);
  box-shadow:0 4px 16px #000a;
  transition:background .2s, border-color .2s, transform .15s;
}
.fab:hover { background:rgba(20,28,60,.92); border-color:var(--ac,#c8a850); transform:scale(1.08); }
.fab.playing { animation:fabPulse 2.5s ease-in-out infinite; }
@keyframes fabPulse {
  0%,100% { box-shadow:0 4px 16px #000a; }
  50%     { box-shadow:0 4px 22px color-mix(in srgb,var(--ac,#c8a850) 40%,transparent); }
}
</style>
