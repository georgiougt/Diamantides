# Diamantides Yachting - Website Usage Guide

This project is a modern, static website built with **Vite + React**.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder containing:
- `index.html` (Entry point)
- `assets/` (Compiled CSS and JS)

## Deployment

Since this is a static site, you can deploy the contents of the `dist` folder to any static hosting provider:

- **Netlify**: Drag and drop the `dist` folder.
- **Vercel**: Connect your GitHub repo and settings will be auto-detected.
- **GitHub Pages**: accessible via standard gh-pages deployment.
- **Apache/Nginx**: Upload contents of `dist` to your `public_html`.

## Project Structure

- `src/components/`: UI components (Hero, Navbar, Fleet, etc.)
- `src/styles/`: CSS files including global variables (`variables.css`).
- `src/App.jsx`: Main application layout.
