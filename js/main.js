/* ============================================================
   Mehta Scholars — shared site behaviour
   ============================================================ */

/* ---- Hosted live chat (replaces the old Wix Chat widget) ----
   Paste your Tawk.to (or Crisp) embed src below to enable it.
   Leave TAWK_SRC empty to keep chat disabled.
   Get the src at: dashboard.tawk.to → Administration → Chat Widget
   e.g. 'https://embed.tawk.to/PROPERTY_ID/WIDGET_ID'
*/
var TAWK_SRC = '';
(function loadChat() {
  if (!TAWK_SRC) return; // disabled until an ID is provided
  window.Tawk_API = window.Tawk_API || {};
  var s = document.createElement('script');
  s.async = true;
  s.src = TAWK_SRC;
  s.charset = 'UTF-8';
  s.setAttribute('crossorigin', '*');
  document.head.appendChild(s);
})();

/* ---- Mobile nav toggle ---- */
document.addEventListener('click', function (e) {
  if (e.target.closest('.nav-toggle')) {
    document.querySelector('.nav-links').classList.toggle('open');
  }
});

/* ---- Scroll-in reveal animations (rebuilt from Wix motion) ---- */
document.addEventListener('DOMContentLoaded', function () {
  var targets = document.querySelectorAll(
    '.card, .invest-card, .member, .founder, .step, .section-head, .pill, .class-block, .bio-card'
  );
  if (!('IntersectionObserver' in window) || !targets.length) return;

  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i % 8, 6) * 0.05) + 's';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { io.observe(el); });
});

/* ---- Alumni companies stage / category filter ---- */
document.addEventListener('DOMContentLoaded', function () {
  var filterBar = document.querySelector('.filters');
  if (!filterBar) return;

  var buttons = filterBar.querySelectorAll('.filter-btn');
  var groups = document.querySelectorAll('[data-stage-group]');
  var items = document.querySelectorAll('[data-sector]');

  function apply(cat) {
    items.forEach(function (f) {
      var cats = (f.dataset.sector || 'all').split(' ');
      f.style.display = (cat === 'all' || cats.indexOf(cat) !== -1) ? '' : 'none';
    });
    groups.forEach(function (g) {
      var anyVisible = false;
      g.querySelectorAll('[data-sector]').forEach(function (f) {
        if (f.style.display !== 'none') anyVisible = true;
      });
      g.style.display = anyVisible ? '' : 'none';
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      apply(btn.dataset.filter);
    });
  });

  var hash = location.hash.replace('#', '');
  if (hash) {
    var match = Array.prototype.find.call(buttons, function (b) { return b.dataset.filter === hash; });
    if (match) match.click();
  }
});

/* ---- Cinematic intro + LED screen in one pinned scroll ----
   Phase A (scroll 0 .. FV): scrub the video frame sequence.
   Phase B (FV .. 1): hold the last frame; power on the LED screen and play the slides.
   Merged so there is no second section / no in-between scroll. */
(function () {
  var stage = document.getElementById('introStage');
  var canvas = document.getElementById('introCanvas');
  if (!stage || !canvas) return;
  var ctx = canvas.getContext('2d');
  var N = parseInt(stage.getAttribute('data-frames'), 10) || 140;
  var FV = parseFloat(stage.getAttribute('data-video-end')) || 0.34; // fraction of scroll spent on the video
  var base = 'assets/intro/';
  var imgs = new Array(N);
  var current = -1;
  var pin = stage.querySelector('.intro-pin');
  var overlay = stage.querySelector('.intro-overlay');
  var cue = stage.querySelector('.intro-cue');
  var screen = stage.querySelector('.wall-screen');
  var texhd = stage.querySelector('.wall-tex-hd');
  var slides = [].slice.call(stage.querySelectorAll('.ws-slide'));
  var cards = [].slice.call(stage.querySelectorAll('.ws-card'));
  var dotsWrap = stage.querySelector('.wall-dots');
  var dots = [].slice.call(stage.querySelectorAll('.wall-dot'));
  var th = [0.08, 0.26, 0.44];
  // Black-screen rectangle inside the final frame (assets/intro/f_140.jpg, 1280x720)
  var FW = 1280, FH = 720, RX0 = 206, RY0 = 132, RX1 = 1075, RY1 = 623;
  function pad(n) { return ('000' + n).slice(-3); }
  function ok(im) { return im && im.complete && im.naturalWidth > 0; }
  function pick(i) {
    if (ok(imgs[i])) return i;
    for (var d = 1; d < N; d++) {
      if (i - d >= 0 && ok(imgs[i - d])) return i - d;
      if (i + d < N && ok(imgs[i + d])) return i + d;
    }
    return -1;
  }
  function draw(i) {
    if (ok(imgs[i])) { ctx.drawImage(imgs[i], 0, 0, canvas.width, canvas.height); current = i; }
  }
  function place() {
    if (!pin || !screen) return;
    var pw = pin.clientWidth, ph = pin.clientHeight, scale, offX, offY;
    if (pw / ph > FW / FH) { scale = pw / FW; offX = 0; offY = (ph - FH * scale) / 2; }
    else { scale = ph / FH; offY = 0; offX = (pw - FW * scale) / 2; }
    screen.style.left = (offX + RX0 * scale) + 'px';
    screen.style.top = (offY + RY0 * scale) + 'px';
    screen.style.width = ((RX1 - RX0) * scale) + 'px';
    screen.style.height = ((RY1 - RY0) * scale) + 'px';
  }
  function update() {
    var range = stage.offsetHeight - window.innerHeight;
    var p = Math.min(1, Math.max(0, (window.scrollY - stage.offsetTop) / range));
    // Phase A — video scrub
    var vp = Math.min(1, p / FV);
    var frame = pick(Math.round(vp * (N - 1)));
    if (frame !== -1 && frame !== current) draw(frame);
    if (overlay) overlay.style.opacity = Math.max(0, 1 - vp / 0.5);
    if (cue) cue.style.opacity = Math.max(0, 0.85 * (1 - vp / 0.3));
    // Landing — as the flight's last frames lock the screen into full frame
    // (~frames 130-138), power the LED screen on FIRST (over the black screen, so a
    // screen is always present), THEN switch the wall to crisp travertine. Driven by
    // the video progress (vp) so the wall goes clean the moment the screen is framed,
    // not only once the flight formally ends.
    var q = Math.min(0.9999, Math.max(0, (p - FV) / (1 - FV)));
    var scr = Math.min(1, Math.max(0, (vp - 0.925) / 0.012));   // screen snaps on: ~frame 130 -> 132
    if (screen) screen.style.opacity = scr;
    if (dotsWrap) dotsWrap.style.opacity = scr;
    if (texhd) texhd.style.opacity = Math.min(1, Math.max(0, (vp - 0.940) / 0.014)); // clean wall: ~frame 132 -> 134
    var idx = q < 0.62 ? 0 : 1;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
    dots.forEach(function (d, i) { d.classList.toggle('is-on', i === idx); });
    cards.forEach(function (c, i) { c.classList.toggle('show', idx > 0 || q >= th[i]); });
  }
  for (var i = 0; i < N; i++) {
    (function (i) {
      var im = new Image();
      im.onload = function () { if (current === -1) draw(pick(0)); else if (i === current) draw(i); };
      im.src = base + 'f_' + pad(i + 1) + '.jpg?v=2';
      imgs[i] = im;
    })(i);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', function () { place(); update(); });
  place();
  update();
})();

/* ---- About: scroll-built process flowchart (connectors draw, nodes light,
        a 3x refinement loop draws out then is reabsorbed, and the tail splits & merges) ---- */
(function () {
  var proc = document.getElementById('procDiagram');
  if (!proc) return;
  var steps = [].slice.call(proc.querySelectorAll('.pf-step'));
  var segs = [].slice.call(proc.querySelectorAll('.pf-seg'));
  var results = document.getElementById('pfResults');
  var split = document.getElementById('pfSplit');
  var merge = document.getElementById('pfMerge');
  var review = document.getElementById('pfReview');
  var loop = review ? review.querySelector('.pf-loop') : null;
  var loopFill = loop ? loop.querySelector('.pf-loopwire > i') : null;
  proc.classList.add('armed');
  function clamp(x) { return Math.max(0, Math.min(1, x)); }
  function geom() {
    // align the split/merge fork bars + branch drops to the two result-box centres
    if (!results || !split || !merge) return;
    var bx = results.querySelectorAll('.pf-box');
    if (bx.length < 2) return;
    var rr = results.getBoundingClientRect();
    var b1 = bx[0].getBoundingClientRect(), b2 = bx[1].getBoundingClientRect();
    var lc = (b1.left + b1.width / 2) - rr.left;
    var rc = (b2.left + b2.width / 2) - rr.left;
    var mid = rr.width / 2;
    [split, merge].forEach(function (c) {
      var dL = c.querySelector('.downL, .upL'), dR = c.querySelector('.downR, .upR');
      var bL = c.querySelector('.barL, .mbarL'), bR = c.querySelector('.barR, .mbarR');
      if (dL) dL.style.left = (lc - 1.5) + 'px';
      if (dR) dR.style.left = (rc - 1.5) + 'px';
      if (bL) { bL.style.left = lc + 'px'; bL.style.width = (mid - lc) + 'px'; }
      if (bR) { bR.style.left = mid + 'px'; bR.style.width = (rc - mid) + 'px'; }
    });
  }
  function build() {
    var line = window.innerHeight * 0.72;
    steps.forEach(function (s) {
      var m = s.querySelector('.pf-medal') || s;
      s.classList.toggle('pf-lit', m.getBoundingClientRect().top < line);
    });
    segs.forEach(function (sg) {
      var fi = sg.querySelector('i'); if (!fi) return;
      var r = sg.getBoundingClientRect();
      if (sg.classList.contains('horiz')) fi.style.transform = 'scaleX(' + clamp((line - r.top) / 26) + ')';
      else fi.style.transform = 'scaleY(' + clamp((line - r.top) / r.height) + ')';
    });
    // the 3x refinement loop: draw out to the right, hold, then get reabsorbed
    if (loop && loopFill && review) {
      var box = review.querySelector('.pf-box').getBoundingClientRect();
      var d = line - (box.top + box.height / 2); // px the reveal line is past the review box's centre
      var w = 0, drawn = false;
      if (d < 0) { w = 0; }
      else if (d < 70) { w = d / 70; drawn = d > 14; }
      else if (d < 175) { w = 1; drawn = true; }
      else if (d < 255) { w = 1 - (d - 175) / 80; drawn = false; }  // absorb
      else { w = 0; }
      loopFill.style.transform = 'scaleX(' + w + ')';
      loop.classList.toggle('draw', drawn);
    }
  }
  geom();
  build();
  window.addEventListener('scroll', build, { passive: true });
  window.addEventListener('resize', function () { geom(); build(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { geom(); build(); });
})();
