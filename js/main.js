/* ===================================
   HIDN.tattoo REMOVAL — Main JS
   =================================== */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // --- Mobile burger menu ---
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- FAQ accordion ---
  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (i) {
        i.classList.remove('active');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Scroll reveal animation ---
  var revealElements = document.querySelectorAll(
    '.section__tag, .section__title, .section__sub, ' +
    '.process__step, .pricing__card, .faq__item, ' +
    '.about__text, .about__image, .tech__text, .tech__image, ' +
    '.contact__info, .contact__form, .gallery__item, ' +
    '.trust-bar__item'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  });

  // --- Before / After slider ---
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var beforeWrap = slider.querySelector('.ba-slider__img--before');
    var handle = slider.querySelector('.ba-slider__handle');
    var isDragging = false;

    function setPosition(x) {
      var rect = slider.getBoundingClientRect();
      var pos = (x - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      var pct = pos * 100;

      beforeWrap.style.width = pct + '%';
      handle.style.left = pct + '%';

      // Set the before image width so it isn't squished
      var beforeImg = beforeWrap.querySelector('img');
      beforeImg.style.width = rect.width + 'px';
      beforeImg.style.minWidth = rect.width + 'px';
    }

    // Initialize at 50%
    function init() {
      var rect = slider.getBoundingClientRect();
      setPosition(rect.left + rect.width / 2);
    }

    // Run on load and resize
    window.addEventListener('load', init);
    window.addEventListener('resize', init);

    // Mouse events
    slider.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
      slider.classList.add('active');
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        slider.classList.remove('active');
      }
    });

    // Touch events
    slider.addEventListener('touchstart', function (e) {
      isDragging = true;
      slider.classList.add('active');
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      setPosition(e.touches[0].clientX);
    }, { passive: false });

    slider.addEventListener('touchend', function () {
      isDragging = false;
      slider.classList.remove('active');
    });
  });

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
