# AUSM — Ahmedabad University Student Marketplace

**Sell it. Find it. Campus only.**

AUSM is a verified, peer-to-peer marketplace built exclusively for Ahmedabad University students to buy and sell used books, cycles, electronics, and other campus essentials — instead of items being used once a semester and then thrown away.

🔗 **Live site:** [ausm.online](https://ausm.online)

---

## Why this exists

Every semester, students buy things they'll only use for a few months — textbooks, cycles, calculators — and then let them sit unused once the course or the year ends, while the next batch of students buys the exact same items brand new. AUSM exists to close that loop: a trusted, on-campus space where AU students can pass items directly to each other.

The full reasoning, trust model, and terms are laid out on the in-app [Manifesto & Guidelines](https://ausm.online) page.

---

## Features

- **Verified campus access** — Google OAuth sign-in restricted to `@ahduni.edu.in` accounts only; any other domain is signed out immediately with a clear warning.
- **Real-time listings** — Firestore `onSnapshot` listeners keep the marketplace grid live across all connected clients with no manual refresh, with search, category filters, a live listings counter, a "My Favourites" tab, and a "My Listings" tab.
- **Sell flow** — a guided form with category/condition tagging, client-side image compression before upload (keeps Firebase Storage costs and load times down), and instant appearance in the live grid once published.
- **Privacy-first contact model** — buyers never see a seller's name, photo, or phone number on the front end. Clicking "Message Us" opens WhatsApp with a pre-filled message addressed to AUSM directly, which then relays the interaction — so no student's personal contact details are ever exposed publicly.
- **Verified Student Discounts page** — a curated, India-specific guide to real student perks (GitHub Student Pack, Adobe, Figma, Spotify, Apple, Samsung, and more), each individually checked for actual availability and terms for Indian university students rather than copy-pasted from US-centric sources, with working links to the official claim page for each.
- **Manifesto & Guidelines** — an in-app page laying out the platform's trust, safety, and anonymity commitments in plain language.
- **PWA-ready** — installable to a phone home screen, with a full icon set (favicon, Apple touch icon, Android maskable icons).
- **Mobile-first, responsive UI** — built for students browsing primarily on their phones between classes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Backend | [Firebase](https://firebase.google.com/) — Authentication, Firestore, Storage, Hosting |
| Icons | [lucide-react](https://lucide.dev/) |

No custom backend server — this is a static single-page app talking directly to Firebase, secured entirely through [Firestore security rules](./firestore.rules).

---

## Project Structure

```
src/
├── App.tsx                  # Root component: routing, auth state, Firestore subscription
├── main.tsx                 # React entry point
├── types.ts                 # Shared TypeScript types (Listing, etc.)
├── TermsPage.tsx             # Thin re-export wrapper around ManifestoPage
├── lib/
│   ├── firebase.ts          # Firebase app init, auth helpers, error handling
│   └── seed.ts               # One-time demo-listing seeding & legacy cleanup
└── components/
    ├── Navbar.tsx             # Header, Resources dropdown, auth menu
    ├── Hero.tsx                # Homepage hero banner
    ├── SellForm.tsx            # Listing creation form + image upload
    ├── ListingsSection.tsx      # Live listings grid, search, filters, tabs
    ├── MessageModal.tsx         # "Message Us" WhatsApp hand-off modal
    ├── FounderNote.tsx          # Founder note (full + compact variants)
    ├── DiscountsPage.tsx        # Verified student discounts directory
    ├── DiscountsTeaser.tsx       # Homepage CTA banner linking to Discounts
    ├── ManifestoPage.tsx         # Manifesto + Terms & Guidelines
    ├── GuidePage.tsx             # How-to-use walkthrough
    ├── SignInModal.tsx           # Google sign-in modal
    ├── DomainErrorToast.tsx      # Non-university-email warning
    └── Footer.tsx                # Site footer

public/
├── favicon.svg, favicon-*.png, apple-touch-icon.png, icon-*.png
└── manifest.json             # PWA manifest

firestore.rules               # Firestore security rules
firebase.json / .firebaserc   # Firebase Hosting config
```

---

## Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- A [Firebase project](https://console.firebase.google.com/) with **Authentication** (Google sign-in), **Firestore**, and **Storage** enabled

### Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd AU-Student-Marketplace

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# then fill in .env with your own Firebase project's config
# (Project Settings → General → Your apps → SDK setup and configuration)

# 4. Start the dev server
npm run dev
```

The app will fail fast with a clear error message on startup if any required Firebase environment variable is missing — see `src/lib/firebase.ts`.

### Environment Variables

All required variables are:

| Variable |
|---|
| `VITE_FIREBASE_API_KEY` |
| `VITE_FIREBASE_AUTH_DOMAIN` |
| `VITE_FIREBASE_PROJECT_ID` |
| `VITE_FIREBASE_STORAGE_BUCKET` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` |
| `VITE_FIREBASE_APP_ID` |
| `VITE_FIREBASE_MEASUREMENT_ID` |


## Data Model & Security

The `listings` collection in Firestore is the single source of truth, kept in sync with the UI in real time. Access is governed by [`firestore.rules`](./firestore.rules):

- Anyone can **read** listings (the marketplace is browsable without signing in).
- Only an **authenticated** user can **create** a listing, and only with themselves set as the seller.
- Only the **original seller** can **update or delete** their own listing.

---

## Deployment

The live site is deployed on **Vercel**, with the auth hosted through **Firebase**

```bash
npm run build
firebase deploy
```

Make sure the deploying environment has the same `VITE_FIREBASE_*` variables set (e.g. via CI secrets) — the build will fail without them, by design.

---

## About

Built and maintained by **Dhyey Mody**, a Computer Science student at Ahmedabad University.

- LinkedIn: [linkedin.com/in/dhyeymody](https://www.linkedin.com/in/dhyeymody/)
- Email: [dhyey.m@ahduni.edu.in](mailto:dhyey.m@ahduni.edu.in)

Feedback, ideas, and bug reports are always welcome.

## License

© Dhyey Mody. All rights reserved. This project is not currently licensed for reuse or redistribution; reach out via the contact above if you'd like to discuss otherwise.