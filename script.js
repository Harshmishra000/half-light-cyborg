// HALF/LIGHT — interactions
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Boot sequence ---------- */
(function boot() {
  const box = $('#boot'), log = $('#bootLog');
  const lines = ['> HALF/LIGHT OS v7.2', '> linking neural lace ......... OK', '> calibrating optics ......... OK', '> organic tissue sync ........ 100%', '> welcome, candidate.'];
  if (reduce || sessionStorage.getItem('booted')) { box.classList.add('is-done'); return; }
  let i = 0;
  const next = () => {
    if (i < lines.length) { log.textContent += lines[i++] + '\n'; setTimeout(next, 220); }
    else setTimeout(() => { box.classList.add('is-done'); try { sessionStorage.setItem('booted', '1'); } catch (e) {} }, 350);
  };
  next();
})();

/* ---------- Mobile nav ---------- */
const toggle = $('#navToggle'), links = $('#navLinks');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  links.classList.toggle('is-open', !open);
});
$$('a', links).forEach(a => a.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open');
}));

/* ---------- Eye tracking ---------- */
const eye = $('#eye'), looks = $$('.eye__look'), trackXY = $('#trackXY');
function look(x, y) {
  const r = eye.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const dx = x - cx, dy = y - cy;
  const d = Math.hypot(dx, dy) || 1;
  const m = Math.min(1, d / 400);
  const tx = (dx / d) * 34 * m, ty = (dy / d) * 18 * m;
  looks.forEach(g => g.style.transform = `translate(${tx}px, ${ty}px)`);
  trackXY.textContent = `${String(Math.round(Math.abs(x)) % 1000).padStart(3, '0')} / ${String(Math.round(Math.abs(y)) % 1000).padStart(3, '0')}`;
}
window.addEventListener('pointermove', e => look(e.clientX, e.clientY), { passive: true });
window.addEventListener('touchmove', e => { const t = e.touches[0]; if (t) look(t.clientX, t.clientY); }, { passive: true });

/* ---------- Augmentation slider ---------- */
const aug = $('#aug'), augValue = $('#augValue'), tier = $('#tierLabel'), clip = $('#machineClip');
function setAug(v) {
  v = Number(v);
  const split = 100 - v;                       // organic share, from the left
  document.documentElement.style.setProperty('--split', split + '%');
  clip.setAttribute('x', String(400 * split / 100));
  clip.setAttribute('width', String(400 * v / 100));
  augValue.textContent = v + '%';
  tier.textContent = v <= 20 ? 'BASELINE' : v <= 50 ? 'ENHANCED' : v <= 80 ? 'HYBRID' : 'FULL CYBORG';
}
aug.addEventListener('input', e => setAug(e.target.value));
setAug(aug.value);

/* ---------- Reveal + counters ---------- */
function count(el) {
  const to = parseFloat(el.dataset.to), dec = +el.dataset.dec, dur = 1400, t0 = performance.now();
  if (reduce) { el.textContent = to.toFixed(dec); return; }
  const tick = t => {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-in');
    const n = $('.stat__n', en.target); if (n) count(n);
    io.unobserve(en.target);
  });
}, { threshold: 0.18 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });

/* ---------- Process progress line + active nav ---------- */
const steps = $('#steps'), sections = $$('main section[id]'), navA = $$('.nav__links a:not(.btn)');
function onScroll() {
  const r = steps.getBoundingClientRect(), vh = innerHeight;
  const p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / r.height));
  steps.style.setProperty('--progress', (p * 100).toFixed(1) + '%');
  let current = '';
  sections.forEach(s => { if (s.getBoundingClientRect().top < vh * 0.4) current = s.id; });
  navA.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Waitlist form ---------- */
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#email'), msg = $('#formMsg');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.setAttribute('aria-invalid', String(!ok));
  if (!ok) { msg.textContent = '> ERROR: signal corrupted. Enter a valid email.'; email.focus(); return; }
  const id = Math.floor(1000 + Math.random() * 9000);
  msg.textContent = `> SIGNAL RECEIVED. Welcome, candidate #${id}. ${$('#pick').value} reserved.`;
  e.target.reset();
});
