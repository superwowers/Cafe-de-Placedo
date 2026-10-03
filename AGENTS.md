# Agent Instructions: Café de Place-do Web Project

## 1. Project Overview & Brand Identity
- **Project Name:** Café de Place-do
- **Official Brand Story & Exact Facebook Bio:**
  > *"inspired by our surname **Placido**, your cozy “Place” to “Do” life and coffee"*
- **Pronunciation & Slogan:** *(pronounced: cafe de pley-si-do)* • "Your Place to Do Life & Coffee"
- **Location:** Betis, Sta. Monica, Rizal, Nueva Ecija, Philippines (along the highway, in front of the irrigation).
- **Exact Operating Hours:** **Open Daily • 1:00 PM – 10:00 PM**
- **Official Socials:**
  - Facebook: [Café de Place-do](https://www.facebook.com/cafedeplacedo/)
  - Instagram: [@cafe.de.placedo](https://www.instagram.com/cafe.de.placedo/)

---

## 2. Design Principles & Anti-Clutter Rules
1. **NO EMOJIS:** Absolutely zero smartphone emojis anywhere in the interface, buttons, headings, or navigation (no coffee cup, star, moon, lightbulb, heart icons, etc.). Use clean SVG vector icons or refined typography only.
2. **NO TOP ANNOUNCEMENT BAR:** Eliminate clutter above the navigation. The website begins cleanly with a minimal, elegant header.
3. **MINIMAL, SENIOR-FRONTEND NAVBAR (ONE-LINE BRAND):**
   - Keep the navbar clean, focused, and uncluttered.
   - Header brand is strictly on ONE single horizontal line: `CAFÉ DE place-do [BY SIBS]`.
   - Clear core navigation links: **Available Now**, **Menu Boards**, **Drink Wishlist**, **Visit Us**.
   - Integrated Dark / Light Mode Toggle: Seamlessly toggles between authentic warm linen Light Mode and high-contrast Dark Roast Nocturnal Mode. Persisted in `localStorage` with zero theme-flash on reload.
   - One primary action button: **"Message on Facebook"**.
4. **AVAILABLE DRINKS & COMFORT FOOD SHOWCASE (WITH 8-ITEM PAGINATION):**
   - Highlighting the drinks and comfort food that patrons can currently order at the stall with authentic photography and exact menu pricing (19 verified items).
   - Filterable by: Signatures, Espresso & Lattes, Matcha Series, Biscoff & Sweets, and Comfort Food.
   - Displays 8 items per page in "All" view with `< Previous`, `Next >` navigation and dynamic page indicators (1, 2, 3). Automatically conceals pagination controls when a filtered category contains 8 or fewer items.
   - Direct full-screen image expansion via modal lightbox.
5. **INTEGRATED OFFICIAL MENU BOARDS:**
   - Features the authentic high-resolution menu sheets directly (`menu_page1.png` and `menu_page2.png`).
   - Clean, calm tab switcher: **Drinks & Coffee (Page 1)** and **Foods & Refreshers (Page 2)** with full-screen zoom and a quick price finder.
6. **CUSTOMER VOICE & DRINK WISHLIST:**
   - Dedicated community board where customers can request drinks/foods that are **NOT yet available** at Place-do (*"Have a Drink or Dish in Mind?"*).
   - Clean upvoting mechanism (+1 Wish) stored in `localStorage`.
   - Option to leave a verified customer review.
   - **Per-Comment Deletion ("Delete my comment"):** Any comment or request submitted by a user features an explicit `Delete my comment` button directly on the card and in the immediate submission alert. Clicking it immediately removes their submission and updates storage.
   - **No Board Reset Button:** The community board filter bar does not include a generic "Reset" button; individual submissions are managed via their dedicated `Delete my comment` action.
7. **STRICT IMAGE POLICY (ZERO AI):**
   - Strictly NO AI-generated images.
   - Use only authentic photos in `./assets/`:
     - `menu_page1.png` & `menu_page2.png` — Official printed menu boards
     - `place.jpg` — Real outdoor wooden coffee bar
     - `stall_canopy_tent.jpg` — Timber brew stall under warm illuminated canopy tent (featured in Visit Us)
     - `patio_evening_crowd.jpg` — Al fresco evening patio patrons
     - `pancit_canton_bowls.jpg` — Spammy Canton & Siomai Canton bowls
     - `snow_dream_choco.png` — Snow Dream Choco
     - `tres_leches_caramel.png` — Tres Leches Caramel
     - `spanish_latte_pair.png` — Spanish Latte ("Slow down. You're doing fine.")
     - `choco_latte.png` — Have Some Choco Latte
     - `matcha_fam.jpg` — Matcha Fam (Matcha Oreo Cream, Matcha Coffee Latte, Seasalt Matcha)
     - `strawberry_matcha.png` — Strawberry Matcha
     - `vanilla_oreo_latte.png` — Vanilla Latte & Oreo Latte
     - `biscoff_milk_trio.jpg` — Biscoff Milk
     - `strawberry_oreo_single.png` — Strawberry Oreo ("Why not try strawberry oreo?")
     - `seasalt_oatside.png` — Seasalt Spanish Latte with Oatside oat milk
     - `lattes_trio.png` — Butterscotch Latte, Spanish Latte & Salted Caramel Macchiato
     - `biscoff_lychee.png` — Biscoff Milk & Lychee Fizz duo
     - `oatside_milk.png` — Oatside Barista Blend Oat Milk cartons
     - `logo.jpg` — Official round brand logo

---

## 3. Directory Layout
```text
Cafe-de-Placedo/
├── AGENTS.md
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo.jpg
    ├── menu_page1.png             # Official Menu Page 1 (Coffee & Drinks)
    ├── menu_page2.png             # Official Menu Page 2 (Biscoff, Foods & Canton)
    ├── place.jpg                  # Handcrafted timber brew stall
    ├── stall_canopy_tent.jpg      # Illuminated canopy tent at night
    ├── patio_evening_crowd.jpg    # Evening patio patrons
    ├── pancit_canton_bowls.jpg    # Pancit Canton bowls with eggs & toppings
    ├── snow_dream_choco.png       # Snow Dream Choco
    ├── tres_leches_caramel.png    # Tres Leches Caramel
    ├── spanish_latte_pair.png     # Spanish Latte ("Slow down...")
    ├── choco_latte.png            # Choco Latte
    ├── matcha_fam.jpg             # Matcha Fam Trio
    ├── strawberry_matcha.png      # Strawberry Matcha
    ├── vanilla_oreo_latte.png     # Vanilla & Oreo Latte
    ├── biscoff_milk_trio.jpg      # Biscoff Milk
    ├── strawberry_oreo_single.png # Strawberry Oreo
    ├── seasalt_oatside.png        # Seasalt Spanish Latte
    ├── lattes_trio.png            # Flavored Lattes Trio
    ├── biscoff_lychee.png         # Biscoff Milk & Lychee Fizz
    └── oatside_milk.png           # Oatside Barista Oat Milk
```

---

## 4. UI/UX Style Guide: Calm Artisanal Coffeehouse
- **Color Palette (Light Mode - Exact Physical Menu Match):**
  - Background Canvas: `#F7F4E1` (Exact menu board parchment cream)
  - Card Surfaces: `#FFFFFF` (Crisp clean white)
  - Subtle Wash: `#EFEBD6` (Soft warm menu wash)
  - Dark Roast / Text: `#2D2518` (Exact menu espresso dark roast)
  - Accent / Menu Banner: `#D3AF35` (Exact golden mustard banner stripe from physical menu)
  - Fine Borders: `#E3DEC6` (Fine parchment border)
- **Color Palette (Dark Mode - Nocturnal Black with Coffee Browns & Gold):**
  - Base Background: `#0B0705` (Pure nocturnal black espresso base)
  - Surface Cards: `#17110B` (Warm dark espresso card)
  - Subtle Wash: `#241A12` (Roasted coffee brown wash)
  - Main Text: `#FFFFFF` (Ultra-crisp 100% white)
  - Muted Text: `#E2D9C8` (High-contrast warm menu cream)
  - Light Text: `#AFA291` (Clearly legible light oat)
  - Primary / Accent: `#D3AF35` (Warm golden mustard glow from physical menu)
  - Borders: `#38281C` (Defined coffee brown border)
- **Typography:**
  - Heading Display: `Poppins` (modern, clean, geometric bold)
  - Top Brand Typography: `CAFÉ DE` (Plus Jakarta Sans uppercase), `place` (Playfair Display bold serif), `-do` (Alex Brush script, optically balanced at 1.7rem)
  - Body & UI: `Plus Jakarta Sans` (ultra-clean, highly legible)
- **Aesthetic:** Editorial, calm, authentic, and grounded in Café de Place-do's physical menu. Zero clutter, zero emojis.
