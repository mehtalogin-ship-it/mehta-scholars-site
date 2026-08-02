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

/* ---- LED video-wall: scroll-driven slide switching ---- */
(function () {
  var stage = document.getElementById('ledStage');
  if (!stage) return;
  var slides = [].slice.call(stage.querySelectorAll('.led-slide'));
  var dots = [].slice.call(stage.querySelectorAll('.led-dot'));
  var n = slides.length, cur = 0, ticking = false;
  function set(i) {
    if (i === cur) return; cur = i;
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
  }
  function update() {
    ticking = false;
    var range = stage.offsetHeight - window.innerHeight;
    var p = Math.min(0.9999, Math.max(0, (window.scrollY - stage.offsetTop) / range));
    set(Math.floor(p * n));
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
