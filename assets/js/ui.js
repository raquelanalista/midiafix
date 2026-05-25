/* ════════════════════════════════════════════════════════════
   MIDIAFIX · SHARED UI BEHAVIORS v1.0
   Comportamentos compartilhados entre páginas. Auto-inicializa;
   cada módulo só age se os elementos existirem na página.
     · reveal-on-scroll  → .reveal  (adiciona .visible ao entrar na viewport)
     · accordion / FAQ    → .mx-accordion-trigger (single-open por .mx-accordion)
     · nav-scroll         → .mx-nav  (alterna .scrolled após 60px)
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Reveal on scroll ──────────────────────────────────────
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Fallback: sem IntersectionObserver, mostra tudo (evita conteúdo oculto).
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { obs.observe(el); });
  }

  // ── Accordion / FAQ (single-open por grupo) ───────────────
  function initAccordion() {
    document.querySelectorAll('.mx-accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.mx-accordion-item');
        if (!item) return;
        var group = trigger.closest('.mx-accordion') || document;
        var isOpen = item.classList.contains('open');
        group.querySelectorAll('.mx-accordion-item.open').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ── Nav scroll state ──────────────────────────────────────
  function initNavScroll() {
    var nav = document.querySelector('.mx-nav');
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function init() {
    initReveal();
    initAccordion();
    initNavScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
