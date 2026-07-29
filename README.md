# Campus Cart — Ahmedabad University Student Marketplace

Campus Cart is a single-page AI Campus Marketplace web application for Ahmedabad University students to buy and sell used items (books, cycles, electronics, etc.).

## Features & Highlights

- **Checked Notebook Theme**: Paper white canvas, thin graph paper grid lines, ink navy typography, notebook-red primary buttons, and sticky-note yellow badges.
- **Hero Section**: "Sell it. Find it. Campus only." with red marker stroke accent and tilted sticky note highlights.
- **Sell an Item Form**: Dashed coupon border card with category and condition pill chips, client-side image resizing (1200px max edge, JPEG ~0.8), progress state, and Firestore document creation.
- **Real-Time Listings Grid**: Real-time Firebase Firestore updates via `onSnapshot`, visible counting-up live listings counter, search bar, category chips, favourites tab (persisting in `localStorage`), and "My listings" tab.
- **Firebase Auth (@ahduni.edu.in Restriction)**: Restricts Google OAuth sign-in exclusively to Ahmedabad University email addresses (`@ahduni.edu.in`), immediately signing out unauthorized accounts and showing a themed sticky-note warning.
- **Share & Contact**: Native web share API (`navigator.share`) on mobile, clipboard copy with toast on desktop, and seller message modal.

---

## Deployment Steps for Vercel

Follow these steps to deploy Campus Cart to Vercel:

### 1. Push Code to GitHub
Ensure all code and configuration files are committed and pushed to your GitHub repository.

### 2. Import Project in Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
2. Select your `campus-cart` repository and click **Import**.

### 3. Configure Environment Variables
In the Vercel project configuration settings under **Environment Variables**, add the following keys:

| Environment Variable | Description |
| :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `au-campus-marketplace.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `au-campus-marketplace` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `au-campus-marketplace.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `923692004442` |
| `VITE_FIREBASE_APP_ID` | `1:923692004442:web:8c9fe7c961469b2fe55463` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-X6RWR90CEM` |

### 4. Deploy
Click **Deploy**. Vercel will run `npm run build` and publish your live application.

### 5. Configure Authorized Domains in Firebase
1. Open the [Firebase Console](https://console.firebase.google.com).
2. Go to **Authentication** > **Settings** > **Authorized domains**.
3. Add your Vercel deployment domain (e.g. `campus-cart.vercel.app`) to the allowed domains list so Google OAuth sign-in works seamlessly.
