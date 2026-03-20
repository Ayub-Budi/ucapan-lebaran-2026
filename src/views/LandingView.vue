<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── Ucapan Kami (from: Ayub Budi Santoso) ──────────────────
const toStatic     = ref('')
const copiedS      = ref(false)
const copiedTextS  = ref(false)
const linkReadyS   = ref(false)
const showTextS    = ref(false)

const shareLinkS = computed(() => {
  const base = window.location.origin + '/'
  const qs   = toStatic.value.trim()
    ? '?to=' + encodeURIComponent(toStatic.value.trim()) : ''
  return base + qs
})

const waTextS = computed(() =>
  `Assalamu'alaikum Warahmatullahi Wabarakatuh 🙏\n\n` +
  `Selamat Hari Raya Idulfitri 1447 H.\n` +
  `Taqabbalallahu minna wa minkum, mohon maaf lahir dan batin.\n\n` +
  `Semoga Allah SWT menerima amal ibadah kita dan melimpahkan keberkahan di hari yang fitri ini 🤲\n\n` +
  `Kami juga telah menyiapkan ucapan spesial yang dapat Anda lihat melalui link berikut:\n` +
  `👉 ${shareLinkS.value}\n\n` +
  `Wassalamu'alaikum Warahmatullahi Wabarakatuh`
)

async function copySL()  {
  try { await navigator.clipboard.writeText(shareLinkS.value); copiedS.value = true; setTimeout(() => (copiedS.value = false), 2400) } catch { /* */ }
}
async function copyTextS() {
  try { await navigator.clipboard.writeText(waTextS.value); copiedTextS.value = true; setTimeout(() => (copiedTextS.value = false), 2400) } catch { /* */ }
}
function shareWAS()      { window.open('https://wa.me/?text=' + encodeURIComponent(waTextS.value), '_blank') }
function buildStatic()   { linkReadyS.value = true; showTextS.value = false }
function previewStatic() {
  const q: Record<string,string> = {}
  if (toStatic.value.trim()) q.to = toStatic.value.trim()
  router.push({ path: '/', query: q })
}

// ── Nama Custom ─────────────────────────────────────────────
const toCustom   = ref('')
const fromCustom = ref('')
const copiedC      = ref(false)
const copiedTextC  = ref(false)
const linkReadyC   = ref(false)
const showTextC    = ref(false)

const shareLinkC = computed(() => {
  const base = window.location.origin + '/costume'
  const p    = new URLSearchParams()
  if (toCustom.value.trim())   p.set('to',   toCustom.value.trim())
  if (fromCustom.value.trim()) p.set('from', fromCustom.value.trim())
  const qs = p.toString()
  return base + (qs ? '?' + qs : '')
})

const waTextC = computed(() =>
  `Assalamu'alaikum Warahmatullahi Wabarakatuh 🙏\n\n` +
  `Selamat Hari Raya Idulfitri 1447 H.\n` +
  `Taqabbalallahu minna wa minkum, mohon maaf lahir dan batin.\n\n` +
  `Semoga Allah SWT menerima amal ibadah kita dan melimpahkan keberkahan di hari yang fitri ini 🤲\n\n` +
  `Kami juga telah menyiapkan ucapan spesial yang dapat Anda lihat melalui link berikut:\n` +
  `👉 ${shareLinkC.value}\n\n` +
  `Wassalamu'alaikum Warahmatullahi Wabarakatuh`
)

async function copyCL()  {
  try { await navigator.clipboard.writeText(shareLinkC.value); copiedC.value = true; setTimeout(() => (copiedC.value = false), 2400) } catch { /* */ }
}
async function copyTextC() {
  try { await navigator.clipboard.writeText(waTextC.value); copiedTextC.value = true; setTimeout(() => (copiedTextC.value = false), 2400) } catch { /* */ }
}
function shareWAC()      { window.open('https://wa.me/?text=' + encodeURIComponent(waTextC.value), '_blank') }
function buildCustom()   { linkReadyC.value = true; showTextC.value = false }
function previewCustom() {
  const q: Record<string,string> = {}
  if (toCustom.value.trim())   q.to   = toCustom.value.trim()
  if (fromCustom.value.trim()) q.from = fromCustom.value.trim()
  router.push({ path: '/costume', query: q })
}

function goSetting() { router.push('/setting') }
</script>

<template>
  <div class="admin-page">

    <!-- Gear -->
    <button class="gear-btn" @click="goSetting" title="Pengaturan">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83
                 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0
                 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2
                 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3
                 a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06
                 a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3
                 a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06
                 a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51
                 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    </button>

    <div class="wrap">

      <div class="head">
        <p class="orn">❈ ✦ ❈ ✦ ❈</p>
        <h2 class="title">Generate Undangan<br/><span>Idul Fitri 1447 H</span></h2>
        <p class="sub">Buat &amp; bagikan link ucapan Hari Raya</p>
      </div>

      <!-- ── Section 1: Ucapan Kami ── -->
      <div class="section section-gold">
        <p class="sec-label">🌙 Ucapan Kami</p>
        <p class="sec-from">Dari: <strong>Ayub Budi Santoso</strong></p>

        <div class="fields">
          <div class="fg">
            <label for="a-to">Kepada <em class="opt">— opsional</em></label>
            <input id="a-to" v-model="toStatic" type="text"
              placeholder="Nama penerima…" maxlength="50"
              @keyup.enter="buildStatic"/>
          </div>
        </div>

        <div class="actions">
          <button class="btn-gen gold" @click="buildStatic">🔗 Generate Link</button>
          <button class="btn-prev gold" @click="previewStatic">👁 Preview</button>
        </div>

        <Transition name="drop">
          <div v-if="linkReadyS" class="link-box">
            <p class="link-label">Link undangan siap ✨</p>
            <div class="link-row">
              <input class="link-input" :value="shareLinkS" readonly
                @click="($event.target as HTMLInputElement).select()"/>
              <button class="btn-copy" :class="{ ok: copiedS }" @click="copySL">
                {{ copiedS ? '✔' : '📋' }}
              </button>
            </div>
            <div class="share-row">
              <button class="btn-wa" @click="shareWAS">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Kirim via WhatsApp
              </button>
              <button class="btn-copy2 gold" @click="copySL">
                {{ copiedS ? '✔ Tersalin!' : '📋 Salin Link' }}
              </button>
              <button class="btn-txt gold" @click="showTextS = !showTextS">
                {{ showTextS ? '✕ Teks' : '📝 Teks' }}
              </button>
            </div>
            <Transition name="drop">
              <div v-if="showTextS" class="text-box">
                <div class="text-box-head">
                  <span>Teks pesan</span>
                  <button class="btn-copy-txt" :class="{ ok: copiedTextS }" @click="copyTextS">
                    {{ copiedTextS ? '✔ Tersalin!' : '📋 Salin Teks' }}
                  </button>
                </div>
                <pre class="msg-preview">{{ waTextS }}</pre>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>

      <div class="divider-line"><span>atau</span></div>

      <!-- ── Section 2: Nama Custom ── -->
      <div class="section section-teal">
        <p class="sec-label">✨ Nama Custom</p>
        <p class="sec-from">Atur pengirim &amp; penerima bebas</p>

        <div class="fields fields-2">
          <div class="fg">
            <label for="c-to2">Kepada <em class="opt">— opsional</em></label>
            <input id="c-to2" v-model="toCustom" type="text"
              placeholder="Nama penerima…" maxlength="50"
              @keyup.enter="buildCustom"/>
          </div>
          <div class="fg">
            <label for="c-from2">Dari <em class="opt">— opsional</em></label>
            <input id="c-from2" v-model="fromCustom" type="text"
              placeholder="Nama pengirim…" maxlength="60"
              @keyup.enter="buildCustom"/>
          </div>
        </div>

        <div class="actions">
          <button class="btn-gen teal" @click="buildCustom">🔗 Generate Link</button>
          <button class="btn-prev teal" @click="previewCustom">👁 Preview</button>
        </div>

        <Transition name="drop">
          <div v-if="linkReadyC" class="link-box link-box-teal">
            <p class="link-label teal-txt">Link undangan siap ✨</p>
            <div class="link-row">
              <input class="link-input" :value="shareLinkC" readonly
                @click="($event.target as HTMLInputElement).select()"/>
              <button class="btn-copy teal-btn" :class="{ ok: copiedC }" @click="copyCL">
                {{ copiedC ? '✔' : '📋' }}
              </button>
            </div>
            <div class="share-row">
              <button class="btn-wa" @click="shareWAC">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Kirim via WhatsApp
              </button>
              <button class="btn-copy2 teal" @click="copyCL">
                {{ copiedC ? '✔ Tersalin!' : '📋 Salin Link' }}
              </button>
              <button class="btn-txt teal" @click="showTextC = !showTextC">
                {{ showTextC ? '✕ Teks' : '📝 Teks' }}
              </button>
            </div>
            <Transition name="drop">
              <div v-if="showTextC" class="text-box text-box-teal">
                <div class="text-box-head">
                  <span>Teks pesan</span>
                  <button class="btn-copy-txt" :class="{ ok: copiedTextC }" @click="copyTextC">
                    {{ copiedTextC ? '✔ Tersalin!' : '📋 Salin Teks' }}
                  </button>
                </div>
                <pre class="msg-preview">{{ waTextC }}</pre>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display:wght@400;700&display=swap');

.admin-page {
  position: absolute; inset: 0; z-index: 10;
  display: flex; align-items: flex-start; justify-content: center;
  padding: clamp(14px,3.5vw,32px);
  padding-bottom: clamp(155px,22vw,215px);
  overflow-y: auto;
}

/* ── Gear ── */
.gear-btn {
  position: fixed;
  top: clamp(12px,2.5vw,20px); right: clamp(12px,2.5vw,20px);
  width: 40px; height: 40px; border-radius: 50%; z-index: 50;
  background: rgba(8,14,38,.82); border: 1px solid #c8a85040;
  color: #5a6878; display: flex; align-items: center; justify-content: center;
  cursor: pointer; backdrop-filter: blur(6px);
  transition: color .2s, border-color .2s, transform .3s;
}
.gear-btn:hover { color: #c8a850; border-color: #c8a85088; transform: rotate(45deg); }

/* ── Wrap ── */
.wrap {
  width: 100%; max-width: 520px; margin-top: clamp(8px,2vw,16px);
  background: linear-gradient(148deg, rgba(6,10,30,.95), rgba(12,20,52,.97));
  border: 1px solid rgba(200,168,80,.22); border-radius: 20px;
  padding: clamp(28px,5vw,40px) clamp(20px,4.5vw,36px) clamp(24px,4vw,32px);
  box-shadow: 0 20px 70px #000d; backdrop-filter: blur(12px);
  background-image:
    linear-gradient(148deg,rgba(6,10,30,.95),rgba(12,20,52,.97)),
    repeating-linear-gradient(45deg,  rgba(200,168,80,.02) 0,rgba(200,168,80,.02) 1px,transparent 0,transparent 50%),
    repeating-linear-gradient(-45deg, rgba(200,168,80,.02) 0,rgba(200,168,80,.02) 1px,transparent 0,transparent 50%);
  background-size: 100%, 20px 20px, 20px 20px;
}

/* ── Head ── */
.head { text-align: center; margin-bottom: clamp(18px,3vw,26px); }
.orn { font-size: clamp(.68rem,1.7vw,.84rem); color: #c8a850; letter-spacing: 8px; margin-bottom: 8px; animation: shimmer 3.5s ease-in-out infinite alternate; }
@keyframes shimmer { from{color:#c8a850;text-shadow:0 0 6px #c8a85044} to{color:#ffe082;text-shadow:0 0 18px #ffe082aa} }
.title { font-size: clamp(.98rem,3.2vw,1.3rem); color: #ddd0b0; font-weight: 400; line-height: 1.4; margin-bottom: 6px; }
.title span {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(1rem,3.5vw,1.4rem); display: block;
  background: linear-gradient(135deg,#b8880e,#ffd54f,#c8a850); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 10px #c8a85044); margin-top: 3px;
}
.sub { font-size: clamp(.7rem,1.7vw,.8rem); color: #3a5060; font-style: italic; font-family: sans-serif; }

/* ── Sections ── */
.section {
  border-radius: 14px; padding: clamp(14px,2.5vw,20px);
  margin-bottom: 0;
}
.section-gold { background: rgba(200,168,80,.05); border: 1px solid rgba(200,168,80,.18); }
.section-teal { background: rgba(52,196,126,.05); border: 1px solid rgba(52,196,126,.18); }

.sec-label {
  font-family: 'Playfair Display', serif;
  font-size: clamp(.9rem,2.4vw,1.08rem); font-weight: 700;
  margin-bottom: 3px;
}
.section-gold .sec-label { color: #e8d5a3; }
.section-teal .sec-label { color: #aae8c8; }

.sec-from {
  font-size: clamp(.68rem,1.6vw,.76rem); color: #3a5060;
  font-family: sans-serif; margin-bottom: clamp(10px,2vw,14px);
}
.sec-from strong { color: #c8a850; }

/* ── Divider ── */
.divider-line {
  display: flex; align-items: center; gap: 10px;
  margin: clamp(14px,2.5vw,20px) 0;
  color: #1e2e3e; font-size: .74rem; font-family: sans-serif;
}
.divider-line::before,.divider-line::after {
  content:''; flex:1; height:1px; background: rgba(255,255,255,.06);
}

/* ── Fields ── */
.fields { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
.fields-2 { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
@media (min-width: 480px) { .fields-2 { flex-direction: row; } .fields-2 .fg { flex: 1; } }

.fg { display: flex; flex-direction: column; gap: 4px; }
.fg label { font-size: clamp(.68rem,1.6vw,.76rem); color: #7a8aaa; font-family: sans-serif; letter-spacing: .3px; }
.opt { color: #2a3850; font-style: italic; font-size: .88em; }
.fg input {
  background: rgba(255,255,255,.05); border: 1px solid #c8a85045;
  border-radius: 9px; padding: 10px 13px; color: #e8d5a3;
  font-family: 'Playfair Display', serif; font-size: clamp(.84rem,2vw,.95rem);
  outline: none; transition: border-color .2s, box-shadow .2s; width: 100%;
}
.fg input::placeholder { color: #22323e; }
.fg input:focus { border-color: #c8a850; box-shadow: 0 0 0 3px #c8a85018; }

/* ── Action buttons ── */
.actions { display: flex; gap: 9px; margin-bottom: 0; }
.btn-gen, .btn-prev {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border-radius: 10px; cursor: pointer; font-family: 'Playfair Display', serif;
  font-size: clamp(.8rem,1.9vw,.92rem); padding: 10px 12px; border: none;
  transition: transform .15s, box-shadow .2s;
}
.btn-gen.gold  { background: linear-gradient(135deg,#7a5a10,#c8a850,#7a5a10); background-size: 200%; color: #080c10; font-weight: 700; box-shadow: 0 4px 18px #c8a85028; }
.btn-gen.gold:hover  { background-position: right; transform: translateY(-2px); }
.btn-gen.teal  { background: linear-gradient(135deg,#0e6640,#34c47e,#0e6640); background-size: 200%; color: #020f08; font-weight: 700; box-shadow: 0 4px 18px #34c47e20; }
.btn-gen.teal:hover  { background-position: right; transform: translateY(-2px); }
.btn-prev.gold { background: rgba(200,168,80,.1); border: 1px solid #c8a85040; color: #b09840; }
.btn-prev.gold:hover { background: rgba(200,168,80,.2); color: #ffe082; }
.btn-prev.teal { background: rgba(52,196,126,.1); border: 1px solid #34c47e40; color: #34c47e; }
.btn-prev.teal:hover { background: rgba(52,196,126,.2); color: #7fffc4; }
.btn-gen:active, .btn-prev:active { transform: scale(.97); }

/* ── Link box ── */
.drop-enter-active { transition: all .45s cubic-bezier(.22,1,.36,1); }
.drop-leave-active { transition: all .22s ease; }
.drop-enter-from   { opacity: 0; transform: translateY(-12px); }
.drop-leave-to     { opacity: 0; }

.link-box {
  margin-top: 12px; background: rgba(200,168,80,.06);
  border: 1px solid #c8a85028; border-radius: 12px;
  padding: clamp(11px,2.5vw,16px);
}
.link-box-teal {
  background: rgba(52,196,126,.06); border-color: #34c47e28;
}
.link-label { font-size: clamp(.7rem,1.6vw,.8rem); color: #c8a850; text-align: center; margin-bottom: 8px; }
.link-label.teal-txt { color: #34c47e; }

.link-row { display: flex; gap: 6px; margin-bottom: 8px; }
.link-input {
  flex: 1; min-width: 0; background: rgba(255,255,255,.05);
  border: 1px solid #c8a85035; border-radius: 7px; padding: 7px 10px;
  color: #6a8898; font-family: monospace; font-size: clamp(.6rem,1.4vw,.72rem);
  outline: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: text;
}
.btn-copy {
  flex-shrink: 0; width: 34px; height: 34px; border-radius: 7px;
  border: 1px solid #c8a85045; background: rgba(200,168,80,.12);
  color: #c8a850; cursor: pointer; font-size: .88rem;
  transition: background .2s, color .2s;
}
.btn-copy.teal-btn { border-color: #34c47e45; background: rgba(52,196,126,.12); color: #34c47e; }
.btn-copy.ok { background: #1a3a1a; border-color: #3a7a3a; color: #7adc7a; }

.share-row { display: flex; gap: 7px; flex-wrap: wrap; }
.btn-wa {
  flex: 1; min-width: 120px; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  background: linear-gradient(135deg,#075e54,#128c7e); border: none; color: #dcf8c6;
  font-family: sans-serif; font-size: clamp(.72rem,1.7vw,.82rem);
  padding: 8px 12px; border-radius: 50px; cursor: pointer;
  box-shadow: 0 3px 12px #075e5440; transition: transform .15s, box-shadow .2s;
}
.btn-wa:hover { transform: translateY(-2px); box-shadow: 0 5px 18px #075e5460; }

.btn-copy2 {
  flex: 1; min-width: 100px; font-family: sans-serif;
  font-size: clamp(.7rem,1.6vw,.8rem); padding: 8px 10px;
  border-radius: 50px; cursor: pointer; transition: background .2s, color .2s;
}
.btn-copy2.gold { background: rgba(255,255,255,.07); border: 1px solid #c8a85030; color: #7a8aaa; }
.btn-copy2.gold:hover { background: rgba(200,168,80,.15); color: #ffe082; }
.btn-copy2.teal { background: rgba(255,255,255,.07); border: 1px solid #34c47e30; color: #7a8aaa; }
.btn-copy2.teal:hover { background: rgba(52,196,126,.15); color: #7fffc4; }

/* ── Text toggle button ── */
.btn-txt {
  flex-shrink: 0; font-family: sans-serif;
  font-size: clamp(.68rem,1.5vw,.76rem); padding: 7px 10px;
  border-radius: 50px; cursor: pointer; transition: background .2s, color .2s;
}
.btn-txt.gold { background: rgba(255,255,255,.05); border: 1px solid #c8a85030; color: #7a8aaa; }
.btn-txt.gold:hover { background: rgba(200,168,80,.12); color: #c8a850; }
.btn-txt.teal { background: rgba(255,255,255,.05); border: 1px solid #34c47e30; color: #7a8aaa; }
.btn-txt.teal:hover { background: rgba(52,196,126,.12); color: #34c47e; }

/* ── Text preview box ── */
.text-box {
  margin-top: 10px; border-radius: 10px; padding: 12px 13px;
  background: rgba(200,168,80,.04); border: 1px solid rgba(200,168,80,.14);
}
.text-box-teal {
  background: rgba(52,196,126,.04); border-color: rgba(52,196,126,.14);
}
.text-box-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
}
.text-box-head span {
  font-size: clamp(.66rem,1.4vw,.74rem); color: #4a6070; font-family: sans-serif;
}
.btn-copy-txt {
  font-family: sans-serif; font-size: clamp(.66rem,1.4vw,.74rem);
  padding: 4px 10px; border-radius: 50px; cursor: pointer;
  background: rgba(200,168,80,.1); border: 1px solid #c8a85035; color: #c8a850;
  transition: background .2s, color .2s;
}
.btn-copy-txt.ok { background: #1a3a1a; border-color: #3a7a3a; color: #7adc7a; }
.btn-copy-txt:not(.ok):hover { background: rgba(200,168,80,.2); }

.msg-preview {
  font-family: sans-serif; font-size: clamp(.62rem,1.4vw,.72rem);
  color: #4a6878; line-height: 1.7; white-space: pre-wrap; word-break: break-word;
  margin: 0; background: rgba(0,0,0,.18); border-radius: 7px;
  padding: 10px 12px; max-height: 200px; overflow-y: auto;
  border: 1px solid rgba(255,255,255,.04);
}
</style>
