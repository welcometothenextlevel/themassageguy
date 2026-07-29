/* My Massage Guy — site behaviour */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  /* Header shrink on scroll ------------------------------------------------ */
  var onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu ------------------------------------------------------------ */
  var scrollY = 0;

  var setNav = function (open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

    /* Lock the page behind the panel — iOS Safari ignores overflow:hidden
       on the body, so pin it with position:fixed and restore the offset. */
    if (open) {
      scrollY = window.scrollY;
      document.body.style.top = -scrollY + 'px';
      document.body.classList.add('nav-open');
    } else if (document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }
  };

  var closeNav = function () { setNav(false); };

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    setNav(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  /* Tap anywhere outside the panel to close it */
  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && nav.classList.contains('is-open')) closeNav();
  });

  /* Reveal on scroll ------------------------------------------------------- */
  var targets = document.querySelectorAll(
    '.sec-head, .strip__item, .card, .rate, .mobile__copy, .mobile__areas, ' +
    '.about__copy, .about__mark, .steps li, .faq__list, .book__intro, .book__form, .pricing__note'
  );

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* FAQ — one panel open at a time ---------------------------------------- */
  var faqs = document.querySelectorAll('.faq details');
  Array.prototype.forEach.call(faqs, function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      Array.prototype.forEach.call(faqs, function (other) {
        if (other !== d) other.open = false;
      });
    });
  });

  /* Booking form → pre-filled email --------------------------------------- */
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = ['name', 'phone'];
      var firstBad = null;

      required.forEach(function (id) {
        var field = form.elements[id];
        var empty = !field.value.trim();
        field.classList.toggle('invalid', empty);
        if (empty && !firstBad) firstBad = field;
      });

      if (firstBad) { firstBad.focus(); return; }

      var v = function (id) { return (form.elements[id].value || '').trim(); };

      var body = [
        'Name: ' + v('name'),
        'Phone: ' + v('phone'),
        'Email: ' + (v('email') || '—'),
        'Service: ' + v('service'),
        'Location: ' + v('location'),
        '',
        'Details:',
        v('message') || '—',
        '',
        '— Sent from mymassageguy.com.au'
      ].join('\n');

      window.location.href =
        'mailto:troy@mymassageguy.com.au' +
        '?subject=' + encodeURIComponent('Booking enquiry — ' + v('name')) +
        '&body=' + encodeURIComponent(body);
    });

    form.addEventListener('input', function (e) {
      if (e.target.value.trim()) e.target.classList.remove('invalid');
    });
  }

  /* Footer year ------------------------------------------------------------ */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
