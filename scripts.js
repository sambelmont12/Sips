(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

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
