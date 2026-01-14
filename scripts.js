(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Header scroll effect (transparent → solid) - only on homepage with hero
  const header = document.querySelector('.site-header');
  const heroImage = document.querySelector('.hero-image');
  
  if (header && heroImage) {
    // Homepage with hero image: transparent header that becomes solid on scroll
    function onScrollHeader() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  } else if (header) {
    // Other pages: always solid header
    header.classList.add('scrolled');
  }

  // Parallax hero effect (very lightweight)
  const heroMedia = document.querySelector('.hero-media');
  function onScrollParallax() {
    if (!heroMedia) return;
    const scrolled = window.scrollY || window.pageYOffset;
    const translate = Math.min(scrolled * 0.12, 50);
    heroMedia.style.transform = `translateY(${translate}px)`;
  }
  window.addEventListener('scroll', onScrollParallax, { passive: true });
  onScrollParallax();

  // Coffee beans parallax background effect
  const parallaxBeans = document.querySelector('.parallax-beans');
  if (parallaxBeans && !prefersReduced) {
    function onScrollBeans() {
      const scrolled = window.scrollY;
      // Beans move WITH content but slower (negative = same direction as scroll)
      parallaxBeans.style.transform = `translateY(${scrolled * -0.2}px)`;
    }
    window.addEventListener('scroll', onScrollBeans, { passive: true });
    onScrollBeans();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Fade-up animation on scroll using Intersection Observer
  const fadeUpElements = document.querySelectorAll('.fade-up');
  if (fadeUpElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally stop observing once visible (performance optimization)
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
    });

    fadeUpElements.forEach(el => fadeObserver.observe(el));
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    function toggleBackToTop() {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  }

  // Optional: very lightweight random drip duplicates without heavy DOM churn
  if (!prefersReduced) {
    const spill = document.getElementById('coffee-spill-css');
    const drips = spill ? spill.querySelector('.spill-drips') : null;
    if (drips) {
      let i = 0;
      setInterval(() => {
        i = (i % 5) + 1; // cycle delays implicitly via CSS nth-child
        // no DOM creation; CSS handles looping animation
      }, 4000);
    }
  }
})();
