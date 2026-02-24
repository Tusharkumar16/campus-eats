## Campus Eats (PWA Prototype)

Mobile-first campus food ordering prototype with:
- student restaurant list + QR entry
- live order tracking (`/order/CHK1906`)
- vendor dashboard (`/vendor`)
- installable PWA support (manifest + service worker + install banner)

## Getting Started

Install dependencies and start dev:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PWA Setup

This project includes:
- `app/manifest.ts` web app manifest (`Campus Eats` / `Eats`, standalone mode)
- `public/sw.js` service worker (caches app shell + static assets)
- generated placeholder icons:
  - `/icon-192.png`
  - `/icon-512.png`
  - `/apple-touch-icon.png`
- mobile install banner (supported browsers only, e.g. Chrome on Android)

Note: service worker registration is enabled in production mode only to avoid dev-cache issues.

## How To Test Install

### Android (Chrome)

1. Run a production build:
```bash
npm run build
npm run start
```
2. Open the site in Chrome on Android (same network machine or via hosted URL).
3. You should see the in-app "Add to Home Screen" banner (supported browsers) or Chrome's install prompt.
4. Install and verify it opens in standalone mode.

### iOS (Safari)

1. Run:
```bash
npm run build
npm run start
```
2. Open the site in Safari on iPhone.
3. Tap Share → "Add to Home Screen".
4. Launch from the home screen and verify standalone look/behavior.

iOS Safari does not support the `beforeinstallprompt` event, so the custom install banner is intentionally not shown there.

## Routes

- `/`
- `/order/CHK1906`
- `/vendor`
