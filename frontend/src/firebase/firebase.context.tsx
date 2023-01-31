import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  ERROR_INVALID_CURRENT_EMAIL,
  ERROR_INVALID_INPUT,
  ERROR_USER_IS_NULL,
} from "../services/errors.service";
import {
  auth,
  db,
  FIREBASE_TASKS_COLLECTION,
  FIREBASE_USERS_COLLECTION,
} from "../services/firebase.service";
import { validString } from "../services/util.service";
import { DEFAULT_PROFILE, DEFAULT_PROFILE_TASKS } from "./firebase.models";
import { validPrismId } from "./firebase.util";

interface FirebaseContext {
  currentUser: User | null;
  login?: (email: string, password: string) => Promise<UserCredential>;
  register?: (
    email: string,
    password: string,
    prismId: string,
  ) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  updateDisplayName?: (firstName: string, lastName: string) => Promise<void>;
  sendVerificationEmail?: () => Promise<void>;
  reauthUser?: (email: string, password: string) => Promise<UserCredential>;
  updateUserEmail?: (currentEmail: string, newEmail: string) => Promise<void>;
  updateUserPassword?: (newPassword: string) => Promise<void>;
  deleteAccount?: () => Promise<void>;
  addNewUser?: (prismId: string) => Promise<void>;
}

const defaultValue: FirebaseContext = {
  currentUser: null,
};

const FirebaseContext = createContext(defaultValue);

export function useFirebaseAuth() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const register = async (email: string, password: string, prismId: string) => {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    // TODO
    // ! Ensure PrismID is only used once

    if (!validPrismId(db, prismId))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateDisplayName = async (firstName: string, lastName: string) => {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(firstName) || !validString(lastName))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  };

  const updateUserEmail = async (currentEmail: string, newEmail: string) => {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(currentEmail) || !validString(newEmail))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    // Check if current email input matches current
    if (currentEmail !== auth.currentUser.email)
      return Promise.reject({ message: ERROR_INVALID_CURRENT_EMAIL });

    await sendVerificationEmail();

    return updateEmail(auth.currentUser, newEmail);
  };

  const updateUserPassword = async (newPassword: string) => {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(newPassword))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    return updatePassword(auth.currentUser, newPassword);
  };

  // TODO
  // ! If user stays on a page for too long you may need
  // ! prompt them for re-auth again...
  const reauthUser = async (email: string, password: string) => {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    if (!validString(email) || !validString(password))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(auth.currentUser, credential);
  };

  const sendVerificationEmail = async () => {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    return sendEmailVerification(auth.currentUser);
  };

  // Deletes user from Firebase Auth and Firestore
  const deleteAccount = async () => {
    if (!auth.currentUser)
      return Promise.reject({ message: ERROR_USER_IS_NULL });

    await deleteDoc(doc(db, FIREBASE_USERS_COLLECTION, auth.currentUser.uid));

    return deleteUser(auth.currentUser);
  };

  const logout = async () => {
    return signOut(auth);
  };

  const addNewUser = async (prismId: string) => {
    if (!validString(prismId))
      return Promise.reject({ message: ERROR_INVALID_INPUT });

    const userId = auth.currentUser?.uid;

    if (!userId) return Promise.reject({ message: ERROR_USER_IS_NULL });
    const docRef = doc(db, FIREBASE_USERS_COLLECTION, userId);
    if (!docRef) return Promise.reject({ message: ERROR_USER_IS_NULL });

    // TODO
    // ! Validate PrismID?
    const newUserProfile = DEFAULT_PROFILE;
    newUserProfile.prismId = prismId;

    try {
      await setDoc(docRef, newUserProfile);

      DEFAULT_PROFILE_TASKS.forEach(async task => {
        try {
          const tasksCollectionRef = doc(
            collection(
              db,
              `${FIREBASE_USERS_COLLECTION}/${userId}/${FIREBASE_TASKS_COLLECTION}`,
            ),
            task.id,
          );

          await setDoc(tasksCollectionRef, task);
        } catch (e) {
          // console.log(task);
          // console.error(JSON.stringify(e));
        }
      });
    } catch (e) {
      return Promise.reject({ message: "Error" });
    }

    return Promise.resolve();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
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
    reauthUser,
    updateUserEmail,
    updateUserPassword,
    deleteAccount,
    addNewUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

function RequireAuth({ children }: { children: any }) {
  const { currentUser } = useFirebaseAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

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
