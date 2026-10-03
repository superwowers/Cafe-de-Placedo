/**
 * Café de Place-do - Artisanal Minimalist JavaScript
 * Betis, Sta. Monica, Rizal, Nueva Ecija
 * 
 * Modules:
 * 1. NavigationModule: Mobile menu toggle
 * 2. MenuSheetsModule: Interactive menu board viewer & full-screen lightbox
 * 3. QuickFinderModule: Instant search & price check
 * 4. CommunityWishlistModule: Drink requests, community upvoting, & reviews
 */

(() => {
  'use strict';

  /* ==========================================================================
     COMPLETE MENU REFERENCE (For Quick Price Finder)
     ========================================================================== */
  const MENU_LOOKUP = [
    // Coffee
    { name: 'Americano', cat: 'Coffee', price: 'Iced ₱59 / Hot ₱69' },
    { name: 'Latte', cat: 'Coffee', price: 'Iced ₱75 / Hot ₱89' },
    { name: 'Iced Dark Mocha', cat: 'Coffee', price: '₱85.00' },
    { name: 'Iced White Mocha', cat: 'Coffee', price: '₱85.00' },
    { name: 'Vanilla Latte', cat: 'Coffee', price: 'Iced ₱75 / Hot ₱89' },
    { name: 'Caramel Macchiato', cat: 'Coffee (Best Seller)', price: 'Iced ₱79 / Hot ₱99' },
    { name: 'Salted Caramel Macchiato', cat: 'Coffee', price: 'Iced ₱79 / Hot ₱99' },
    { name: 'Spanish Latte', cat: 'Coffee (Best Seller)', price: 'Iced ₱75 / Hot ₱89' },
    { name: 'Butterscotch Latte', cat: 'Coffee', price: 'Iced ₱75 / Hot ₱89' },
    { name: 'Hazelnut Macchiato', cat: 'Coffee', price: 'Iced ₱75 / Hot ₱89' },
    { name: 'Hazelnut Caramel Macchiato', cat: 'Coffee (Best Seller)', price: 'Iced ₱79 / Hot ₱99' },

    // Seasalt Series
    { name: 'Seasalt Americano', cat: 'Seasalt Series (New)', price: '₱85.00' },
    { name: 'Seasalt Spanish Latte', cat: 'Seasalt Series (#1 Best Seller)', price: '₱95.00' },
    { name: 'Seasalt Matcha Latte', cat: 'Seasalt Series', price: '₱105.00' },

    // Non-Coffee
    { name: 'Strawberry Milk', cat: 'Non-Coffee', price: '₱85.00' },
    { name: 'Blueberry Milk', cat: 'Non-Coffee', price: '₱85.00' },
    { name: 'Choco Latte', cat: 'Non-Coffee (Best Seller)', price: '₱85.00' },
    { name: 'Oreo Latte', cat: 'Non-Coffee (Best Seller)', price: '₱85.00' },

    // Signature Drinks
    { name: 'Snow Dream Choco', cat: 'Signature (Best Seller)', price: '₱95.00' },
    { name: 'Oreo Coffee Latte', cat: 'Signature (Best Seller)', price: '₱95.00' },
    { name: 'Strawberry Oreo', cat: 'Signature', price: '₱95.00' },
    { name: 'Tres Leches Caramel', cat: 'Signature (New Biscoff)', price: '₱125.00' },

    // Matcha Series
    { name: 'Matcha Latte', cat: 'Matcha Series (Best Seller)', price: '₱85.00' },
    { name: 'Matcha Coffee Latte', cat: 'Matcha Series', price: '₱95.00' },
    { name: 'Strawberry Matcha', cat: 'Matcha Series', price: '₱95.00' },
    { name: 'Matcha Oreo Cream', cat: 'Matcha Series (Best Seller)', price: '₱95.00' },

    // Biscoff Series
    { name: 'Biscoff Milk', cat: 'Biscoff Series', price: '₱115.00' },
    { name: 'Biscoffee', cat: 'Biscoff Series (Best Seller)', price: '₱125.00' },
    { name: 'Biscoff Matcha', cat: 'Biscoff Series (New)', price: '₱115.00' },

    // Fruity Juices & Sodas
    { name: 'Blueberry Juice', cat: 'Fruity Juice', price: '16oz ₱39 / 22oz ₱49' },
    { name: 'Grapes Juice', cat: 'Fruity Juice', price: '16oz ₱39 / 22oz ₱49' },
    { name: 'Lemon Juice', cat: 'Fruity Juice', price: '16oz ₱39 / 22oz ₱49' },
    { name: 'Lychee Juice', cat: 'Fruity Juice', price: '16oz ₱39 / 22oz ₱49' },
    { name: 'Green Apple Juice', cat: 'Fruity Juice', price: '16oz ₱39 / 22oz ₱49' },
    { name: 'Blueberry Fizz', cat: 'Fruity Soda', price: '16oz ₱49 / 22oz ₱59' },
    { name: 'Grapes Fizz', cat: 'Fruity Soda', price: '16oz ₱49 / 22oz ₱59' },
    { name: 'Lemon Fizz', cat: 'Fruity Soda', price: '16oz ₱49 / 22oz ₱59' },
    { name: 'Lychee Fizz', cat: 'Fruity Soda', price: '16oz ₱49 / 22oz ₱59' },
    { name: 'Green Apple Fizz', cat: 'Fruity Soda', price: '16oz ₱49 / 22oz ₱59' },

    // Comfort Plates
    { name: 'Crispy Chicken Poppers & Rice', cat: 'Comfort Plate', price: '₱109.00' },
    { name: 'Beef Tapa & Rice', cat: 'Comfort Plate', price: '₱109.00' },
    { name: 'Hungarian Sausage & Rice', cat: 'Comfort Plate', price: '₱109.00' },
    { name: 'Garlic Pork Longganisa & Rice', cat: 'Comfort Plate', price: '₱109.00' },

    // Snacks
    { name: 'Snacks Platter', cat: 'Snacks (Hotdog, Fries, Cheese Sticks)', price: '₱70.00' },
    { name: 'Chicks n’ Fries', cat: 'Snacks', price: '₱95.00' },
    { name: 'Duo Chicks n’ Fries', cat: 'Snacks (Sharing)', price: '₱145.00' },
    { name: 'Cheesy Chicken Onion Rings', cat: 'Snacks', price: '₱65.00' },

    // Pancit Canton in a Bowl
    { name: 'Canton Overload', cat: 'Pancit Canton (Egg+Spam+Siomai+Hotdog)', price: '₱95.00' },
    { name: 'Spammy Canton', cat: 'Pancit Canton (Spam+Egg)', price: '₱75.00' },
    { name: 'Siomai Canton', cat: 'Pancit Canton (Siomai+Egg)', price: '₱75.00' },
    { name: 'Hotdog Canton', cat: 'Pancit Canton (Hotdog+Egg)', price: '₱75.00' }
  ];

  /* ==========================================================================
     0. THEME MODULE (DARK / LIGHT MODE)
     ========================================================================== */
  const ThemeModule = (() => {
    const toggleBtn = document.getElementById('theme-toggle');
    const storageKey = 'cafe-placedo-theme';

    const getStoredTheme = () => {
      try {
        return localStorage.getItem(storageKey);
      } catch (e) {
        return null;
      }
    };

    const setStoredTheme = (theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {
        // Local storage unavailable
      }
    };

    const applyTheme = (theme) => {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-label', 'Switch to light mode');
          toggleBtn.setAttribute('title', 'Switch to light mode');
        }
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
          toggleBtn.setAttribute('title', 'Switch to dark mode');
        }
      }
    };

    const init = () => {
      const stored = getStoredTheme();
      // Default to light mode unless previously set to dark
      const currentTheme = stored === 'dark' ? 'dark' : 'light';
      applyTheme(currentTheme);

      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const nextTheme = isDark ? 'light' : 'dark';
          applyTheme(nextTheme);
          setStoredTheme(nextTheme);
        });
      }
    };

    return { init };
  })();

  /* ==========================================================================
     1. NAVIGATION MODULE
     ========================================================================== */
  const NavigationModule = (() => {
    const nav = document.getElementById('primary-navigation');
    const toggleBtn = document.getElementById('menu-toggle');

    const init = () => {
      if (!nav || !toggleBtn) return;

      toggleBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
      });

      // Close on link click
      nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
          nav.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    };

    return { init };
  })();

  /* ==========================================================================
     2. MENU SHEETS & LIGHTBOX MODULE
     ========================================================================== */
  const MenuSheetsModule = (() => {
    const tabP1 = document.getElementById('tab-page1-btn');
    const tabP2 = document.getElementById('tab-page2-btn');
    const sheetP1 = document.getElementById('menu-sheet-page1');
    const sheetP2 = document.getElementById('menu-sheet-page2');

    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalClose = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    const openLightbox = (src) => {
      if (!modal || !modalImg) return;
      modalImg.src = src;
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      if (!modal) return;
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (modalImg) modalImg.src = '';
    };

    const init = () => {
      // Tab switcher
      if (tabP1 && tabP2 && sheetP1 && sheetP2) {
        tabP1.addEventListener('click', () => {
          tabP1.classList.add('active');
          tabP1.setAttribute('aria-selected', 'true');
          tabP2.classList.remove('active');
          tabP2.setAttribute('aria-selected', 'false');

          sheetP1.classList.add('active');
          sheetP1.removeAttribute('hidden');
          sheetP2.classList.remove('active');
          sheetP2.setAttribute('hidden', '');
        });

        tabP2.addEventListener('click', () => {
          tabP2.classList.add('active');
          tabP2.setAttribute('aria-selected', 'true');
          tabP1.classList.remove('active');
          tabP1.setAttribute('aria-selected', 'false');

          sheetP2.classList.add('active');
          sheetP2.removeAttribute('hidden');
          sheetP1.classList.remove('active');
          sheetP1.setAttribute('hidden', '');
        });
      }

      // Zoom triggers
      document.querySelectorAll('[data-zoom-target]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const target = btn.dataset.zoomTarget;
          if (target) openLightbox(target);
        });
      });

      // Click on frame to open
      document.querySelectorAll('.sheet-image-frame').forEach(frame => {
        frame.addEventListener('click', () => {
          const img = frame.querySelector('.menu-sheet-img');
          if (img && img.src) openLightbox(img.src);
        });
      });

      // Click on drink card media to open
      document.querySelectorAll('.drink-media').forEach(media => {
        media.addEventListener('click', () => {
          const img = media.querySelector('.drink-img');
          if (img && img.src) openLightbox(img.src);
        });
      });

      // Keyboard accessibility for menu board cards
      document.querySelectorAll('.menu-board-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const target = card.dataset.zoomTarget;
            if (target) openLightbox(target);
          }
        });
      });

      // Modal close handlers
      if (modalClose) modalClose.addEventListener('click', closeLightbox);
      if (backdrop) backdrop.addEventListener('click', closeLightbox);

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
          closeLightbox();
        }
      });
    };

    return { init };
  })();

  /* ==========================================================================
     ITEMS FILTER & PAGINATION MODULE (AVAILABLE DRINKS & COMFORT FOOD)
     ========================================================================== */
  const DrinksFilterModule = (() => {
    const filterBtns = document.querySelectorAll('.item-filter-btn, .drink-filter-btn');
    const cards = Array.from(document.querySelectorAll('.drink-card'));
    const paginationContainer = document.getElementById('showcase-pagination');
    const prevBtn = document.getElementById('page-prev-btn');
    const nextBtn = document.getElementById('page-next-btn');
    const indicatorsBox = document.getElementById('page-indicators');

    const PAGE_SIZE = 8;
    let currentCategory = 'all';
    let currentPage = 1;

    const getMatchingCards = () => {
      if (currentCategory === 'all') return cards;
      return cards.filter(card => card.dataset.category === currentCategory);
    };

    const updateView = (scrollOnPageChange = false) => {
      const matchingCards = getMatchingCards();
      const totalPages = Math.ceil(matchingCards.length / PAGE_SIZE) || 1;

      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const visibleSubset = new Set(matchingCards.slice(startIndex, endIndex));

      cards.forEach(card => {
        if (visibleSubset.has(card)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      if (paginationContainer) {
        if (matchingCards.length <= PAGE_SIZE) {
          paginationContainer.classList.add('hidden');
        } else {
          paginationContainer.classList.remove('hidden');

          if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
            prevBtn.setAttribute('aria-disabled', currentPage <= 1 ? 'true' : 'false');
          }
          if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
            nextBtn.setAttribute('aria-disabled', currentPage >= totalPages ? 'true' : 'false');
          }

          if (indicatorsBox) {
            indicatorsBox.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
              const pill = document.createElement('button');
              pill.type = 'button';
              pill.className = `page-pill ${i === currentPage ? 'active' : ''}`;
              pill.textContent = i;
              pill.setAttribute('aria-label', `Go to page ${i}`);
              if (i === currentPage) {
                pill.setAttribute('aria-current', 'page');
              }
              pill.addEventListener('click', () => {
                if (currentPage !== i) {
                  currentPage = i;
                  updateView(true);
                }
              });
              indicatorsBox.appendChild(pill);
            }
          }
        }
      }

      if (scrollOnPageChange) {
        const showcaseSection = document.getElementById('showcase');
        if (showcaseSection) {
          const rect = showcaseSection.getBoundingClientRect();
          if (rect.top < 0) {
            showcaseSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    const init = () => {
      if (!cards.length) return;

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          currentCategory = btn.dataset.category || 'all';
          currentPage = 1;
          updateView(false);
        });
      });

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage--;
            updateView(true);
          }
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const matchingCards = getMatchingCards();
          const totalPages = Math.ceil(matchingCards.length / PAGE_SIZE) || 1;
          if (currentPage < totalPages) {
            currentPage++;
            updateView(true);
          }
        });
      }

      updateView(false);
    };

    return { init };
  })();

  /* ==========================================================================
     3. QUICK PRICE FINDER MODULE
     ========================================================================== */
  const QuickFinderModule = (() => {
    const input = document.getElementById('quick-item-search');
    const clearBtn = document.getElementById('clear-quick-search');
    const resultsBox = document.getElementById('finder-results-box');

    const init = () => {
      if (!input || !resultsBox) return;

      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();

        if (clearBtn) {
          clearBtn.hidden = query.length === 0;
        }

        if (query.length === 0) {
          resultsBox.hidden = true;
          resultsBox.innerHTML = '';
          return;
        }

        const matches = MENU_LOOKUP.filter(item => {
          return item.name.toLowerCase().includes(query) ||
                 item.cat.toLowerCase().includes(query);
        });

        if (matches.length === 0) {
          resultsBox.hidden = false;
          resultsBox.innerHTML = `
            <div style="padding: 12px; font-size: 0.85rem; color: var(--text-muted); text-align: center;">
              No matching menu item found for "${input.value}". Suggest it below in our Drink Wishlist!
            </div>
          `;
          return;
        }

        resultsBox.hidden = false;
        resultsBox.innerHTML = matches.map(item => `
          <div class="finder-item-row">
            <div>
              <span class="finder-item-name">${item.name}</span>
              <span class="finder-item-cat">${item.cat}</span>
            </div>
            <span class="finder-item-price">${item.price}</span>
          </div>
        `).join('');
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          clearBtn.hidden = true;
          resultsBox.hidden = true;
          resultsBox.innerHTML = '';
          input.focus();
        });
      }
    };

    return { init };
  })();

  /* ==========================================================================
     4. CUSTOMER VOICE & DRINK WISHLIST MODULE
     ========================================================================== */
  const CommunityWishlistModule = (() => {
    const btnWishlist = document.getElementById('btn-mode-wishlist');
    const btnReview = document.getElementById('btn-mode-review');
    const activeModeInput = document.getElementById('active-mode-input');

    const form = document.getElementById('community-input-form');
    const authorInput = document.getElementById('input-author');
    const wishTitleInput = document.getElementById('input-wish-title');
    const wishCatSelect = document.getElementById('select-wish-category');
    const favDrinkInput = document.getElementById('input-fav-drink');
    const starValInput = document.getElementById('input-star-val');
    const starBtns = document.querySelectorAll('.star-item');
    const messageInput = document.getElementById('input-message');
    const messageLabel = document.getElementById('label-message');
    const noticeBox = document.getElementById('submit-notice');

    const fieldsWishlist = document.getElementById('fields-wishlist');
    const fieldsReview = document.getElementById('fields-review');

    const listContainer = document.getElementById('community-items-list');
    const filterBtns = document.querySelectorAll('.board-filter-btn');

    const STORAGE_KEY = 'cafe-placedo-community-v5';
    const VOTES_KEY = 'cafe-placedo-votes-v5';
    const MY_ITEMS_KEY = 'cafe-placedo-my-submissions-v5';

    // Clear previous storage keys so all prior test submissions are immediately wiped
    try {
      [
        'cafe-placedo-community-v4',
        'cafe-placedo-community-v3',
        'cafe-placedo-community-v2',
        'cafe-placedo-community',
        'cafe-placedo-my-submissions',
        'cafe-placedo-votes-v4',
        'cafe-placedo-votes-v3'
      ].forEach(k => localStorage.removeItem(k));
    } catch (e) {}

    // Authentic Initial Entries
    const DEFAULT_ENTRIES = [
      {
        id: 'w1',
        type: 'wishlist',
        title: 'Dirty Matcha Latte',
        author: 'Alyzza (Rizal Local)',
        category: 'Specialty Coffee',
        message: 'A shot of your bold espresso over creamy ceremonial matcha would be amazing! Perfect afternoon energy boost.',
        votes: 38,
        date: 'Recent'
      },
      {
        id: 'w2',
        type: 'review',
        title: 'Seasalt Spanish Latte & Canton Overload',
        author: 'Mark Kevin (Cabanatuan)',
        rating: 5,
        message: 'The Seasalt Spanish Latte here is legit. Perfectly balanced sea salt foam, plus the evening patio vibe is super chill.',
        votes: 45,
        date: '2 days ago'
      },
      {
        id: 'w3',
        type: 'wishlist',
        title: 'Cheesy Croffle with Caramel',
        author: 'Camille (Sta. Monica)',
        category: 'Pastry / Snack',
        message: 'Warm crispy croffles topped with caramel drizzle to pair with Biscoffee at night! Hope this gets added soon!',
        votes: 27,
        date: 'Recent'
      },
      {
        id: 'w4',
        type: 'review',
        title: 'Snow Dream Choco',
        author: 'Joshua P.',
        rating: 5,
        message: 'Snow Dream Choco with marshmallows is super comforting. Hometown favorite!',
        votes: 19,
        date: '4 days ago'
      }
    ];

    const DEFAULT_IDS = new Set(DEFAULT_ENTRIES.map(e => e.id));

    let items = [];
    let votedIds = new Set();
    let mySubmissions = new Set();
    let currentFilter = 'all';

    const saveState = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        localStorage.setItem(VOTES_KEY, JSON.stringify(Array.from(votedIds)));
        localStorage.setItem(MY_ITEMS_KEY, JSON.stringify(Array.from(mySubmissions)));
      } catch (err) {}
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      items = saved ? JSON.parse(saved) : [...DEFAULT_ENTRIES];
      const votes = localStorage.getItem(VOTES_KEY);
      if (votes) votedIds = new Set(JSON.parse(votes));
      const myItems = localStorage.getItem(MY_ITEMS_KEY);
      if (myItems) mySubmissions = new Set(JSON.parse(myItems));
    } catch (e) {
      items = [...DEFAULT_ENTRIES];
    }

    const renderList = () => {
      if (!listContainer) return;

      const filtered = items.filter(it => {
        if (currentFilter === 'all') return true;
        return it.type === currentFilter;
      });

      if (filtered.length === 0) {
        listContainer.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            No items in this category yet. Be the first to submit!
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filtered.map(it => {
        const isWish = it.type === 'wishlist';
        const hasVoted = votedIds.has(it.id);
        const isUserItem = !DEFAULT_IDS.has(it.id) || mySubmissions.has(it.id);

        let typeBadge = '';
        if (isWish) {
          typeBadge = `<span class="card-type-tag">Wishlist: ${it.category || 'Drink'}</span>`;
        } else {
          typeBadge = `<span class="card-type-tag review">${it.rating || 5}/5 Rating</span>`;
        }

        const deleteBtn = isUserItem ? `
          <button type="button" class="btn-delete-submission" data-delete-id="${it.id}" aria-label="Delete my comment" title="Delete my comment">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Delete my comment</span>
          </button>
        ` : '';

        return `
          <article class="community-card ${isUserItem ? 'my-submission' : ''}" data-id="${it.id}">
            <div class="card-top">
              ${typeBadge}
              <div class="card-top-right">
                <span class="card-date">${it.date || 'Recent'}</span>
                ${deleteBtn}
              </div>
            </div>
            <h4 class="card-title">${escapeHTML(it.title)}</h4>
            <p class="card-text">${escapeHTML(it.message)}</p>
            <div class="card-footer">
              <span class="card-author">${escapeHTML(it.author)}</span>
              <button type="button" class="btn-upvote ${hasVoted ? 'voted' : ''}" data-upvote="${it.id}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="${hasVoted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>${it.votes || 0} ${isWish ? 'Wants' : 'Likes'}</span>
              </button>
            </div>
          </article>
        `;
      }).join('');
    };

    const escapeHTML = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const setMode = (mode) => {
      if (activeModeInput) activeModeInput.value = mode;

      if (mode === 'wishlist') {
        if (btnWishlist) {
          btnWishlist.classList.add('active');
          btnWishlist.setAttribute('aria-selected', 'true');
        }
        if (btnReview) {
          btnReview.classList.remove('active');
          btnReview.setAttribute('aria-selected', 'false');
        }
        if (fieldsWishlist) fieldsWishlist.hidden = false;
        if (fieldsReview) fieldsReview.hidden = true;
        if (messageLabel) {
          messageLabel.innerHTML = 'Why should Café de Place-do add this? <span class="req">*</span>';
        }
      } else {
        if (btnReview) {
          btnReview.classList.add('active');
          btnReview.setAttribute('aria-selected', 'true');
        }
        if (btnWishlist) {
          btnWishlist.classList.remove('active');
          btnWishlist.setAttribute('aria-selected', 'false');
        }
        if (fieldsWishlist) fieldsWishlist.hidden = true;
        if (fieldsReview) fieldsReview.hidden = false;
        if (messageLabel) {
          messageLabel.innerHTML = 'How was your drink or visit? <span class="req">*</span>';
        }
      }
    };

    const init = () => {
      renderList();

      // Mode toggles
      if (btnWishlist) btnWishlist.addEventListener('click', () => setMode('wishlist'));
      if (btnReview) btnReview.addEventListener('click', () => setMode('review'));

      // Suggestion Chips
      document.querySelectorAll('.chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
          if (wishTitleInput) {
            wishTitleInput.value = chip.dataset.value || '';
          }
          if (wishCatSelect && chip.dataset.cat) {
            wishCatSelect.value = chip.dataset.cat;
          }
          if (messageInput) messageInput.focus();
        });
      });

      // Star rating
      starBtns.forEach(star => {
        star.addEventListener('click', () => {
          const val = parseInt(star.dataset.val, 10);
          if (starValInput) starValInput.value = String(val);
          starBtns.forEach(s => {
            const sVal = parseInt(s.dataset.val, 10);
            s.classList.toggle('active', sVal <= val);
          });
        });
      });

      // Filter tabs
      filterBtns.forEach(b => {
        b.addEventListener('click', () => {
          filterBtns.forEach(btn => btn.classList.remove('active'));
          b.classList.add('active');
          currentFilter = b.dataset.filter || 'all';
          renderList();
        });
      });

      // Upvoting & Deleting click handler
      if (listContainer) {
        listContainer.addEventListener('click', (e) => {
          // Delete handling: removes user comment/request
          const delBtn = e.target.closest('[data-delete-id]');
          if (delBtn) {
            const id = delBtn.dataset.deleteId;
            items = items.filter(it => it.id !== id);
            mySubmissions.delete(id);
            votedIds.delete(id);
            saveState();
            renderList();
            if (noticeBox) {
              noticeBox.className = 'form-notice';
              noticeBox.textContent = 'Your comment has been deleted.';
              setTimeout(() => { if (noticeBox) noticeBox.textContent = ''; }, 3000);
            }
            return;
          }

          // Upvote handling
          const upBtn = e.target.closest('[data-upvote]');
          if (!upBtn) return;

          const id = upBtn.dataset.upvote;
          const target = items.find(it => it.id === id);
          if (!target) return;

          if (votedIds.has(id)) {
            votedIds.delete(id);
            target.votes = Math.max(0, (target.votes || 1) - 1);
          } else {
            votedIds.add(id);
            target.votes = (target.votes || 0) + 1;
          }

          saveState();
          renderList();
        });
      }

      // Form submission
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();

          const mode = activeModeInput ? activeModeInput.value : 'wishlist';
          const author = authorInput ? authorInput.value.trim() : '';
          const msg = messageInput ? messageInput.value.trim() : '';

          let valid = true;

          const errAuthor = document.getElementById('err-author');
          const errWishTitle = document.getElementById('err-wish-title');
          const errMessage = document.getElementById('err-message');

          if (errAuthor) errAuthor.textContent = '';
          if (errWishTitle) errWishTitle.textContent = '';
          if (errMessage) errMessage.textContent = '';

          if (!author) {
            if (errAuthor) errAuthor.textContent = 'Please enter your name.';
            valid = false;
          }

          let title = '';
          if (mode === 'wishlist') {
            title = wishTitleInput ? wishTitleInput.value.trim() : '';
            if (!title) {
              if (errWishTitle) errWishTitle.textContent = 'Please specify the drink or food.';
              valid = false;
            }
          } else {
            title = favDrinkInput && favDrinkInput.value.trim() ? favDrinkInput.value.trim() : 'Place-do Visit';
          }

          if (!msg) {
            if (errMessage) errMessage.textContent = 'Please enter a short message.';
            valid = false;
          }

          if (!valid) return;

          const newItem = {
            id: 'item_' + Date.now(),
            type: mode,
            title: title,
            author: author,
            category: wishCatSelect ? wishCatSelect.value : 'Specialty Coffee',
            rating: starValInput ? parseInt(starValInput.value, 10) : 5,
            message: msg,
            votes: 1,
            date: 'Just now'
          };

          items.unshift(newItem);
          mySubmissions.add(newItem.id);
          votedIds.add(newItem.id);
          saveState();

          form.reset();
          if (noticeBox) {
            noticeBox.className = 'form-notice success';
            noticeBox.innerHTML = `
              <span>${mode === 'wishlist' ? 'Thank you! Your drink request was added.' : 'Thank you! Your review was posted.'}</span>
              <button type="button" class="btn-undo-notice" id="btn-undo-action">Delete my comment</button>
            `;
            const undoBtn = document.getElementById('btn-undo-action');
            if (undoBtn) {
              undoBtn.addEventListener('click', () => {
                items = items.filter(it => it.id !== newItem.id);
                mySubmissions.delete(newItem.id);
                votedIds.delete(newItem.id);
                saveState();
                renderList();
                noticeBox.className = 'form-notice';
                noticeBox.textContent = 'Your comment has been deleted.';
                setTimeout(() => { if (noticeBox) noticeBox.textContent = ''; }, 3000);
              });
            }
            setTimeout(() => {
              if (noticeBox && noticeBox.querySelector('#btn-undo-action')) {
                noticeBox.textContent = '';
              }
            }, 8000);
          }

          renderList();
        });
      }
    };

    return { init };
  })();

  /* ==========================================================================
     INITIALIZATION ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    ThemeModule.init();
    NavigationModule.init();
    MenuSheetsModule.init();
    DrinksFilterModule.init();
    QuickFinderModule.init();
    CommunityWishlistModule.init();
  });

})();
