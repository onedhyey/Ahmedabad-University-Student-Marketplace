import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Listing, ListingCategory, ListingCondition } from '../types';

const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required Firebase environment variable(s): ${missingEnvVars.join(', ')}. ` +
    `Copy .env.example to .env and fill in your Firebase project's config before running the app.`
  );
}

const firebaseConfig = requiredEnvVars as Record<keyof typeof requiredEnvVars, string>;

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Error handler helper
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Check if user email ends with @ahduni.edu.in
export function isAUStudent(user: User | null): boolean {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().endsWith('@ahduni.edu.in');
}

// Sign in with Google with domain check
export async function signInWithGoogleAU(): Promise<{ user: User | null; isAllowed: boolean }> {
  try {
    // Always force Google's account chooser screen
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (!isAUStudent(user)) {
      await firebaseSignOut(auth);
      return { user: null, isAllowed: false };
    }
    return { user, isAllowed: true };
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

export async function signOutUser() {
  return firebaseSignOut(auth);
}

// Client-side image resize helper: max edge 1200px, JPEG quality 0.8
export async function processAndUploadImage(file: File, sellerId: string, listingId: string): Promise<{ imageUrl: string; imagePath: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context not available'));

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          async (blob) => {
            if (!blob) return reject(new Error('Image compression failed'));

            const imagePath = `listings/${sellerId}/${listingId}.jpg`;
            const imageRef = ref(storage, imagePath);

            try {
              await uploadBytes(imageRef, blob, { contentType: 'image/jpeg' });
              const imageUrl = await getDownloadURL(imageRef);
              resolve({ imageUrl, imagePath });
            } catch (err) {
              reject(err);
            }
          },
          'image/jpeg',
          0.8
        );
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

// Delete image from Firebase Storage if present
export async function deleteListingImage(imagePath?: string) {
  if (!imagePath) return;
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.warn("Could not delete storage image:", error);
  }
}