(function() {
  'use strict';

  // Get all category sections and nav links
  const sections = document.querySelectorAll('.drink-category');
  const navLinks = document.querySelectorAll('.category-nav-link');

  // Function to update active nav link based on scroll position
  function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 250; // Offset for better UX

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Add active class to matching link
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Listen for scroll events
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // Set initial active state on page load
  updateActiveLink();

  // Update on click for immediate feedback
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

})();

