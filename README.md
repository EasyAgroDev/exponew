# Easy Agrotech

The site now uses React, Vite, Tailwind CSS, and React Router. All application pages are JSX components under `src/components`; the existing product, controller, and quotation images remain in `public`.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The React home page opens at `/`. Use the navigation to browse the product catalog, About page, either controller simulator, and the quotation kiosk. Navigation uses client-side routes, so moving between pages does not reload the site.

`index.html` is the Vite-required document entry point; application UI is rendered by React.

## Kiosk idle behavior

On any route, one minute without pointer, keyboard, or scroll interaction returns the kiosk to `/`. Any new interaction restarts the timer.

## Offline use

The production build includes a service worker that downloads the app shell and all local site assets on the first successful visit. After that initial load and cache installation, the home page and the other app routes continue to work without an internet connection. Serve the production build over HTTPS (or localhost during development) for browsers to allow service workers. Configure the VPS web server to serve `index.html` for unknown app routes so direct links work both online and offline.

## Vercel deployment

The included `vercel.json` builds the Vite app and serves it with SPA routing. Direct links to `/products`, `/controller`, and `/quotation` are rewritten to `index.html`.

Deploy with:

```bash
npm install
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

Or connect this project repository in the Vercel dashboard and use the detected Vite settings. Vercel provides HTTPS automatically, which is required for reliable browser service-worker support.
