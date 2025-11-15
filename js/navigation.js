// Navigation Manager - Handles navigation, active states, and scroll behavior

const Navigation = {
  init() {
    this.sections = document.querySelectorAll('section');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileMenuButton = document.getElementById('mobile-menu-button');
    this.mobileMenu = document.getElementById('mobile-menu');

    this.setupMobileMenu();
    this.setupScrollObserver();
    this.setupSmoothScroll();
  },

  setupMobileMenu() {
    if (this.mobileMenuButton && this.mobileMenu) {
      // Toggle mobile menu
      this.mobileMenuButton.addEventListener('click', () => {
        this.mobileMenu.classList.toggle('hidden');
      });

      // Close mobile menu when a link is clicked
      this.mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          this.mobileMenu.classList.add('hidden');
        });
      });

      // Close mobile menu on outside click
      document.addEventListener('click', (e) => {
        if (!this.mobileMenu.contains(e.target) &&
          !this.mobileMenuButton.contains(e.target) &&
          !this.mobileMenu.classList.contains('hidden')) {
          this.mobileMenu.classList.add('hidden');
        }
      });
    }
  },

  setupScrollObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          // Update active nav links
          this.navLinks.forEach(link => {
            link.classList.remove('active');
          });

          document.querySelectorAll(`.nav-link[data-section="${sectionId}"]`).forEach(link => {
            link.classList.add('active');
          });

          // Add fade-in animation
          entry.target.classList.add('fade-in-section');

          // Update URL hash without scrolling
          if (history.pushState) {
            history.pushState(null, null, `#${sectionId}`);
          }
        }
      });
    }, observerOptions);

    // Observe each section
    this.sections.forEach(section => {
      observer.observe(section);
    });
  },

  setupSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  },

  navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
  Navigation.init();
}

// Make available globally
window.Navigation = Navigation;
