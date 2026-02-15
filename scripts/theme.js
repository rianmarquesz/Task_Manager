/**
 * Theme Manager
 * Handles dark/light theme switching with persistence
 */

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'app-theme';
    this.DARK_THEME = 'dark';
    this.LIGHT_THEME = 'light';
    this.toggleButton = null;
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    this.cacheElements();
    this.applyTheme();
    this.bindEvents();
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.toggleButton = document.getElementById('theme-toggle');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (!this.getSavedTheme()) {
        this.applyTheme();
      }
    });
  }

  /**
   * Get saved theme from localStorage
   * @returns {string|null} Saved theme or null
   */
  getSavedTheme() {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  /**
   * Get system preference for theme
   * @returns {string} 'dark' or 'light' based on OS settings
   */
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.DARK_THEME : this.LIGHT_THEME;
  }

  /**
   * Get current theme (saved preference or system preference)
   * @returns {string} Current theme
   */
  getCurrentTheme() {
    const saved = this.getSavedTheme();
    return saved || this.getSystemTheme();
  }

  /**
   * Apply theme to document
   */
  applyTheme() {
    const theme = this.getCurrentTheme();
    this.setTheme(theme);
    this.updateToggleButton();
  }

  /**
   * Set theme on document root
   * @param {string} theme - 'dark' or 'light'
   */
  setTheme(theme) {
    if (theme === this.DARK_THEME) {
      document.documentElement.setAttribute('data-theme', this.DARK_THEME);
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.style.colorScheme = 'light';
    }
  }

  /**
   * Update toggle button icon and label
   */
  updateToggleButton() {
    if (!this.toggleButton) return;

    const theme = this.getCurrentTheme();
    if (theme === this.DARK_THEME) {
      this.toggleButton.textContent = '☀️';
      this.toggleButton.setAttribute('aria-label', 'Switch to light mode');
      this.toggleButton.setAttribute('title', 'Light mode');
    } else {
      this.toggleButton.textContent = '🌙';
      this.toggleButton.setAttribute('aria-label', 'Switch to dark mode');
      this.toggleButton.setAttribute('title', 'Dark mode');
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const current = this.getCurrentTheme();
    const newTheme = current === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;

    // Save preference
    localStorage.setItem(this.STORAGE_KEY, newTheme);

    // Apply theme
    this.setTheme(newTheme);
    this.updateToggleButton();
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
  });
} else {
  new ThemeManager();
}
