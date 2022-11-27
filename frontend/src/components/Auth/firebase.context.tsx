import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../../services/firebase.service";

interface FirebaseContext {
  currentUser: User | null;
  login?: (email: string, password: string) => Promise<UserCredential>;
  register?: (email: string, password: string) => Promise<UserCredential>;
}

const defaultValue: FirebaseContext = {
  currentUser: null,
  login: undefined,
  register: undefined,
};

const FirebaseContext = createContext(defaultValue);

export function useAuth() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    // TODO
    // What type is user?
    // How can we merge this into MobX?
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
