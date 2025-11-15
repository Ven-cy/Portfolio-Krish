// Component Loader - Dynamically loads reusable HTML components

class ComponentLoader {
  /**
   * Load a component from the components directory
   * @param {string} componentName - Name of the component file (without .html)
   * @param {string} targetSelector - CSS selector for where to inject the component
   */
  static async loadComponent(componentName, targetSelector) {
    try {
      const response = await fetch(`/components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      const html = await response.text();
      const target = document.querySelector(targetSelector);
      if (target) {
        target.innerHTML = html;
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      return false;
    }
  }

  /**
   * Load multiple components
   * @param {Array} components - Array of {name, target} objects
   */
  static async loadComponents(components) {
    const promises = components.map(({ name, target }) =>
      this.loadComponent(name, target)
    );
    return Promise.all(promises);
  }

  /**
   * Initialize all common components (header, footer)
   */
  static async initCommonComponents() {
    await Promise.all([
      this.loadComponent('header', '#header-placeholder'),
      this.loadComponent('footer', '#footer-placeholder')
    ]);

    // Reinitialize icons after loading components
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Initialize navigation after header is loaded
    if (window.Navigation) {
      window.Navigation.init();
    }

    // Initialize theme toggle after header is loaded
    if (window.ThemeManager) {
      window.ThemeManager.init();
    }

    // Initialize animations (particles, parallax, etc.) after components are loaded
    if (window.AnimationsManager) {
      try {
        window.AnimationsManager.init();
      } catch (err) {
        // animations may have initialized earlier; ignore errors
        console.warn('AnimationsManager init error:', err);
      }
    }
  }
}

// Auto-load common components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.initCommonComponents();
  });
} else {
  ComponentLoader.initCommonComponents();
}

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComponentLoader;
}
