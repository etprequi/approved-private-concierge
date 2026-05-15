import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);

const app = firebaseEnabled && !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = firebaseEnabled ? getAuth(app) : null;

export const isFirebaseConfigured = firebaseEnabled;

export async function signInWithFirebase(email: string, password: string) {
  if (!auth) {
    throw new Error('Firebase is not configured.');
  }

  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutFirebase() {
  if (!auth) return;
  await firebaseSignOut(auth);
}
