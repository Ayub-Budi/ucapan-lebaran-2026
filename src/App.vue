<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Star  { x:number; y:number; size:number; delay:number; dur:number }
interface Spark { x:number; y:number; color:string; delay:number; size:number; dur:number }

const stars  = ref<Star[]>([])
const sparks = ref<Spark[]>([])

onMounted(() => {
  for (let i = 0; i < 150; i++)
    stars.value.push({
      x: Math.random()*100, y: Math.random()*78,
      size: Math.random()*2.6+.3,
      delay: Math.random()*6, dur: Math.random()*3+2,
    })

  const cols = ['#FFD700','#FF8C69','#4FC3F7','#81C784','#CE93D8','#FFAB40','#F48FB1','#80DEEA']
  for (let i = 0; i < 45; i++)
    sparks.value.push({
      x: Math.random()*100, y: Math.random()*100,
      color: cols[i % cols.length]!,
      delay: Math.random()*10, size: Math.random()*5+2,
      dur: Math.random()*5+6,
    })
})
</script>

<template>
  <div class="page">

    <!-- ── Stars ──────────────────────────────────────────── -->
    <div class="sky" aria-hidden="true">
      <span v-for="(s,i) in stars" :key="i" class="star"
        :style="{ left:s.x+'%', top:s.y+'%', width:s.size+'px', height:s.size+'px',
                  animationDelay:s.delay+'s', animationDuration:s.dur+'s' }"/>
    </div>

    <!-- ── Sparks ─────────────────────────────────────────── -->
    <span v-for="(p,i) in sparks" :key="'k'+i" class="spark" aria-hidden="true"
      :style="{ left:p.x+'%', top:p.y+'%', background:p.color,
                width:p.size+'px', height:p.size+'px',
                animationDelay:p.delay+'s', animationDuration:p.dur+'s' }"/>

    <!-- ── Moon ──────────────────────────────────────────── -->
    <div class="moon-wrap" aria-hidden="true">
      <div class="moon"><div class="mshadow"/></div>
      <div class="halo"/>
    </div>

    <!-- ── Lanterns ───────────────────────────────────────── -->
    <div class="lanterns" aria-hidden="true">
      <div v-for="n in 3" :key="n" :class="['ln','ln-'+n]">
        <div class="ln-rope"/>
        <div class="ln-body">
          <div class="ln-stripe"/>
          <div class="ln-glow"/>
        </div>
        <div class="ln-tail"><div class="ln-dot"/></div>
      </div>
    </div>

    <!-- ── Router view ─────────────────────────────────────── -->
    <RouterView v-slot="{ Component, route }">
      <Transition name="pg" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <!-- ── Mosque ─────────────────────────────────────────── -->
    <div class="mosque-wrap" aria-hidden="true">
      <svg viewBox="0 0 960 210" xmlns="http://www.w3.org/2000/svg">
        <rect x="28"  y="52"  width="22" height="138" fill="#0a1428"/>
        <polygon points="28,52 39,18 50,52"            fill="#0a1428"/>
        <rect x="33"  y="14"  width="12" height="9" rx="6" fill="#0a1428"/>
        <rect x="910" y="52"  width="22" height="138" fill="#0a1428"/>
        <polygon points="910,52 921,18 932,52"         fill="#0a1428"/>
        <rect x="915" y="14"  width="12" height="9" rx="6" fill="#0a1428"/>
        <rect x="192" y="82"  width="17" height="108" fill="#0a1428"/>
        <polygon points="192,82 200,54 209,82"         fill="#0a1428"/>
        <rect x="751" y="82"  width="17" height="108" fill="#0a1428"/>
        <polygon points="751,82 759,54 768,82"         fill="#0a1428"/>
        <ellipse cx="480" cy="72" rx="132" ry="98"    fill="#0a1428"/>
        <rect x="348" y="72" width="264" height="138" fill="#0a1428"/>
        <ellipse cx="288" cy="114" rx="77" ry="62"    fill="#0a1428"/>
        <rect x="211" y="114" width="154" height="96" fill="#0a1428"/>
        <ellipse cx="672" cy="114" rx="77" ry="62"    fill="#0a1428"/>
        <rect x="595" y="114" width="154" height="96" fill="#0a1428"/>
        <rect x="18"  y="188" width="924" height="22" fill="#0a1428"/>
        <ellipse cx="480" cy="126" rx="22" ry="28"    fill="#c8a85028"/>
        <ellipse cx="288" cy="154" rx="14" ry="18"    fill="#c8a85018"/>
        <ellipse cx="672" cy="154" rx="14" ry="18"    fill="#c8a85018"/>
      </svg>
    </div>
    <div class="ground" aria-hidden="true"/>

  </div>
</template>

<style>
/* ── Global reset ─────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-weight: normal; }
html, body { width: 100%; min-height: 100vh; overflow-x: hidden; background: #04040f; }
#app { width: 100%; min-height: 100vh; padding: 0; margin: 0; max-width: none; }

/* ── Page transitions (global so RouterView Transition works) */
.pg-enter-active, .pg-leave-active { transition: opacity .38s ease, transform .38s ease; }
.pg-enter-from, .pg-leave-to { opacity: 0; transform: translateY(14px) scale(.99); }
</style>

<style scoped>
/* ── Page ─────────────────────────────────────────────────── */
.page {
  position: relative; width: 100%; min-height: 100vh; overflow: hidden;
  background: linear-gradient(175deg,
    #03030c 0%, #080f28 28%, #10203e 50%,
    #182e50 65%, #1e3444 78%, #172c22 90%, #0c1810 100%);
  display: flex; align-items: center; justify-content: center;
}

/* ── Stars ────────────────────────────────────────────────── */
.sky  { position:absolute; inset:0; pointer-events:none; }
.star { position:absolute; background:#fff; border-radius:50%; opacity:0; animation:twinkle linear infinite; }
@keyframes twinkle { 0%,100%{opacity:0;transform:scale(.3)} 50%{opacity:.88;transform:scale(1)} }

/* ── Sparks ───────────────────────────────────────────────── */
.spark { position:absolute; border-radius:50%; opacity:0; pointer-events:none; animation:floatUp ease-in-out infinite; }
@keyframes floatUp {
  0%  {opacity:0;   transform:translateY(0) scale(0)}
  15% {opacity:.7;  transform:translateY(-20px) scale(1)}
  85% {opacity:.2;  transform:translateY(-100px) scale(.6)}
  100%{opacity:0;   transform:translateY(-140px) scale(0)}
}

/* ── Moon ─────────────────────────────────────────────────── */
.moon-wrap { position:absolute; top:clamp(20px,4.5vw,50px); right:clamp(16px,8vw,100px); animation:moonrise 2s ease-out both; }
@keyframes moonrise { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
.moon {
  width:clamp(55px,8vw,92px); height:clamp(55px,8vw,92px); border-radius:50%; overflow:hidden;
  background:radial-gradient(circle at 36% 34%,#fffde7,#ffd54f 52%,#ef8c00);
  box-shadow:0 0 30px 10px #ffd54f55,0 0 65px 22px #ef8c0018;
}
.mshadow { width:83%; height:83%; border-radius:50%; background:#0a1428; position:absolute; top:-7%; right:-10%; }
.halo    { position:absolute; inset:-16px; border-radius:50%; box-shadow:0 0 42px 16px #ffd54f14; pointer-events:none; }

/* ── Lanterns ─────────────────────────────────────────────── */
.lanterns { position:absolute; top:0; left:0; width:100%; pointer-events:none; }
.ln  { position:absolute; display:flex; flex-direction:column; align-items:center; transform-origin:top center; }
.ln-1 { left:5%;  top:-4px;  animation:sway 4.4s ease-in-out infinite; }
.ln-2 { left:50%; top:-16px; transform:translateX(-50%); animation:sway 5.3s ease-in-out infinite reverse; }
.ln-3 { right:5%; top:-4px;  animation:sway 4s ease-in-out infinite 1s; }
@keyframes sway { 0%,100%{rotate:-10deg} 50%{rotate:10deg} }
.ln-rope  { width:2px; height:clamp(18px,3.5vw,30px); background:linear-gradient(#8a6a40,#c8a850); }
.ln-body  { width:clamp(22px,4.2vw,36px); height:clamp(30px,6vw,50px); background:linear-gradient(155deg,#9a2010,#d83020,#9a2010); border-radius:4px 4px 8px 8px; border:2px solid #701208; overflow:hidden; box-shadow:0 0 14px 5px #d8302044; position:relative; }
.ln-stripe{ position:absolute; inset:0; background:repeating-linear-gradient(90deg,transparent,transparent 5px,#fff1 5px,#fff1 6px); }
.ln-glow  { position:absolute; inset:0; background:radial-gradient(ellipse at center,#ffeb3b44,transparent 70%); animation:glow 2.2s ease-in-out infinite alternate; }
@keyframes glow { from{opacity:.25} to{opacity:.9} }
.ln-tail { width:2px; height:clamp(8px,1.8vw,15px); background:linear-gradient(#c8a850,transparent); }
.ln-dot  { width:4px; height:4px; border-radius:50%; background:#c8a850; margin:0 auto -2px; }

/* ── Mosque & Ground ──────────────────────────────────────── */
.mosque-wrap { position:absolute; bottom:24px; left:0; width:100%; z-index:2; pointer-events:none; }
.mosque-wrap svg { width:100%; height:auto; display:block; }
.ground { position:absolute; bottom:0; left:0; width:100%; height:26px; background:linear-gradient(180deg,#10241a,#070f0b); z-index:3; }

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 400px) {
  .ln-2 { display: none; }
}
</style>
