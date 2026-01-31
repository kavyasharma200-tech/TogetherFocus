import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, auth, googleProvider, db;

// Only initialize if we have a valid config to prevent crashes during setup
const hasConfig =
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_API_KEY !== 'your_api_key' &&
    import.meta.env.VITE_FIREBASE_API_KEY !== 'undefined';

if (hasConfig) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        db = getDatabase(app);
    } catch (error) {
        console.warn("Firebase initialization failed:", error);
    }
} else {
    console.warn("Firebase configuration missing. App will run in Setup Mode.");
}

export { auth, googleProvider, db };
export default app;
