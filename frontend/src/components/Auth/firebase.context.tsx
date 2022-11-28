import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../services/firebase.service";

interface FirebaseContext {
  currentUser: User | null;
  login?: (email: string, password: string) => Promise<UserCredential>;
  register?: (email: string, password: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  updateDisplayName?: (firstName: string, lastName: string) => Promise<void>;
  sendVerificationEmail?: () => Promise<void>;
}

const defaultValue: FirebaseContext = {
  currentUser: null,
};

const FirebaseContext = createContext(defaultValue);

export function useFirebaseAuth() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO
  // ! Must ensure input is sanitized

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateDisplayName = (firstName: string, lastName: string) => {
    if (!auth.currentUser) return Promise.reject("Current user is null");
    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  };

  const sendVerificationEmail = () => {
    if (!auth.currentUser) return Promise.reject("Current user is null");
    return sendEmailVerification(auth.currentUser);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // TODO
    // ! What type is user?
    // ! How can we merge this into MobX?
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
    logout,
    updateDisplayName,
    sendVerificationEmail,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

// TODO
// ! What type is children?
function RequireAuth({ children }: { children: any }) {
  const { currentUser } = useFirebaseAuth();
  const location = useLocation();

  console.log(currentUser);

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

// TODO
// ! What type is children?
function RequireUnAuth({ children }: { children: any }) {
  const { currentUser } = useFirebaseAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (currentUser) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  return children;
}

export const FirebaseGuards = {
  RequireAuth,
  RequireUnAuth,
};
