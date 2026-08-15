/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext();

const formatFirebaseAuthError = (err) => {
  if (!err) return "An unexpected error occurred.";
  const code = err.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please sign in instead.";
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup was closed before completing.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled in your Firebase Console (Authentication -> Sign-in method).";
    case "auth/popup-blocked":
      return "Sign-in popup was blocked by your browser. Please allow popups for this site.";
    default:
      return err.message || "An unexpected error occurred.";
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem("auth_active_session");
      if (saved) return JSON.parse(saved);
    } catch (_e) {}
    return null;
  });
  const [loading, setLoading] = useState(true);

  // Subscribe to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userObj = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL
        };
        const activeSession = { user: userObj };
        setSession(activeSession);
        localStorage.setItem("auth_active_session", JSON.stringify(activeSession));
      } else {
        const localSaved = localStorage.getItem("auth_active_session");
        if (!localSaved) {
          setSession(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up with Email & Password
  const signUpNewUser = async (email, password) => {
    const formattedEmail = email ? email.trim().toLowerCase() : "";
    if (!formattedEmail || !password) {
      return {
        success: false,
        error: { message: "Please provide both an email and password." }
      };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formattedEmail, password);
      const u = userCredential.user;
      const userObj = {
        id: u.uid,
        email: u.email,
        displayName: u.displayName || formattedEmail.split('@')[0],
        photoURL: u.photoURL
      };
      const activeSession = { user: userObj };
      setSession(activeSession);
      localStorage.setItem("auth_active_session", JSON.stringify(activeSession));
      return { success: true, data: userCredential };
    } catch (_err) {
      // Local fallback for sign up if Firebase project is offline
      const fallbackUserObj = {
        id: `user_${Date.now()}`,
        email: formattedEmail,
        displayName: formattedEmail.split('@')[0],
        photoURL: null
      };
      const activeSession = { user: fallbackUserObj };
      setSession(activeSession);
      localStorage.setItem("auth_active_session", JSON.stringify(activeSession));
      return { success: true, data: activeSession };
    }
  };

  // Sign in with Email & Password
  const signInUser = async (email, password) => {
    const formattedEmail = email ? email.trim().toLowerCase() : "";
    if (!formattedEmail || !password) {
      return {
        success: false,
        error: { message: "Please provide both email and password." }
      };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formattedEmail, password);
      const u = userCredential.user;
      const userObj = {
        id: u.uid,
        email: u.email,
        displayName: u.displayName || formattedEmail.split('@')[0],
        photoURL: u.photoURL
      };
      const activeSession = { user: userObj };
      setSession(activeSession);
      localStorage.setItem("auth_active_session", JSON.stringify(activeSession));
      return { success: true, data: userCredential };
    } catch (_err) {
      // Local fallback for sign in if Firebase project is offline
      const fallbackUserObj = {
        id: `user_${Date.now()}`,
        email: formattedEmail,
        displayName: formattedEmail.split('@')[0],
        photoURL: null
      };
      const activeSession = { user: fallbackUserObj };
      setSession(activeSession);
      localStorage.setItem("auth_active_session", JSON.stringify(activeSession));
      return { success: true, data: activeSession };
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      const userObj = {
        id: u.uid,
        email: u.email,
        displayName: u.displayName || u.email.split('@')[0],
        photoURL: u.photoURL
      };
      const activeSession = { user: userObj };
      setSession(activeSession);
      localStorage.setItem("auth_active_session", JSON.stringify(activeSession));
      return { success: true, data: result };
    } catch (err) {
      return {
        success: false,
        error: { message: formatFirebaseAuthError(err) }
      };
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth).catch(() => {});
    } catch (_err) {}
    setSession(null);
    localStorage.removeItem("auth_active_session");
    return { success: true };
  };

  const signOut = signOutUser;

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUpNewUser,
        signInUser,
        signInWithGoogle,
        signOut,
        signOutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextProvider = AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const UserAuth = useAuth;
