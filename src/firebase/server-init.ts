import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

interface FirebaseServerServices {
    app: FirebaseApp;
    firestore: Firestore;
}

// Helper function to initialize Firebase on the server
export function initializeFirebaseServer(): FirebaseServerServices {
    const apps = getApps();
    if (apps.length > 0) {
        const app = getApp();
        return {
            app,
            firestore: getFirestore(app)
        };
    }
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    return { app, firestore };
}
