/**
 * Café de Place-do - Modular Vanilla JavaScript (ES6+)
 * 
 * Modules:
 * 1. NavigationModule: Mobile hamburger menu toggle & accessible drawer
 * 2. ThemeModule: Dark/Light mode toggle with persistence & a11y states
 * 3. CustomizerModule: Interactive drink customizer, tab switcher & price calculator
 * 4. ContactFormModule: Accessible client-side static form validation & feedback
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. NAVIGATION MODULE (Hamburger & Responsive Menu)
     ========================================================================== */
  const NavigationModule = (() => {
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !primaryNav) return;

    /**
     * Toggles the mobile navigation state
     * @param {boolean} [forceState] - Optional explicit boolean to set open/close
     */
    const toggleMenu = (forceState) => {
      const isCurrentlyExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyExpanded;

      menuToggle.setAttribute('aria-expanded', String(shouldOpen));
      menuToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuToggle.classList.toggle('is-active', shouldOpen);
      primaryNav.classList.toggle('is-open', shouldOpen);

      if (shouldOpen) {
        // Focus the first navigation link for keyboard users
        const firstLink = primaryNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    };

    /**
     * Initializes all event listeners for navigation
     */
    const init = () => {
      // Toggle button click
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      // Close menu when clicking any nav link
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            toggleMenu(false);
          }
        });
      });

      // Close menu when clicking outside of the header
      document.addEventListener('click', (e) => {
        if (
          primaryNav.classList.contains('is-open') &&
          !primaryNav.contains(e.target) &&
          !menuToggle.contains(e.target)
        ) {
          toggleMenu(false);
        }
      });

      // Close menu on Escape key press
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
          toggleMenu(false);
          menuToggle.focus();
        }
      });

      // Reset menu state on viewport resize crossing desktop breakpoint
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && primaryNav.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });
    };

    return { init };
  })();

  /* ==========================================================================
     2. THEME MODULE (Light / Dark Mode Toggle)
     ========================================================================== */
  const ThemeModule = (() => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const STORAGE_KEY = 'cafe-de-place-do-theme';

    if (!themeToggleBtn) return;

    /**
     * Retrieves the preferred theme from storage or system preference
     * @returns {'light'|'dark'}
     */
    const getPreferredTheme = () => {
      const storedTheme = localStorage.getItem(STORAGE_KEY);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    /**
     * Applies theme to DOM and updates accessibility attributes
     * @param {'light'|'dark'} theme
     */
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-pressed', String(isDark));
      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    };

    /**
     * Initializes theme toggle and listeners
     */
    const init = () => {
      // Set initial theme
      const initialTheme = getPreferredTheme();
      applyTheme(initialTheme);

      // Listen for toggle click
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        applyTheme(newTheme);
        try {
          localStorage.setItem(STORAGE_KEY, newTheme);
        } catch (e) {
          // Gracefully handle private browsing storage quotas
        }
      });

      // Listen for system theme changes if user hasn't overridden
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    };

    return { init };
  })();

  /* ==========================================================================
     3. CUSTOMIZER MODULE (Interactive Drink Barista & Live Calculator)
     ========================================================================== */
  const CustomizerModule = (() => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const drinkSelect = document.getElementById('custom-drink-select');
    const sizeRadios = document.querySelectorAll('input[name="cup-size"]');
    const sweetnessSlider = document.getElementById('sweetness-slider');
    const sweetnessValue = document.getElementById('sweetness-value');
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
    const summaryName = document.getElementById('summary-name');
    const summaryBreakdown = document.getElementById('summary-breakdown');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const addToOrderBtn = document.getElementById('add-to-order-btn');
    const orderFeedback = document.getElementById('order-feedback');

    // Category options mapping
    const DRINK_DATA = {
      matcha: [
        { id: 'matcha-oreo', name: 'Matcha Oreo Cream', basePrice: 130 },
        { id: 'matcha-latte', name: 'Matcha Coffee Latte', basePrice: 135 },
        { id: 'seasalt-matcha', name: 'Seasalt Matcha Latte', basePrice: 125 },
        { id: 'classic-matcha', name: 'Classic Pure Matcha', basePrice: 115 }
      ],
      choco: [
        { id: 'snow-dream', name: 'Snow Dream Choco', basePrice: 120 },
        { id: 'choco-latte', name: 'Choco Latte', basePrice: 110 },
        { id: 'mocha-blast', name: 'Mocha Choco Blast', basePrice: 125 },
        { id: 'dark-cocoa', name: 'Dark Cocoa Seasalt', basePrice: 120 }
      ],
      coffee: [
        { id: 'spanish-latte', name: 'Café Spanish Latte', basePrice: 115 },
        { id: 'caramel-macchiato', name: 'Caramel Macchiato', basePrice: 120 },
        { id: 'iced-americano', name: 'Iced Americano', basePrice: 90 },
        { id: 'vanilla-latte', name: 'Vanilla Café Latte', basePrice: 110 }
      ]
    };

    const SWEETNESS_LABELS = {
      '0': '0% (Unsweetened)',
      '25': '25% (Subtle Sweet)',
      '50': '50% (Half Sweet)',
      '75': '75% (Standard)',
      '100': '100% (Extra Sweet)'
    };

    if (!drinkSelect || !totalPriceDisplay) return;

    /**
     * Populates the drink select dropdown based on selected category
     * @param {'matcha'|'choco'|'coffee'} category
     */
    const populateDrinkOptions = (category) => {
      const items = DRINK_DATA[category] || DRINK_DATA.matcha;
      drinkSelect.innerHTML = '';

      items.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} (₱${item.basePrice})`;
        option.dataset.basePrice = String(item.basePrice);
        option.dataset.drinkName = item.name;
        if (index === 0) option.selected = true;
        drinkSelect.appendChild(option);
      });
    };

    /**
     * Calculates the total drink price and updates summary display
     */
    const updateCalculation = () => {
      // 1. Base Price
      const selectedOption = drinkSelect.options[drinkSelect.selectedIndex];
      const basePrice = selectedOption ? parseFloat(selectedOption.dataset.basePrice || 0) : 130;
      const drinkName = selectedOption ? (selectedOption.dataset.drinkName || selectedOption.text) : 'Custom Drink';

      // 2. Size Upcharge
      let sizePrice = 0;
      let sizeLabel = 'Regular (16 oz)';
      sizeRadios.forEach((radio) => {
        if (radio.checked) {
          sizePrice = parseFloat(radio.dataset.sizeAdd || 0);
          sizeLabel = radio.value === 'large' ? 'Large (22 oz)' : 'Regular (16 oz)';
        }
      });

      // 3. Sweetness
      const sweetnessPercent = sweetnessSlider ? sweetnessSlider.value : '75';
      const sweetnessText = SWEETNESS_LABELS[sweetnessPercent] || `${sweetnessPercent}%`;
      if (sweetnessValue) {
        sweetnessValue.textContent = sweetnessText;
      }

      // 4. Add-ons
      let addonsPrice = 0;
      const selectedAddonNames = [];
      addonCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          addonsPrice += parseFloat(checkbox.dataset.addonPrice || 0);
          const title = checkbox.closest('.checkbox-pill')?.querySelector('.pill-title')?.textContent;
          if (title) selectedAddonNames.push(title);
        }
      });

      // Calculate Total
      const grandTotal = basePrice + sizePrice + addonsPrice;

      // Update UI Elements
      if (summaryName) {
        summaryName.textContent = drinkName;
      }

      if (summaryBreakdown) {
        const addonsSummary = selectedAddonNames.length > 0 
          ? `Add-ons: ${selectedAddonNames.join(', ')}` 
          : 'No Extra Add-ons';
        summaryBreakdown.textContent = `${sizeLabel} • Sweetness: ${sweetnessText} • ${addonsSummary}`;
      }

      if (totalPriceDisplay) {
        totalPriceDisplay.textContent = `₱${grandTotal}`;
      }
    };

    /**
     * Initializes Customizer events
     */
    const init = () => {
      // Category Tab Buttons
      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          tabButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });

          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          const category = btn.dataset.drinkBase || 'matcha';
          populateDrinkOptions(category);
          updateCalculation();
        });
      });

      // Drink Dropdown Change
      drinkSelect.addEventListener('change', updateCalculation);

      // Size Radios Change
      sizeRadios.forEach((radio) => {
        radio.addEventListener('change', updateCalculation);
      });

      // Sweetness Range Input
      if (sweetnessSlider) {
        sweetnessSlider.addEventListener('input', updateCalculation);
      }

      // Add-on Checkbox Changes
      addonCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateCalculation);
      });

      // Note My Order Button
      if (addToOrderBtn && orderFeedback) {
        addToOrderBtn.addEventListener('click', () => {
          const drink = summaryName ? summaryName.textContent : 'Your drink';
          const price = totalPriceDisplay ? totalPriceDisplay.textContent : '';

          orderFeedback.textContent = `Saved! Mention "${drink}" (${price}) to our barista at the counter.`;
          orderFeedback.classList.add('highlighted');

          // Reset feedback highlight after 4 seconds
          setTimeout(() => {
            orderFeedback.classList.remove('highlighted');
          }, 4000);
        });
      }

      // Initial run
      updateCalculation();
    };

    return { init };
  })();

  /* ==========================================================================
     4. CONTACT FORM MODULE (Accessible Validation & Feedback)
     ========================================================================== */
  const ContactFormModule = (() => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (!form) return;

    /**
     * Validates email format using regex
     * @param {string} email
     * @returns {boolean}
     */
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    /**
     * Clears error messages for a field
     * @param {HTMLElement} errorElement
     * @param {HTMLElement} inputElement
     */
    const clearError = (errorElement, inputElement) => {
      if (errorElement) errorElement.textContent = '';
      if (inputElement) inputElement.removeAttribute('aria-invalid');
    };

    /**
     * Sets error message and accessible state for a field
     * @param {HTMLElement} errorElement
     * @param {HTMLElement} inputElement
     * @param {string} message
     */
    const setError = (errorElement, inputElement, message) => {
      if (errorElement) errorElement.textContent = message;
      if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.focus();
      }
    };

    /**
     * Initializes form events and client validation
     */
    const init = () => {
      // Realtime error clearing
      if (nameInput) {
        nameInput.addEventListener('input', () => clearError(nameError, nameInput));
      }
      if (emailInput) {
        emailInput.addEventListener('input', () => clearError(emailError, emailInput));
      }
      if (messageInput) {
        messageInput.addEventListener('input', () => clearError(messageError, messageInput));
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let hasError = false;

        // Reset previous status
        if (formStatus) {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }

        // Validate Name
        if (!nameInput.value.trim()) {
          setError(nameError, nameInput, 'Please enter your full name.');
          hasError = true;
        } else {
          clearError(nameError, nameInput);
        }

        // Validate Email
        if (!emailInput.value.trim()) {
          setError(emailError, emailInput, 'Please enter your email address.');
          hasError = true;
        } else if (!isValidEmail(emailInput.value.trim())) {
          setError(emailError, emailInput, 'Please enter a valid email address (e.g., name@domain.com).');
          hasError = true;
        } else {
          clearError(emailError, emailInput);
        }

        // Validate Message
        if (!messageInput.value.trim()) {
          setError(messageError, messageInput, 'Please enter your message or inquiry.');
          hasError = true;
        } else {
          clearError(messageError, messageInput);
        }

        if (hasError) return;

        // Simulate Submission UI
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('loading');
          const submitText = submitBtn.querySelector('span');
          if (submitText) submitText.textContent = 'Sending Message...';
        }

        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            const submitText = submitBtn.querySelector('span');
            if (submitText) submitText.textContent = 'Send Message';
          }

          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been received. Our team will get back to you shortly.';
          }
        }, 800);
      });
    };

    return { init };
  })();

  /* ==========================================================================
     APPLICATION INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    NavigationModule.init();
    ThemeModule.init();
    CustomizerModule.init();
    ContactFormModule.init();
  });
})();
