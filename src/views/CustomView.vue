<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const recipientName = ref('')
const senderName    = ref('')
const copied        = ref(false)
const copiedText    = ref(false)
const linkReady     = ref(false)
const showText      = ref(false)

const shareLink = computed(() => {
  const base = window.location.origin + '/costume'
  const p = new URLSearchParams()
  if (recipientName.value.trim()) p.set('to', recipientName.value.trim())
  if (senderName.value.trim())    p.set('from', senderName.value.trim())
  const qs = p.toString()
  return base + (qs ? '?' + qs : '')
})

const waText = computed(() =>
  `Assalamu'alaikum Warahmatullahi Wabarakatuh 🙏\n\n` +
  `Selamat Hari Raya Idulfitri 1447 H.\n` +
  `Taqabbalallahu minna wa minkum, mohon maaf lahir dan batin.\n\n` +
  `Semoga Allah SWT menerima amal ibadah kita dan melimpahkan keberkahan di hari yang fitri ini 🤲\n\n` +
  `Kami juga telah menyiapkan ucapan spesial yang dapat Anda lihat melalui link berikut:\n` +
  `👉 ${shareLink.value}\n\n` +
  `Wassalamu'alaikum Warahmatullahi Wabarakatuh`
)

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2400)
  } catch {
    (document.querySelector<HTMLInputElement>('.link-input'))?.select()
  }
}

function shareWA() {
  window.open('https://wa.me/?text=' + encodeURIComponent(waText.value), '_blank')
}

async function copyText() {
  try {
    await navigator.clipboard.writeText(waText.value)
    copiedText.value = true
    setTimeout(() => (copiedText.value = false), 2400)
  } catch { /* */ }
}

function buildLink() {
  linkReady.value = true
  showText.value  = false
}

function preview() {
  const query: Record<string, string> = {}
  if (recipientName.value.trim()) query.to   = recipientName.value.trim()
  if (senderName.value.trim())    query.from = senderName.value.trim()
  router.push({ path: '/costume', query })
}
</script>

<template>
  <div class="custom-page">
    <div class="wrap">
      <button class="btn-back" @click="router.push('/admin')">← Kembali</button>

      <div class="head">
        <p class="orn">❈ ✦ ❈ ✦ ❈</p>
        <h2 class="title">Buat Ucapan<br/><span>Idul Fitri 1447 H</span></h2>
        <p class="sub">Kirim ucapan spesial kepada orang yang kamu sayangi</p>
      </div>

      <!-- Inputs -->
      <div class="fields">
        <div class="fg">
          <label for="c-to">Kepada <em class="opt">— opsional</em></label>
          <input id="c-to" v-model="recipientName" type="text"
            placeholder="Nama penerima… (boleh kosong)" maxlength="50"
            @keyup.enter="buildLink"/>
        </div>
        <div class="fg">
          <label for="c-from">Dari <em class="opt">— opsional</em></label>
          <input id="c-from" v-model="senderName" type="text"
            placeholder="Nama pengirim…" maxlength="60" @keyup.enter="buildLink"/>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions">
        <button class="btn-gen" @click="buildLink">🔗 Generate Link</button>
        <button class="btn-prev" @click="preview">👁 Preview</button>
      </div>

      <!-- Link result -->
      <Transition name="drop">
        <div v-if="linkReady" class="link-box">
          <p class="link-label">Link undangan siap ✨</p>
          <div class="link-row">
            <input class="link-input" :value="shareLink" readonly
              @click="($event.target as HTMLInputElement).select()"/>
            <button class="btn-copy" :class="{ ok: copied }" @click="copyLink">
              {{ copied ? '✔' : '📋' }}
            </button>
          </div>
          <div class="share-row">
            <button class="btn-wa" @click="shareWA">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kirim via WhatsApp
            </button>
            <button class="btn-copy2" @click="copyLink">
              {{ copied ? '✔ Tersalin!' : '📋 Salin Link' }}
            </button>
            <button class="btn-txt" @click="showText = !showText">
              {{ showText ? '✕ Teks' : '📝 Teks' }}
            </button>
          </div>
          <Transition name="drop">
            <div v-if="showText" class="text-box">
              <div class="text-box-head">
                <span>Teks pesan</span>
                <button class="btn-copy-txt" :class="{ ok: copiedText }" @click="copyText">
                  {{ copiedText ? '✔ Tersalin!' : '📋 Salin Teks' }}
                </button>
              </div>
              <pre class="msg-preview">{{ waText }}</pre>
            </div>
          </Transition>
          <p class="hint">Penerima membuka link → langsung masuk ke halaman ucapan</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display:wght@400;700&display=swap');

.custom-page {
  position: absolute; inset: 0; z-index: 10;
  display: flex; align-items: center; justify-content: center;
  padding: clamp(14px,3.5vw,32px);
  padding-bottom: clamp(155px,22vw,215px);
  overflow-y: auto;
}

.wrap {
  width: 100%; max-width: 480px;
  background: linear-gradient(148deg, rgba(6,10,30,.95), rgba(12,20,52,.97));
  border: 1px solid #c8a85038; border-radius: 20px;
  padding: clamp(52px,7vw,64px) clamp(20px,5vw,44px) clamp(24px,4vw,36px);
  box-shadow: 0 20px 70px #000d; backdrop-filter: blur(12px);
  background-image:
    linear-gradient(148deg,rgba(6,10,30,.95),rgba(12,20,52,.97)),
    repeating-linear-gradient(45deg,  rgba(200,168,80,.02) 0,rgba(200,168,80,.02) 1px,transparent 0,transparent 50%),
    repeating-linear-gradient(-45deg, rgba(200,168,80,.02) 0,rgba(200,168,80,.02) 1px,transparent 0,transparent 50%);
  background-size: 100%, 20px 20px, 20px 20px;
  position: relative;
}

.btn-back {
  position: absolute; top: 14px; left: 16px;
  background: transparent; border: 1px solid #c8a85040;
  color: #6a7888; font-family: 'Playfair Display', serif;
  font-size: clamp(.72rem,1.8vw,.82rem); padding: 6px 14px;
  border-radius: 50px; cursor: pointer;
  transition: color .2s, border-color .2s;
}
.btn-back:hover { color: #c8a850; border-color: #c8a850; }

.head { text-align: center; margin-bottom: clamp(18px,3.5vw,28px); }
.orn { font-size: clamp(.68rem,1.7vw,.84rem); color: #c8a850; letter-spacing: 8px; margin-bottom: 8px; animation: shimmer 3.5s ease-in-out infinite alternate; }
@keyframes shimmer { from{color:#c8a850;text-shadow:0 0 6px #c8a85044} to{color:#ffe082;text-shadow:0 0 18px #ffe082aa} }
.title { font-size: clamp(.98rem,3.5vw,1.38rem); color: #ddd0b0; font-weight: 400; line-height: 1.4; margin-bottom: 6px; }
.title span {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(1.05rem,3.8vw,1.5rem); display: block;
  background: linear-gradient(135deg,#b8880e,#ffd54f,#c8a850); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 10px #c8a85044); margin-top: 3px;
}
.sub { font-size: clamp(.7rem,1.7vw,.8rem); color: #3a5060; font-style: italic; }

.fields { display: flex; flex-direction: column; gap: 13px; margin-bottom: 18px; }
@media (min-width: 560px) { .fields { flex-direction: row; } .fg { flex: 1; } }
.fg { display: flex; flex-direction: column; gap: 5px; }
.fg label { font-size: clamp(.7rem,1.7vw,.78rem); color: #7a8aaa; font-family: sans-serif; letter-spacing: .4px; }
.opt { color: #304050; font-style: italic; font-size: .88em; }
.fg input {
  background: rgba(255,255,255,.05); border: 1px solid #c8a85045;
  border-radius: 10px; padding: 11px 14px; color: #e8d5a3;
  font-family: 'Playfair Display', serif; font-size: clamp(.86rem,2.1vw,.97rem);
  outline: none; transition: border-color .2s, box-shadow .2s;
}
.fg input::placeholder { color: #22323e; }
.fg input:focus { border-color: #c8a850; box-shadow: 0 0 0 3px #c8a85018; }

.actions { display: flex; gap: 10px; margin-bottom: 0; }
.btn-gen, .btn-prev {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  border-radius: 12px; cursor: pointer; font-family: 'Playfair Display', serif;
  font-size: clamp(.82rem,2vw,.95rem); padding: 12px 14px; border: none;
  transition: transform .15s, box-shadow .2s;
}
.btn-gen { background: linear-gradient(135deg,#7a5a10,#c8a850,#7a5a10); background-size: 200%; color: #080c10; font-weight: 700; box-shadow: 0 4px 20px #c8a85030; }
.btn-gen:hover { background-position: right; transform: translateY(-2px); box-shadow: 0 6px 26px #c8a85050; }
.btn-prev { background: rgba(200,168,80,.1); border: 1px solid #c8a85040; color: #b09840; }
.btn-prev:hover { background: rgba(200,168,80,.2); color: #ffe082; }
.btn-gen:active, .btn-prev:active { transform: scale(.97); }

/* Link box */
.drop-enter-active { transition: all .5s cubic-bezier(.22,1,.36,1); }
.drop-leave-active { transition: all .28s ease; }
.drop-enter-from   { opacity: 0; transform: translateY(-14px); }
.drop-leave-to     { opacity: 0; transform: translateY(-8px); }

.link-box { margin-top: 16px; background: rgba(200,168,80,.06); border: 1px solid #c8a85028; border-radius: 14px; padding: clamp(13px,3vw,18px); }
.link-label { font-size: clamp(.72rem,1.7vw,.82rem); color: #c8a850; text-align: center; margin-bottom: 9px; }
.link-row { display: flex; gap: 7px; margin-bottom: 9px; }
.link-input { flex: 1; min-width: 0; background: rgba(255,255,255,.05); border: 1px solid #c8a85035; border-radius: 8px; padding: 8px 11px; color: #6a8898; font-family: monospace; font-size: clamp(.63rem,1.5vw,.76rem); outline: none; cursor: text; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.btn-copy { flex-shrink: 0; width: 36px; height: 36px; border-radius: 8px; border: 1px solid #c8a85045; background: rgba(200,168,80,.12); color: #c8a850; cursor: pointer; font-size: .95rem; transition: background .2s, color .2s; }
.btn-copy.ok { background: #1a3a1a; border-color: #3a7a3a; color: #7adc7a; }
.share-row { display: flex; gap: 8px; flex-wrap: wrap; }
.btn-wa { flex: 1; min-width: 130px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: linear-gradient(135deg,#075e54,#128c7e); border: none; color: #dcf8c6; font-family: sans-serif; font-size: clamp(.76rem,1.8vw,.86rem); padding: 9px 14px; border-radius: 50px; cursor: pointer; box-shadow: 0 3px 14px #075e5444; transition: transform .15s, box-shadow .2s; }
.btn-wa:hover { transform: translateY(-2px); box-shadow: 0 5px 20px #075e5466; }
.btn-copy2 { flex: 1; min-width: 120px; background: rgba(255,255,255,.07); border: 1px solid #c8a85030; color: #7a8aaa; font-family: sans-serif; font-size: clamp(.74rem,1.7vw,.84rem); padding: 9px 12px; border-radius: 50px; cursor: pointer; transition: background .2s, color .2s; }
.btn-copy2:hover { background: rgba(200,168,80,.15); color: #ffe082; }
.hint { font-size: clamp(.64rem,1.4vw,.72rem); color: #2a4050; text-align: center; margin-top: 9px; font-family: sans-serif; line-height: 1.5; }

/* ── Text toggle ── */
.btn-txt {
  flex-shrink: 0; font-family: sans-serif;
  font-size: clamp(.68rem,1.5vw,.76rem); padding: 8px 12px;
  border-radius: 50px; cursor: pointer;
  background: rgba(255,255,255,.05); border: 1px solid #c8a85030; color: #7a8aaa;
  transition: background .2s, color .2s;
}
.btn-txt:hover { background: rgba(200,168,80,.12); color: #c8a850; }

/* ── Text preview ── */
.text-box {
  margin-top: 10px; border-radius: 10px; padding: 12px 13px;
  background: rgba(200,168,80,.04); border: 1px solid rgba(200,168,80,.14);
}
.text-box-head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;
}
.text-box-head span { font-size: clamp(.66rem,1.4vw,.74rem); color: #4a6070; font-family: sans-serif; }
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
