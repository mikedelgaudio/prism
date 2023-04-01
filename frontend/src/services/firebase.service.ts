import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = import.meta.env.PROD
  ? {
      apiKey: "AIzaSyA_MjUdhHJXGD39XJi7n9Zfj3Fr01qe7UI",
      authDomain: "prism-productivity.firebaseapp.com",
      projectId: "prism-productivity",
      storageBucket: "prism-productivity.appspot.com",
      messagingSenderId: "1051077289664",
      appId: "1:1051077289664:web:a83532271959afb2ce2f25",
      measurementId: "G-HB2KN7LCBR",
    }
  : {
      apiKey: "AIzaSyBQ6rF_-MLtBshIr3Hfu-qVjpAR2Iuytgg",
      authDomain: "prism-productivity-mvp.firebaseapp.com",
      projectId: "prism-productivity-mvp",
      storageBucket: "prism-productivity-mvp.appspot.com",
      messagingSenderId: "388974293387",
      appId: "1:388974293387:web:5e78f3d23f5e9cde1fbf8e",
    };

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// gives us an auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);

export const FIREBASE_USERS_COLLECTION = "users";
export const FIREBASE_TASKS_COLLECTION = "tasks";
export const FIREBASE_UPLOADS_COLLECTION = "uploads";
