# Diamantides Yachting — Developer & Content Administration Guide

Welcome to the developer and content administration guide for the **Diamantides Yachting** web application. This comprehensive documentation is designed to ensure a smooth transition and continuous maintenance of the website. If you are a new developer taking over this project, this guide will provide you with all the architectural details, database schemas, image handling protocols, and deployment scripts necessary to manage and scale the website.

---

## 1. Project Architecture Overview

The website is built as a modern, high-performance, single-page application (SPA) using **React** and **Vite**. The styling is crafted with high-fidelity, premium **Vanilla CSS** to deliver a luxurious, glassmorphic, and dynamic user interface with elegant micro-animations powered by **Framer Motion**.

### Core Folder Structure
```text
Diamantides Yachting/
├── dist/                   # Production-ready compiled output
├── public/                 # Static public assets
│   └── Diamantides/        # Scoped subfolder for path consistency on GitHub Pages
│       └── assets/         # Images, videos, and icons
├── src/
│   ├── assets/             # Raw media assets imported directly in JS/JSX files
│   ├── components/         # Reusable UI components (Navbar, Footer, YachtDetail, etc.)
│   ├── config/             # Third-party integrations config (EmailJS, maps)
│   ├── data/               # Static database files (yachts.js, nautic_clean.js)
│   ├── pages/              # Primary page components (Sales, Charter, VIP, Management, etc.)
│   ├── styles/             # Modular Vanilla CSS files matching page names
│   ├── App.jsx             # Main router and route configuration
│   └── main.jsx            # React entry point
├── package.json            # Node dependencies and execution scripts
├── vite.config.js          # Vite and Rollup configuration (includes path aliasing / base paths)
└── DEVELOPER_GUIDE.md      # This file
```

---

## 2. Database Schema (`src/data/yachts.js`)

All yachts displayed on the website—whether for **Charter**, **Sales Fleet**, or the **Members-Only (VIP) page**—are stored in a single, high-fidelity JSON-like database located at `src/data/yachts.js`.

### Full Database Object Schema Reference

Every vessel object in the `yachts` array should conform to the following schema to ensure seamless rendering in the detail layouts, lists, and filter widgets:

```javascript
{
    id: 13120,                           // Unique Numeric ID (Verify no collisions when adding new ones)
    name: "Beneteau Monte Carlo 42",      // Full Title (Format: "Builder Model" or "Builder Model (Year)")
    type: "Motor Yacht",                 // Type category (e.g., "Motor Yacht", "Catamaran", "Sailing Yacht")
    length: "13.70m",                    // Root level length (Used for quick sorting & list badges)
    image: "/Diamantides/assets/sales/13120/profile.webp", // Thumbnail / main listing image path
    category: "sales",                   // Core Category: 'charter' OR 'sales'
    condition: "used",                   // Listing Status: 'used' (Brokerage) OR 'new' (Brand New)
    vesselType: "Yachts",                // Sub-category (e.g., "Yachts", "Fiberglass", "Ribs")
    price: "€260,000",                   // Price displayed. Use "Price upon request" or "POA" for private listings, or "SOLD"
    description: "Full paragraphs...",   // Premium editorial content introducing the vessel
    specs: {                             // Key specs rendered in the specifications grid & double-column accordion
        "builder": "Beneteau",           // Shipyard / Builder name
        "year": "2010",                  // Launch year (e.g., "2010" or "2018 - Refit: 2024")
        "length": "13.70m / 45'",        // Rich formatted length (includes feet)
        "beam": "4.00m",                 // Beam (optional)
        "engines": "2x 400hp Volvo Penta", // Engine model and power
        "engineHours": "450hrs",         // Engine hours (optional)
        "generators": "Onan 7KW",        // Generator make/capacity (optional)
        "cabins": "2 Cabins",            // Cabin configuration (e.g., "3 Guest Cabins, 1 Crew")
        "crew": "N/A",                   // Crew cabins count (optional)
        "vatPaid": "Paid",               // VAT status: "Paid" or "Plus VAT" (optional)
        "location": "Limassol, Cyprus"   // Current viewing location (e.g., "Limassol, Cyprus")
    },
    features: [                          // Array of specs rendered inside the premium checklist section
        "2x 400hp Volvo Penta",
        "Onan 7KW Generator",
        "Air Conditioning (A/C)",
        "Radar / Autopilot",
        "2 Cabins",
        "Excellent condition"
    ],
    gallery: [                           // High-res gallery paths for the slide viewer. Ensure at least profile image is here
        "/Diamantides/assets/sales/13120/gallery_0.webp"
    ]
}
```

> [!WARNING]
> **Important Sync Rule:** Keep the root `length` property (e.g. `length: "13.70m"`) and the nested `specs.length` property (e.g. `length: "13.70m / 45'"`) synchronized. The list filters read the root length, whereas the detailed specification modal reads the nested spec length.

---

## 3. How to Add a New Vessel

To add a new yacht to any of the pages, open `src/data/yachts.js` and append a new vessel object to the `yachts` array, adhering to the database schema. Below are the specific rules and page-routing configurations for each section.

### A. Adding a Charter Yacht
Charter yachts are rendered on the **Charter Fleet** page `/charter` using the standard grid view.
1. Set the core properties:
   * `category: 'charter'`
   * `price`: Set weekly or daily pricing (e.g., `"€7,400 / day"`, `"€49,000 / week"`)
2. Set the `detailedPricing` schema to display detailed pricing configurations in the charter modals:
   ```javascript
   detailedPricing: { 
       halfDay: "€6,800", 
       fullDay: "€7,400", 
       overnight: "€9,500", 
       weekly: "€49,000" 
   }
   ```
3. Set the `priceNote` if applicable (e.g., `"*Plus 35% APA. Fuel is included for day charters..."`).
4. Ensure the yacht's visual gallery paths are populated correctly under the `/Diamantides/assets/charter-gallery/` structure.

---

### B. Adding a Sales (Brokerage or Brand New) Yacht
Sales yachts are rendered on the **Sales & Brokerage Fleet** page `/sales/fleet`.
1. Set `category: 'sales'`.
2. Configure **Condition**:
   * **Pre-Owned Brokerage**: Set `condition: 'used'`. It will render normally with its details.
   * **Brand New Vessels**: Set `condition: 'new'`. It will automatically display an elegant gold-metallic **"Brand New"** badge over the card.
3. Configure **Exclusive Brands Showcase** (`/sales/brands`):
   Our partner brands page (`BrandsPage.jsx`) showcases only our exclusive partner representations (**Galeon, Axis, Malibu, Viper, Agilis**). If the vessel's builder matches one of these partner IDs, it will automatically appear in the brand filter selector on the partners page. Non-exclusive new models (e.g., Ferretti, Marinello) will eleganty reside in the general `/sales/fleet` listing with the "Brand New" badge without cluttering the partners page.
4. **"POA" and Sorting Support**:
   If the price is `"Price upon request"`, `"POA"`, or `"SOLD"`, the sorting algorithm in `src/pages/SalesYachtsPage.jsx` automatically parses the price value as `0`. This keeps POA and SOLD items perfectly organized when sorting high-to-low or low-to-high.

---

### C. Adding a Members-Only Yacht (VIP Inner Circle Page)
The members-exclusive inner circle page resides at the `/members-only` route and is rendered by the `VIPCharterPage.jsx` component. Members enjoy a special **20% privilege reduction** on the fleet.

To add or manage which yachts appear on the VIP page, review the filtering logic at the top of the component:

```javascript
const charterYachts = yachts
    .filter(y => 
        (y.category === 'charter' || !y.category) && 
        y.name !== 'Private Yacht 110ft' && 
        y.name !== 'Azimut 27 Grande' &&
        y.name !== 'Princess 62' &&
        y.name !== 'Princess 30M'
    )
```

#### Guidelines for VIP Fleet Customization:
* **Automatic inclusion**: Any new yacht added with `category: 'charter'` will **automatically** appear on the members-only page.
* **Exclusions**: If a yacht is too large, fully booked, or ineligible for the 20% membership discount, explicitly add its name to the exclusion rules in the filter chain inside `VIPCharterPage.jsx` (e.g., `&& y.name !== 'Yacht Name'`).

---

## 4. Asset Management (Images and Media)

All static asset folders reside in the `public/` directory so they build cleanly to GitHub Pages relative roots.

### Asset Directory Structure

Organize new yacht images according to the following conventions:

```text
public/
└── Diamantides/
    └── assets/
        ├── charter-gallery/
        │   └── [yacht-name-lowercase]/     # e.g., falcon-86/ for charter gallery files
        ├── sales/
        │   └── [yacht-id-number]/          # e.g., 13120/ for sales listings
        │       ├── profile.webp            # Main thumbnail (high compression, 800x600)
        │       ├── gallery_0.webp          # High-resolution gallery slide 1 (1920x1080)
        │       ├── gallery_1.webp          # High-resolution gallery slide 2
        │       └── gallery_2.webp          # High-resolution gallery slide 3
        └── images/                         # Generic header images, icons, and logo SVGs
```

### Media Best Practices & Optimizations

To maintain the lightning-fast performance of this high-fidelity React site, enforce the following guidelines when importing new assets:

* **Always use WebP format**: Convert all `.jpg`, `.jpeg`, and `.png` photographs to `.webp`. WebP offers 30%+ superior compression without losing visual clarity.
* **Dimensions & Resolution**:
  * **Main Profile Thumbnail**: Limit width to **800px** (aspect ratio 4:3 or 16:9).
  * **Gallery Images**: Limit width to **1920px** (16:9 widescreen ratio).
* **Optimization Tool**: You can use terminal optimization tools like `sharp` (already included in `package.json` dev dependencies) or local image batch converters to reduce payload sizes before staging.
* **Absolute Pathing Rule**: Always start public media paths with `/Diamantides/assets/` (e.g. `"/Diamantides/assets/sales/13120/profile.webp"`). If you omit the base path, assets will fail to resolve when deployed to GitHub Pages subfolders.

---

## 5. Local Development and Deployment

The project has integrated custom scripts inside `package.json` to automate compilation, assets checking, and public page deployment.

### Useful Commands

* **`npm run dev`**: Starts the Vite local development server (usually at `http://localhost:5173`).
* **`npm run build`**: Compiles the source files, checks import paths, minifies javascript/css packages, and writes the deployment bundle into `/dist`.
* **`npm run deploy`**: Standard script configured to automatically build and push assets to the `gh-pages` branch.

---

### Deploying to GitHub Pages (Reliable Direct Method)

On Windows systems, deploying using the `npm run deploy` node script might encounter shell spawning constraints (`spawn ENAMETOOLONG`) due to directory sizes. In case of deployment issues, use the following **100% reliable direct git process**:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. **Clear deploy cache** (Optional, if running gh-pages library):
   ```bash
   npx gh-pages-clean
   ```
3. **Initialize Git inside compiled output**:
   ```bash
   cd dist
   git init
   ```
4. **Stage and commit compiled code**:
   ```bash
   git add .
   git commit -m "deploy"
   ```
5. **Force push to the remote gh-pages branch**:
   ```bash
   git push --force https://github.com/georgiougt/Diamantides.git master:gh-pages
   ```

---

## 6. Layout Customization & Key UI Components

When redesigning or customizing specific visual elements, look into these essential files:

* **Yacht Detail Layout (`src/components/YachtDetail.jsx`)**:
  Controls the premium double-column detail page, overlaying specifications, displaying the WebP carousel, rendering key features checklists, and mounting the EmailJS automated booking request forms.
* **Pricing Sorting Helper (`src/pages/SalesYachtsPage.jsx`)**:
  Parses string prices (like `"€1,100,000"`, `"Price upon request"`, `"POA"`, and `"SOLD"`) and translates them into logical integers so sorting components work correctly.
* **Brand Name Deduplication logic (`src/components/YachtDetail.jsx`)**:
  Deduplicates repeating manufacturer titles from model labels inside the specifications headers (e.g., prevents "Princess Princess 62").

---

This system is engineered to be modular, robust, and clean. By maintaining consistency within the schema and keeping asset files optimized, the website will remain premium, highly performant, and simple to expand. For any further structural questions, refer to the comments documented directly in `src/App.jsx` and `src/data/yachts.js`.
