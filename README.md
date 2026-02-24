# Campus Eats (Prototype)

Mobile-first campus food pickup prototype designed to reduce long lines and order-screen checking.

## Problem
Students constantly check TV screens for order numbers and crowd around pickup areas.

## Solution
QR-based order tracking + live status updates:
- Students track their order on their phone
- Vendors update status (Received -> Preparing -> Ready)
- No screen-checking or congestion

## Demo Routes
- `/` — Restaurant list (UTK, Panda Express, Subway, Rubios)
- `/order/CHK1906` — Demo order tracking
- `/vendor` — Vendor dashboard

## How It Works
1. Student scans QR on receipt
2. Order page opens instantly
3. Vendor marks "Ready"
4. Student sees ready status (notification-ready system)

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Mobile-first design

## Status
Prototype for SDSU pilot discussion.
Payments, NFC pickup, and rewards are planned future enhancements.
