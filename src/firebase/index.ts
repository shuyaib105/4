
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { firebaseConfig } from "./config";

function initializeFirebase() {
  const apps = getApps();
  const isInitialized = apps.length > 0;
  const app = isInitialized ? apps[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  if (!isInitialized) {
    // Only enable persistence on the very first initialization.
    // This avoids the error during hot-reloads.
    enableIndexedDbPersistence(firestore)
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn("Firebase persistence failed, multiple tabs open.");
        } else if (err.code === 'unimplemented') {
          console.warn("Firebase persistence is not available in this browser.");
        }
      });
  }

  return { app, auth, firestore };
}

export * from "./provider";
export * from "./auth/use-user";
export * from "./firestore/use-doc";
export * from "./firestore/use-collection";
export { initializeFirebase };
