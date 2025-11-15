// Theme Manager - Handles dark mode toggle and persistence

const ThemeManager = {
  init() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.htmlEl = document.documentElement;

    // Load saved theme or default to dark
    this.loadTheme();

    // Set up toggle listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Re-initialize icons
    this.updateIcons();
  },

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.htmlEl.classList.remove('dark');
    } else {
      this.htmlEl.classList.add('dark');
    }
  },

  toggleTheme() {
    if (this.htmlEl.classList.contains('dark')) {
      this.htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      this.htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    this.updateIcons();
  },

  updateIcons() {
    // Re-trigger Lucide icon creation
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 50);
    }
  },

  isDark() {
    return this.htmlEl.classList.contains('dark');
  }
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}

// Make available globally
window.ThemeManager = ThemeManager;
